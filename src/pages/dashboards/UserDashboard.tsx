import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Package, Heart, BarChart3, Leaf, Recycle, Sparkles } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { pickupService } from "@/services/pickupService";

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [recentPickups, setRecentPickups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch user stats
      const statsData = await pickupService.getUserStats();
      setStats(statsData);

      // Fetch recent pickups
      const pickupsData = await pickupService.getPickups({ limit: 5 });
      setRecentPickups(pickupsData.pickups || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      pending: { label: 'Pending', className: 'text-blue-600 bg-blue-100' },
      assigned: { label: 'Assigned', className: 'text-orange-600 bg-orange-100' },
      'in-progress': { label: 'In Progress', className: 'text-yellow-600 bg-yellow-100' },
      completed: { label: 'Completed', className: 'text-green-600 bg-green-100' },
      cancelled: { label: 'Cancelled', className: 'text-red-600 bg-red-100' }
    };
    return statusMap[status] || statusMap.pending;
  };

  const features = [
    {
      icon: <Calendar className="w-8 h-8 text-primary" />,
      title: "Schedule Pickup",
      description: "Request waste collection at your convenience",
      action: "Schedule Now",
      path: "/schedule-pickup",
      delay: "0.1s",
    },
    {
      icon: <Package className="w-8 h-8 text-accent" />,
      title: "Track Requests",
      description: "Monitor your pickup status in real-time",
      action: "View Status",
      path: "/track-requests",
      delay: "0.15s",
    },
    {
      icon: <Heart className="w-8 h-8 text-secondary" />,
      title: "Donate Items",
      description: "Give reusable items to NGO partners",
      action: "Donate Now",
      path: "/donate-items",
      delay: "0.2s",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      title: "My Impact",
      description: "See your environmental contribution",
      action: "View Report",
      path: "/my-impact",
      delay: "0.25s",
    },
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between animate-grow">
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
            <Sparkles className="text-secondary/30 animate-float w-12 h-12" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 glass-card animate-grow hover:shadow-xl transition-all duration-300 hover:scale-105" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Pickups</p>
                <p className="text-3xl font-bold text-primary">{stats?.totalPickups || 0}</p>
                <p className="text-xs text-muted-foreground mt-1">All time</p>
              </div>
              <Package className="w-10 h-10 text-primary/20" />
            </div>
          </Card>
          <Card className="p-6 glass-card animate-grow hover:shadow-xl transition-all duration-300 hover:scale-105" style={{ animationDelay: "0.15s" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Waste Collected</p>
                <p className="text-3xl font-bold text-accent">{stats?.totalWeight || 0} kg</p>
                <p className="text-xs text-muted-foreground mt-1">Total collected</p>
              </div>
              <Recycle className="w-10 h-10 text-accent/20" />
            </div>
          </Card>
          <Card className="p-6 glass-card animate-grow hover:shadow-xl transition-all duration-300 hover:scale-105" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Requests</p>
                <p className="text-3xl font-bold text-secondary">{stats?.activePickups || 0}</p>
                <p className="text-xs text-muted-foreground mt-1">In progress</p>
              </div>
              <Leaf className="w-10 h-10 text-secondary/20" />
            </div>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: <Calendar className="w-8 h-8 text-primary" />,
              title: "Schedule Pickup",
              description: "Request waste collection at your convenience",
              action: "Schedule Now",
              path: "/schedule-pickup",
              delay: "0.1s",
            },
            {
              icon: <Package className="w-8 h-8 text-accent" />,
              title: "Track Requests",
              description: "Monitor your pickup status in real-time",
              action: "View Status",
              path: "/track-requests",
              delay: "0.15s",
            },
            {
              icon: <Heart className="w-8 h-8 text-secondary" />,
              title: "Donate Items",
              description: "Give reusable items to NGO partners",
              action: "Donate Now",
              path: "/donate-items",
              delay: "0.2s",
            },
            {
              icon: <BarChart3 className="w-8 h-8 text-primary" />,
              title: "My Impact",
              description: "See your environmental contribution",
              action: "View Report",
              path: "/my-impact",
              delay: "0.25s",
            },
          ].map((feature, index) => (
            <Card key={index} className="p-6 glass-card hover:shadow-2xl transition-all duration-500 group animate-grow hover:scale-105" style={{ animationDelay: feature.delay }}>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <Button 
                    onClick={() => navigate(feature.path)}
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group-hover:shadow-lg"
                  >
                    {feature.action}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="p-6 glass-card animate-grow" style={{ animationDelay: "0.3s" }}>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Recent Activity
          </h3>
          {recentPickups.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No recent activity yet. Schedule your first pickup!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentPickups.map((pickup, index) => {
                const statusInfo = getStatusBadge(pickup.status);
                return (
                  <div 
                    key={pickup.id} 
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 animate-grow hover:bg-muted transition-all duration-300 hover:scale-102" 
                    style={{ animationDelay: `${0.35 + index * 0.05}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium capitalize">{pickup.wasteType}</p>
                        <p className="text-sm text-muted-foreground">
                          {pickup.estimatedWeight ? `${pickup.estimatedWeight}kg - ` : ''}
                          {new Date(pickup.pickupDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${statusInfo.className}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;