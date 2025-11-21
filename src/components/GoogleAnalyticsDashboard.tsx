import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, ShoppingCart, MousePointerClick, Search, Smartphone, Monitor, Tablet } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type TimeRange = '1day' | '7days' | '30days' | '90days';

interface OrganicTrafficData {
  date: string;
  sessions: number;
  users: number;
}

interface LandingPage {
  page: string;
  visits: number;
  sessions: number;
}

interface SearchEngine {
  engine: string;
  visits: number;
  percentage: number;
}

interface DeviceStats {
  device: string;
  visits: number;
  percentage: number;
}

interface ConversionData {
  date: string;
  orders: number;
  revenue: number;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export function GoogleAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7days');
  const [isLoading, setIsLoading] = useState(true);
  const [organicTraffic, setOrganicTraffic] = useState<OrganicTrafficData[]>([]);
  const [landingPages, setLandingPages] = useState<LandingPage[]>([]);
  const [searchEngines, setSearchEngines] = useState<SearchEngine[]>([]);
  const [deviceStats, setDeviceStats] = useState<DeviceStats[]>([]);
  const [conversions, setConversions] = useState<ConversionData[]>([]);
  const [totalStats, setTotalStats] = useState({
    organicSessions: 0,
    organicUsers: 0,
    conversions: 0,
    revenue: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    fetchAnalyticsData(timeRange);
  }, [timeRange]);

