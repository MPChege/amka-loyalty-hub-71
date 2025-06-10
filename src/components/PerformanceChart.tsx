
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
    <Card className="bg-transparent border-0 shadow-none">
      <CardHeader>
        <CardTitle className="glass-text text-lg">
          Performance Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(226, 232, 240, 0.3)" />
            <XAxis dataKey="name" stroke="rgba(100, 116, 139, 0.7)" />
            <YAxis stroke="rgba(100, 116, 139, 0.7)" />
            <Tooltip 
              contentStyle={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                color: 'rgba(15, 23, 42, 0.9)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="rgba(99, 102, 241, 0.8)" 
              strokeWidth={3}
              name="Revenue (KES)"
              dot={{ fill: 'rgba(99, 102, 241, 0.8)', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, fill: 'rgba(79, 70, 229, 0.9)', stroke: 'rgba(255, 255, 255, 0.8)', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="customers" 
              stroke="rgba(139, 92, 246, 0.8)" 
              strokeWidth={3}
              name="New Customers"
              dot={{ fill: 'rgba(139, 92, 246, 0.8)', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, fill: 'rgba(124, 58, 237, 0.9)', stroke: 'rgba(255, 255, 255, 0.8)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
