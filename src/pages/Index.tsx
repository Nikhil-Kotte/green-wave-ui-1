import { useState } from "react";
import { UserManagement } from "@/components/UserManagement";
import { Leaf, Sprout } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating leaf decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Leaf 
          className="absolute top-20 left-[10%] text-primary/20 animate-float" 
          size={40}
          style={{ animationDelay: "0s" }}
        />
        <Leaf 
          className="absolute top-40 right-[15%] text-accent/30 animate-float" 
          size={32}
          style={{ animationDelay: "1s" }}
        />
        <Sprout 
          className="absolute bottom-32 left-[20%] text-primary/25 animate-float" 
          size={36}
          style={{ animationDelay: "2s" }}
        />
        <Leaf 
          className="absolute top-60 left-[70%] text-accent/20 animate-float" 
          size={28}
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="text-center mb-12 animate-grow">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sprout className="text-primary w-12 h-12" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              EcoTeam Manager
            </h1>
            <Leaf className="text-accent w-12 h-12" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sustainable user management for a greener future. Manage your team with nature-inspired simplicity.
          </p>
        </header>

        <UserManagement />
      </div>
    </div>
  );
};

export default Index;
