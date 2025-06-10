
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, Bell, Database } from 'lucide-react';

interface QuickActionsProps {
  userRole: 'admin' | 'manager' | 'waiter';
}

export default function QuickActions({ userRole }: QuickActionsProps) {
  const getActionsForRole = () => {
    const baseActions = [
      {
        title: 'View Orders',
        description: 'Check recent orders and bookings',
        icon: Calendar,
        action: () => console.log('View orders'),
        variant: 'default' as const
      }
    ];

    if (userRole === 'admin' || userRole === 'manager') {
      return [
        ...baseActions,
        {
          title: 'Add User',
          description: 'Register new customer',
          icon: Users,
          action: () => console.log('Add user'),
          variant: 'secondary' as const
        },
        {
          title: 'Create Campaign',
          description: 'Launch new loyalty campaign',
          icon: Bell,
          action: () => console.log('Create campaign'),
          variant: 'outline' as const
        },
        {
          title: 'Points Adjustment',
          description: 'Manually adjust user points',
          icon: Database,
          action: () => console.log('Adjust points'),
          variant: 'outline' as const
        }
      ];
    }

    return baseActions;
  };

  const actions = getActionsForRole();

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant={action.variant}
                className="justify-start h-auto p-4 flex-col items-start"
                onClick={action.action}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{action.title}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {action.description}
                </span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
