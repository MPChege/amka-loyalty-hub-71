
import { useAuth } from '@/hooks/useAuth';
import Sidebar from '@/components/Sidebar';
import BrandHeader from '@/components/BrandHeader';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Lock, History, UserCheck, Clock } from 'lucide-react';

export default function Security() {
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
  
  const accessLogs = [
    { event: 'User Login', user: 'admin@amka.com', ip: '192.168.1.1', time: '2024-06-14 10:00 AM', status: 'Success' },
    { event: 'Failed Login', user: 'guest@test.com', ip: '10.0.0.5', time: '2024-06-14 09:30 AM', status: 'Failure' },
    { event: 'Password Change', user: 'manager@mawimbi.com', ip: '172.16.0.10', time: '2024-06-13 03:45 PM', status: 'Success' },
    { event: 'API Key Generated', user: 'super@loyaltysystem.com', ip: '127.0.0.1', time: '2024-06-13 11:00 AM', status: 'Success' },
  ];

  const handleAction = (actionName: string, description: string) => {
    toast({
      title: actionName,
      description: `${description} - Feature coming soon!`,
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
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-foreground mb-6">
              {user.role === 'super_admin' ? 'Global ' : `${currentBrandName} `}Security & Compliance
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card border-glass">
                <CardHeader>
                  <CardTitle className="text-glass flex items-center gap-2">
                    <Lock className="h-5 w-5" /> Password Policy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Ensure strong passwords are used across the system.
                  </p>
                  <div className="flex items-center justify-between glass-panel p-3 rounded-md">
                    <span className="text-sm font-medium text-glass">Minimum Length</span>
                    <Badge variant="secondary">12 characters</Badge>
                  </div>
                  <div className="flex items-center justify-between glass-panel p-3 rounded-md">
                    <span className="text-sm font-medium text-glass">Complexity</span>
                    <Badge variant="secondary">Required</Badge>
                  </div>
                  <Button variant="outline" onClick={() => handleAction('Update Policy', 'Opening password policy editor')}>
                    Update Policy
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-card border-glass">
                <CardHeader>
                  <CardTitle className="text-glass flex items-center gap-2">
                    <UserCheck className="h-5 w-5" /> Two-Factor Authentication (2FA)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Add an extra layer of security to user accounts.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Switch id="2fa-switch" defaultChecked={true} />
                    <Label htmlFor="2fa-switch" className="text-glass">Enforce 2FA for all Admins</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Currently, <strong>85%</strong> of admin accounts have 2FA enabled.
                  </p>
                  <Button variant="outline" onClick={() => handleAction('Manage 2FA', 'Opening 2FA management panel')}>
                    Manage 2FA Settings
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="glass-card border-glass">
              <CardHeader>
                <CardTitle className="text-glass flex items-center gap-2">
                  <History className="h-5 w-5" /> Recent Access Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {accessLogs.map((log, index) => (
                    <div key={index} className="flex justify-between items-center glass-panel p-3 rounded-md">
                      <div>
                        <p className="font-medium text-glass">{log.event} by <span className="text-primary">{log.user}</span></p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {log.time} from IP: {log.ip}
                        </p>
                      </div>
                      <Badge variant={log.status === 'Success' ? 'default' : 'destructive'}>{log.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
