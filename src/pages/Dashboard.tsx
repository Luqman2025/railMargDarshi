import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { 
  Train, 
  Cloud, 
  CloudRain, 
  Sun, 
  Wind,
  AlertCircle,
  TrendingUp,
  Users,
  Clock
} from "lucide-react";

const trains = [
  { id: "12952", name: "Rajdhani Express", route: "Delhi-Mumbai", status: "green", delay: 0, x: 25, y: 35 },
  { id: "12002", name: "Shatabdi Express", route: "Delhi-Chandigarh", status: "yellow", delay: 15, x: 45, y: 20 },
  { id: "12009", name: "Howrah Mail", route: "Delhi-Kolkata", status: "red", delay: 45, x: 65, y: 55 },
  { id: "12283", name: "Duronto Express", route: "Mumbai-Pune", status: "green", delay: 0, x: 15, y: 70 },
  { id: "12626", name: "Kerala Express", route: "Delhi-Kochi", status: "yellow", delay: 20, x: 35, y: 85 },
];

const weatherData = [
  { type: "fog", intensity: "high", location: "Delhi-NCR", icon: Cloud, color: "text-gray-400" },
  { type: "rain", intensity: "medium", location: "Mumbai Region", icon: CloudRain, color: "text-blue-400" },
  { type: "clear", intensity: "low", location: "Chennai Sector", icon: Sun, color: "text-yellow-400" },
];

const aiRecommendations = [
  { 
    train: "12009", 
    action: "Reroute via alternate track", 
    reason: "Signal failure at Junction A", 
    priority: "high" 
  },
  { 
    train: "12002", 
    action: "Reduce speed by 20%", 
    reason: "Fog conditions ahead", 
    priority: "medium" 
  },
  { 
    train: "12626", 
    action: "Hold at next station for 10 mins", 
    reason: "Traffic optimization", 
    priority: "low" 
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);

  const handleTrainClick = (trainId: string) => {
    navigate(`/train-details?id=${trainId}`);
  };

  const handleManualOverride = () => {
    navigate("/train-details?override=true");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Train className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Active Trains</p>
                <p className="text-2xl font-bold">847</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-signal-green" />
              <div>
                <p className="text-sm text-muted-foreground">On Time</p>
                <p className="text-2xl font-bold">78%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-signal-yellow" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Delay</p>
                <p className="text-2xl font-bold">12 min</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-signal-red" />
              <div>
                <p className="text-sm text-muted-foreground">Alerts</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Railway Network Map */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Train className="w-5 h-5" />
              Live Railway Network
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-96 bg-muted/20 rounded-lg overflow-hidden">
              {/* Simulated Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted/10 via-background to-muted/20"></div>
              
              {/* Railway Lines */}
              <svg className="absolute inset-0 w-full h-full">
                <line x1="10%" y1="30%" x2="90%" y2="60%" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
                <line x1="20%" y1="10%" x2="70%" y2="90%" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
                <line x1="30%" y1="40%" x2="80%" y2="20%" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
              </svg>
              
              {/* Train Positions */}
              {trains.map((train) => (
                <div
                  key={train.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                  style={{ left: `${train.x}%`, top: `${train.y}%` }}
                  onClick={() => handleTrainClick(train.id)}
                  onMouseEnter={() => setSelectedTrain(train.id)}
                  onMouseLeave={() => setSelectedTrain(null)}
                >
                  <div className="relative">
                    <Train 
                      className={`w-6 h-6 ${
                        train.status === 'green' ? 'text-signal-green' :
                        train.status === 'yellow' ? 'text-signal-yellow' : 'text-signal-red'
                      }`} 
                    />
                    <StatusIndicator
                      status={train.status as "red" | "yellow" | "green"}
                      size="sm"
                      className="absolute -top-1 -right-1"
                      animated={train.status === 'red'}
                    />
                  </div>
                  
                  {selectedTrain === train.id && (
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg p-2 shadow-lg z-10 whitespace-nowrap">
                      <p className="text-sm font-medium">{train.name}</p>
                      <p className="text-xs text-muted-foreground">{train.route}</p>
                      {train.delay > 0 && (
                        <p className="text-xs text-signal-red">Delayed: {train.delay} min</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Weather Overlay */}
              <div className="absolute top-4 right-4 space-y-2">
                {weatherData.map((weather, index) => (
                  <div key={index} className="flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-lg p-2 text-xs">
                    <weather.icon className={`w-4 h-4 ${weather.color}`} />
                    <span>{weather.location}: {weather.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiRecommendations.map((rec, index) => (
              <div key={index} className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">Train {rec.train}</span>
                  <StatusIndicator
                    status={rec.priority === 'high' ? 'red' : rec.priority === 'medium' ? 'yellow' : 'green'}
                    size="sm"
                  />
                </div>
                <p className="text-sm text-muted-foreground">{rec.action}</p>
                <p className="text-xs text-muted-foreground italic">{rec.reason}</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleTrainClick(rec.train)}
                >
                  View Details
                </Button>
              </div>
            ))}
            
            <Button 
              className="w-full" 
              variant="secondary"
              onClick={handleManualOverride}
            >
              Manual Override
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}