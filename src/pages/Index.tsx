
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import BrandHeader from '@/components/BrandHeader';
import DashboardCard from '@/components/DashboardCard';
import QuickActions from '@/components/QuickActions';
import RecentActivity from '@/components/RecentActivity';
import { Users, Calendar, Database, Activity } from 'lucide-react';

const Index = () => {
  const [userRole] = useState<'admin' | 'manager' | 'waiter'>('admin');
  const [currentBrand, setCurrentBrand] = useState('amka');

  const brands = {
    amka: 'Café Amka',
    mawimbi: 'Mawimbi Restaurant',
    kasa: 'Kasa Resort'
  };

  // Mock data for the dashboard
  const dashboardStats = [
    {
      title: 'Total Users',
      value: '2,847',
      icon: Users,
      description: 'Active loyalty members',
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Today\'s Orders',
      value: '47',
      icon: Calendar,
      description: 'Orders placed today',
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Points Redeemed',
      value: '15,642',
      icon: Database,
      description: 'Points redeemed this month',
      trend: { value: -3, isPositive: false }
    },
    {
      title: 'Active Campaigns',
      value: '8',
      icon: Activity,
      description: 'Running loyalty campaigns',
      trend: { value: 25, isPositive: true }
    }
  ];

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar 
        userRole={userRole}
        currentBrand={currentBrand}
        onBrandChange={setCurrentBrand}
      />
      
      <main className="flex-1 overflow-auto">
        <BrandHeader 
          brandName={brands[currentBrand as keyof typeof brands]}
          userRole={userRole}
        />
        
        <div className="p-6 space-y-6">
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
              />
            ))}
          </div>

          {/* Quick Actions and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <QuickActions userRole={userRole} />
            <RecentActivity />
          </div>

          {/* Brand-specific insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-coffee-600 to-coffee-800 rounded-lg p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">
                  {brands[currentBrand as keyof typeof brands]} Analytics
                </h3>
                <p className="text-coffee-100 mb-4">
                  View detailed analytics and insights for this location
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-coffee-500/20 rounded-lg p-4">
                    <h4 className="text-sm font-medium">Peak Hours</h4>
                    <p className="text-2xl font-bold">2-4 PM</p>
                  </div>
                  <div className="bg-coffee-500/20 rounded-lg p-4">
                    <h4 className="text-sm font-medium">Avg. Points/Visit</h4>
                    <p className="text-2xl font-bold">125</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Loyalty Status</h3>
              <p className="text-gold-100 mb-4">Cross-brand point sharing active</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Total Points Pool</span>
                  <span className="font-bold">847,293</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">This Month</span>
                  <span className="font-bold">+15,642</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
