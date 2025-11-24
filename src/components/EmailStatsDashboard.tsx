import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MousePointer, Star, TrendingUp } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface EmailStats {
  totalEmails: number;
  totalOpens: number;
  totalClicks: number;
  totalFeedback: number;
  openRate: number;
  clickRate: number;
  averageRating: number;
  emailsByType: { type: string; count: number }[];
  feedbackData: { rating: number; count: number }[];
}

export const EmailStatsDashboard = () => {
  const { data: emailStats, isLoading } = useQuery({
    queryKey: ['email-stats'],
    queryFn: async (): Promise<EmailStats> => {
      // Fetch email history
      const { data: emails, error: emailError } = await supabase
        .from('email_history')
        .select('*');

      if (emailError) throw emailError;

      // Fetch opens
      const { data: opens, error: opensError } = await supabase
        .from('email_opens')
        .select('*');

      if (opensError) throw opensError;

      // Fetch clicks
      const { data: clicks, error: clicksError } = await supabase
        .from('email_clicks')
        .select('*');

      if (clicksError) throw clicksError;

      // Fetch feedback
      const { data: feedback, error: feedbackError } = await supabase
        .from('email_feedback')
        .select('*');

      if (feedbackError) throw feedbackError;

      const totalEmails = emails?.length || 0;
      const totalOpens = opens?.length || 0;
      const totalClicks = clicks?.length || 0;
      const totalFeedback = feedback?.length || 0;

      const openRate = totalEmails > 0 ? (totalOpens / totalEmails) * 100 : 0;
      const clickRate = totalEmails > 0 ? (totalClicks / totalEmails) * 100 : 0;

      const averageRating = feedback && feedback.length > 0
        ? feedback.reduce((sum, f) => sum + (f.rating || 0), 0) / feedback.length
        : 0;

      // Group emails by type
      const emailsByType = emails?.reduce((acc: any[], email) => {
        const existing = acc.find(item => item.type === email.email_type);
        if (existing) {
          existing.count++;
        } else {
          acc.push({ type: email.email_type, count: 1 });
        }
        return acc;
      }, []) || [];

      // Group feedback by rating
      const feedbackData = [1, 2, 3, 4, 5].map(rating => ({
        rating,
        count: feedback?.filter(f => f.rating === rating).length || 0
      }));

      return {
        totalEmails,
        totalOpens,
        totalClicks,
        totalFeedback,
        openRate,
        clickRate,
        averageRating,
        emailsByType,
        feedbackData
      };
    }
  });

  if (isLoading) {
    return <div className="p-8 text-center">Se încarcă statisticile...</div>;
  }

  if (!emailStats) {
    return <div className="p-8 text-center">Nu există date disponibile</div>;
  }

  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email-uri Trimise</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emailStats.totalEmails}</div>
            <p className="text-xs text-muted-foreground">Total email-uri</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rată Deschidere</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emailStats.openRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">{emailStats.totalOpens} deschideri</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rată Click-uri</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emailStats.clickRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">{emailStats.totalClicks} click-uri</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating Mediu</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emailStats.averageRating.toFixed(1)} ⭐</div>
            <p className="text-xs text-muted-foreground">{emailStats.totalFeedback} evaluări</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Email-uri pe Tip</CardTitle>
            <CardDescription>Distribuția email-urilor trimise</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={emailStats.emailsByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, percent }) => `${type}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {emailStats.emailsByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuție Feedback</CardTitle>
            <CardDescription>Evaluări primite de la clienți</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={emailStats.feedbackData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" label={{ value: 'Rating (stele)', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Număr evaluări', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#667eea" name="Număr evaluări" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
