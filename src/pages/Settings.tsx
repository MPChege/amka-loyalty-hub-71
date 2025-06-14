
import { useAuth } from '@/hooks/useAuth';
import Sidebar from '@/components/Sidebar';
import BrandHeader from '@/components/BrandHeader';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { User, Bell, Building } from 'lucide-react';

export default function Settings() {
  const { user } = useAuth();
  const [currentBrand, setCurrentBrand] = useState(user?.brand === 'all' ? 'amka' : user?.brand || 'amka');

  if (!user) return null;

  const brandNames = {
    amka: 'Café Amka',
    mawimbi: 'Mawimbi Restaurant',
    kasa: 'Kasa Resort'
  };

  const canSwitchBrands = user.role === 'super_admin';
  const currentBrandName = brandNames[currentBrand as keyof typeof brandNames];
  
  const handleSave = (settingName: string) => {
    toast({
      title: 'Settings Saved',
      description: `${settingName} settings have been updated.`,
    });
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
          brandName={currentBrandName}
          userRole={user.firstName + ' ' + user.lastName}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-foreground">
              {user.role === 'super_admin' ? 'Global ' : `${currentBrandName} `}System Settings
            </h1>

            <Card className="glass-card border-glass">
              <CardHeader>
                <CardTitle className="text-glass flex items-center gap-2">
                  <User className="h-5 w-5" /> Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue={user.firstName} />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue={user.lastName} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={user.email} disabled />
                </div>
                <Button onClick={() => handleSave('Profile')}>Save Changes</Button>
              </CardContent>
            </Card>

            <Card className="glass-card border-glass">
              <CardHeader>
                <CardTitle className="text-glass flex items-center gap-2">
                  <Bell className="h-5 w-5" /> Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive summaries and alerts via email.</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get real-time alerts in the app.</p>
                  </div>
                  <Switch id="push-notifications" disabled />
                </div>
                <Button onClick={() => handleSave('Notification')}>Save Changes</Button>
              </CardContent>
            </Card>
            
            {user.role !== 'waiter' && (
              <Card className="glass-card border-glass">
                <CardHeader>
                  <CardTitle className="text-glass flex items-center gap-2">
                    <Building className="h-5 w-5" /> Brand Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="brandName">Brand Name</Label>
                    <Input id="brandName" defaultValue={currentBrandName} disabled={user.role !== 'admin'} />
                  </div>
                  <div>
                    <Label htmlFor="currency">Default Currency</Label>
                    <Input id="currency" defaultValue="KES" disabled={user.role !== 'admin'} />
                  </div>
                  <Button onClick={() => handleSave('Brand')} disabled={user.role !== 'admin'}>Save Changes</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