  const fetchAnalyticsData = async (range: TimeRange) => {
    setIsLoading(true);
    try {
      const daysMap = { '1day': 1, '7days': 7, '30days': 30, '90days': 90 };
      const days = daysMap[range];
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      const startDateStr = startDate.toISOString().split('T')[0];

      // Fetch data from GA4 for organic traffic over time
      const { data: trafficData, error: trafficError } = await supabase.functions.invoke('fetch-ga4-data', {
        body: {
          startDate: startDateStr,
          endDate: endDate,
          metrics: ['sessions', 'activeUsers'],
          dimensions: ['date', 'sessionDefaultChannelGroup']
        }
      });

      if (trafficError) throw trafficError;

      // Process organic traffic data
      const organicRows = trafficData?.rows?.filter((row: any) => 
        row.dimensionValues[1]?.value === 'Organic Search'
      ) || [];

      const dailyTrafficMap = new Map<string, { sessions: number, users: number }>();
      organicRows.forEach((row: any) => {
        const dateStr = row.dimensionValues[0]?.value;
        if (dateStr) {
          const date = `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`;
          const formattedDate = new Date(date).toLocaleDateString('ro-RO');
          const sessions = parseInt(row.metricValues[0]?.value || '0');
          const users = parseInt(row.metricValues[1]?.value || '0');
          
          if (!dailyTrafficMap.has(formattedDate)) {
            dailyTrafficMap.set(formattedDate, { sessions: 0, users: 0 });
          }
          const existing = dailyTrafficMap.get(formattedDate)!;
          existing.sessions += sessions;
          existing.users += users;
        }
      });

      const trafficArray: OrganicTrafficData[] = Array.from(dailyTrafficMap.entries())
        .map(([date, data]) => ({ date, ...data }))
        .sort((a, b) => {
          const [dayA, monthA, yearA] = a.date.split('.').map(Number);
          const [dayB, monthB, yearB] = b.date.split('.').map(Number);
          return new Date(yearA, monthA - 1, dayA).getTime() - new Date(yearB, monthB - 1, dayB).getTime();
        });

      setOrganicTraffic(trafficArray);

      // Fetch landing pages from GA4
      const { data: pagesData, error: pagesError } = await supabase.functions.invoke('fetch-ga4-data', {
        body: {
          startDate: startDateStr,
          endDate: endDate,
          metrics: ['screenPageViews', 'sessions'],
          dimensions: ['landingPage', 'sessionDefaultChannelGroup']
        }
      });

      if (pagesError) throw pagesError;

      const organicPages = pagesData?.rows?.filter((row: any) => 
        row.dimensionValues[1]?.value === 'Organic Search'
      ) || [];

      const topPages: LandingPage[] = organicPages
        .map((row: any) => ({
          page: row.dimensionValues[0]?.value || '/',
          visits: parseInt(row.metricValues[0]?.value || '0'),
          sessions: parseInt(row.metricValues[1]?.value || '0'),
        }))
        .sort((a, b) => b.visits - a.visits)
        .slice(0, 10);

      setLandingPages(topPages);

      // Fetch search engines from GA4
      const { data: sourcesData, error: sourcesError } = await supabase.functions.invoke('fetch-ga4-data', {
        body: {
          startDate: startDateStr,
          endDate: endDate,
          metrics: ['sessions'],
          dimensions: ['sessionSource', 'sessionDefaultChannelGroup']
        }
      });

      if (sourcesError) throw sourcesError;

      const organicSources = sourcesData?.rows?.filter((row: any) => 
        row.dimensionValues[1]?.value === 'Organic Search'
      ) || [];

      const enginesMap = new Map<string, number>();
      organicSources.forEach((row: any) => {
        const source = (row.dimensionValues[0]?.value || '').toLowerCase();
        const sessions = parseInt(row.metricValues[0]?.value || '0');
        
        let engine = 'Other';
        if (source.includes('google')) engine = 'Google';
        else if (source.includes('bing')) engine = 'Bing';
        else if (source.includes('yahoo')) engine = 'Yahoo';
        else if (source.includes('duckduckgo')) engine = 'DuckDuckGo';
        else if (source.includes('yandex')) engine = 'Yandex';
        
        enginesMap.set(engine, (enginesMap.get(engine) || 0) + sessions);
      });

      const totalEngineVisits = Array.from(enginesMap.values()).reduce((sum, val) => sum + val, 0);
      const enginesArray: SearchEngine[] = Array.from(enginesMap.entries())
        .map(([engine, visits]) => ({
          engine,
          visits,
          percentage: totalEngineVisits > 0 ? (visits / totalEngineVisits) * 100 : 0,
        }))
        .sort((a, b) => b.visits - a.visits);

      setSearchEngines(enginesArray);

      // Fetch device stats from GA4
      const { data: devicesData, error: devicesError } = await supabase.functions.invoke('fetch-ga4-data', {
        body: {
          startDate: startDateStr,
          endDate: endDate,
          metrics: ['sessions'],
          dimensions: ['deviceCategory', 'sessionDefaultChannelGroup']
        }
      });

      if (devicesError) throw devicesError;

      const organicDevices = devicesData?.rows?.filter((row: any) => 
        row.dimensionValues[1]?.value === 'Organic Search'
      ) || [];

      const devicesMap = new Map<string, number>();
      organicDevices.forEach((row: any) => {
        const device = row.dimensionValues[0]?.value || 'desktop';
        const sessions = parseInt(row.metricValues[0]?.value || '0');
        devicesMap.set(device, (devicesMap.get(device) || 0) + sessions);
      });

      const totalDeviceVisits = Array.from(devicesMap.values()).reduce((sum, val) => sum + val, 0);
      const devicesArray: DeviceStats[] = Array.from(devicesMap.entries())
        .map(([device, visits]) => ({
          device: device.charAt(0).toUpperCase() + device.slice(1),
          visits,
          percentage: totalDeviceVisits > 0 ? (visits / totalDeviceVisits) * 100 : 0,
        }))
        .sort((a, b) => b.visits - a.visits);

      setDeviceStats(devicesArray);

      // Fetch conversions from local database
      const orderStartDate = new Date();
      orderStartDate.setDate(orderStartDate.getDate() - days);
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .gte('created_at', orderStartDate.toISOString());

      if (ordersError) throw ordersError;

      // Process daily conversions
      const dailyConversions = new Map<string, { orders: number, revenue: number }>();
      
      ordersData?.forEach(order => {
        const date = new Date(order.created_at).toLocaleDateString('ro-RO');
        if (!dailyConversions.has(date)) {
          dailyConversions.set(date, { orders: 0, revenue: 0 });
        }
        const dayData = dailyConversions.get(date)!;
        dayData.orders++;
        dayData.revenue += order.total;
      });

      const conversionsArray: ConversionData[] = Array.from(dailyConversions.entries())
        .map(([date, data]) => ({ date, ...data }))
        .sort((a, b) => {
          const [dayA, monthA, yearA] = a.date.split('.').map(Number);
          const [dayB, monthB, yearB] = b.date.split('.').map(Number);
          return new Date(yearA, monthA - 1, dayA).getTime() - new Date(yearB, monthB - 1, dayB).getTime();
        });

      setConversions(conversionsArray);

      // Calculate total stats from GA4 data
      const totalSessions = trafficArray.reduce((sum, item) => sum + item.sessions, 0);
      const totalUsers = trafficArray.reduce((sum, item) => sum + item.users, 0);
      const totalOrders = ordersData?.length || 0;
      const totalRevenue = ordersData?.reduce((sum, order) => sum + order.total, 0) || 0;
      const conversionRate = totalSessions > 0 ? (totalOrders / totalSessions) * 100 : 0;

      setTotalStats({
        organicSessions: totalSessions,
        organicUsers: totalUsers,
        conversions: totalOrders,
        revenue: totalRevenue,
        conversionRate,
      });

    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTimeRangeLabel = (range: TimeRange) => {
    const labels = {
      '1day': 'Ultimele 24 ore',
      '7days': 'Ultimele 7 zile',
      '30days': 'Ultimele 30 zile',
      '90days': 'Ultimele 90 zile',
    };
    return labels[range];
  };

  const getDeviceIcon = (device: string) => {
    const lower = device.toLowerCase();
    if (lower.includes('mobile')) return <Smartphone className="h-4 w-4" />;
    if (lower.includes('tablet')) return <Tablet className="h-4 w-4" />;
    return <Monitor className="h-4 w-4" />;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Google Analytics - Trafic Organic</h2>
        <Select value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue>{getTimeRangeLabel(timeRange)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1day">Ultimele 24 ore</SelectItem>
            <SelectItem value="7days">Ultimele 7 zile</SelectItem>
            <SelectItem value="30days">Ultimele 30 zile</SelectItem>
            <SelectItem value="90days">Ultimele 90 zile</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sesiuni Organice</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.organicSessions}</div>
            <p className="text-xs text-muted-foreground">din motoare de căutare</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilizatori Unici</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.organicUsers}</div>
            <p className="text-xs text-muted-foreground">vizitatori din organic</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversii</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.conversions}</div>
            <p className="text-xs text-muted-foreground">comenzi finalizate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Venit Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.revenue.toFixed(0)} RON</div>
            <p className="text-xs text-muted-foreground">din conversii</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata Conversie</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.conversionRate.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">din sesiuni organice</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Organic Traffic Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Trafic Organic în Timp</CardTitle>
            <CardDescription>Sesiuni și utilizatori unici din motoare de căutare</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={organicTraffic}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sessions" stroke="#3b82f6" name="Sesiuni" />
                <Line type="monotone" dataKey="users" stroke="#10b981" name="Utilizatori" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversions Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Conversii în Timp</CardTitle>
            <CardDescription>Comenzi și venit generat</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conversions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#f59e0b" name="Comenzi" />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" name="Venit (RON)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Search Engines */}
        <Card>
          <CardHeader>
            <CardTitle>Motoare de Căutare</CardTitle>
            <CardDescription>Distribuția traficului organic pe surse</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={searchEngines}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.engine}: ${entry.percentage.toFixed(1)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="visits"
                >
                  {searchEngines.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Dispozitive</CardTitle>
            <CardDescription>Tipul de dispozitiv pentru trafic organic</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deviceStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="device" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visits" fill="#3b82f6" name="Vizite">
                  {deviceStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Landing Pages Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Landing Pages din Organic</CardTitle>
          <CardDescription>Cele mai vizitate pagini din motoare de căutare</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {landingPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-2">
                <div className="flex-1">
                  <p className="font-medium text-sm">{page.page}</p>
                  <p className="text-xs text-muted-foreground">{page.sessions} sesiuni unice</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{page.visits}</p>
                  <p className="text-xs text-muted-foreground">vizite</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
