import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, MapPin, Clock, CheckCircle, Package, Users, Navigation } from "lucide-react";

interface Route {
  id: string;
  name: string;
  collector: string;
  pickups: number;
  distance: string;
  status: "active" | "completed" | "planned";
  stops: Array<{ address: string; wasteType: string; status: string }>;
}

const RouteManagement = () => {
  const [routes] = useState<Route[]>([
    {
      id: "RT-001",
      name: "Green District Morning Route",
      collector: "Mike Collector",
      pickups: 12,
      distance: "15.2 km",
      status: "active",
      stops: [
        { address: "123 Green St", wasteType: "Plastic", status: "completed" },
        { address: "456 Eco Ave", wasteType: "Metal", status: "in-progress" },
        { address: "789 Leaf Rd", wasteType: "E-Waste", status: "pending" },
      ],
    },
    {
      id: "RT-002",
      name: "Eco Valley Afternoon Route",
      collector: "Sarah Driver",
      pickups: 8,
      distance: "10.5 km",
      status: "active",
      stops: [
        { address: "321 Nature Blvd", wasteType: "Paper", status: "completed" },
        { address: "654 Earth St", wasteType: "Glass", status: "in-progress" },
      ],
    },
    {
      id: "RT-003",
      name: "Central City Evening Route",
      collector: "John Transport",
      pickups: 15,
      distance: "18.7 km",
      status: "planned",
      stops: [
        { address: "111 Recycle Way", wasteType: "Mixed", status: "pending" },
        { address: "222 Green Path", wasteType: "Organic", status: "pending" },
      ],
    },
  ]);

  const statusConfig = {
    active: { color: "bg-blue-500/10 text-blue-600 border-blue-500/20", label: "Active" },
    completed: { color: "bg-green-500/10 text-green-600 border-green-500/20", label: "Completed" },
    planned: { color: "bg-orange-500/10 text-orange-600 border-orange-500/20", label: "Planned" },
  };

  const stopStatusIcons = {
    completed: <CheckCircle className="w-4 h-4 text-green-600" />,
    "in-progress": <Truck className="w-4 h-4 text-blue-600 animate-wave" />,
    pending: <Clock className="w-4 h-4 text-orange-600" />,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              Route Management 🚛
            </h1>
            <p className="text-lg text-muted-foreground">
              Optimize and monitor collection routes in real-time
            </p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
            <Navigation className="w-4 h-4 mr-2" />
            Optimize Routes
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 glass-card animate-grow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Routes</p>
                <p className="text-3xl font-bold text-blue-600">2</p>
              </div>
              <Truck className="w-10 h-10 text-blue-600/20" />
            </div>
          </Card>
          <Card className="p-6 glass-card animate-grow" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Pickups</p>
                <p className="text-3xl font-bold text-primary">35</p>
              </div>
              <Package className="w-10 h-10 text-primary/20" />
            </div>
          </Card>
          <Card className="p-6 glass-card animate-grow" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Distance Today</p>
                <p className="text-3xl font-bold text-accent">44.4 km</p>
              </div>
              <Navigation className="w-10 h-10 text-accent/20" />
            </div>
          </Card>
          <Card className="p-6 glass-card animate-grow" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Collectors</p>
                <p className="text-3xl font-bold text-secondary">3</p>
              </div>
              <Users className="w-10 h-10 text-secondary/20" />
            </div>
          </Card>
        </div>

        {/* Routes List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Active & Planned Routes</h2>
          {routes.map((route, index) => (
            <Card
              key={route.id}
              className="p-6 glass-card hover:shadow-lg transition-all duration-300 animate-grow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Route Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Truck className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold">{route.name}</h3>
                      <Badge className={statusConfig[route.status].color}>
                        {statusConfig[route.status].label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {route.collector}
                      </span>
                      <span className="flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        {route.pickups} pickups
                      </span>
                      <span className="flex items-center gap-1">
                        <Navigation className="w-4 h-4" />
                        {route.distance}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  View Map
                </Button>
              </div>

              {/* Route Stops */}
              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-semibold mb-3">Route Stops</h4>
                <div className="space-y-2">
                  {route.stops.map((stop, stopIndex) => (
                    <div
                      key={stopIndex}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {stopStatusIcons[stop.status as keyof typeof stopStatusIcons]}
                        <div>
                          <p className="font-medium text-sm">{stop.address}</p>
                          <p className="text-xs text-muted-foreground">{stop.wasteType}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground capitalize">
                        {stop.status.replace("-", " ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Route Progress */}
              {route.status === "active" && (
                <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-blue-600">Route Progress</p>
                    <p className="text-sm font-semibold text-blue-600">
                      {Math.round((route.stops.filter(s => s.status === "completed").length / route.stops.length) * 100)}%
                    </p>
                  </div>
                  <div className="h-2 bg-blue-500/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-500"
                      style={{
                        width: `${(route.stops.filter(s => s.status === "completed").length / route.stops.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Optimization Insights */}
        <Card className="p-6 glass-card bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-primary" />
            Route Optimization Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-background/50">
              <p className="text-sm text-muted-foreground mb-1">Fuel Saved</p>
              <p className="text-2xl font-bold text-green-600">15%</p>
              <p className="text-xs text-muted-foreground mt-1">vs. last month</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
              <p className="text-sm text-muted-foreground mb-1">Time Efficiency</p>
              <p className="text-2xl font-bold text-blue-600">+22%</p>
              <p className="text-xs text-muted-foreground mt-1">faster routes</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
              <p className="text-sm text-muted-foreground mb-1">CO₂ Reduced</p>
              <p className="text-2xl font-bold text-accent">85 kg</p>
              <p className="text-xs text-muted-foreground mt-1">this week</p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RouteManagement;
