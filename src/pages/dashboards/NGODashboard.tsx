import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Package, TrendingUp, CheckCircle, X } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const NGODashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const donations = [
    { id: 1, item: "Old Laptops (5 units)", donor: "Tech Company Inc.", location: "Business District", status: "pending" },
    { id: 2, item: "Metal Furniture", donor: "John Doe", location: "Green Avenue", status: "pending" },
    { id: 3, item: "Reusable Plastic Containers", donor: "EcoMart", location: "Market Street", status: "accepted" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              NGO & Recycling Partner ♻️
            </h1>
            <p className="text-lg text-muted-foreground">
              Welcome, {user?.name}! Manage donations and recycling operations
            </p>
          </div>
          <Heart className="text-secondary/30 animate-float w-16 h-16 hidden md:block" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 glass-card animate-grow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Donations</p>
                <p className="text-3xl font-bold text-primary">156</p>
              </div>
              <Package className="w-10 h-10 text-primary/20" />
            </div>
          </Card>
          <Card className="p-6 glass-card animate-grow" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Items Received</p>
                <p className="text-3xl font-bold text-accent">890 kg</p>
              </div>
              <CheckCircle className="w-10 h-10 text-accent/20" />
            </div>
          </Card>
          <Card className="p-6 glass-card animate-grow" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Items Recycled</p>
                <p className="text-3xl font-bold text-green-600">750 kg</p>
              </div>
              <TrendingUp className="w-10 h-10 text-green-600/20" />
            </div>
          </Card>
          <Card className="p-6 glass-card animate-grow" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">CO₂ Saved</p>
                <p className="text-3xl font-bold text-secondary">2.5 ton</p>
              </div>
              <Heart className="w-10 h-10 text-secondary/20" />
            </div>
          </Card>
        </div>

        {/* Impact Tracker */}
        <Card className="p-6 glass-card animate-grow">
          <h3 className="text-xl font-semibold mb-4">Environmental Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-primary/10">
              <p className="text-3xl font-bold text-primary mb-2">2,450</p>
              <p className="text-sm text-muted-foreground">Items Diverted from Landfill</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-accent/10">
              <p className="text-3xl font-bold text-accent mb-2">15</p>
              <p className="text-sm text-muted-foreground">Families Helped</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary/10">
              <p className="text-3xl font-bold text-secondary mb-2">98%</p>
              <p className="text-sm text-muted-foreground">Recycling Rate</p>
            </div>
          </div>
        </Card>

        {/* Available Donations */}
        <Card className="p-6 glass-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Available Donations</h3>
            <Button 
              onClick={() => navigate("/donation-management")}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Manage All
            </Button>
          </div>
          <div className="space-y-4">
            {donations.map((donation, index) => (
              <div
                key={donation.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors animate-grow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-2 rounded-lg ${donation.status === 'accepted' ? 'bg-green-100' : 'bg-orange-100'}`}>
                    <Package className={`w-5 h-5 ${donation.status === 'accepted' ? 'text-green-600' : 'text-orange-600'}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{donation.item}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      From: {donation.donor}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Location: {donation.location}
                    </p>
                  </div>
                </div>
                {donation.status === 'pending' ? (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                      <X className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Accept
                    </Button>
                  </div>
                ) : (
                  <span className="text-sm text-green-600 font-medium">Accepted</span>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NGODashboard;