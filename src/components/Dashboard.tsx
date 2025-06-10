
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
      color: 'coffee'
    },
    mawimbi: {
      totalUsers: '1,923',
      revenue: 'KES 38,750',
      pointsRedeemed: '12,847',
      growth: '19.2%',
      todayOrders: 89,
      averageSpend: 'KES 1,200',
      satisfaction: '4.7',
      color: 'emerald'
    },
    kasa: {
      totalUsers: '3,156',
      revenue: 'KES 67,890',
      pointsRedeemed: '25,123',
      growth: '31.8%',
      todayOrders: 156,
      averageSpend: 'KES 2,100',
      satisfaction: '4.9',
      color: 'gold'
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
    <div className="flex h-screen bg-background">
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
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header with logout and admin registration */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {user.role === 'super_admin' ? 'Global' : brandNames[currentBrand as keyof typeof brandNames]} Dashboard
                </h1>
                <p className="text-muted-foreground">
                  {getWelcomeMessage()}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="capitalize">
                    {user.role.replace('_', ' ')}
                  </Badge>
                  {user.role === 'admin' && (
                    <Badge variant="outline" className="text-primary">
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
                <Button variant="outline" onClick={logout} className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>

            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DashboardCard
                title="Total Customers"
                value={currentMetrics.totalUsers}
                icon={Users}
                description="Active loyalty members"
                trend={{ value: 12, isPositive: true }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
              />
              <DashboardCard
                title="Monthly Revenue"
                value={currentMetrics.revenue}
                icon={DollarSign}
                description="From loyalty transactions"
                trend={{ value: 8, isPositive: true }}
                className="bg-gradient-to-br from-green-50 to-green-100 border-green-200"
              />
              <DashboardCard
                title="Points Redeemed"
                value={currentMetrics.pointsRedeemed}
                icon={Award}
                description="This month"
                trend={{ value: 15, isPositive: true }}
                className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
              />
              <DashboardCard
                title="Growth Rate"
                value={currentMetrics.growth}
                icon={TrendingUp}
                description="Customer acquisition"
                trend={{ value: 5, isPositive: true }}
                className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200"
              />
            </div>

            {/* Additional Performance Metrics for Admins */}
            {(user.role === 'admin' || user.role === 'super_admin') && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Today's Orders
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-indigo-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-indigo-700">{currentMetrics.todayOrders}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Active transactions today
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Average Spend
                    </CardTitle>
                    <Coffee className="h-4 w-4 text-rose-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-rose-700">{currentMetrics.averageSpend}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Per customer transaction
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Satisfaction Rate
                    </CardTitle>
                    <Star className="h-4 w-4 text-amber-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-amber-700">{currentMetrics.satisfaction}/5</div>
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
                <PerformanceChart />
                <TopCustomers />
              </div>
            )}

            {/* Quick Actions and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <QuickActions userRole={user.role} />
              <RecentActivity />
            </div>

            {/* Admin-only Brand Management Section */}
            {user.role === 'admin' && (
              <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Brand Administration Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-auto p-4 flex-col items-start">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="h-4 w-4" />
                        <span className="font-medium">Staff Management</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Manage waiters and managers
                      </span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto p-4 flex-col items-start">
                      <div className="flex items-center gap-2 mb-1">
                        <Bell className="h-4 w-4" />
                        <span className="font-medium">Campaign Control</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Create and manage promotions
                      </span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto p-4 flex-col items-start">
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
