import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Package, MapPin, Trash2, Leaf, Recycle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SchedulePickup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    wasteType: "",
    date: "",
    time: "",
    address: "",
    notes: "",
    estimatedWeight: "",
  });

  const wasteTypes = [
    { value: "plastic", label: "Plastic & Bottles", icon: "♻️" },
    { value: "metal", label: "Metal & Cans", icon: "🥫" },
    { value: "paper", label: "Paper & Cardboard", icon: "📦" },
    { value: "glass", label: "Glass Items", icon: "🍾" },
    { value: "ewaste", label: "E-Waste", icon: "💻" },
    { value: "organic", label: "Organic Waste", icon: "🌱" },
    { value: "mixed", label: "Mixed Recyclables", icon: "♻️" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Pickup Scheduled! 🎉",
      description: `Your ${formData.wasteType} pickup is scheduled for ${formData.date}`,
    });

    setLoading(false);
    navigate("/track-requests");
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              Schedule Pickup 📅
            </h1>
            <p className="text-lg text-muted-foreground">
              Request a waste collection at your convenience
            </p>
          </div>
          <div className="hidden md:flex gap-4">
            <Trash2 className="text-primary/30 animate-float w-12 h-12" />
            <Recycle className="text-accent/30 animate-float w-12 h-12" style={{ animationDelay: "1s" }} />
          </div>
        </div>

        {/* Form */}
        <Card className="p-8 glass-card animate-grow">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Waste Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="wasteType" className="text-lg font-semibold">
                What type of waste do you want to dispose?
              </Label>
              <Select
                value={formData.wasteType}
                onValueChange={(value) => setFormData({ ...formData, wasteType: value })}
                required
              >
                <SelectTrigger className="border-border focus:border-primary h-12">
                  <SelectValue placeholder="Select waste type..." />
                </SelectTrigger>
                <SelectContent>
                  {wasteTypes.map((type) => (
                    <SelectItem key={type.value} value={type.label}>
                      <div className="flex items-center gap-2">
                        <span>{type.icon}</span>
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Pickup Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="border-border focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  Preferred Time
                </Label>
                <Select
                  value={formData.time}
                  onValueChange={(value) => setFormData({ ...formData, time: value })}
                  required
                >
                  <SelectTrigger className="border-border focus:border-primary">
                    <SelectValue placeholder="Select time..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (8 AM - 12 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                    <SelectItem value="evening">Evening (4 PM - 8 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                Pickup Address
              </Label>
              <Input
                id="address"
                type="text"
                placeholder="123 Green Street, Eco City"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                className="border-border focus:border-primary"
              />
            </div>

            {/* Estimated Weight */}
            <div className="space-y-2">
              <Label htmlFor="weight" className="flex items-center gap-2">
                <Package className="w-4 h-4 text-primary" />
                Estimated Weight (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder="5"
                min="1"
                value={formData.estimatedWeight}
                onChange={(e) => setFormData({ ...formData, estimatedWeight: e.target.value })}
                required
                className="border-border focus:border-primary"
              />
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any special instructions or details..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
                className="border-border focus:border-primary resize-none"
              />
            </div>

            {/* Environmental Impact Preview */}
            <Card className="p-4 bg-primary/10 border-primary/20">
              <div className="flex items-start gap-3">
                <Leaf className="w-5 h-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-primary mb-1">Environmental Impact</p>
                  <p className="text-sm text-muted-foreground">
                    By recycling this waste, you'll help reduce landfill pollution and save approximately{" "}
                    <span className="font-semibold text-primary">
                      {formData.estimatedWeight || "X"} kg
                    </span>{" "}
                    of CO₂ emissions! 🌍
                  </p>
                </div>
              </div>
            </Card>

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
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300"
              >
                {loading ? "Scheduling..." : "Schedule Pickup"}
              </Button>
            </div>
          </form>
        </Card>

        {/* Tips Section */}
        <Card className="p-6 glass-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Recycle className="w-5 h-5 text-accent" />
            Preparation Tips
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-accent">✓</span>
              <span>Clean and dry recyclables before pickup</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">✓</span>
              <span>Separate different types of waste for better recycling</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">✓</span>
              <span>Remove batteries from e-waste items</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">✓</span>
              <span>Place items in a designated pickup location</span>
            </li>
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SchedulePickup;