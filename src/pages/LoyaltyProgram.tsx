
import { useAuth } from '@/hooks/useAuth';
import Sidebar from '@/components/Sidebar';
import BrandHeader from '@/components/BrandHeader';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { 
  Award, 
  Settings, 
  TrendingUp, 
  Users, 
  Target, 
  Gift,
  Star,
  Crown,
  Plus,
  Edit
} from 'lucide-react';

export default function LoyaltyProgram() {
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

  const loyaltyTiers = [
    {
      name: 'Bronze',
      minPoints: 0,
      maxPoints: 999,
      benefits: ['1 point per KES 10 spent', 'Birthday bonus: 100 points', 'Welcome bonus: 50 points'],
      color: 'orange',
      members: 145,
      icon: Star
    },
    {
      name: 'Silver',
      minPoints: 1000,
      maxPoints: 4999,
      benefits: ['1.5 points per KES 10 spent', '10% discount on weekdays', 'Birthday bonus: 200 points', 'Priority reservations'],
      color: 'gray',
      members: 89,
      icon: Award
    },
    {
      name: 'Gold',
      minPoints: 5000,
      maxPoints: 99999,
      benefits: ['2 points per KES 10 spent', '15% discount always', 'Birthday bonus: 500 points', 'Free dessert monthly', 'VIP events access'],
      color: 'yellow',
      members: 34,
      icon: Crown
    }
  ];

  const rewardItems = [
    {
      id: 1,
      name: 'Free Coffee',
      cost: 100,
      category: 'Beverages',
      description: 'Any regular coffee or tea',
      available: true,
      claimed: 45
    },
    {
      id: 2,
      name: 'Free Dessert',
      cost: 200,
      category: 'Food',
      description: 'Choice of cake slice or pastry',
      available: true,
      claimed: 28
    },
    {
      id: 3,
      name: '10% Discount',
      cost: 150,
      category: 'Discounts',
      description: 'On total bill (min KES 500)',
      available: true,
      claimed: 67
    },
    {
      id: 4,
      name: 'Free Meal',
      cost: 500,
      category: 'Food',
      description: 'Main course up to KES 800',
      available: true,
      claimed: 12
    }
  ];

  const programStats = {
    totalMembers: 268,
    activeMembers: 189,
    pointsIssued: 45670,
    pointsRedeemed: 12340,
    redemptionRate: 27,
    averagePointsPerMember: 171
  };

  const handleEditTier = (tierName: string) => {
    toast({
      title: `Edit ${tierName} Tier`,
      description: 'Tier configuration panel will open here.',
    });
  };

  const handleEditReward = (rewardName: string) => {
    toast({
      title: `Edit ${rewardName}`,
      description: 'Reward configuration panel will open here.',
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
            {/* Header */}
            <div className="glass-card p-6 border-glass">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-glass flex items-center gap-2">
                    <Award className="h-8 w-8" />
                    {user.role === 'super_admin' ? 'Global ' : `${currentBrandName} `}Loyalty Program
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    {user.role === 'super_admin' 
                      ? 'Configure loyalty rules, points, and rewards across all brands.' 
                      : 'Configure loyalty rules, points, and rewards for your brand.'}
                  </p>
                </div>
                {user.role !== 'waiter' && (
                  <div className="flex gap-2">
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Reward
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Program Settings
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Program Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass-card border-glass">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Total Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-glass">{programStats.totalMembers}</div>
                  <p className="text-xs text-muted-foreground">
                    {programStats.activeMembers} active this month
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-glass">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Points Issued
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-glass">{programStats.pointsIssued.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-glass">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Gift className="h-4 w-4" />
                    Points Redeemed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-glass">{programStats.pointsRedeemed.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {programStats.redemptionRate}% redemption rate
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-glass">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Average Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-glass">{programStats.averagePointsPerMember}</div>
                  <p className="text-xs text-muted-foreground">Per member balance</p>
                </CardContent>
              </Card>
            </div>

            {/* Loyalty Tiers */}
            <Card className="glass-card border-glass">
              <CardHeader>
                <CardTitle className="text-glass flex items-center gap-2">
                  <Crown className="h-5 w-5" />
                  Loyalty Tiers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {loyaltyTiers.map((tier, index) => {
                    const Icon = tier.icon;
                    return (
                      <div key={tier.name} className="glass-panel p-6 border-glass/50 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Icon className={`h-6 w-6 text-${tier.color}-500`} />
                            <h3 className="text-xl font-bold text-glass">{tier.name}</h3>
                          </div>
                          {user.role !== 'waiter' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditTier(tier.name)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-muted-foreground">Point Range</p>
                            <p className="font-semibold text-glass">
                              {tier.minPoints.toLocaleString()} - {tier.maxPoints.toLocaleString()} points
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-muted-foreground">Members</p>
                            <p className="font-semibold text-glass">{tier.members} customers</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">Benefits</p>
                            <ul className="space-y-1">
                              {tier.benefits.map((benefit, i) => (
                                <li key={i} className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Star className="h-3 w-3 flex-shrink-0" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Rewards Catalog */}
            <Card className="glass-card border-glass">
              <CardHeader>
                <CardTitle className="text-glass flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Rewards Catalog
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {rewardItems.map((reward) => (
                    <div key={reward.id} className="glass-panel p-4 border-glass/50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-glass">{reward.name}</h4>
                        {user.role !== 'waiter' && (
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleEditReward(reward.name)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">{reward.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">{reward.category}</Badge>
                          <span className="font-bold text-glass">{reward.cost} pts</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Claimed: {reward.claimed}x</span>
                          <Badge variant={reward.available ? "default" : "secondary"}>
                            {reward.available ? "Available" : "Unavailable"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Program Configuration */}
            {user.role !== 'waiter' && (
              <Card className="glass-card border-glass">
                <CardHeader>
                  <CardTitle className="text-glass flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Program Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-glass">Point Earning Rules</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Base earning rate</span>
                          <span className="font-medium text-glass">1 point per KES 10</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Minimum transaction</span>
                          <span className="font-medium text-glass">KES 50</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Points expiry</span>
                          <span className="font-medium text-glass">12 months</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-glass">Special Promotions</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Double points day</span>
                          <span className="font-medium text-glass">Every Friday</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Birthday bonus</span>
                          <span className="font-medium text-glass">Variable by tier</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Referral bonus</span>
                          <span className="font-medium text-glass">100 points</span>
                        </div>
                      </div>
                    </div>
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
