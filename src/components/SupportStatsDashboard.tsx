import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Clock, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import { format, subDays, startOfDay } from "date-fns";
import { ro } from "date-fns/locale";

export function SupportStatsDashboard() {
  const { data: messages, isLoading } = useQuery({
    queryKey: ['support-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('support_messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <div className="text-center py-8">Se încarcă statisticile...</div>;
  }

  // Calculate statistics
  const totalMessages = messages?.length || 0;
  const pendingMessages = messages?.filter(m => m.status === 'pending').length || 0;
  const resolvedMessages = messages?.filter(m => m.status === 'resolved').length || 0;

  // Calculate average response time (in hours)
  const messagesWithResponse = messages?.filter(m => 
    m.status === 'resolved' && m.response
  ) || [];
  
  const avgResponseTime = messagesWithResponse.length > 0
    ? messagesWithResponse.reduce((acc, msg) => {
        const created = new Date(msg.created_at).getTime();
        const updated = new Date(msg.updated_at).getTime();
        return acc + (updated - created);
      }, 0) / messagesWithResponse.length / (1000 * 60 * 60) // Convert to hours
    : 0;

  // Messages per day (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    return startOfDay(date);
  }).reverse();

  const messagesPerDay = last7Days.map(day => {
    const dayMessages = messages?.filter(m => {
      const msgDate = startOfDay(new Date(m.created_at));
      return msgDate.getTime() === day.getTime();
    }).length || 0;

    return {
      date: format(day, 'dd MMM', { locale: ro }),
      mesaje: dayMessages
    };
  });

  // Status distribution
  const statusData = [
    { name: 'În așteptare', value: pendingMessages, color: 'hsl(var(--destructive))' },
    { name: 'Rezolvate', value: resolvedMessages, color: 'hsl(var(--primary))' }
  ];

  return (
    <div className="space-y-6">
      {/* Key metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mesaje</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMessages}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">În Așteptare</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{pendingMessages}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rezolvate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{resolvedMessages}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Timp Mediu Răspuns</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {avgResponseTime < 1 
                ? `${Math.round(avgResponseTime * 60)}m`
                : `${avgResponseTime.toFixed(1)}h`
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Mesaje pe zi (Ultimele 7 zile)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={messagesPerDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="mesaje" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuție pe Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
