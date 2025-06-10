
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Crown, TrendingUp } from 'lucide-react';

const topCustomers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    points: 8540,
    spent: 'KES 45,200',
    tier: 'Gold',
    growth: '+23%'
  },
  {
    id: 2,
    name: 'Michael Chen',
    points: 7890,
    spent: 'KES 42,100',
    tier: 'Gold',
    growth: '+18%'
  },
  {
    id: 3,
    name: 'Emma Davis',
    points: 6750,
    spent: 'KES 38,900',
    tier: 'Silver',
    growth: '+31%'
  },
  {
    id: 4,
    name: 'David Wilson',
    points: 5620,
    spent: 'KES 32,400',
    tier: 'Silver',
    growth: '+12%'
  },
  {
    id: 5,
    name: 'Lisa Brown',
    points: 4890,
    spent: 'KES 28,700',
    tier: 'Bronze',
    growth: '+25%'
  }
];

const getTierColor = (tier: string) => {
  switch (tier) {
    case 'Gold':
      return 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200';
    case 'Silver':
      return 'bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 border border-slate-200';
    case 'Bronze':
      return 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 border border-orange-200';
    default:
      return 'bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 border border-slate-200';
  }
};

export default function TopCustomers() {
  return (
    <Card className="glass-effect hover:shadow-2xl transition-all duration-300 border-purple-200/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-amber-600" />
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Top Loyalty Customers
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topCustomers.map((customer, index) => (
            <div key={customer.id} className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-white/80 to-slate-50/80 backdrop-blur-sm border border-slate-200/50 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 font-bold text-sm">
                    #{index + 1}
                  </div>
                  <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                    <AvatarFallback className="text-xs bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">{customer.name}</p>
                  <p className="text-xs text-slate-500">
                    {customer.points.toLocaleString()} points • {customer.spent}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-xs font-medium">{customer.growth}</span>
                </div>
                <Badge variant="secondary" className={getTierColor(customer.tier)}>
                  {customer.tier}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
