import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Train, 
  Fuel,
  Users,
  ArrowLeft,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";

const kpiData = [
  {
    id: "punctuality",
    title: "On-Time Performance",
    value: "78.5%",
    trend: 2.3,
    icon: Clock,
    color: "text-signal-green",
    description: "Trains arriving within 5 minutes of schedule"
  },
  {
    id: "utilization", 
    title: "Section Utilization",
    value: "67.2%",
    trend: -1.8,
    icon: BarChart3,
    color: "text-primary",
    description: "Average track section occupancy"
  },
  {
    id: "delays",
    title: "Average Delay",
    value: "12.4 min",
    trend: -0.8,
    icon: TrendingDown,
    color: "text-signal-yellow",
    description: "Mean delay across all services"
  },
  {
    id: "efficiency",
    title: "Fuel Efficiency",
    value: "8.2 L/km",
    trend: 1.5,
    icon: Fuel,  
    color: "text-accent",
    description: "Average fuel consumption per kilometer"
  },
  {
    id: "capacity",
    title: "Passenger Load",
    value: "84.1%",
    trend: 3.2,
    icon: Users,
    color: "text-signal-green",
    description: "Average capacity utilization"
  },
  {
    id: "incidents",
    title: "Safety Incidents",
    value: "0.02/day",
    trend: -2.1,
    icon: Activity,
    color: "text-signal-red",
    description: "Incidents per train per day"
  }
];

const chartData = [
  { name: "Mon", onTime: 82, delayed: 18, cancelled: 0 },
  { name: "Tue", onTime: 79, delayed: 20, cancelled: 1 },
  { name: "Wed", onTime: 85, delayed: 14, cancelled: 1 },
  { name: "Thu", onTime: 77, delayed: 22, cancelled: 1 },
  { name: "Fri", onTime: 81, delayed: 18, cancelled: 1 },
  { name: "Sat", onTime: 88, delayed: 12, cancelled: 0 },
  { name: "Sun", onTime: 91, delayed: 9, cancelled: 0 },
];

const sectionData = [
  { section: "Delhi-Agra", utilization: 89, trains: 45, avgDelay: 8 },
  { section: "Mumbai-Pune", utilization: 76, trains: 32, avgDelay: 15 },
  { section: "Chennai-Bangalore", utilization: 82, trains: 28, avgDelay: 12 },
  { section: "Kolkata-Howrah", utilization: 94, trains: 38, avgDelay: 18 },
  { section: "Hyderabad-Vijayawada", utilization: 65, trains: 22, avgDelay: 6 },
];

export default function Analytics() {
  const navigate = useNavigate();
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);

  const handleKPIClick = (kpiId: string) => {
    setSelectedKPI(selectedKPI === kpiId ? null : kpiId);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              Analytics & KPIs
            </h1>
            <p className="text-muted-foreground">Performance metrics and insights</p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiData.map((kpi) => (
          <Card 
            key={kpi.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedKPI === kpi.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => handleKPIClick(kpi.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                <div className={`flex items-center text-sm ${
                  kpi.trend > 0 ? 'text-signal-green' : 'text-signal-red'
                }`}>
                  {kpi.trend > 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {Math.abs(kpi.trend)}%
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-medium text-sm">{kpi.title}</h3>
                <p className="text-2xl font-bold">{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Analytics */}
      {selectedKPI && (
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle>
              Detailed Analysis: {kpiData.find(k => k.id === selectedKPI)?.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="text-center">
                <PieChart className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Detailed chart for {selectedKPI}</p>
                <p className="text-sm text-muted-foreground">Interactive visualization would be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chartData.map((day, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{day.name}</span>
                    <span className="text-sm text-muted-foreground">{day.onTime}% on time</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="flex h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-signal-green" 
                        style={{ width: `${day.onTime}%` }}
                      />
                      <div 
                        className="bg-signal-yellow" 
                        style={{ width: `${day.delayed}%` }}
                      />
                      <div 
                        className="bg-signal-red" 
                        style={{ width: `${day.cancelled}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center gap-4 pt-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-signal-green rounded-full" />
                  <span>On Time</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-signal-yellow rounded-full" />
                  <span>Delayed</span>
                </div>  
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-signal-red rounded-full" />
                  <span>Cancelled</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Section Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sectionData.map((section, index) => (
                <div 
                  key={index} 
                  className="border border-border rounded-lg p-3 hover:bg-muted/20 cursor-pointer transition-colors"
                  onClick={() => navigate(`/train-details?section=${section.section}`)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-sm">{section.section}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      section.utilization > 85 ? 'bg-signal-red/20 text-signal-red' :
                      section.utilization > 70 ? 'bg-signal-yellow/20 text-signal-yellow' :
                      'bg-signal-green/20 text-signal-green'
                    }`}>
                      {section.utilization}% utilized
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                    <div>
                      <Train className="w-3 h-3 inline mr-1" />
                      {section.trains} trains
                    </div>
                    <div>
                      <Clock className="w-3 h-3 inline mr-1" />
                      {section.avgDelay} min avg delay
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}