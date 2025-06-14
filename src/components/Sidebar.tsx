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
  LogOut // Added LogOut icon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

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
  const { logout } = useAuth(); // Grab logout function

  const filteredItems = sidebarItems.filter(item => 
    item.roles.includes(userRole)
  );

  const currentBrandInfo = brands.find(b => b.id === currentBrand);
  const canSwitchBrands = userRole === 'super_admin';

  return (
    <div className={cn(
      "bg-sidebar border-r border-sidebar-border h-screen transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Brand Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-sidebar-foreground">
                {currentBrandInfo?.name}
              </h2>
              <p className="text-sm text-sidebar-foreground/60">
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
            className="text-sidebar-foreground hover:bg-sidebar-accent"
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
        <ul className="space-y-2">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200",
                    "hover:bg-sidebar-accent text-sidebar-foreground",
                    isActive && "bg-sidebar-primary text-sidebar-primary-foreground"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="font-medium">{item.title}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sidebar-primary rounded-full flex items-center justify-center">
            <span className="text-sidebar-primary-foreground text-sm font-medium">
              {userRole === 'super_admin' ? 'SA' : 
               userRole === 'admin' ? 'A' : 
               userRole === 'manager' ? 'M' : 'W'}
            </span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {userRole === 'super_admin' ? 'Super Admin' :
                 userRole === 'admin' ? 'Brand Admin' :
                 userRole === 'manager' ? 'Manager' : 'Staff'}
              </p>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                {currentBrandInfo?.name}
              </p>
            </div>
          )}
        </div>
        {/* Sign Out Button */}
        {!isCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-4 w-full flex items-center gap-2 text-sidebar-foreground hover:bg-destructive/10"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        )}
        {/* Optionally, if the sidebar is collapsed, show icon-only sign out */}
        {isCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="mt-4 w-8 h-8 flex items-center justify-center text-sidebar-foreground hover:bg-destructive/10"
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
