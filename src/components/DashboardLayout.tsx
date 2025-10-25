import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Leaf, Recycle, LogOut, User } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const roleLabels = {
    user: "User",
    collector: "Collector",
    ngo: "NGO Partner",
    admin: "Administrator",
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating leaf decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Leaf 
          className="absolute top-20 left-[5%] text-primary/10 animate-float" 
          size={40}
          style={{ animationDelay: "0s" }}
        />
        <Leaf 
          className="absolute top-40 right-[10%] text-accent/20 animate-float" 
          size={32}
          style={{ animationDelay: "1s" }}
        />
        <Recycle 
          className="absolute bottom-32 left-[15%] text-primary/15 animate-float" 
          size={36}
          style={{ animationDelay: "2s" }}
        />
        <Leaf 
          className="absolute top-60 right-[20%] text-accent/10 animate-float" 
          size={28}
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Recycle className="text-primary w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  EcoWaste Manager
                </h2>
                <p className="text-xs text-muted-foreground">Sustainable Waste Management</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50">
                <User className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{roleLabels[user?.role || "user"]}</p>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-border hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
