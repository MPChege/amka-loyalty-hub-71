
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
import { LogOut, Users, TrendingUp, DollarSign, Award, Calendar, Shield, Bell, Coffee, MapPin, Star, Sparkles } from 'lucide-react';

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
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20">
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
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header with logout and admin registration */}
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {user.role === 'super_admin' ? 'Global' : brandNames[currentBrand as keyof typeof brandNames]} Dashboard
                  </h1>
                  <Sparkles className="h-6 w-6 text-purple-500 animate-pulse" />
                </div>
                <p className="text-slate-600 text-lg">
                  {getWelcomeMessage()}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="secondary" className="capitalize bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border-indigo-200">
                    {user.role.replace('_', ' ')}
                  </Badge>
                  {user.role === 'admin' && (
                    <Badge variant="outline" className="text-purple-600 border-purple-300 bg-purple-50">
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
                <Button variant="outline" onClick={logout} className="flex items-center gap-2 premium-button">
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
                className="metric-card-blue"
              />
              <DashboardCard
                title="Monthly Revenue"
                value={currentMetrics.revenue}
                icon={DollarSign}
                description="From loyalty transactions"
                trend={{ value: 8, isPositive: true }}
                className="metric-card-green"
              />
              <DashboardCard
                title="Points Redeemed"
                value={currentMetrics.pointsRedeemed}
                icon={Award}
                description="This month"
                trend={{ value: 15, isPositive: true }}
                className="metric-card-purple"
              />
              <DashboardCard
                title="Growth Rate"
                value={currentMetrics.growth}
                icon={TrendingUp}
                description="Customer acquisition"
                trend={{ value: 5, isPositive: true }}
                className="metric-card-orange"
              />
            </div>

            {/* Additional Performance Metrics for Admins */}
            {(user.role === 'admin' || user.role === 'super_admin') && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="admin-card hover:scale-105 transition-transform duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">
                      Today's Orders
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-indigo-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-indigo-700">{currentMetrics.todayOrders}</div>
                    <p className="text-xs text-slate-500 mt-1">
                      Active transactions today
                    </p>
                  </CardContent>
                </Card>

                <Card className="admin-card hover:scale-105 transition-transform duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">
                      Average Spend
                    </CardTitle>
                    <Coffee className="h-4 w-4 text-emerald-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-emerald-700">{currentMetrics.averageSpend}</div>
                    <p className="text-xs text-slate-500 mt-1">
                      Per customer transaction
                    </p>
                  </CardContent>
                </Card>

                <Card className="admin-card hover:scale-105 transition-transform duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">
                      Satisfaction Rate
                    </CardTitle>
                    <Star className="h-4 w-4 text-amber-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-amber-700">{currentMetrics.satisfaction}/5</div>
                    <p className="text-xs text-slate-500 mt-1">
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
              <Card className="glass-effect border-indigo-200/50 hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-indigo-600" />
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Brand Administration Tools
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-auto p-4 flex-col items-start admin-card hover:scale-105 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="h-4 w-4 text-indigo-600" />
                        <span className="font-medium text-slate-700">Staff Management</span>
                      </div>
                      <span className="text-xs text-slate-500">
                        Manage waiters and managers
                      </span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto p-4 flex-col items-start admin-card hover:scale-105 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-1">
                        <Bell className="h-4 w-4 text-purple-600" />
                        <span className="font-medium text-slate-700">Campaign Control</span>
                      </div>
                      <span className="text-xs text-slate-500">
                        Create and manage promotions
                      </span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto p-4 flex-col items-start admin-card hover:scale-105 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="h-4 w-4 text-emerald-600" />
                        <span className="font-medium text-slate-700">Location Settings</span>
                      </div>
                      <span className="text-xs text-slate-500">
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
