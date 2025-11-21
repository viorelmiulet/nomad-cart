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
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      // Fetch organic traffic (sessions with referrer from search engines)
      const { data: analyticsData, error: analyticsError } = await supabase
        .from('site_analytics')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .not('referrer', 'is', null);

      if (analyticsError) throw analyticsError;

      // Filter organic traffic
      const organicData = analyticsData?.filter(item => 
        item.referrer && /google|bing|yahoo|duckduckgo|yandex|baidu/i.test(item.referrer)
      ) || [];

      // Process daily organic traffic
      const dailyTraffic = new Map<string, { sessions: Set<string>, users: Set<string> }>();
      
      organicData.forEach(item => {
        const date = new Date(item.created_at).toLocaleDateString('ro-RO');
        if (!dailyTraffic.has(date)) {
          dailyTraffic.set(date, { sessions: new Set(), users: new Set() });
        }
        const dayData = dailyTraffic.get(date)!;
        if (item.session_id) dayData.sessions.add(item.session_id);
        if (item.user_id) dayData.users.add(item.user_id);
      });

      const trafficArray: OrganicTrafficData[] = Array.from(dailyTraffic.entries())
        .map(([date, data]) => ({
          date,
          sessions: data.sessions.size,
          users: data.users.size,
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      setOrganicTraffic(trafficArray);

      // Calculate landing pages
      const pagesMap = new Map<string, { visits: number, sessions: Set<string> }>();
      organicData.forEach(item => {
        if (!pagesMap.has(item.page_path)) {
          pagesMap.set(item.page_path, { visits: 0, sessions: new Set() });
        }
        const pageData = pagesMap.get(item.page_path)!;
        pageData.visits++;
        if (item.session_id) pageData.sessions.add(item.session_id);
      });

      const topPages: LandingPage[] = Array.from(pagesMap.entries())
        .map(([page, data]) => ({
          page,
          visits: data.visits,
          sessions: data.sessions.size,
        }))
        .sort((a, b) => b.visits - a.visits)
        .slice(0, 10);

      setLandingPages(topPages);

      // Calculate search engines
      const enginesMap = new Map<string, number>();
      organicData.forEach(item => {
        if (item.referrer) {
          const url = new URL(item.referrer);
          const hostname = url.hostname.toLowerCase();
          let engine = 'Other';
          
          if (hostname.includes('google')) engine = 'Google';
          else if (hostname.includes('bing')) engine = 'Bing';
          else if (hostname.includes('yahoo')) engine = 'Yahoo';
          else if (hostname.includes('duckduckgo')) engine = 'DuckDuckGo';
          else if (hostname.includes('yandex')) engine = 'Yandex';
          
          enginesMap.set(engine, (enginesMap.get(engine) || 0) + 1);
        }
      });

      const totalEngineVisits = Array.from(enginesMap.values()).reduce((sum, val) => sum + val, 0);
      const enginesArray: SearchEngine[] = Array.from(enginesMap.entries())
        .map(([engine, visits]) => ({
          engine,
          visits,
          percentage: (visits / totalEngineVisits) * 100,
        }))
        .sort((a, b) => b.visits - a.visits);

      setSearchEngines(enginesArray);

      // Calculate device stats
      const devicesMap = new Map<string, number>();
      organicData.forEach(item => {
        const device = item.device_type || 'desktop';
        devicesMap.set(device, (devicesMap.get(device) || 0) + 1);
      });

      const totalDeviceVisits = Array.from(devicesMap.values()).reduce((sum, val) => sum + val, 0);
      const devicesArray: DeviceStats[] = Array.from(devicesMap.entries())
        .map(([device, visits]) => ({
          device: device.charAt(0).toUpperCase() + device.slice(1),
          visits,
          percentage: (visits / totalDeviceVisits) * 100,
        }))
        .sort((a, b) => b.visits - a.visits);

      setDeviceStats(devicesArray);

      // Fetch conversions (orders)
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .gte('created_at', startDate.toISOString());

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
        .map(([date, data]) => ({
          date,
          orders: data.orders,
          revenue: data.revenue,
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      setConversions(conversionsArray);

      // Calculate total stats
      const uniqueSessions = new Set(organicData.map(item => item.session_id).filter(Boolean));
      const uniqueUsers = new Set(organicData.map(item => item.user_id).filter(Boolean));
      const totalOrders = ordersData?.length || 0;
      const totalRevenue = ordersData?.reduce((sum, order) => sum + order.total, 0) || 0;
      const conversionRate = uniqueSessions.size > 0 ? (totalOrders / uniqueSessions.size) * 100 : 0;

      setTotalStats({
        organicSessions: uniqueSessions.size,
        organicUsers: uniqueUsers.size,
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
