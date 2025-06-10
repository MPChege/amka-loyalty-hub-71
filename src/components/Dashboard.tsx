
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Sidebar from '@/components/Sidebar';
import BrandHeader from '@/components/BrandHeader';
import DashboardCard from '@/components/DashboardCard';
import QuickActions from '@/components/QuickActions';
import RecentActivity from '@/components/RecentActivity';
import AdminRegistration from '@/components/AdminRegistration';
import PerformanceChart from '@/components/PerformanceChart';
import TopCustomers from '@/components/TopCustomers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, Users, TrendingUp, DollarSign, Award, Calendar, Shield, Bell, Coffee, MapPin, Star } from 'lucide-react';

interface AdminData {
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'waiter';
  brand: string;
  firstName: string;
  lastName: string;
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [currentBrand, setCurrentBrand] = useState(user?.brand === 'all' ? 'amka' : user?.brand || 'amka');
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState<string | null>(null);

  if (!user) return null;

  const brandNames = {
    amka: 'Café Amka',
    mawimbi: 'Mawimbi Restaurant',
    kasa: 'Kasa Resort'
  };

  const brandMetrics = {
    amka: {
      totalUsers: '2,847',
      revenue: 'KES 45,230',
      pointsRedeemed: '18,492',
      growth: '23.5%',
      todayOrders: 127,
      averageSpend: 'KES 850',
      satisfaction: '4.8',
      color: 'primary'
    },
    mawimbi: {
      totalUsers: '1,923',
      revenue: 'KES 38,750',
      pointsRedeemed: '12,847',
      growth: '19.2%',
      todayOrders: 89,
      averageSpend: 'KES 1,200',
      satisfaction: '4.7',
      color: 'primary'
    },
    kasa: {
      totalUsers: '3,156',
      revenue: 'KES 67,890',
      pointsRedeemed: '25,123',
      growth: '31.8%',
      todayOrders: 156,
      averageSpend: 'KES 2,100',
      satisfaction: '4.9',
      color: 'primary'
    }
  };

  // Role-based welcome messages
  const getWelcomeMessage = () => {
    switch (user.role) {
      case 'super_admin':
        return "Welcome to the Global Loyalty System Dashboard. You have full access to all brands and system settings.";
      case 'admin':
        return `Welcome to ${brandNames[currentBrand as keyof typeof brandNames]} Admin Dashboard. You have full control over your brand's loyalty program.`;
      case 'manager':
        return `Welcome to ${brandNames[currentBrand as keyof typeof brandNames]} Management Portal. You can manage customers, campaigns, and daily operations.`;
      case 'waiter':
        return `Welcome to ${brandNames[currentBrand as keyof typeof brandNames]} Staff Portal. You can manage orders, bookings, and customer redemptions.`;
      default:
        return "Welcome to the Loyalty System Dashboard.";
    }
  };

  // Role-based permissions
  const canRegisterAdmins = user.role === 'super_admin' || user.role === 'admin';
  const canSwitchBrands = user.role === 'super_admin';
  const currentMetrics = brandMetrics[currentBrand as keyof typeof brandMetrics];

