
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import LoginForm from "@/components/LoginForm";
import Dashboard from "@/components/Dashboard";
import UserManagement from "@/pages/UserManagement";
import LoyaltyProgram from "@/pages/LoyaltyProgram";
import Campaigns from "@/pages/Campaigns";
import Orders from "@/pages/Orders";
import Security from "@/pages/Security";
import Settings from "@/pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const { user, login, isLoading, error } = useAuth();

  if (!user) {
    return <LoginForm onLogin={login} error={error || undefined} isLoading={isLoading} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/loyalty" element={<LoyaltyProgram />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/security" element={<Security />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
