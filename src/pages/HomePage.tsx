import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Leaf, 
  Recycle, 
  Users, 
  Truck, 
  Building2, 
  Heart,
  Calendar,
  Package,
  BarChart3,
  MapPin,
  Bell,
  TrendingUp,
  ArrowRight
} from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  const userTypes = [
    {
      role: "Household Users",
      icon: <Users className="w-12 h-12" />,
      description: "Manage your waste responsibly and track your environmental impact",
      keyNeeds: [
        { icon: <Calendar className="w-4 h-4" />, text: "Schedule convenient pickups" },
        { icon: <MapPin className="w-4 h-4" />, text: "Track collection in real-time" },
        { icon: <Heart className="w-4 h-4" />, text: "Donate reusable items to NGOs" },
        { icon: <BarChart3 className="w-4 h-4" />, text: "View environmental impact" },
      ],
      color: "from-primary to-accent",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      role: "Waste Collectors",
      icon: <Truck className="w-12 h-12" />,
      description: "Optimize routes and efficiently manage collection operations",
      keyNeeds: [
        { icon: <MapPin className="w-4 h-4" />, text: "Smart route optimization" },
        { icon: <TrendingUp className="w-4 h-4" />, text: "Optimize collection routes" },
        { icon: <Package className="w-4 h-4" />, text: "Update pickup status" },
        { icon: <Recycle className="w-4 h-4" />, text: "Categorize waste types" },
      ],
      color: "from-accent to-secondary",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
    },
    {
      role: "NGO Partners",
      icon: <Heart className="w-12 h-12" />,
      description: "Receive and redistribute reusable items to those in need",
      keyNeeds: [
        { icon: <Heart className="w-4 h-4" />, text: "Review donation requests" },
        { icon: <Package className="w-4 h-4" />, text: "Track donation inventory" },
        { icon: <BarChart3 className="w-4 h-4" />, text: "View impact metrics" },
        { icon: <Leaf className="w-4 h-4" />, text: "Promote circular economy" },
      ],
      color: "from-secondary to-primary",
      bgColor: "bg-secondary/10",
      borderColor: "border-secondary/20",
    },
    {
      role: "System Admins",
      icon: <Building2 className="w-12 h-12" />,
      description: "Monitor and optimize the entire waste management ecosystem",
      keyNeeds: [
        { icon: <Users className="w-4 h-4" />, text: "Manage all users" },
        { icon: <MapPin className="w-4 h-4" />, text: "Oversee routes & pickups" },
        { icon: <BarChart3 className="w-4 h-4" />, text: "System-wide analytics" },
        { icon: <Bell className="w-4 h-4" />, text: "Send notifications" },
      ],
      color: "from-primary to-secondary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Leaf className="absolute top-20 left-[5%] text-primary/10 animate-float" size={60} />
        <Recycle className="absolute top-40 right-[8%] text-accent/15 animate-float" size={70} style={{ animationDelay: "1s" }} />
        <Leaf className="absolute bottom-40 left-[15%] text-primary/12 animate-float" size={50} style={{ animationDelay: "2s" }} />
        <Recycle className="absolute top-[60%] right-[20%] text-accent/10 animate-float" size={55} style={{ animationDelay: "0.5s" }} />
        <Leaf className="absolute bottom-20 right-[10%] text-primary/15 animate-float" size={45} style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-20 animate-grow">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Recycle className="text-primary w-16 h-16 animate-wave" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                EcoWaste Manager
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-grow" style={{ animationDelay: "0.1s" }}>
              Sustainable waste management for a greener future 🌍
            </p>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto animate-grow" style={{ animationDelay: "0.2s" }}>
              Join our comprehensive ecosystem connecting households, collectors, NGOs, and administrators 
              in the mission to reduce waste and protect our environment.
            </p>
            <div className="flex gap-4 justify-center flex-wrap animate-grow" style={{ animationDelay: "0.3s" }}>
              <Button
                onClick={() => navigate("/login")}
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 text-lg px-8 py-6 group shadow-lg hover:shadow-xl"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                size="lg"
                variant="outline"
                className="border-2 border-primary text-lg px-8 py-6 hover:bg-primary/10 transition-all duration-300"
              >
                Create Account
              </Button>
            </div>
          </div>

          {/* Mission Section */}
          <div className="mb-20 max-w-5xl mx-auto animate-grow" style={{ animationDelay: "0.4s" }}>
            <Card className="glass-card p-10 md:p-12 border-2 border-primary/20">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Leaf className="text-accent w-10 h-10 animate-wave" />
                <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Our Mission
                </h2>
              </div>
              
              <p className="text-lg text-center text-muted-foreground leading-relaxed mb-8">
                At EcoWaste Manager, we believe in transforming waste management into a collaborative, 
                efficient, and environmentally conscious process. Our platform bridges the gap between 
                households generating waste, collectors ensuring proper disposal, NGOs giving items a 
                second life, and administrators optimizing the entire system.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-lg bg-primary/5 hover:bg-primary/10 transition-all duration-300 animate-grow" style={{ animationDelay: "0.5s" }}>
                  <Recycle className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Reduce Waste</h3>
                  <p className="text-sm text-muted-foreground">Minimize landfill impact through smart collection and recycling</p>
                </div>
                
                <div className="text-center p-6 rounded-lg bg-accent/5 hover:bg-accent/10 transition-all duration-300 animate-grow" style={{ animationDelay: "0.6s" }}>
                  <Heart className="w-10 h-10 text-accent mx-auto mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Give Back</h3>
                  <p className="text-sm text-muted-foreground">Connect donors with NGOs to help those in need</p>
                </div>
                
                <div className="text-center p-6 rounded-lg bg-secondary/5 hover:bg-secondary/10 transition-all duration-300 animate-grow" style={{ animationDelay: "0.7s" }}>
                  <BarChart3 className="w-10 h-10 text-secondary mx-auto mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Track Impact</h3>
                  <p className="text-sm text-muted-foreground">Measure and celebrate your environmental contribution</p>
                </div>
              </div>
            </Card>
          </div>

          {/* User Types Section */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-grow">
              Built for Every Role
            </h2>
            <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto animate-grow" style={{ animationDelay: "0.1s" }}>
              Whether you're a household, waste collector, NGO partner, or administrator, 
              we have tools tailored specifically for your needs.
            </p>
          </div>

          {/* User Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto mb-20">
            {userTypes.map((type, index) => (
              <Card
                key={index}
                className={`p-8 glass-card hover:shadow-2xl transition-all duration-500 border-2 ${type.borderColor} group animate-grow hover:scale-105`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-4 rounded-2xl ${type.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <div className={`bg-gradient-to-br ${type.color} bg-clip-text text-transparent`}>
                      {type.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${type.color} bg-clip-text text-transparent`}>
                      {type.role}
                    </h3>
                    <p className="text-muted-foreground">
                      {type.description}
                    </p>
                  </div>
                </div>

                {/* Key Needs */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                    Key Features
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {type.keyNeeds.map((need, needIndex) => (
                      <div
                        key={needIndex}
                        className={`flex items-center gap-2 p-3 rounded-lg ${type.bgColor} group-hover:bg-opacity-20 transition-all duration-300`}
                      >
                        <div className={`bg-gradient-to-br ${type.color} bg-clip-text text-transparent`}>
                          {need.icon}
                        </div>
                        <span className="text-sm font-medium">{need.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center animate-grow" style={{ animationDelay: "0.8s" }}>
            <Card className="p-12 glass-card border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Leaf className="text-primary w-12 h-12 animate-wave" />
                <Recycle className="text-accent w-12 h-12 animate-wave" style={{ animationDelay: "0.5s" }} />
                <Heart className="text-secondary w-12 h-12 animate-wave" style={{ animationDelay: "1s" }} />
              </div>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of users creating a sustainable future through efficient waste management. 
                Start your journey towards a greener planet today.
              </p>
              <Button
                onClick={() => navigate("/login")}
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 text-lg px-12 py-6 group shadow-lg hover:shadow-xl"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border/50 mt-20 py-8">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            <p className="flex items-center justify-center gap-2">
              © 2024 EcoWaste Manager. Building a sustainable future, one pickup at a time 🌍♻️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;