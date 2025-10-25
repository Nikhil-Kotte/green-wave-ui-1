import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, MapPin, CheckCircle, Clock, Package } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const CollectorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const pickups = [
    { id: 1, address: "123 Green St, Eco District", type: "Metal & Glass", time: "10:00 AM", status: "pending" },
    { id: 2, address: "456 Leaf Ave, Nature Zone", type: "Plastic", time: "11:30 AM", status: "pending" },
    { id: 3, address: "789 Recycle Rd, Earth City", type: "E-Waste", time: "2:00 PM", status: "completed" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              Collector Dashboard 🚛
            </h1>
            <p className="text-lg text-muted-foreground">
              Welcome, {user?.name}! Here are your assigned pickups
            </p>
          </div>
          <Truck className="text-primary/30 animate-float w-16 h-16 hidden md:block" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 glass-card animate-grow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Pickups</p>
                <p className="text-3xl font-bold text-primary">8</p>
              </div>
              <Package className="w-10 h-10 text-primary/20" />
            </div>
          </Card>
          <Card className="p-6 glass-card animate-grow" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold text-green-600">5</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-600/20" />
            </div>
          </Card>
          <Card className="p-6 glass-card animate-grow" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold text-orange-600">3</p>
              </div>
              <Clock className="w-10 h-10 text-orange-600/20" />
            </div>
          </Card>
          <Card className="p-6 glass-card animate-grow" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Collected</p>
                <p className="text-3xl font-bold text-accent">120 kg</p>
              </div>
              <Truck className="w-10 h-10 text-accent/20" />
            </div>
          </Card>
        </div>

        {/* Route Optimization */}
        <Card className="p-6 glass-card animate-grow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Optimized Route</h3>
            <Button 
              onClick={() => navigate("/route-management")}
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <MapPin className="w-4 h-4 mr-2" />
              View on Map
            </Button>
          </div>
          <p className="text-muted-foreground">
            Your optimized route covers 15.2 km with 8 pickup points. Estimated time: 4 hours 30 minutes.
          </p>
        </Card>

        {/* Assigned Pickups */}
        <Card className="p-6 glass-card">
          <h3 className="text-xl font-semibold mb-4">Assigned Pickups</h3>
          <div className="space-y-4">
            {pickups.map((pickup, index) => (
              <div
                key={pickup.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors animate-grow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-2 rounded-lg ${pickup.status === 'completed' ? 'bg-green-100' : 'bg-orange-100'}`}>
                    <Package className={`w-5 h-5 ${pickup.status === 'completed' ? 'text-green-600' : 'text-orange-600'}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{pickup.type}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {pickup.address}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {pickup.time}
                    </p>
                  </div>
                </div>
                {pickup.status === 'pending' ? (
                  <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                    Mark Collected
                  </Button>
                ) : (
                  <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Completed
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CollectorDashboard;