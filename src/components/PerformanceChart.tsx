
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
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Performance Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              name="Revenue (KES)"
            />
            <Line 
              type="monotone" 
              dataKey="customers" 
              stroke="hsl(var(--destructive))" 
              strokeWidth={2}
              name="New Customers"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
