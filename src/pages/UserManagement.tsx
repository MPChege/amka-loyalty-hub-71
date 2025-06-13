
import { useAuth } from '@/hooks/useAuth';
import Sidebar from '@/components/Sidebar';
import BrandHeader from '@/components/BrandHeader';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Filter, UserPlus, Download, Users, Crown, TrendingUp, Phone, Mail } from 'lucide-react';

export default function UserManagement() {
  const { user } = useAuth();
  const [currentBrand, setCurrentBrand] = useState(user?.brand === 'all' ? 'amka' : user?.brand || 'amka');
  const [searchTerm, setSearchTerm] = useState('');

  if (!user) return null;

  const brandNames = {
    amka: 'Café Amka',
    mawimbi: 'Mawimbi Restaurant',
    kasa: 'Kasa Resort'
  };

  const canSwitchBrands = user.role === 'super_admin';
  const currentBrandName = brandNames[currentBrand as keyof typeof brandNames];

  // Mock user data
  const mockUsers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+254 712 345 678',
      points: 8540,
      spent: 45200,
      tier: 'Gold',
      joinDate: '2023-01-15',
      lastVisit: '2024-06-10',
      visits: 47,
      brand: 'amka'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+254 723 456 789',
      points: 7890,
      spent: 42100,
      tier: 'Gold',
      joinDate: '2023-02-22',
      lastVisit: '2024-06-12',
      visits: 52,
      brand: 'mawimbi'
    },
    {
      id: 3,
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      phone: '+254 734 567 890',
      points: 6750,
      spent: 38900,
      tier: 'Silver',
      joinDate: '2023-03-10',
      lastVisit: '2024-06-11',
      visits: 38,
      brand: 'kasa'
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      phone: '+254 745 678 901',
      points: 5620,
      spent: 32400,
      tier: 'Silver',
      joinDate: '2023-04-05',
      lastVisit: '2024-06-09',
      visits: 34,
      brand: 'amka'
    },
    {
      id: 5,
      name: 'Lisa Brown',
      email: 'lisa.brown@email.com',
      phone: '+254 756 789 012',
      points: 4890,
      spent: 28700,
      tier: 'Bronze',
      joinDate: '2023-05-18',
      lastVisit: '2024-06-13',
      visits: 29,
      brand: 'mawimbi'
    }
  ];

  const filteredUsers = mockUsers.filter(u => 
    user.role === 'super_admin' || u.brand === currentBrand
  ).filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Gold':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Silver':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Bronze':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const userStats = {
    total: filteredUsers.length,
    gold: filteredUsers.filter(u => u.tier === 'Gold').length,
    silver: filteredUsers.filter(u => u.tier === 'Silver').length,
    bronze: filteredUsers.filter(u => u.tier === 'Bronze').length,
    totalPoints: filteredUsers.reduce((sum, u) => sum + u.points, 0),
    totalSpent: filteredUsers.reduce((sum, u) => sum + u.spent, 0)
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
                    <Users className="h-8 w-8" />
                    {user.role === 'super_admin' ? 'Global ' : `${currentBrandName} `}User Management
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    {user.role === 'waiter' 
                      ? 'View customer information and loyalty balances.' 
                      : 'Manage loyalty program users and their profiles.'}
                  </p>
                </div>
                {user.role !== 'waiter' && (
                  <div className="flex gap-2">
                    <Button className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      Add Customer
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                )}
              </div>

              {/* Search and Filters */}
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search customers by name or email..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass-card border-glass">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-glass">{userStats.total}</div>
                  <p className="text-xs text-muted-foreground">Active loyalty members</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-glass">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Tier Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Badge className={getTierColor('Gold')}>{userStats.gold} Gold</Badge>
                    <Badge className={getTierColor('Silver')}>{userStats.silver} Silver</Badge>
                    <Badge className={getTierColor('Bronze')}>{userStats.bronze} Bronze</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-glass">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-glass">{userStats.totalPoints.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Points in circulation</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-glass">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-glass">KES {userStats.totalSpent.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Customer lifetime value</p>
                </CardContent>
              </Card>
            </div>

            {/* Users Table */}
            <Card className="glass-card border-glass">
              <CardHeader>
                <CardTitle className="text-glass">Customer Directory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((customer) => (
                    <div key={customer.id} className="glass-panel p-4 border-glass/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 glass-panel border-glass">
                            <AvatarFallback className="bg-transparent text-glass">
                              {customer.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-glass">{customer.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {customer.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {customer.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <Crown className="h-4 w-4 text-yellow-500" />
                              <span className="font-bold text-glass">{customer.points.toLocaleString()} pts</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              KES {customer.spent.toLocaleString()} spent
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge className={getTierColor(customer.tier)}>
                              {customer.tier}
                            </Badge>
                            <div className="text-right">
                              <div className="text-sm font-medium text-glass">{customer.visits} visits</div>
                              <p className="text-xs text-muted-foreground">Last: {customer.lastVisit}</p>
                            </div>
                          </div>
                          
                          {user.role !== 'waiter' && (
                            <Button size="sm" variant="outline">
                              Manage
                            </Button>
                          )}
                        </div>
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
