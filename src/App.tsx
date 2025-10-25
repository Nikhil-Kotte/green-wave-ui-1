import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import SchedulePickup from "./pages/SchedulePickup";
import TrackRequests from "./pages/TrackRequests";
import DonateItems from "./pages/DonateItems";
import MyImpact from "./pages/MyImpact";
import RouteManagement from "./pages/RouteManagement";
import DonationManagement from "./pages/DonationManagement";
import SystemAnalytics from "./pages/SystemAnalytics";
import HoverReceiver from "@/visual-edits/VisualEditsMessenger";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <HoverReceiver />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schedule-pickup" element={<SchedulePickup />} />
            <Route path="/track-requests" element={<TrackRequests />} />
            <Route path="/donate-items" element={<DonateItems />} />
            <Route path="/my-impact" element={<MyImpact />} />
            <Route path="/route-management" element={<RouteManagement />} />
            <Route path="/donation-management" element={<DonationManagement />} />
            <Route path="/system-analytics" element={<SystemAnalytics />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;