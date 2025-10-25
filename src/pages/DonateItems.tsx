import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Package, MapPin, Camera, Leaf } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DonateItems = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    itemType: "",
    itemName: "",
    condition: "",
    quantity: "",
    description: "",
    pickupAddress: "",
    contactNumber: "",
  });

  const itemTypes = [
    { value: "electronics", label: "Electronics (Working)", icon: "💻" },
    { value: "furniture", label: "Furniture", icon: "🪑" },
    { value: "clothing", label: "Clothing & Textiles", icon: "👕" },
    { value: "books", label: "Books & Stationery", icon: "📚" },
    { value: "toys", label: "Toys & Games", icon: "🧸" },
    { value: "kitchenware", label: "Kitchenware", icon: "🍽️" },
    { value: "other", label: "Other Reusable Items", icon: "📦" },
  ];

  const conditions = [
    { value: "excellent", label: "Excellent - Like New" },
    { value: "good", label: "Good - Minor Wear" },
    { value: "fair", label: "Fair - Some Damage but Usable" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Donation Request Submitted! ❤️",
      description: "An NGO partner will contact you soon to arrange pickup",
    });

    setLoading(false);
    navigate("/dashboard");
  };

  const ngoPartners = [
    { name: "GreenEarth Foundation", focus: "Electronics & Furniture", rating: "4.9★" },
    { name: "EcoHelp NGO", focus: "Clothing & Household Items", rating: "4.8★" },
    { name: "RecycleRight", focus: "All Reusable Items", rating: "4.7★" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              Donate Reusable Items ❤️
            </h1>
            <p className="text-lg text-muted-foreground">
              Give your items a second life and help those in need
            </p>
          </div>
          <div className="hidden md:flex gap-4">
            <Heart className="text-secondary/30 animate-float w-12 h-12" />
            <Leaf className="text-primary/30 animate-float w-12 h-12" style={{ animationDelay: "1s" }} />
          </div>
        </div>

        {/* Impact Banner */}
        <Card className="p-6 bg-gradient-to-r from-secondary/10 to-primary/10 border-secondary/20 animate-grow">
          <div className="flex items-start gap-4">
            <Heart className="w-8 h-8 text-secondary flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Why Donate?</h3>
              <p className="text-sm text-muted-foreground">
                Your donations help reduce waste, support communities in need, and promote a circular economy.
                Every item donated keeps materials out of landfills and gives them a new purpose! 🌍
              </p>
            </div>
          </div>
        </Card>

        {/* Donation Form */}
        <Card className="p-8 glass-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Item Type */}
            <div className="space-y-2">
              <Label htmlFor="itemType" className="text-lg font-semibold">
                What would you like to donate?
              </Label>
              <Select
                value={formData.itemType}
                onValueChange={(value) => setFormData({ ...formData, itemType: value })}
                required
              >
                <SelectTrigger className="border-border focus:border-primary h-12">
                  <SelectValue placeholder="Select item type..." />
                </SelectTrigger>
                <SelectContent>
                  {itemTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <span>{type.icon}</span>
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Item Name and Condition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="itemName">Item Name</Label>
                <Input
                  id="itemName"
                  type="text"
                  placeholder="e.g., Laptop, Sofa, Winter Jackets"
                  value={formData.itemName}
                  onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                  required
                  className="border-border focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Select
                  value={formData.condition}
                  onValueChange={(value) => setFormData({ ...formData, condition: value })}
                  required
                >
                  <SelectTrigger className="border-border focus:border-primary">
                    <SelectValue placeholder="Select condition..." />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((cond) => (
                      <SelectItem key={cond.value} value={cond.value}>
                        {cond.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label htmlFor="quantity" className="flex items-center gap-2">
                <Package className="w-4 h-4 text-primary" />
                Quantity / Number of Items
              </Label>
              <Input
                id="quantity"
                type="number"
                placeholder="1"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
                className="border-border focus:border-primary"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Item Description</Label>
              <Textarea
                id="description"
                placeholder="Provide details about the item, including brand, model, size, color, or any other relevant information..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                required
                className="border-border focus:border-primary resize-none"
              />
            </div>

            {/* Photo Upload (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="photos" className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-accent" />
                Upload Photos (Optional)
              </Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </div>

            {/* Pickup Details */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="text-lg font-semibold">Pickup Details</h3>
              
              <div className="space-y-2">
                <Label htmlFor="pickupAddress" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-secondary" />
                  Pickup Address
                </Label>
                <Input
                  id="pickupAddress"
                  type="text"
                  placeholder="123 Green Street, Eco City"
                  value={formData.pickupAddress}
                  onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                  required
                  className="border-border focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  required
                  className="border-border focus:border-primary"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-secondary to-primary hover:opacity-90 transition-all duration-300"
              >
                {loading ? "Submitting..." : "Submit Donation"}
              </Button>
            </div>
          </form>
        </Card>

        {/* NGO Partners */}
        <Card className="p-6 glass-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-secondary" />
            Our NGO Partners
          </h3>
          <div className="space-y-3">
            {ngoPartners.map((ngo, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
              >
                <div>
                  <p className="font-semibold">{ngo.name}</p>
                  <p className="text-sm text-muted-foreground">Focus: {ngo.focus}</p>
                </div>
                <span className="text-sm font-medium text-accent">{ngo.rating}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DonateItems;