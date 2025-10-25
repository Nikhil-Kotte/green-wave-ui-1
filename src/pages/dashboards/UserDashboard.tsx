import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Package, Heart, BarChart3, Leaf, Recycle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: <Calendar className="w-8 h-8 text-primary" />,
      title: "Schedule Pickup",
      description: "Request waste collection at your convenience",
      action: "Schedule Now",
      path: "/schedule-pickup",
    },
    {
      icon: <Package className="w-8 h-8 text-accent" />,
      title: "Track Requests",
      description: "Monitor your pickup status in real-time",
      action: "View Status",
      path: "/track-requests",
    },
    {
      icon: <Heart className="w-8 h-8 text-secondary" />,
      title: "Donate Items",
      description: "Give reusable items to NGO partners",
      action: "Donate Now",
      path: "/donate-items",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      title: "My Impact",
      description: "See your environmental contribution",
      action: "View Report",
      path: "/my-impact",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              Welcome, {user?.name}! 👋
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your waste pickups and track your environmental impact
            </p>
          </div>
          <div className="hidden md:flex gap-4">
            <Leaf className="text-primary/30 animate-float w-12 h-12" />
            <Recycle className="text-accent/30 animate-float w-12 h-12" style={{ animationDelay: "1s" }} />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 glass-card animate-grow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Pickups</p>
                <p className="text-3xl font-bold text-primary">12</p>
              </div>
              <Package className="w-10 h-10 text-primary/20" />
            </div>
          </Card>
          <Card className="p-6 glass-card animate-grow" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Waste Recycled</p>
                <p className="text-3xl font-bold text-accent">45 kg</p>
              </div>
              <Recycle className="w-10 h-10 text-accent/20" />
            </div>
          </Card>
          <Card className="p-6 glass-card animate-grow" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Carbon Saved</p>
                <p className="text-3xl font-bold text-secondary">89 kg</p>
              </div>
              <Leaf className="w-10 h-10 text-secondary/20" />
            </div>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 glass-card hover:shadow-lg transition-all duration-300 group animate-grow" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <Button 
                    onClick={() => navigate(feature.path)}
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    {feature.action}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="p-6 glass-card">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 animate-grow">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Plastic & Metal Pickup</p>
                  <p className="text-sm text-muted-foreground">Completed on Oct 20, 2025</p>
                </div>
              </div>
              <span className="text-sm text-green-600 font-medium">Completed</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 animate-grow" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-medium">E-Waste Collection</p>
                  <p className="text-sm text-muted-foreground">Scheduled for Oct 28, 2025</p>
                </div>
              </div>
              <span className="text-sm text-blue-600 font-medium">Pending</span>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;