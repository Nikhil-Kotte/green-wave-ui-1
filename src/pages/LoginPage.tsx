import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Leaf, Recycle, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Floating decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Leaf className="absolute top-20 left-[10%] text-primary/20 animate-float" size={40} />
        <Recycle className="absolute top-40 right-[15%] text-accent/30 animate-float" size={36} style={{ animationDelay: "1s" }} />
        <Leaf className="absolute bottom-32 left-[20%] text-primary/25 animate-float" size={32} style={{ animationDelay: "2s" }} />
        <Leaf className="absolute top-60 right-[25%] text-accent/15 animate-float" size={28} style={{ animationDelay: "0.5s" }} />
        <Recycle className="absolute bottom-24 right-[12%] text-primary/20 animate-float" size={44} style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back to Home Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 group hover:bg-primary/10 transition-all duration-300 animate-grow"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Button>

        {/* Login Card */}
        <Card className="p-8 glass-card animate-grow border-2 border-primary/20 shadow-2xl" style={{ animationDelay: "0.1s" }}>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4 animate-grow" style={{ animationDelay: "0.2s" }}>
              <Recycle className="text-primary w-10 h-10 animate-wave" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Welcome Back
              </h1>
            </div>
            <p className="text-muted-foreground animate-grow" style={{ animationDelay: "0.3s" }}>
              Sign in to continue your sustainable journey
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2 animate-grow" style={{ animationDelay: "0.4s" }}>
              <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-border focus:border-primary transition-all duration-300 hover:border-primary/50"
              />
            </div>

            <div className="space-y-2 animate-grow" style={{ animationDelay: "0.5s" }}>
              <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-border focus:border-primary transition-all duration-300 hover:border-primary/50"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl animate-grow"
              disabled={loading}
              style={{ animationDelay: "0.6s" }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center animate-grow" style={{ animationDelay: "0.7s" }}>
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:text-accent font-medium transition-colors duration-300 hover:underline">
                Create one now
              </Link>
            </p>
          </div>

          {/* Decorative element */}
          <div className="mt-8 pt-6 border-t border-border/50 text-center animate-grow" style={{ animationDelay: "0.8s" }}>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Leaf className="w-4 h-4 text-accent animate-wave" />
              <span>Secured by EcoWaste Manager</span>
              <Recycle className="w-4 h-4 text-primary animate-wave" style={{ animationDelay: "0.5s" }} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;