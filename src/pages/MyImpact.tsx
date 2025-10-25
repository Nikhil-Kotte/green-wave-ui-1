import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Leaf, Recycle, Heart, TrendingUp, Award, TreePine } from "lucide-react";

const MyImpact = () => {
  const impactStats = {
    totalRecycled: 245,
    co2Saved: 489,
    treesEquivalent: 12,
    itemsDonated: 8,
    rank: "Eco Warrior",
    level: 7,
  };

  const monthlyData = [
    { month: "Jul", weight: 15 },
    { month: "Aug", weight: 22 },
    { month: "Sep", weight: 28 },
    { month: "Oct", weight: 35 },
  ];

  const achievements = [
    { title: "First Recycler", desc: "Completed first pickup", icon: "🎯", unlocked: true },
    { title: "Eco Enthusiast", desc: "10 pickups completed", icon: "🌱", unlocked: true },
    { title: "Green Champion", desc: "50kg recycled", icon: "🏆", unlocked: true },
    { title: "Planet Protector", desc: "100kg recycled", icon: "🌍", unlocked: true },
    { title: "Zero Waste Hero", desc: "Recycle for 6 months", icon: "⭐", unlocked: false },
    { title: "Donation Angel", desc: "Donate 10+ items", icon: "❤️", unlocked: false },
  ];

  const maxWeight = Math.max(...monthlyData.map(d => d.weight));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              My Environmental Impact 🌍
            </h1>
            <p className="text-lg text-muted-foreground">
              Track your contribution to a greener planet
            </p>
          </div>
          <div className="hidden md:flex gap-4">
            <Leaf className="text-primary/30 animate-float w-12 h-12" />
            <Recycle className="text-accent/30 animate-float w-12 h-12" style={{ animationDelay: "1s" }} />
          </div>
        </div>

        {/* Rank & Level */}
        <Card className="p-8 glass-card bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 animate-grow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-full bg-gradient-to-r from-primary to-accent">
                <Award className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{impactStats.rank}</h2>
                <p className="text-muted-foreground">Level {impactStats.level}</p>
                <div className="mt-2 w-64 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                    style={{ width: "70%" }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  70% to next level
                </p>
              </div>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-sm text-muted-foreground mb-1">Next Rank</p>
              <p className="text-xl font-semibold text-primary">Eco Legend</p>
              <p className="text-xs text-muted-foreground">150 kg more to unlock</p>
            </div>
          </div>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 glass-card animate-grow" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center justify-between mb-2">
              <Recycle className="w-8 h-8 text-primary" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-primary">{impactStats.totalRecycled} kg</p>
            <p className="text-sm text-muted-foreground">Total Recycled</p>
          </Card>

          <Card className="p-6 glass-card animate-grow" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-between mb-2">
              <Leaf className="w-8 h-8 text-accent" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-accent">{impactStats.co2Saved} kg</p>
            <p className="text-sm text-muted-foreground">CO₂ Saved</p>
          </Card>

          <Card className="p-6 glass-card animate-grow" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center justify-between mb-2">
              <TreePine className="w-8 h-8 text-green-600" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">{impactStats.treesEquivalent}</p>
            <p className="text-sm text-muted-foreground">Trees Equivalent</p>
          </Card>

          <Card className="p-6 glass-card animate-grow" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center justify-between mb-2">
              <Heart className="w-8 h-8 text-secondary" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-secondary">{impactStats.itemsDonated}</p>
            <p className="text-sm text-muted-foreground">Items Donated</p>
          </Card>
        </div>

        {/* Monthly Progress Chart */}
        <Card className="p-6 glass-card">
          <h3 className="text-xl font-semibold mb-6">Monthly Recycling Trend</h3>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="animate-grow" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{data.month} 2025</span>
                  <span className="text-sm font-semibold text-primary">{data.weight} kg</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                    style={{ width: `${(data.weight / maxWeight) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6 glass-card">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-accent" />
            Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all duration-300 animate-grow ${
                  achievement.unlocked
                    ? "bg-primary/10 border-primary/20 hover:bg-primary/20"
                    : "bg-muted/30 border-border opacity-60"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.desc}</p>
                    {achievement.unlocked && (
                      <span className="text-xs text-primary font-medium mt-1 inline-block">
                        ✓ Unlocked
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Environmental Comparison */}
        <Card className="p-6 glass-card bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
          <h3 className="text-xl font-semibold mb-4">Your Impact Compared</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🚗</div>
              <p className="text-2xl font-bold text-primary">1,250 km</p>
              <p className="text-sm text-muted-foreground">
                Car emissions saved
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💡</div>
              <p className="text-2xl font-bold text-accent">3,450 kWh</p>
              <p className="text-sm text-muted-foreground">
                Energy conserved
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💧</div>
              <p className="text-2xl font-bold text-blue-600">8,900 L</p>
              <p className="text-sm text-muted-foreground">
                Water saved
              </p>
            </div>
          </div>
        </Card>

        {/* Motivation Message */}
        <Card className="p-6 glass-card border-primary/20">
          <div className="flex items-start gap-4">
            <Leaf className="w-8 h-8 text-primary flex-shrink-0 animate-float" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Keep Going! 🌟</h3>
              <p className="text-muted-foreground">
                You're making a real difference! Your efforts have prevented {impactStats.co2Saved}kg of CO₂ 
                from entering the atmosphere. That's equivalent to planting {impactStats.treesEquivalent} trees! 
                Every small action counts towards a healthier planet. 🌍💚
              </p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MyImpact;