
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, Bell, Database, Award, DollarSign } from 'lucide-react';

interface QuickActionsProps {
  userRole: 'super_admin' | 'admin' | 'manager' | 'waiter';
}

export default function QuickActions({ userRole }: QuickActionsProps) {
  const getActionsForRole = () => {
    // Base actions for all roles
    const baseActions = [
      {
        title: 'View Orders',
        description: 'Check recent orders and bookings',
        icon: Calendar,
        action: () => console.log('View orders'),
        variant: 'default' as const
      }
    ];

    // Super Admin - Full Global Access
    if (userRole === 'super_admin') {
      return [
        ...baseActions,
        {
          title: 'Manage All Brands',
          description: 'Switch between and manage all brands',
          icon: Database,
          action: () => console.log('Manage brands'),
          variant: 'secondary' as const
        },
        {
          title: 'Global Analytics',
          description: 'View cross-brand performance',
          icon: Bell,
          action: () => console.log('Global analytics'),
          variant: 'outline' as const
        },
        {
          title: 'System Configuration',
          description: 'Configure global system settings',
          icon: Users,
          action: () => console.log('System config'),
          variant: 'outline' as const
        }
      ];
    }

    // Brand Admin - Full Brand Access
    if (userRole === 'admin') {
      return [
        ...baseActions,
        {
          title: 'Brand Analytics',
          description: 'View detailed brand performance',
          icon: Database,
          action: () => console.log('Brand analytics'),
          variant: 'secondary' as const
        },
        {
          title: 'Manage Staff',
          description: 'Add and manage brand staff',
          icon: Users,
          action: () => console.log('Manage staff'),
          variant: 'outline' as const
        },
        {
          title: 'Loyalty Settings',
          description: 'Configure brand loyalty rules',
          icon: Award,
          action: () => console.log('Loyalty settings'),
          variant: 'outline' as const
        }
      ];
    }

    // Manager - Limited Brand Access
    if (userRole === 'manager') {
      return [
        ...baseActions,
        {
          title: 'Customer Management',
          description: 'View and manage customers',
          icon: Users,
          action: () => console.log('Customer management'),
          variant: 'secondary' as const
        },
        {
          title: 'Campaign Manager',
          description: 'Create and manage campaigns',
          icon: Bell,
          action: () => console.log('Campaign manager'),
          variant: 'outline' as const
        },
        {
          title: 'Points Adjustment',
          description: 'Approve customer point adjustments',
          icon: Award,
          action: () => console.log('Points adjustment'),
          variant: 'outline' as const
        }
      ];
    }

    // Waiter - Order Management Only
    if (userRole === 'waiter') {
      return [
        ...baseActions,
        {
          title: 'Process Redemption',
          description: 'Handle customer point redemptions',
          icon: Award,
          action: () => console.log('Process redemption'),
          variant: 'secondary' as const
        },
        {
          title: 'Customer Lookup',
          description: 'Find customer wallet balance',
          icon: Users,
          action: () => console.log('Customer lookup'),
          variant: 'outline' as const
        },
        {
          title: 'Top-up Request',
          description: 'Request wallet top-up approval',
          icon: DollarSign,
          action: () => console.log('Top-up request'),
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
