import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, ShoppingCart, MousePointerClick, Search, Smartphone, Monitor, Tablet, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

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
  const [error, setError] = useState<string | null>(null);
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
  const { toast } = useToast();

  useEffect(() => {
    fetchAnalyticsData(timeRange);
  }, [timeRange]);

  const fetchAnalyticsData = async (range: TimeRange) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const daysMap = { '1day': 1, '7days': 7, '30days': 30, '90days': 90 };
      const days = daysMap[range];
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      // Format dates for GA4 API (YYYY-MM-DD)
      const formatDate = (date: Date) => date.toISOString().split('T')[0];

      // Fetch data from GA4 API
      const { data: ga4Data, error: ga4Error } = await supabase.functions.invoke('fetch-ga4-data', {
        body: {
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          metrics: [
            'sessions',
            'totalUsers',
            'screenPageViews',
            'bounceRate',
            'averageSessionDuration',
            'conversions',
            'totalRevenue'
          ],
          dimensions: [
            'date',
            'sessionDefaultChannelGrouping',
            'landingPage',
            'deviceCategory',
            'sessionSource'
          ]
        }
      });

      if (ga4Error) {
        console.error('GA4 API Error:', ga4Error);
        throw new Error('Nu s-au putut prelua datele din Google Analytics. Verifică configurarea API-ului.');
      }

      if (!ga4Data || !ga4Data.rows) {
        console.log('No GA4 data returned');
        setError('Nu există date disponibile pentru perioada selectată.');
        setIsLoading(false);
        return;
      }

      // Process GA4 data
      const rows = ga4Data.rows || [];
      const dimensionHeaders = ga4Data.dimensionHeaders || [];
      const metricHeaders = ga4Data.metricHeaders || [];

      // Create maps for processing
      const dailyTrafficMap = new Map<string, { sessions: number, users: number }>();
      const landingPagesMap = new Map<string, { visits: number, sessions: number }>();
      const searchEnginesMap = new Map<string, number>();
      const deviceStatsMap = new Map<string, number>();
      
      let totalSessions = 0;
      let totalUsers = 0;
      let totalConversions = 0;
      let totalRevenue = 0;

      // Process each row from GA4
      rows.forEach((row: any) => {
        const dimensions = row.dimensionValues || [];
        const metrics = row.metricValues || [];

        const date = dimensions[0]?.value || '';
        const channelGroup = dimensions[1]?.value || '';
        const landingPage = dimensions[2]?.value || '';
        const device = dimensions[3]?.value || '';
        const source = dimensions[4]?.value || '';

        const sessions = parseInt(metrics[0]?.value || '0');
        const users = parseInt(metrics[1]?.value || '0');
        const pageViews = parseInt(metrics[2]?.value || '0');
        const conversions = parseFloat(metrics[5]?.value || '0');
        const revenue = parseFloat(metrics[6]?.value || '0');

        // Filter organic traffic only
        if (channelGroup.toLowerCase().includes('organic')) {
          // Daily traffic
          const formattedDate = date ? `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}` : '';
          if (formattedDate) {
            if (!dailyTrafficMap.has(formattedDate)) {
              dailyTrafficMap.set(formattedDate, { sessions: 0, users: 0 });
            }
            const dayData = dailyTrafficMap.get(formattedDate)!;
            dayData.sessions += sessions;
            dayData.users += users;
          }

          // Landing pages
          if (landingPage && landingPage !== '(not set)') {
            if (!landingPagesMap.has(landingPage)) {
              landingPagesMap.set(landingPage, { visits: 0, sessions: 0 });
            }
            const pageData = landingPagesMap.get(landingPage)!;
            pageData.visits += pageViews;
            pageData.sessions += sessions;
          }

          // Search engines
          if (source && source !== '(not set)') {
            searchEnginesMap.set(source, (searchEnginesMap.get(source) || 0) + sessions);
          }

          // Device stats
          if (device && device !== '(not set)') {
            deviceStatsMap.set(device, (deviceStatsMap.get(device) || 0) + sessions);
          }

          // Totals
          totalSessions += sessions;
          totalUsers += users;
          totalConversions += conversions;
          totalRevenue += revenue;
        }
      });

      // Convert maps to arrays
      const trafficArray: OrganicTrafficData[] = Array.from(dailyTrafficMap.entries())
        .map(([date, data]) => ({
          date,
          sessions: data.sessions,
          users: data.users,
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      const topPages: LandingPage[] = Array.from(landingPagesMap.entries())
        .map(([page, data]) => ({
          page,
          visits: data.visits,
          sessions: data.sessions,
        }))
        .sort((a, b) => b.visits - a.visits)
        .slice(0, 10);

      const totalEngineVisits = Array.from(searchEnginesMap.values()).reduce((sum, val) => sum + val, 0);
      const enginesArray: SearchEngine[] = Array.from(searchEnginesMap.entries())
        .map(([engine, visits]) => ({
          engine: engine.charAt(0).toUpperCase() + engine.slice(1),
          visits,
          percentage: totalEngineVisits > 0 ? (visits / totalEngineVisits) * 100 : 0,
        }))
        .sort((a, b) => b.visits - a.visits);

      const totalDeviceVisits = Array.from(deviceStatsMap.values()).reduce((sum, val) => sum + val, 0);
      const devicesArray: DeviceStats[] = Array.from(deviceStatsMap.entries())
        .map(([device, visits]) => ({
          device: device.charAt(0).toUpperCase() + device.slice(1),
          visits,
          percentage: totalDeviceVisits > 0 ? (visits / totalDeviceVisits) * 100 : 0,
        }))
        .sort((a, b) => b.visits - a.visits);

      // Fetch local orders for conversions chart
      const { data: ordersData } = await supabase
        .from('orders')
        .select('*')
        .gte('created_at', startDate.toISOString());

      const dailyConversions = new Map<string, { orders: number, revenue: number }>();
      ordersData?.forEach(order => {
        const date = new Date(order.created_at).toISOString().split('T')[0];
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

      // Update state
      setOrganicTraffic(trafficArray);
      setLandingPages(topPages);
      setSearchEngines(enginesArray);
      setDeviceStats(devicesArray);
      setConversions(conversionsArray);
      setTotalStats({
        organicSessions: totalSessions,
        organicUsers: totalUsers,
        conversions: totalConversions,
        revenue: totalRevenue,
        conversionRate: totalSessions > 0 ? (totalConversions / totalSessions) * 100 : 0,
      });

      toast({
        title: "Date actualizate",
        description: "Datele din Google Analytics au fost preluate cu succes.",
      });

    } catch (error: any) {
      console.error('Error fetching analytics:', error);
      setError(error.message || 'A apărut o eroare la preluarea datelor.');
      toast({
        title: "Eroare",
        description: error.message || 'Nu s-au putut prelua datele din Google Analytics.',
        variant: "destructive",
      });
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-32" />)}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Eroare la încărcarea datelor</AlertTitle>
        <AlertDescription>
          {error}
          <br />
          <br />
          Verifică dacă ai configurat corect credențialele GA4 în Supabase:
          <ul className="list-disc list-inside mt-2">
            <li>GA4_PROPERTY_ID</li>
            <li>GA4_SERVICE_ACCOUNT_KEY</li>
          </ul>
          <br />
          Consultă fișierul <code className="bg-muted px-1 py-0.5 rounded">GA4_SETUP_INSTRUCTIONS.md</code> pentru instrucțiuni detaliate.
        </AlertDescription>
      </Alert>
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
