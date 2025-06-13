
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
  Calendar, 
  Search, 
  Filter, 
  Plus, 
  Clock, 
  CheckCircle, 
  XCircle,
  Users,
  DollarSign,
  Eye,
  Edit
} from 'lucide-react';

export default function Orders() {
  const { user } = useAuth();
  const [currentBrand, setCurrentBrand] = useState(user?.brand === 'all' ? 'amka' : user?.brand || 'amka');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  if (!user) return null;

  const brandNames = {
    amka: 'Café Amka',
    mawimbi: 'Mawimbi Restaurant',
    kasa: 'Kasa Resort'
  };

  const canSwitchBrands = user.role === 'super_admin';
  const currentBrandName = brandNames[currentBrand as keyof typeof brandNames];

  // Mock orders data
  const mockOrders = [
    {
      id: 'ORD-001',
      customerName: 'Sarah Johnson',
      customerPhone: '+254 712 345 678',
      tableNumber: 'T-05',
      items: ['Cappuccino', 'Croissant', 'Fresh Juice'],
      total: 850,
      pointsEarned: 85,
      status: 'completed',
      orderTime: '2024-06-13 09:30',
      completedTime: '2024-06-13 09:45',
      brand: 'amka',
      paymentMethod: 'Card'
    },
    {
      id: 'ORD-002',
      customerName: 'Michael Chen',
      customerPhone: '+254 723 456 789',
      tableNumber: 'T-12',
      items: ['Grilled Salmon', 'Caesar Salad', 'Wine'],
      total: 2400,
      pointsEarned: 240,
      status: 'preparing',
      orderTime: '2024-06-13 12:15',
      completedTime: null,
      brand: 'mawimbi',
      paymentMethod: 'Cash'
    },
    {
      id: 'ORD-003',
      customerName: 'Emma Davis',
      customerPhone: '+254 734 567 890',
      tableNumber: 'Pool-03',
      items: ['Club Sandwich', 'Smoothie', 'Fruit Salad'],
      total: 1200,
      pointsEarned: 120,
      status: 'pending',
      orderTime: '2024-06-13 13:22',
      completedTime: null,
      brand: 'kasa',
      paymentMethod: 'Card'
    },
    {
      id: 'ORD-004',
      customerName: 'David Wilson',
      customerPhone: '+254 745 678 901',
      tableNumber: 'T-08',
      items: ['Espresso', 'Blueberry Muffin'],
      total: 450,
      pointsEarned: 45,
      status: 'cancelled',
      orderTime: '2024-06-13 10:00',
      completedTime: null,
      brand: 'amka',
      paymentMethod: 'Card'
    },
    {
      id: 'ORD-005',
      customerName: 'Lisa Brown',
      customerPhone: '+254 756 789 012',
      tableNumber: 'T-15',
      items: ['Beef Steak', 'Mashed Potatoes', 'Red Wine'],
      total: 3200,
      pointsEarned: 320,
      status: 'completed',
      orderTime: '2024-06-13 19:30',
      completedTime: '2024-06-13 20:45',
      brand: 'mawimbi',
      paymentMethod: 'Card'
    }
  ];

  const filteredOrders = mockOrders.filter(order => 
    user.role === 'super_admin' || order.brand === currentBrand
  ).filter(order => 
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(order =>
    statusFilter === 'all' || order.status === statusFilter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'preparing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'preparing':
        return <Clock className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const orderStats = {
    total: filteredOrders.length,
    completed: filteredOrders.filter(o => o.status === 'completed').length,
    preparing: filteredOrders.filter(o => o.status === 'preparing').length,
    pending: filteredOrders.filter(o => o.status === 'pending').length,
    totalRevenue: filteredOrders.reduce((sum, o) => sum + o.total, 0),
    totalPoints: filteredOrders.reduce((sum, o) => sum + o.pointsEarned, 0)
  };

  const handleViewOrder = (orderId: string) => {
    toast({
      title: 'Order Details',
      description: `Opening detailed view for order ${orderId}`,
    });
  };

  const handleEditOrder = (orderId: string) => {
    toast({
      title: 'Edit Order',
      description: `Opening edit interface for order ${orderId}`,
    });
  };

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    toast({
      title: 'Status Updated',
      description: `Order ${orderId} status changed to ${newStatus}`,
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
                    <Calendar className="h-8 w-8" />
                    {user.role === 'super_admin' ? 'Global ' : `${currentBrandName} `}Orders & Bookings
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    {user.role === 'waiter' 
                      ? 'Manage current orders, table assignments, and customer redemptions.' 
                      : 'Manage reservations, orders, and table assignments.'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    New Order
                  </Button>
                  {user.role !== 'waiter' && (
                    <Button variant="outline" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Reservations
                    </Button>
                  )}
                </div>
              </div>

              {/* Search and Filters */}
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search orders by customer name or order ID..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Order Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <Card className="glass-card border-glass">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-glass">{orderStats.total}</div>
                </CardContent>
              </Card>

              <Card className="glass-card border-glass">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{orderStats.completed}</div>
                </CardContent>
              </Card>

              <Card className="glass-card border-glass">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Preparing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{orderStats.preparing}</div>
                </CardContent>
              </Card>

              <Card className="glass-card border-glass">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{orderStats.pending}</div>
                </CardContent>
              </Card>

              <Card className="glass-card border-glass">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-glass">KES {orderStats.totalRevenue.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card className="glass-card border-glass">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Points Earned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-glass">{orderStats.totalPoints}</div>
                </CardContent>
              </Card>
            </div>

            {/* Orders List */}
            <Card className="glass-card border-glass">
              <CardHeader>
                <CardTitle className="text-glass">Order Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="glass-panel p-4 border-glass/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-semibold text-glass flex items-center gap-2">
                              {order.id}
                              <Badge className={getStatusColor(order.status)}>
                                {getStatusIcon(order.status)}
                                {order.status}
                              </Badge>
                            </h3>
                            <p className="text-sm text-muted-foreground">{order.customerName} • {order.customerPhone}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="font-semibold text-glass">Table {order.tableNumber}</p>
                            <p className="text-xs text-muted-foreground">{order.orderTime}</p>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-bold text-glass">KES {order.total.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">{order.pointsEarned} points earned</p>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleViewOrder(order.id)}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            {user.role !== 'waiter' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleEditOrder(order.id)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-glass/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Items:</p>
                            <p className="text-sm text-glass">{order.items.join(', ')}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Payment:</span>
                            <Badge variant="secondary">{order.paymentMethod}</Badge>
                            {order.status === 'pending' && (
                              <Button 
                                size="sm"
                                onClick={() => handleUpdateStatus(order.id, 'preparing')}
                              >
                                Start Preparing
                              </Button>
                            )}
                            {order.status === 'preparing' && (
                              <Button 
                                size="sm"
                                onClick={() => handleUpdateStatus(order.id, 'completed')}
                              >
                                Mark Complete
                              </Button>
                            )}
                          </div>
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
