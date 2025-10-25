import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Package, CheckCircle, X, MapPin, Phone, User } from "lucide-react";

interface Donation {
  id: string;
  itemName: string;
  itemType: string;
  donor: string;
  contact: string;
  address: string;
  condition: string;
  quantity: number;
  status: "pending" | "accepted" | "collected" | "rejected";
  date: string;
}

const DonationManagement = () => {
  const [donations, setDonations] = useState<Donation[]>([
    {
      id: "DN-001",
      itemName: "Old Laptops",
      itemType: "Electronics",
      donor: "Tech Company Inc.",
      contact: "+1 (555) 123-4567",
      address: "123 Business District, Tech City",
      condition: "Good",
      quantity: 5,
      status: "pending",
      date: "Oct 26, 2025",
    },
    {
      id: "DN-002",
      itemName: "Metal Furniture",
      itemType: "Furniture",
      donor: "John Doe",
      contact: "+1 (555) 987-6543",
      address: "456 Green Avenue, Eco City",
      condition: "Excellent",
      quantity: 3,
      status: "pending",
      date: "Oct 27, 2025",
    },
    {
      id: "DN-003",
      itemName: "Winter Clothing",
      itemType: "Clothing",
      donor: "Sarah Green",
      contact: "+1 (555) 456-7890",
      address: "789 Leaf Street, Nature Town",
      condition: "Good",
      quantity: 20,
      status: "accepted",
      date: "Oct 25, 2025",
    },
    {
      id: "DN-004",
      itemName: "Children Books",
      itemType: "Books",
      donor: "Emma Library",
      contact: "+1 (555) 321-0987",
      address: "321 Reading Road, Book City",
      condition: "Excellent",
      quantity: 50,
      status: "collected",
      date: "Oct 20, 2025",
    },
  ]);

  const statusConfig = {
    pending: { color: "bg-orange-500/10 text-orange-600 border-orange-500/20", label: "Pending Review" },
    accepted: { color: "bg-blue-500/10 text-blue-600 border-blue-500/20", label: "Accepted" },
    collected: { color: "bg-green-500/10 text-green-600 border-green-500/20", label: "Collected" },
    rejected: { color: "bg-red-500/10 text-red-600 border-red-500/20", label: "Rejected" },
  };

  const handleAccept = (id: string) => {
    setDonations(donations.map(d => d.id === id ? { ...d, status: "accepted" } : d));
  };

  const handleReject = (id: string) => {
    setDonations(donations.map(d => d.id === id ? { ...d, status: "rejected" } : d));
  };

  const handleMarkCollected = (id: string) => {
    setDonations(donations.map(d => d.id === id ? { ...d, status: "collected" } : d));
  };

  const pendingDonations = donations.filter(d => d.status === "pending");
  const acceptedDonations = donations.filter(d => d.status === "accepted");
  const completedDonations = donations.filter(d => d.status === "collected" || d.status === "rejected");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              Donation Management ❤️
            </h1>
            <p className="text-lg text-muted-foreground">
              Review and manage incoming donation requests
            </p>
          </div>
          <div className="hidden md:flex gap-4">
            <Heart className="text-secondary/30 animate-float w-12 h-12" />
            <Package className="text-primary/30 animate-float w-12 h-12" style={{ animationDelay: "1s" }} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 glass-card animate-grow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Donations</p>
                <p className="text-3xl font-bold text-primary">{donations.length}</p>
              </div>
              <Package className="w-10 h-10 text-primary/20" />
            </div>
          </Card>
          <Card className="p-6 glass-card animate-grow" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold text-orange-600">{pendingDonations.length}</p>
              </div>
              <Package className="w-10 h-10 text-orange-600/20" />
            </div>
          </Card>
          <Card className="p-6 glass-card animate-grow" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Accepted</p>
                <p className="text-3xl font-bold text-blue-600">{acceptedDonations.length}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-blue-600/20" />
            </div>
          </Card>
          <Card className="p-6 glass-card animate-grow" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Collected</p>
                <p className="text-3xl font-bold text-green-600">
                  {donations.filter(d => d.status === "collected").length}
                </p>
              </div>
              <Heart className="w-10 h-10 text-green-600/20" />
            </div>
          </Card>
        </div>

        {/* Pending Donations */}
        {pendingDonations.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Pending Review</h2>
            {pendingDonations.map((donation, index) => (
              <Card
                key={donation.id}
                className="p-6 glass-card hover:shadow-lg transition-all duration-300 animate-grow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 rounded-lg bg-secondary/10">
                      <Package className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{donation.itemName}</h3>
                        <Badge className={statusConfig[donation.status].color}>
                          {statusConfig[donation.status].label}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                        <p className="flex items-center gap-1">
                          <Package className="w-3 h-3" />
                          Type: {donation.itemType}
                        </p>
                        <p className="flex items-center gap-1">
                          <Package className="w-3 h-3" />
                          Qty: {donation.quantity} items
                        </p>
                        <p className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Condition: {donation.condition}
                        </p>
                        <p className="flex items-center gap-1">
                          Date: {donation.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/50 mb-4">
                  <h4 className="text-sm font-semibold mb-2">Donor Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <p className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      {donation.donor}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      {donation.contact}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      {donation.address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleReject(donation.id)}
                    className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleAccept(donation.id)}
                    className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Accept Donation
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Accepted Donations */}
        {acceptedDonations.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Accepted - Ready for Pickup</h2>
            {acceptedDonations.map((donation, index) => (
              <Card
                key={donation.id}
                className="p-6 glass-card hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 rounded-lg bg-blue-500/10">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{donation.itemName}</h3>
                        <Badge className={statusConfig[donation.status].color}>
                          {statusConfig[donation.status].label}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <p>{donation.itemType} - {donation.quantity} items</p>
                        <p className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {donation.address}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleMarkCollected(donation.id)}
                    className="bg-gradient-to-r from-green-600 to-green-500 hover:opacity-90"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Collected
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Completed Donations */}
        {completedDonations.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Donation History</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedDonations.map((donation, index) => (
                <Card
                  key={donation.id}
                  className="p-4 glass-card opacity-80 hover:opacity-100 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <Package className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{donation.itemName}</h4>
                        <Badge className={statusConfig[donation.status].color}>
                          {statusConfig[donation.status].label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{donation.donor}</p>
                      <p className="text-xs text-muted-foreground mt-1">{donation.date}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Impact Summary */}
        <Card className="p-6 glass-card bg-gradient-to-r from-secondary/10 to-primary/10 border-secondary/20">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-secondary" />
            This Month's Impact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-background/50">
              <p className="text-3xl font-bold text-primary mb-1">
                {donations.filter(d => d.status === "collected").length}
              </p>
              <p className="text-sm text-muted-foreground">Items Collected</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <p className="text-3xl font-bold text-accent mb-1">15</p>
              <p className="text-sm text-muted-foreground">Families Helped</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <p className="text-3xl font-bold text-secondary mb-1">95%</p>
              <p className="text-sm text-muted-foreground">Reuse Rate</p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DonationManagement;
