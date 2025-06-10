
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
    tier: 'Platinum',
    growth: '+23%'
  },
  {
    id: 2,
    name: 'Michael Chen',
    points: 7890,
    spent: 'KES 42,100',
    tier: 'Platinum',
    growth: '+18%'
  },
  {
    id: 3,
    name: 'Emma Davis',
    points: 6750,
    spent: 'KES 38,900',
    tier: 'Diamond',
    growth: '+31%'
  },
  {
    id: 4,
    name: 'David Wilson',
    points: 5620,
    spent: 'KES 32,400',
    tier: 'Diamond',
    growth: '+12%'
  },
  {
    id: 5,
    name: 'Lisa Brown',
    points: 4890,
    spent: 'KES 28,700',
    tier: 'Elite',
    growth: '+25%'
  }
];

const getTierColor = (tier: string) => {
  switch (tier) {
    case 'Platinum':
      return 'liquid-glass-card bg-gradient-to-r from-slate-400/20 to-slate-500/20 text-slate-800 border-slate-400/30';
    case 'Diamond':
      return 'liquid-glass-card bg-gradient-to-r from-slate-300/20 to-slate-400/20 text-slate-700 border-slate-300/30';
    case 'Elite':
      return 'liquid-glass-card bg-gradient-to-r from-slate-500/20 to-slate-600/20 text-slate-700 border-slate-500/30';
    default:
      return 'liquid-glass-card bg-gradient-to-r from-slate-400/20 to-slate-500/20 text-slate-700 border-slate-400/30';
  }
};

export default function TopCustomers() {
  return (
    <Card className="bg-transparent border-0 shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-slate-600/80" />
          <span className="glass-text text-lg">
            Top Loyalty Customers
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topCustomers.map((customer, index) => (
            <div key={customer.id} className="liquid-glass-card p-4 glass-refraction">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full liquid-glass-card bg-gradient-to-r from-slate-400/30 to-slate-500/30 text-slate-600/90 font-bold text-sm border-slate-400/30">
                      #{index + 1}
                    </div>
                    <Avatar className="h-10 w-10 liquid-glass-card border-white/30">
                      <AvatarFallback className="text-xs bg-gradient-to-br from-slate-500/80 to-slate-600/80 text-white backdrop-blur-sm">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700/90">{customer.name}</p>
                    <p className="text-xs text-slate-500/80">
                      {customer.points.toLocaleString()} points • {customer.spent}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 liquid-glass-card bg-slate-400/20 text-slate-700 px-3 py-1 rounded-full border-slate-400/30">
                    <TrendingUp className="h-3 w-3" />
                    <span className="text-xs font-medium">{customer.growth}</span>
                  </div>
                  <Badge variant="secondary" className={getTierColor(customer.tier)}>
                    {customer.tier}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
