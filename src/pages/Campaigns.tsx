
import { useAuth } from '@/hooks/useAuth';
import Sidebar from '@/components/Sidebar';
import BrandHeader from '@/components/BrandHeader';
import { useState } from 'react';

export default function Campaigns() {
  const { user } = useAuth();
  const [currentBrand, setCurrentBrand] = useState(user?.brand === 'all' ? 'amka' : user?.brand || 'amka');

  if (!user) return null;

  const brandNames = {
    amka: 'Café Amka',
    mawimbi: 'Mawimbi Restaurant',
    kasa: 'Kasa Resort'
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        userRole={user.role === 'super_admin' ? 'admin' : user.role} 
        currentBrand={currentBrand}
        onBrandChange={setCurrentBrand}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <BrandHeader 
          brandName={brandNames[currentBrand as keyof typeof brandNames]}
          userRole={user.firstName + ' ' + user.lastName}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-6">Campaigns</h1>
            <p className="text-muted-foreground">Create and manage marketing campaigns and offers.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
