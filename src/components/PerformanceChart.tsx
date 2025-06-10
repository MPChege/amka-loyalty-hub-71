
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, customers: 240 },
  { name: 'Feb', revenue: 3000, customers: 198 },
  { name: 'Mar', revenue: 5000, customers: 290 },
  { name: 'Apr', revenue: 4500, customers: 267 },
  { name: 'May', revenue: 6000, customers: 345 },
  { name: 'Jun', revenue: 5500, customers: 312 },
];

export default function PerformanceChart() {
  return (
    <Card className="glass-chart border-glass">
      <CardHeader>
        <CardTitle className="text-glass">Performance Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: 'hsl(var(--foreground))'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="hsl(var(--foreground))" 
              strokeWidth={2}
              name="Revenue (KES)"
              dot={{ fill: 'hsl(var(--foreground))', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="customers" 
              stroke="hsl(var(--muted-foreground))" 
              strokeWidth={2}
              name="New Customers"
              dot={{ fill: 'hsl(var(--muted-foreground))', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
