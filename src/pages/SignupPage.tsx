import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, UserRole } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf, Recycle, Users, Truck, Building2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("user");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signup(name, email, password, role);
    
    if (result.success) {
      toast({
        title: "Account created!",
        description: "Please login with your credentials",
      });
      navigate("/login");
    } else {
      toast({
        title: "Signup failed",
        description: result.error || "Please try again",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  const roleIcons = {
    user: <Users className="w-4 h-4" />,
    collector: <Truck className="w-4 h-4" />,
    ngo: <Recycle className="w-4 h-4" />,
    admin: <Building2 className="w-4 h-4" />,
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Floating decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Leaf className="absolute top-20 left-[10%] text-primary/20 animate-float" size={40} />
        <Recycle className="absolute top-40 right-[15%] text-accent/30 animate-float" size={36} style={{ animationDelay: "1s" }} />
        <Leaf className="absolute bottom-32 left-[20%] text-primary/25 animate-float" size={32} style={{ animationDelay: "2s" }} />
      </div>

      <Card className="w-full max-w-md p-8 glass-card animate-grow">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Recycle className="text-primary w-10 h-10" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Join EcoWaste
            </h1>
          </div>
          <p className="text-muted-foreground">
            Create an account to start managing waste sustainably
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-border focus:border-primary transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-border focus:border-primary transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="border-border focus:border-primary transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">I am a...</Label>
            <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
              <SelectTrigger className="border-border focus:border-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">
                  <div className="flex items-center gap-2">
                    {roleIcons.user}
                    <span>User / Household</span>
                  </div>
                </SelectItem>
                <SelectItem value="collector">
                  <div className="flex items-center gap-2">
                    {roleIcons.collector}
                    <span>Waste Collector</span>
                  </div>
                </SelectItem>
                <SelectItem value="ngo">
                  <div className="flex items-center gap-2">
                    {roleIcons.ngo}
                    <span>NGO / Recycling Partner</span>
                  </div>
                </SelectItem>
                <SelectItem value="admin">
                  <div className="flex items-center gap-2">
                    {roleIcons.admin}
                    <span>Admin / Municipality</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default SignupPage;
