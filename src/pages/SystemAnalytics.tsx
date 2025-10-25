import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Package, Truck, Recycle, Leaf, MapPin } from "lucide-react";

const SystemAnalytics = () => {
  const monthlyData = [
    { month: "Jul", collected: 450, recycled: 380, donated: 45 },
    { month: "Aug", collected: 520, recycled: 445, donated: 52 },
    { month: "Sep", collected: 680, recycled: 590, donated: 68 },
    { month: "Oct", collected: 750, recycled: 655, donated: 75 },
  ];

  const maxValue = Math.max(...monthlyData.map(d => d.collected));

  const regionalData = [
    { region: "Green District", pickups: 245, recyclingRate: 87 },
    { region: "Eco Valley", pickups: 198, recyclingRate: 92 },
    { region: "Nature Zone", pickups: 167, recyclingRate: 85 },
    { region: "Earth City", pickups: 223, recyclingRate: 89 },
  ];

  const wasteCategories = [
    { type: "Plastic & Bottles", percentage: 35, color: "bg-blue-500" },
    { type: "Paper & Cardboard", percentage: 25, color: "bg-green-500" },
    { type: "Metal & Cans", percentage: 18, color: "bg-yellow-500" },
    { type: "Glass", percentage: 12, color: "bg-purple-500" },
    { type: "E-Waste", percentage: 7, color: "bg-red-500" },
    { type: "Other", percentage: 3, color: "bg-gray-500" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              System Analytics 📊
            </h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive insights and performance metrics
            </p>
          </div>
          <div className="hidden md:flex gap-4">
            <BarChart3 className="text-primary/30 animate-float w-12 h-12" />
            <TrendingUp className="text-accent/30 animate-float w-12 h-12" style={{ animationDelay: "1s" }} />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 glass-card animate-grow">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-primary" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-primary">1,234</p>
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="text-xs text-green-600 mt-1">+12% from last month</p>
          </Card>

          <Card className="p-6 glass-card animate-grow" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center justify-between mb-2">
              <Package className="w-8 h-8 text-accent" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-accent">833</p>
            <p className="text-sm text-muted-foreground">Total Pickups</p>
            <p className="text-xs text-green-600 mt-1">+18% from last month</p>
          </Card>

          <Card className="p-6 glass-card animate-grow" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-between mb-2">
              <Recycle className="w-8 h-8 text-green-600" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">12.5 ton</p>
            <p className="text-sm text-muted-foreground">Total Recycled</p>
            <p className="text-xs text-green-600 mt-1">+22% from last month</p>
          </Card>

          <Card className="p-6 glass-card animate-grow" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center justify-between mb-2">
              <Truck className="w-8 h-8 text-secondary" />
              <span className="text-green-600 text-sm font-medium">Active</span>
            </div>
            <p className="text-3xl font-bold text-secondary">8</p>
            <p className="text-sm text-muted-foreground">Active Routes</p>
            <p className="text-xs text-muted-foreground mt-1">15 collectors online</p>
          </Card>
        </div>

        {/* Monthly Trends Chart */}
        <Card className="p-6 glass-card">
          <h3 className="text-xl font-semibold mb-6">Monthly Collection Trends</h3>
          <div className="space-y-6">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="animate-grow" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{data.month} 2025</span>
                  <div className="flex gap-4 text-sm">
                    <span className="text-primary font-semibold">Collected: {data.collected}kg</span>
                    <span className="text-green-600 font-semibold">Recycled: {data.recycled}kg</span>
                    <span className="text-secondary font-semibold">Donated: {data.donated} items</span>
                  </div>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden flex">
                  <div
                    className="bg-primary transition-all duration-500"
                    style={{ width: `${(data.collected / maxValue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <p className="text-sm font-medium">
                Overall growth: <span className="text-primary font-bold">+67%</span> compared to last quarter
              </p>
            </div>
          </div>
        </Card>

        {/* Regional Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 glass-card">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Regional Performance
            </h3>
            <div className="space-y-4">
              {regionalData.map((region, index) => (
                <div
                  key={region.region}
                  className="p-4 rounded-lg bg-muted/50 animate-grow"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{region.region}</span>
                    <span className="text-sm text-green-600 font-medium">
                      {region.recyclingRate}% recycling rate
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{region.pickups} pickups this month</span>
                    <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-600 transition-all duration-500"
                        style={{ width: `${region.recyclingRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Waste Categories */}
          <Card className="p-6 glass-card">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-accent" />
              Waste Distribution
            </h3>
            <div className="space-y-4">
              {wasteCategories.map((category, index) => (
                <div
                  key={category.type}
                  className="animate-grow"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{category.type}</span>
                    <span className="text-sm font-semibold">{category.percentage}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${category.color} transition-all duration-500`}
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Environmental Impact */}
        <Card className="p-6 glass-card bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Leaf className="w-6 h-6 text-primary" />
            System-Wide Environmental Impact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-lg bg-background/50">
              <div className="text-4xl mb-2">🌍</div>
              <p className="text-3xl font-bold text-primary">25.8 ton</p>
              <p className="text-sm text-muted-foreground">CO₂ Emissions Saved</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <div className="text-4xl mb-2">🌳</div>
              <p className="text-3xl font-bold text-green-600">645</p>
              <p className="text-sm text-muted-foreground">Trees Equivalent</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <div className="text-4xl mb-2">💧</div>
              <p className="text-3xl font-bold text-blue-600">125,000 L</p>
              <p className="text-sm text-muted-foreground">Water Conserved</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <div className="text-4xl mb-2">⚡</div>
              <p className="text-3xl font-bold text-yellow-600">45,000 kWh</p>
              <p className="text-sm text-muted-foreground">Energy Saved</p>
            </div>
          </div>
        </Card>

        {/* User Engagement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 glass-card">
            <h3 className="text-xl font-semibold mb-4">User Engagement</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10">
                <div>
                  <p className="font-semibold">Active Users (30 days)</p>
                  <p className="text-sm text-muted-foreground">Daily average: 867 users</p>
                </div>
                <p className="text-2xl font-bold text-primary">89%</p>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-accent/10">
                <div>
                  <p className="font-semibold">Pickup Completion Rate</p>
                  <p className="text-sm text-muted-foreground">On-time performance</p>
                </div>
                <p className="text-2xl font-bold text-accent">95%</p>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/10">
                <div>
                  <p className="font-semibold">User Satisfaction</p>
                  <p className="text-sm text-muted-foreground">Based on ratings</p>
                </div>
                <p className="text-2xl font-bold text-secondary">4.8★</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass-card">
            <h3 className="text-xl font-semibold mb-4">System Efficiency</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10">
                <div>
                  <p className="font-semibold">Average Response Time</p>
                  <p className="text-sm text-muted-foreground">From request to pickup</p>
                </div>
                <p className="text-2xl font-bold text-green-600">2.3h</p>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-blue-500/10">
                <div>
                  <p className="font-semibold">Route Optimization</p>
                  <p className="text-sm text-muted-foreground">Fuel efficiency gain</p>
                </div>
                <p className="text-2xl font-bold text-blue-600">+28%</p>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-purple-500/10">
                <div>
                  <p className="font-semibold">Recycling Rate</p>
                  <p className="text-sm text-muted-foreground">Successfully recycled</p>
                </div>
                <p className="text-2xl font-bold text-purple-600">87%</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SystemAnalytics;
