import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Sidebar from '@/components/Sidebar';
import BrandHeader from '@/components/BrandHeader';
import DashboardCard from '@/components/DashboardCard';
import QuickActions from '@/components/QuickActions';
import RecentActivity from '@/components/RecentActivity';
import AdminRegistration from '@/components/AdminRegistration';
import { Button } from '@/components/ui/button';
import { LogOut, Users, TrendingUp, DollarSign, Award } from 'lucide-react';

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
                <h1 className="text-3xl font-bold text-foreground">
                  {user.role === 'super_admin' ? 'Global' : brandNames[currentBrand as keyof typeof brandNames]} Dashboard
                </h1>
                <p className="text-muted-foreground mt-2">
                  {getWelcomeMessage()}
                </p>
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

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DashboardCard
                title="Total Users"
                value="2,847"
                icon={Users}
                description="Active loyalty members"
                trend={{ value: 12, isPositive: true }}
              />
              <DashboardCard
                title="Monthly Revenue"
                value="KES 45,230"
                icon={DollarSign}
                description="From loyalty transactions"
                trend={{ value: 8, isPositive: true }}
              />
              <DashboardCard
                title="Points Redeemed"
                value="18,492"
                icon={Award}
                description="This month"
                trend={{ value: 15, isPositive: true }}
              />
              <DashboardCard
                title="Growth Rate"
                value="23.5%"
                icon={TrendingUp}
                description="User acquisition"
                trend={{ value: 5, isPositive: true }}
              />
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <QuickActions userRole={user.role} />
              <RecentActivity />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