  const handleRegisterAdmin = async (adminData: AdminData) => {
    setRegistrationLoading(true);
    setRegistrationError(null);
    setRegistrationSuccess(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation
      if (adminData.email === 'existing@admin.com') {
        throw new Error('An admin with this email already exists');
      }
      
      console.log('Registering new admin:', adminData);
      setRegistrationSuccess(`Successfully created admin account for ${adminData.firstName} ${adminData.lastName}`);
      
      // Clear success message after 3 seconds
      setTimeout(() => setRegistrationSuccess(null), 3000);
    } catch (err) {
      setRegistrationError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setRegistrationLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar 
        userRole={user.role} 
        currentBrand={currentBrand}
        onBrandChange={canSwitchBrands ? setCurrentBrand : () => {}}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <BrandHeader 
          brandName={brandNames[currentBrand as keyof typeof brandNames]}
          userRole={user.firstName + ' ' + user.lastName}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header with logout and admin registration */}
            <div className="flex justify-between items-center">
              <div className="glass-panel p-6 flex-1 mr-6 animate-fade-in">
                <h1 className="text-3xl font-bold text-glass mb-3">
                  {user.role === 'super_admin' ? 'Global' : brandNames[currentBrand as keyof typeof brandNames]} Dashboard
                </h1>
                <p className="text-muted-foreground mb-4">
                  {getWelcomeMessage()}
                </p>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="glass-button capitalize border-glass">
                    {user.role.replace('_', ' ')}
                  </Badge>
                  {user.role === 'admin' && (
                    <Badge variant="outline" className="glass-button text-primary border-glass">
                      Brand Administrator
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {canRegisterAdmins && (
                  <AdminRegistration 
                    onRegister={handleRegisterAdmin}
                    isLoading={registrationLoading}
                    error={registrationError}
                    success={registrationSuccess}
                  />
                )}
                <Button variant="outline" onClick={logout} className="glass-button flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>

            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-float">
                <DashboardCard
                  title="Total Customers"
                  value={currentMetrics.totalUsers}
                  icon={Users}
                  description="Active loyalty members"
                  trend={{ value: 12, isPositive: true }}
                  className="glass-card border-glass"
                />
              </div>
              <div className="glass-float">
                <DashboardCard
                  title="Monthly Revenue"
                  value={currentMetrics.revenue}
                  icon={DollarSign}
                  description="From loyalty transactions"
                  trend={{ value: 8, isPositive: true }}
                  className="glass-card border-glass"
                />
              </div>
              <div className="glass-float">
                <DashboardCard
                  title="Points Redeemed"
                  value={currentMetrics.pointsRedeemed}
                  icon={Award}
                  description="This month"
                  trend={{ value: 15, isPositive: true }}
                  className="glass-card border-glass"
                />
              </div>
              <div className="glass-float">
                <DashboardCard
                  title="Growth Rate"
                  value={currentMetrics.growth}
                  icon={TrendingUp}
                  description="Customer acquisition"
                  trend={{ value: 5, isPositive: true }}
                  className="glass-card border-glass"
                />
              </div>
            </div>

            {/* Additional Performance Metrics for Admins */}
            {(user.role === 'admin' || user.role === 'super_admin') && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-card border-glass">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Today's Orders
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-foreground/70" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-glass">{currentMetrics.todayOrders}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Active transactions today
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-card border-glass">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Average Spend
                    </CardTitle>
                    <Coffee className="h-4 w-4 text-foreground/70" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-glass">{currentMetrics.averageSpend}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Per customer transaction
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-card border-glass">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Satisfaction Rate
                    </CardTitle>
                    <Star className="h-4 w-4 text-foreground/70" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-glass">{currentMetrics.satisfaction}/5</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Customer feedback average
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Charts and Analytics Section for Admins */}
            {(user.role === 'admin' || user.role === 'super_admin') && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-float">
                  <PerformanceChart />
                </div>
                <div className="glass-float">
                  <TopCustomers />
                </div>
              </div>
            )}

            {/* Quick Actions and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-float">
                <QuickActions userRole={user.role} />
              </div>
              <div className="glass-float">
                <RecentActivity />
              </div>
            </div>

            {/* Admin-only Brand Management Section */}
            {user.role === 'admin' && (
              <Card className="glass-card border-glass relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
                <CardHeader className="relative">
                  <CardTitle className="flex items-center gap-2 text-glass">
                    <Shield className="h-5 w-5 text-primary" />
                    Brand Administration Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="glass-button h-auto p-4 flex-col items-start">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="h-4 w-4" />
                        <span className="font-medium">Staff Management</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Manage waiters and managers
                      </span>
                    </Button>
                    
                    <Button variant="outline" className="glass-button h-auto p-4 flex-col items-start">
                      <div className="flex items-center gap-2 mb-1">
                        <Bell className="h-4 w-4" />
                        <span className="font-medium">Campaign Control</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Create and manage promotions
                      </span>
                    </Button>
                    
                    <Button variant="outline" className="glass-button h-auto p-4 flex-col items-start">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="h-4 w-4" />
                        <span className="font-medium">Location Settings</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Configure branch settings
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
