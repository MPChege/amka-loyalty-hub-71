
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
      return 'bg-yellow-100 text-yellow-800';
    case 'Silver':
      return 'bg-gray-100 text-gray-800';
    case 'Bronze':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function TopCustomers() {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-yellow-600" />
          Top Loyalty Customers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topCustomers.map((customer, index) => (
            <div key={customer.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-muted-foreground w-6">
                    #{index + 1}
                  </span>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <p className="text-sm font-medium">{customer.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {customer.points.toLocaleString()} points • {customer.spent}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-green-600">
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
