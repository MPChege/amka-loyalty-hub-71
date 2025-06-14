
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Activity,
  Settings, 
  Users, 
  Calendar,
  Database,
  Bell,
  Shield,
  Cog,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Wallet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

const sidebarItems = [
  {
    title: 'Analytics',
    icon: Activity,
    href: '/',
    roles: ['super_admin', 'admin', 'manager']
  },
  {
    title: 'User Management',
    icon: Users,
    href: '/users',
    roles: ['super_admin', 'admin', 'manager']
  },
  {
    title: 'Wallet',
    icon: Wallet,
    href: '/wallet',
    roles: ['super_admin', 'admin', 'manager']
  },
  {
    title: 'Loyalty Program',
    icon: Database,
    href: '/loyalty',
    roles: ['super_admin', 'admin', 'manager']
  },
  {
    title: 'Campaigns',
    icon: Bell,
    href: '/campaigns',
    roles: ['super_admin', 'admin', 'manager']
  },
  {
    title: 'Bookings & Orders',
    icon: Calendar,
    href: '/orders',
    roles: ['super_admin', 'admin', 'manager', 'waiter']
  },
  {
    title: 'Security',
    icon: Shield,
    href: '/security',
    roles: ['super_admin', 'admin']
  },
  {
    title: 'System Settings',
    icon: Cog,
    href: '/settings',
    roles: ['super_admin', 'admin']
  }
];

const brands = [
  { id: 'amka', name: 'Café Amka', color: 'coffee' },
  { id: 'mawimbi', name: 'Mawimbi Restaurant', color: 'emerald' },
  { id: 'kasa', name: 'Kasa Resort', color: 'gold' }
];

interface SidebarProps {
  userRole: 'super_admin' | 'admin' | 'manager' | 'waiter';
  currentBrand: string;
  onBrandChange: (brand: string) => void;
}

export default function Sidebar({ userRole, currentBrand, onBrandChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  const filteredItems = sidebarItems.filter(item => 
    item.roles.includes(userRole)
  );

  const currentBrandInfo = brands.find(b => b.id === currentBrand);
  const canSwitchBrands = userRole === 'super_admin';

  return (
    <div className={cn(
      "bg-sidebar border-r border-sidebar-border h-screen transition-all duration-300 flex flex-col shadow-xl",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Brand Header */}
      <div className="p-4 border-b border-sidebar-border bg-gradient-to-r from-slate-800 via-indigo-700 to-violet-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex-1">
              <h2 className="text-lg font-bold text-white drop-shadow">{currentBrandInfo?.name}</h2>
              <p className="text-sm text-white/70">
                {userRole === 'super_admin' ? 'Global Admin' : 
                 userRole === 'admin' ? 'Brand Admin' :
                 userRole === 'manager' ? 'Manager' : 'Staff'}
              </p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white hover:bg-indigo-600"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Brand Switcher - Only for Super Admin */}
      {!isCollapsed && canSwitchBrands && (
        <div className="p-4 border-b border-sidebar-border">
          <label className="text-sm font-medium text-sidebar-foreground/80 mb-2 block">
            Switch Brand
          </label>
          <select 
            value={currentBrand}
            onChange={(e) => onBrandChange(e.target.value)}
            className="w-full bg-sidebar-accent border border-sidebar-border rounded-lg px-3 py-2 text-sidebar-foreground text-sm"
          >
            {brands.map(brand => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Fixed Brand Display - For non-super admins */}
      {!isCollapsed && !canSwitchBrands && (
        <div className="p-4 border-b border-sidebar-border">
          <label className="text-sm font-medium text-sidebar-foreground/80 mb-2 block">
            Your Brand
          </label>
          <div className="w-full bg-sidebar-accent/50 border border-sidebar-border rounded-lg px-3 py-2 text-sidebar-foreground text-sm">
            {currentBrandInfo?.name}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-3">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition-all duration-200 shadow-none",
                    "hover:bg-indigo-50 hover:text-indigo-600",
                    isActive && "bg-indigo-600/90 text-white shadow-lg"
                  )}
                  style={{ boxShadow: isActive ? '0 4px 18px -4px #6366f1aa' : undefined }}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="font-semibold">{item.title}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-sidebar-border bg-gradient-to-b from-violet-700/70 to-slate-900">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-400 rounded-full flex items-center justify-center shadow">
            <span className="text-white text-sm font-bold">
              {userRole === 'super_admin' ? 'SA' : 
               userRole === 'admin' ? 'A' : 
               userRole === 'manager' ? 'M' : 'W'}
            </span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {userRole === 'super_admin' ? 'Super Admin' :
                 userRole === 'admin' ? 'Brand Admin' :
                 userRole === 'manager' ? 'Manager' : 'Staff'}
              </p>
              <p className="text-xs text-white/70 truncate">
                {currentBrandInfo?.name}
              </p>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-4 w-full flex items-center gap-2 text-white/90 hover:bg-indigo-700 hover:text-white font-semibold"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        )}
        {isCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="mt-4 w-8 h-8 flex items-center justify-center text-white hover:bg-indigo-700"
            onClick={logout}
            aria-label="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
