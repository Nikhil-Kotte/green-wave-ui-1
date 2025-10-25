import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Leaf, Recycle, Users, Truck, Building2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, demoAccounts } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      toast({
        title: "Welcome back!",
        description: "Login successful",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Login failed",
        description: result.error || "Invalid credentials",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setLoading(true);
    const result = await login(demoEmail, demoPassword);
    
    if (result.success) {
      toast({
        title: "Demo login successful!",
        description: "Exploring as demo user",
      });
      navigate("/dashboard");
    }
    
    setLoading(false);
  };

  const roleIcons = {
    user: <Users className="w-5 h-5" />,
    collector: <Truck className="w-5 h-5" />,
    ngo: <Recycle className="w-5 h-5" />,
    admin: <Building2 className="w-5 h-5" />,
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Floating decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Leaf className="absolute top-20 left-[10%] text-primary/20 animate-float" size={40} />
        <Recycle className="absolute top-40 right-[15%] text-accent/30 animate-float" size={36} style={{ animationDelay: "1s" }} />
        <Leaf className="absolute bottom-32 left-[20%] text-primary/25 animate-float" size={32} style={{ animationDelay: "2s" }} />
        <Leaf className="absolute top-60 right-[25%] text-accent/15 animate-float" size={28} style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Login Form */}
        <Card className="p-8 glass-card animate-grow">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Recycle className="text-primary w-10 h-10 animate-wave" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                EcoWaste Manager
              </h1>
            </div>
            <p className="text-muted-foreground">
              Sustainable waste management for a greener future
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
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
                className="border-border focus:border-primary transition-colors"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </Card>

        {/* Demo Accounts */}
        <Card className="p-8 glass-card animate-grow" style={{ animationDelay: "0.1s" }}>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Try Demo Accounts 🎯
            </h2>
            <p className="text-sm text-muted-foreground">
              Click any account below to explore different user experiences
            </p>
          </div>

          <div className="space-y-3">
            {demoAccounts.map((account, index) => (
              <button
                key={index}
                onClick={() => handleDemoLogin(account.email, account.password)}
                disabled={loading}
                className="w-full p-4 rounded-lg border border-border hover:border-primary bg-card hover:bg-muted/50 transition-all duration-300 text-left group disabled:opacity-50"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    {roleIcons[account.role]}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{account.name}</p>
                    <p className="text-sm text-muted-foreground">{account.description}</p>
                  </div>
                  <div className="text-xs text-muted-foreground hidden sm:block">
                    <p className="font-mono">{account.email}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-accent">All demo accounts:</span> Password is <code className="px-2 py-1 rounded bg-background/50 font-mono text-xs">demo123</code>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;