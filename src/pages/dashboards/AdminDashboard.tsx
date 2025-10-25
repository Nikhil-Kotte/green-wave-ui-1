import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserManagement } from "@/components/UserManagement";
import { Users, Package, TrendingUp, MapPin, BarChart3 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              Admin Dashboard 🏢
            </h1>
            <p className="text-lg text-muted-foreground">
              Welcome, {user?.name}! Manage the entire waste management system
            </p>
          </div>
          <BarChart3 className="text-primary/30 animate-float w-16 h-16 hidden md:block" />
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 glass-card animate-grow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-3xl font-bold text-primary">1,234</p>
              </div>
              <Users className="w-10 h-10 text-primary/20" />
            </div>
          </Card>
          <Card className="p-6 glass-card animate-grow" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Pickups</p>
                <p className="text-3xl font-bold text-accent">45</p>
              </div>
              <Package className="w-10 h-10 text-accent/20" />
            </div>
          </Card>
          <Card className="p-6 glass-card animate-grow" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Recycled</p>
                <p className="text-3xl font-bold text-green-600">12.5 ton</p>
              </div>
              <TrendingUp className="w-10 h-10 text-green-600/20" />
            </div>
          </Card>
          <Card className="p-6 glass-card animate-grow" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Routes</p>
                <p className="text-3xl font-bold text-secondary">8</p>
              </div>
              <MapPin className="w-10 h-10 text-secondary/20" />
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            onClick={() => navigate("/route-management")}
            className="p-6 glass-card hover:shadow-lg transition-all duration-300 group cursor-pointer animate-grow"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Route Optimization</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Optimize collection routes to reduce fuel consumption and improve efficiency
            </p>
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Optimize Routes
            </Button>
          </Card>

          <Card 
            onClick={() => navigate("/system-analytics")}
            className="p-6 glass-card hover:shadow-lg transition-all duration-300 group cursor-pointer animate-grow"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold">Analytics Report</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              View detailed analytics on waste collection and recycling trends
            </p>
            <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              View Analytics
            </Button>
          </Card>

          <Card 
            onClick={() => navigate("/track-requests")}
            className="p-6 glass-card hover:shadow-lg transition-all duration-300 group cursor-pointer animate-grow"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                <Package className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold">Monitor Pickups</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Real-time monitoring of all active waste collection operations
            </p>
            <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
              Monitor Now
            </Button>
          </Card>
        </div>

        {/* User Management */}
        <UserManagement />
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;