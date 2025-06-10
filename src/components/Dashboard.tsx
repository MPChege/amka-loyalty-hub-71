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
      color: 'slate'
    },
    mawimbi: {
      totalUsers: '1,923',
      revenue: 'KES 38,750',
      pointsRedeemed: '12,847',
      growth: '19.2%',
      todayOrders: 89,
      averageSpend: 'KES 1,200',
      satisfaction: '4.7',
      color: 'dark'
    },
    kasa: {
      totalUsers: '3,156',
      revenue: 'KES 67,890',
      pointsRedeemed: '25,123',
      growth: '31.8%',
      todayOrders: 156,
      averageSpend: 'KES 2,100',
      satisfaction: '4.9',
      color: 'light'
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (adminData.email === 'existing@admin.com') {
        throw new Error('An admin with this email already exists');
      }
      
      console.log('Registering new admin:', adminData);
      setRegistrationSuccess(`Successfully created admin account for ${adminData.firstName} ${adminData.lastName}`);
      
      setTimeout(() => setRegistrationSuccess(null), 3000);
    } catch (err) {
      setRegistrationError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setRegistrationLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Ambient background effects - monochrome */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100/30 via-white/20 to-slate-200/30 animate-pulse"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-200/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <Sidebar 
        userRole={user.role} 
        currentBrand={currentBrand}
        onBrandChange={canSwitchBrands ? setCurrentBrand : () => {}}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <div className="liquid-glass-nav">
          <BrandHeader 
            brandName={brandNames[currentBrand as keyof typeof brandNames]}
            userRole={user.firstName + ' ' + user.lastName}
          />
        </div>
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 relative">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header with liquid glass styling */}
            <div className="flex justify-between items-center">
              <div className="liquid-glass-card p-6 flex-1 mr-6">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-4xl font-bold glass-text">
                    {user.role === 'super_admin' ? 'Global' : brandNames[currentBrand as keyof typeof brandNames]} Dashboard
                  </h1>
                  <Sparkles className="h-8 w-8 text-slate-500/80 animate-pulse" />
                </div>
                <p className="text-slate-600/90 text-lg mb-4">
                  {getWelcomeMessage()}
                </p>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="liquid-glass-card border-0 bg-gradient-to-r from-slate-500/20 to-slate-600/20 text-slate-700 backdrop-blur-sm">
                    <span className="capitalize">{user.role.replace('_', ' ')}</span>
                  </Badge>
                  {user.role === 'admin' && (
                    <Badge variant="outline" className="liquid-glass-card border-slate-300/30 text-slate-600 bg-slate-50/20 backdrop-blur-sm">
                      Brand Administrator
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {canRegisterAdmins && (
                  <div className="liquid-glass-card p-1">
                    <AdminRegistration 
                      onRegister={handleRegisterAdmin}
                      isLoading={registrationLoading}
                      error={registrationError}
                      success={registrationSuccess}
                    />
                  </div>
                )}
                <Button variant="outline" onClick={logout} className="glass-button border-0">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>

            {/* Enhanced Stats Cards with liquid glass */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="liquid-glass-metric slate floating-glass">
                <DashboardCard
                  title="Total Customers"
                  value={currentMetrics.totalUsers}
                  icon={Users}
                  description="Active loyalty members"
                  trend={{ value: 12, isPositive: true }}
                  className="bg-transparent border-0 shadow-none"
                />
              </div>
              <div className="liquid-glass-metric dark floating-glass" style={{ animationDelay: '0.5s' }}>
                <DashboardCard
                  title="Monthly Revenue"
                  value={currentMetrics.revenue}
                  icon={DollarSign}
                  description="From loyalty transactions"
                  trend={{ value: 8, isPositive: true }}
                  className="bg-transparent border-0 shadow-none"
                />
              </div>
              <div className="liquid-glass-metric light floating-glass" style={{ animationDelay: '1s' }}>
                <DashboardCard
                  title="Points Redeemed"
                  value={currentMetrics.pointsRedeemed}
                  icon={Award}
                  description="This month"
                  trend={{ value: 15, isPositive: true }}
                  className="bg-transparent border-0 shadow-none"
                />
              </div>
              <div className="liquid-glass-metric mono floating-glass" style={{ animationDelay: '1.5s' }}>
                <DashboardCard
                  title="Growth Rate"
                  value={currentMetrics.growth}
                  icon={TrendingUp}
                  description="Customer acquisition"
                  trend={{ value: 5, isPositive: true }}
                  className="bg-transparent border-0 shadow-none"
                />
              </div>
            </div>

            {/* Additional Performance Metrics for Admins */}
            {(user.role === 'admin' || user.role === 'super_admin') && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="liquid-glass-card glass-refraction">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600/90">
                      Today's Orders
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-slate-600/80" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold glass-text">{currentMetrics.todayOrders}</div>
                    <p className="text-xs text-slate-500/80 mt-1">
                      Active transactions today
                    </p>
                  </CardContent>
                </Card>

                <Card className="liquid-glass-card glass-refraction">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600/90">
                      Average Spend
                    </CardTitle>
                    <Coffee className="h-4 w-4 text-slate-600/80" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold glass-text">{currentMetrics.averageSpend}</div>
                    <p className="text-xs text-slate-500/80 mt-1">
                      Per customer transaction
                    </p>
                  </CardContent>
                </Card>

                <Card className="liquid-glass-card glass-refraction">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600/90">
                      Satisfaction Rate
                    </CardTitle>
                    <Star className="h-4 w-4 text-slate-600/80" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold glass-text">{currentMetrics.satisfaction}/5</div>
                    <p className="text-xs text-slate-500/80 mt-1">
                      Customer feedback average
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Charts and Analytics Section with liquid glass */}
            {(user.role === 'admin' || user.role === 'super_admin') && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="liquid-glass-content">
                  <PerformanceChart />
                </div>
                <div className="liquid-glass-content">
                  <TopCustomers />
                </div>
              </div>
            )}

            {/* Quick Actions and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="liquid-glass-content">
                <QuickActions userRole={user.role} />
              </div>
              <div className="liquid-glass-content">
                <RecentActivity />
              </div>
            </div>

            {/* Admin-only Brand Management Section */}
            {user.role === 'admin' && (
              <Card className="liquid-glass-content glass-refraction">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-slate-600/80" />
                    <span className="glass-text">
                      Brand Administration Tools
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Button variant="outline" className="glass-button h-auto p-6 flex-col items-start border-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-5 w-5 text-slate-600/80" />
                        <span className="font-medium text-slate-700/90">Staff Management</span>
                      </div>
                      <span className="text-xs text-slate-500/80">
                        Manage waiters and managers
                      </span>
                    </Button>
                    
                    <Button variant="outline" className="glass-button h-auto p-6 flex-col items-start border-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Bell className="h-5 w-5 text-slate-600/80" />
                        <span className="font-medium text-slate-700/90">Campaign Control</span>
                      </div>
                      <span className="text-xs text-slate-500/80">
                        Create and manage promotions
                      </span>
                    </Button>
                    
                    <Button variant="outline" className="glass-button h-auto p-6 flex-col items-start border-0">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-5 w-5 text-slate-600/80" />
                        <span className="font-medium text-slate-700/90">Location Settings</span>
                      </div>
                      <span className="text-xs text-slate-500/80">
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
