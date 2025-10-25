import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, MapPin, Clock, CheckCircle, Truck, Calendar, Plus } from "lucide-react";

interface Request {
  id: string;
  wasteType: string;
  date: string;
  time: string;
  address: string;
  weight: string;
  status: "pending" | "in-progress" | "completed" | "cancelled";
  collector?: string;
}

const TrackRequests = () => {
  const navigate = useNavigate();
  const [requests] = useState<Request[]>([
    {
      id: "REQ-001",
      wasteType: "Plastic & Bottles",
      date: "Oct 28, 2025",
      time: "Morning (8 AM - 12 PM)",
      address: "123 Green Street, Eco City",
      weight: "8 kg",
      status: "in-progress",
      collector: "Mike Collector",
    },
    {
      id: "REQ-002",
      wasteType: "E-Waste",
      date: "Oct 30, 2025",
      time: "Afternoon (12 PM - 4 PM)",
      address: "123 Green Street, Eco City",
      weight: "12 kg",
      status: "pending",
    },
    {
      id: "REQ-003",
      wasteType: "Paper & Cardboard",
      date: "Oct 20, 2025",
      time: "Morning (8 AM - 12 PM)",
      address: "123 Green Street, Eco City",
      weight: "15 kg",
      status: "completed",
      collector: "John Driver",
    },
  ]);

  const statusConfig = {
    pending: { color: "bg-orange-500/10 text-orange-600 border-orange-500/20", label: "Pending", icon: Clock },
    "in-progress": { color: "bg-blue-500/10 text-blue-600 border-blue-500/20", label: "In Progress", icon: Truck },
    completed: { color: "bg-green-500/10 text-green-600 border-green-500/20", label: "Completed", icon: CheckCircle },
    cancelled: { color: "bg-red-500/10 text-red-600 border-red-500/20", label: "Cancelled", icon: Package },
  };

  const getStatusBadge = (status: Request["status"]) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const activeRequests = requests.filter(r => r.status !== "completed" && r.status !== "cancelled");
  const completedRequests = requests.filter(r => r.status === "completed" || r.status === "cancelled");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              Track Requests 📦
            </h1>
            <p className="text-lg text-muted-foreground">
              Monitor your pickup requests in real-time
            </p>
          </div>
          <Button
            onClick={() => navigate("/schedule-pickup")}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Pickup
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 glass-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <p className="text-3xl font-bold text-primary">{requests.length}</p>
              </div>
              <Package className="w-10 h-10 text-primary/20" />
            </div>
          </Card>
          <Card className="p-6 glass-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-3xl font-bold text-blue-600">{activeRequests.length}</p>
              </div>
              <Truck className="w-10 h-10 text-blue-600/20" />
            </div>
          </Card>
          <Card className="p-6 glass-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold text-green-600">
                  {completedRequests.filter(r => r.status === "completed").length}
                </p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-600/20" />
            </div>
          </Card>
        </div>

        {/* Active Requests */}
        {activeRequests.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Active Requests</h2>
            {activeRequests.map((request, index) => (
              <Card
                key={request.id}
                className="p-6 glass-card hover:shadow-lg transition-all duration-300 animate-grow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{request.wasteType}</h3>
                        {getStatusBadge(request.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Request ID: {request.id}</p>
                      {request.collector && (
                        <p className="text-sm text-accent font-medium">
                          Assigned to: {request.collector}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">{request.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-medium">{request.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Address:</span>
                    <span className="font-medium">{request.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Weight:</span>
                    <span className="font-medium">{request.weight}</span>
                  </div>
                </div>

                {request.status === "in-progress" && (
                  <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <p className="text-sm text-blue-600 flex items-center gap-2">
                      <Truck className="w-4 h-4 animate-wave" />
                      Collector is on the way! Expected arrival in 15-20 minutes.
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Completed Requests */}
        {completedRequests.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Request History</h2>
            {completedRequests.map((request, index) => (
              <Card
                key={request.id}
                className="p-6 glass-card opacity-80 hover:opacity-100 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 rounded-lg bg-muted">
                      <Package className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{request.wasteType}</h3>
                        {getStatusBadge(request.status)}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <p className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {request.date}
                        </p>
                        <p className="flex items-center gap-1">
                          <Package className="w-3 h-3" />
                          {request.weight}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {requests.length === 0 && (
          <Card className="p-12 glass-card text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No pickup requests yet</h3>
            <p className="text-muted-foreground mb-6">
              Schedule your first waste pickup to get started
            </p>
            <Button
              onClick={() => navigate("/schedule-pickup")}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Schedule Pickup
            </Button>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TrackRequests;