
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Sidebar from '@/components/Sidebar';
import BrandHeader from '@/components/BrandHeader';
import DashboardCard from '@/components/DashboardCard';
import QuickActions from '@/components/QuickActions';
import RecentActivity from '@/components/RecentActivity';
import PerformanceChart from '@/components/PerformanceChart';
import TopCustomers from '@/components/TopCustomers';
import { 
  Users, 
  Calendar, 
  Database, 
  Activity, 
  TrendingUp, 
  DollarSign,
  Award,
  Target
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [currentBrand, setCurrentBrand] = useState(
    user?.brand === 'all' ? 'amka' : user?.brand || 'amka'
  );

  if (!user) return null;

  const brandNames = {
    amka: 'Café Amka',
    mawimbi: 'Mawimbi Restaurant',
    kasa: 'Kasa Resort'
  };

  const canSwitchBrands = user.role === 'super_admin';
  const currentBrandName = brandNames[currentBrand as keyof typeof brandNames];

  // Dynamic stats based on user role and brand
  const getDashboardStats = () => {
    const baseStats = {
      amka: {
        users: '1,247',
        orders: '34',
        points: '8,942',
        campaigns: '5',
        revenue: 'KES 89,400',
        growth: '+15%'
      },
      mawimbi: {
        users: '987',
        orders: '28',
        points: '6,234',
        campaigns: '4',
        revenue: 'KES 67,200',
        growth: '+22%'
      },
      kasa: {
        users: '613',
        orders: '15',
        points: '4,466',
        campaigns: '3',
        revenue: 'KES 145,600',
        growth: '+8%'
      }
    };

    const brandData = baseStats[currentBrand as keyof typeof baseStats];
    
    if (user.role === 'super_admin') {
      const totalUsers = Object.values(baseStats).reduce((sum, brand) => 
        sum + parseInt(brand.users.replace(',', '')), 0
      );
      const totalOrders = Object.values(baseStats).reduce((sum, brand) => 
        sum + parseInt(brand.orders), 0
      );
      const totalPoints = Object.values(baseStats).reduce((sum, brand) => 
        sum + parseInt(brand.points.replace(',', '')), 0
      );
      
      return [
        {
          title: 'Total Users (All Brands)',
          value: totalUsers.toLocaleString(),
          icon: Users,
          description: 'Active loyalty members across all brands',
          trend: { value: 18, isPositive: true }
        },
        {
          title: 'Today\'s Orders (All)',
          value: totalOrders.toString(),
          icon: Calendar,
          description: 'Orders placed today across all brands',
          trend: { value: 12, isPositive: true }
        },
        {
          title: 'Total Points Pool',
          value: totalPoints.toLocaleString(),
          icon: Database,
          description: 'Points redeemed this month (all brands)',
          trend: { value: 5, isPositive: true }
        },
        {
          title: 'Global Revenue',
          value: 'KES 302,200',
          icon: DollarSign,
          description: 'Total revenue this month',
          trend: { value: 15, isPositive: true }
        }
      ];
    }

    return [
      {
        title: 'Active Users',
        value: brandData.users,
        icon: Users,
        description: 'Active loyalty members',
        trend: { value: 12, isPositive: true }
      },
      {
        title: 'Today\'s Orders',
        value: brandData.orders,
        icon: Calendar,
        description: 'Orders placed today',
        trend: { value: 8, isPositive: true }
      },
      {
        title: 'Points Redeemed',
        value: brandData.points,
        icon: Award,
        description: 'Points redeemed this month',
        trend: { value: -3, isPositive: false }
      },
      {
        title: 'Monthly Revenue',
        value: brandData.revenue,
        icon: TrendingUp,
        description: 'Revenue this month',
        trend: { value: parseInt(brandData.growth.replace('%', '').replace('+', '')), isPositive: true }
      }
    ];
  };

  const dashboardStats = getDashboardStats();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        userRole={user.role} 
        currentBrand={currentBrand}
        onBrandChange={canSwitchBrands ? setCurrentBrand : () => {}}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <BrandHeader 
          brandName={currentBrandName}
          userRole={user.firstName + ' ' + user.lastName}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="glass-card p-6 border-glass">
              <h1 className="text-3xl font-bold text-glass mb-2">
                Welcome back, {user.firstName}! 👋
              </h1>
              <p className="text-muted-foreground">
                {user.role === 'super_admin' 
                  ? 'Manage your global loyalty program across all brands from this central dashboard.'
                  : user.role === 'admin'
                  ? `Oversee ${currentBrandName}'s loyalty program operations and analytics.`
                  : user.role === 'manager'
                  ? `Monitor ${currentBrandName}'s daily operations and customer engagement.`
                  : `Handle customer orders and loyalty redemptions at ${currentBrandName}.`
                }
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardStats.map((stat, index) => (
                <DashboardCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  description={stat.description}
                  trend={stat.trend}
                  className="animate-fade-in glass-float"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </div>

            {/* Quick Actions and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <QuickActions userRole={user.role} />
              <RecentActivity />
            </div>

            {/* Charts and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PerformanceChart />
              <TopCustomers />
            </div>

            {/* Brand-specific insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 glass-card p-6 border-glass">
                <h3 className="text-xl font-semibold mb-4 text-glass flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  {user.role === 'super_admin' ? 'Global' : currentBrandName} Performance Insights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="glass-panel p-4 border-glass/50">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Peak Hours</h4>
                    <p className="text-2xl font-bold text-glass">2-4 PM</p>
                    <p className="text-xs text-muted-foreground">Highest customer activity</p>
                  </div>
                  <div className="glass-panel p-4 border-glass/50">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Avg. Points/Visit</h4>
                    <p className="text-2xl font-bold text-glass">125</p>
                    <p className="text-xs text-muted-foreground">Points earned per transaction</p>
                  </div>
                  <div className="glass-panel p-4 border-glass/50">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Customer Retention</h4>
                    <p className="text-2xl font-bold text-glass">87%</p>
                    <p className="text-xs text-muted-foreground">Monthly retention rate</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6 border-glass">
                <h3 className="text-lg font-semibold mb-4 text-glass flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Loyalty Status
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Points Pool</span>
                    <span className="font-bold text-glass">847,293</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">This Month</span>
                    <span className="font-bold text-foreground/80">+15,642</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Redemption Rate</span>
                    <span className="font-bold text-foreground/80">23%</span>
                  </div>
                  <div className="pt-2 border-t border-glass/30">
                    <p className="text-xs text-muted-foreground">
                      {user.role === 'super_admin' 
                        ? 'Cross-brand point sharing is active'
                        : 'Points can be used across all participating locations'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
