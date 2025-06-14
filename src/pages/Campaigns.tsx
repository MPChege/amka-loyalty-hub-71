
import { useAuth } from '@/hooks/useAuth';
import Sidebar from '@/components/Sidebar';
import BrandHeader from '@/components/BrandHeader';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Bell, Plus, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AddCampaignForm, FormValues as CampaignFormValues } from '@/components/AddCampaignForm';

export default function Campaigns() {
  const { user } = useAuth();
  const [currentBrand, setCurrentBrand] = useState(user?.brand === 'all' ? 'amka' : user?.brand || 'amka');
  const [isAddCampaignOpen, setAddCampaignOpen] = useState(false);

  if (!user) return null;

  const brandNames = {
    amka: 'Café Amka',
    mawimbi: 'Mawimbi Restaurant',
    kasa: 'Kasa Resort'
  };

  const canSwitchBrands = user.role === 'super_admin';
  const currentBrandName = brandNames[currentBrand as keyof typeof brandNames];
  
  const mockCampaignsData = [
    {
      id: 1,
      name: 'Summer Smoothies Special',
      description: 'A special discount on all our summer smoothies.',
      status: 'active',
      type: 'Discount',
      reach: 1250,
      conversions: 85,
      startDate: '2024-06-01',
      endDate: '2024-06-30',
      brand: 'amka'
    },
    {
      id: 2,
      name: 'Weekend Wine Pairing',
      description: 'Enjoy a curated selection of wines paired with our special menu.',
      status: 'active',
      type: 'Offer',
      reach: 890,
      conversions: 62,
      startDate: '2024-06-01',
      endDate: '2024-07-31',
      brand: 'mawimbi'
    },
    {
      id: 3,
      name: 'Holiday Getaway Package',
      description: 'Book a relaxing holiday stay with our exclusive package.',
      status: 'scheduled',
      type: 'Bundle',
      reach: 0,
      conversions: 0,
      startDate: '2024-07-01',
      endDate: '2024-08-31',
      brand: 'kasa'
    },
    {
      id: 4,
      name: 'Morning Coffee Rush',
      description: 'Get a 20% discount on all coffee before 10 AM.',
      status: 'completed',
      type: 'Discount',
      reach: 2100,
      conversions: 150,
      startDate: '2024-05-01',
      endDate: '2024-05-31',
      brand: 'amka'
    },
  ];

  const [campaigns, setCampaigns] = useState(mockCampaignsData);

  const handleAddCampaign = (newCampaign: CampaignFormValues) => {
    const campaignToAdd = {
      id: campaigns.length + 1,
      ...newCampaign,
      status: 'scheduled',
      reach: 0,
      conversions: 0,
      brand: currentBrand,
    };
    setCampaigns([campaignToAdd, ...campaigns]);
  };

  const filteredCampaigns = campaigns.filter(c => user.role === 'super_admin' || c.brand === currentBrand);

  const campaignStats = {
    active: filteredCampaigns.filter(c => c.status === 'active').length,
    totalReach: filteredCampaigns.reduce((sum, c) => sum + c.reach, 0),
    totalConversions: filteredCampaigns.reduce((sum, c) => sum + c.conversions, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

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
            <div className="glass-card p-6 border-glass">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-glass flex items-center gap-2">
                    <Bell className="h-8 w-8" />
                    {user.role === 'super_admin' ? 'Global ' : `${currentBrandName} `}Campaigns
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    {user.role === 'super_admin' 
                      ? 'Create and manage marketing campaigns and offers across all brands.' 
                      : 'Create and manage marketing campaigns and offers for your brand.'}
                  </p>
                </div>
                {user.role !== 'waiter' && (
                  <Dialog open={isAddCampaignOpen} onOpenChange={setAddCampaignOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        New Campaign
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg glass-card border-glass text-glass">
                      <DialogHeader>
                        <DialogTitle>Create New Campaign</DialogTitle>
                        <DialogDescription>
                          Fill out the form below to launch a new marketing campaign.
                        </DialogDescription>
                      </DialogHeader>
                      <AddCampaignForm onSuccess={handleAddCampaign} setOpen={setAddCampaignOpen} />
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card border-glass">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-glass">{campaignStats.active}</div>
                </CardContent>
              </Card>
              <Card className="glass-card border-glass">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Reach</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-glass">{campaignStats.totalReach.toLocaleString()}</div>
                </CardContent>
              </Card>
              <Card className="glass-card border-glass">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Conversions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-glass">{campaignStats.totalConversions.toLocaleString()}</div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="glass-card border-glass">
              <CardHeader>
                <CardTitle className="text-glass">Campaign List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCampaigns.map((campaign) => (
                    <div key={campaign.id} className="glass-panel p-4 border-glass/50 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="font-semibold text-glass">{campaign.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {campaign.startDate} to {campaign.endDate}
                          </p>
                        </div>
                        <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                           <p className="font-semibold text-glass">{campaign.reach.toLocaleString()}</p>
                           <p className="text-xs text-muted-foreground">Reach</p>
                        </div>
                        <div className="text-center">
                           <p className="font-semibold text-glass">{campaign.conversions.toLocaleString()}</p>
                           <p className="text-xs text-muted-foreground">Conversions</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleAction('View Campaign', `Showing details for ${campaign.name}`)}>
                          <Eye className="h-4 w-4 mr-2" /> View
                        </Button>
                      </div>
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
