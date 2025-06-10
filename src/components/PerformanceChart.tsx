
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
    <Card className="glass-effect hover:shadow-2xl transition-all duration-300 border-indigo-200/50">
      <CardHeader>
        <CardTitle className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Performance Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#6366f1" 
              strokeWidth={3}
              name="Revenue (KES)"
              dot={{ fill: '#6366f1', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, fill: '#4f46e5' }}
            />
            <Line 
              type="monotone" 
              dataKey="customers" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              name="New Customers"
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, fill: '#7c3aed' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
