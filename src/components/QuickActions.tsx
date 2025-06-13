
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Users, Calendar, Bell, Database, Award, DollarSign, Settings, BarChart3 } from 'lucide-react';

interface QuickActionsProps {
  userRole: 'super_admin' | 'admin' | 'manager' | 'waiter';
}

export default function QuickActions({ userRole }: QuickActionsProps) {
  const handleAction = (actionName: string, description: string) => {
    toast({
      title: `${actionName} Activated`,
      description: `${description} - Feature coming soon!`,
    });
  };

  const getActionsForRole = () => {
    // Base actions for all roles
    const baseActions = [
      {
        title: 'View Orders',
        description: 'Check recent orders and bookings',
        icon: Calendar,
        action: () => handleAction('Order Management', 'Redirecting to orders dashboard'),
        variant: 'default' as const
      }
    ];

    // Super Admin - Full Global Access
    if (userRole === 'super_admin') {
      return [
        ...baseActions,
        {
          title: 'Global Analytics',
          description: 'View cross-brand performance metrics',
          icon: BarChart3,
          action: () => handleAction('Global Analytics', 'Opening comprehensive analytics dashboard'),
          variant: 'secondary' as const
        },
        {
          title: 'System Configuration',
          description: 'Configure global system settings',
          icon: Settings,
          action: () => handleAction('System Config', 'Accessing global configuration panel'),
          variant: 'outline' as const
        },
        {
          title: 'Brand Management',
          description: 'Manage all brands and locations',
          icon: Database,
          action: () => handleAction('Brand Management', 'Opening brand management console'),
          variant: 'outline' as const
        },
        {
          title: 'User Administration',
          description: 'Manage system users and permissions',
          icon: Users,
          action: () => handleAction('User Admin', 'Accessing user administration panel'),
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
          icon: BarChart3,
          action: () => handleAction('Brand Analytics', 'Loading brand-specific analytics'),
          variant: 'secondary' as const
        },
        {
          title: 'Staff Management',
          description: 'Add and manage brand staff',
          icon: Users,
          action: () => handleAction('Staff Management', 'Opening staff management interface'),
          variant: 'outline' as const
        },
        {
          title: 'Loyalty Configuration',
          description: 'Configure brand loyalty rules and rewards',
          icon: Award,
          action: () => handleAction('Loyalty Config', 'Accessing loyalty program settings'),
          variant: 'outline' as const
        },
        {
          title: 'Campaign Manager',
          description: 'Create and manage marketing campaigns',
          icon: Bell,
          action: () => handleAction('Campaign Manager', 'Opening campaign creation wizard'),
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
          description: 'View and manage customer profiles',
          icon: Users,
          action: () => handleAction('Customer Management', 'Opening customer database'),
          variant: 'secondary' as const
        },
        {
          title: 'Campaign Creator',
          description: 'Create promotional campaigns',
          icon: Bell,
          action: () => handleAction('Campaign Creator', 'Starting campaign creation process'),
          variant: 'outline' as const
        },
        {
          title: 'Points Management',
          description: 'Handle customer point adjustments',
          icon: Award,
          action: () => handleAction('Points Management', 'Opening points adjustment interface'),
          variant: 'outline' as const
        },
        {
          title: 'Reports & Analytics',
          description: 'Generate customer and sales reports',
          icon: BarChart3,
          action: () => handleAction('Reports', 'Generating analytics reports'),
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
          action: () => handleAction('Redemption Process', 'Opening redemption interface'),
          variant: 'secondary' as const
        },
        {
          title: 'Customer Lookup',
          description: 'Find customer loyalty information',
          icon: Users,
          action: () => handleAction('Customer Lookup', 'Opening customer search'),
          variant: 'outline' as const
        },
        {
          title: 'Wallet Top-up',
          description: 'Request customer wallet top-up',
          icon: DollarSign,
          action: () => handleAction('Wallet Top-up', 'Processing top-up request'),
          variant: 'outline' as const
        },
        {
          title: 'Order Processing',
          description: 'Process current table orders',
          icon: Calendar,
          action: () => handleAction('Order Processing', 'Opening order management system'),
          variant: 'outline' as const
        }
      ];
    }

    return baseActions;
  };

  const actions = getActionsForRole();

  return (
    <Card className="glass-card border-glass animate-fade-in">
      <CardHeader>
        <CardTitle className="text-glass flex items-center gap-2">
          <Award className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant={action.variant}
                className="justify-start h-auto p-4 flex-col items-start hover:scale-[1.02] transition-all duration-200"
                onClick={action.action}
              >
                <div className="flex items-center gap-2 mb-1 w-full">
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="font-medium text-left">{action.title}</span>
                </div>
                <span className="text-xs text-muted-foreground text-left w-full">
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
