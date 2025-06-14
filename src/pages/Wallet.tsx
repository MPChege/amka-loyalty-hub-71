
import { useAuth } from '@/hooks/useAuth';
import Sidebar from '@/components/Sidebar';
import BrandHeader from '@/components/BrandHeader';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wallet as WalletIcon, Plus, ArrowDown, ArrowUp, DollarSign } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const mockTransactions = [
    { id: 1, date: '2024-06-14', description: 'Top-up from Card', type: 'credit', amount: 5000 },
    { id: 2, date: '2024-06-13', description: 'Payment at Café Amka', type: 'debit', amount: -850 },
    { id: 3, date: '2024-06-12', description: 'Payment at Mawimbi', type: 'debit', amount: -2400 },
    { id: 4, date: '2024-06-10', description: 'Top-up from M-Pesa', type: 'credit', amount: 3000 },
    { id: 5, date: '2024-06-09', description: 'Payment at Kasa Resort', type: 'debit', amount: -1200 },
];

export default function Wallet() {
  const { user } = useAuth();
  const [currentBrand, setCurrentBrand] = useState(user?.brand === 'all' ? 'amka' : user?.brand || 'amka');
  const [balance, setBalance] = useState(12345);

  if (!user) return null;

  const brandNames = {
    amka: 'Café Amka',
    mawimbi: 'Mawimbi Restaurant',
    kasa: 'Kasa Resort'
  };

  const canSwitchBrands = user.role === 'super_admin';
  const currentBrandName = brandNames[currentBrand as keyof typeof brandNames];
  
  const handleTopUp = () => {
    toast({
      title: 'Feature Coming Soon',
      description: 'Wallet top-up functionality will be available soon.',
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
          brandName="Customer Wallet"
          userRole={user.firstName + ' ' + user.lastName}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <WalletIcon className="h-8 w-8" />
              Wallet Management
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <Card className="glass-card border-glass">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Current Balance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-glass">KES {balance.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Available for use across all brands.</p>
                  </CardContent>
                </Card>

                <Card className="glass-card border-glass">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-glass"><DollarSign className="w-5 h-5"/>Top Up Wallet</CardTitle>
                    <CardDescription>Add funds to your wallet.</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <Input type="number" placeholder="Enter amount (KES)" />
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={handleTopUp}>
                      <Plus className="mr-2 h-4 w-4" /> Proceed to Top-up
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Card className="glass-card border-glass">
                  <CardHeader>
                    <CardTitle className="text-glass">Transaction History</CardTitle>
                    <CardDescription>View recent wallet activity.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[120px]">Date</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Amount (KES)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockTransactions.map((tx) => (
                          <TableRow key={tx.id}>
                            <TableCell className="font-medium text-muted-foreground">{tx.date}</TableCell>
                            <TableCell className="text-glass flex items-center gap-2">
                                {tx.type === 'credit' ? <ArrowUp className="h-4 w-4 text-green-500" /> : <ArrowDown className="h-4 w-4 text-red-500" />}
                                {tx.description}
                            </TableCell>
                            <TableCell className={`text-right font-semibold ${tx.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                                {tx.amount.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

