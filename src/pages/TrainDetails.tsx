import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { 
  ArrowLeft, 
  Train, 
  Clock, 
  MapPin, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Route,
  Fuel,
  Users
} from "lucide-react";

const trainData = {
  "12952": {
    name: "Rajdhani Express",
    route: "Delhi → Mumbai",
    status: "On Time",
    statusColor: "green" as const,
    currentLocation: "Kota Junction",
    nextStation: "Ratlam Junction",
    eta: "15:30",
    delay: 0,
    speed: 110,
    capacity: 850,
    occupancy: 720,
    fuel: 85,
    stations: [
      { name: "New Delhi", time: "16:30", status: "completed" },
      { name: "Gwalior", time: "21:15", status: "completed" },
      { name: "Kota Jn", time: "02:30", status: "current" },
      { name: "Ratlam Jn", time: "15:30", status: "upcoming" },
      { name: "Mumbai Central", time: "08:35", status: "upcoming" },
    ]
  },
  "12002": {
    name: "Shatabdi Express", 
    route: "Delhi → Chandigarh",
    status: "Delayed",
    statusColor: "yellow" as const,
    currentLocation: "Ambala Cantonment",
    nextStation: "Chandigarh",
    eta: "12:45",
    delay: 15,
    speed: 85,
    capacity: 500,
    occupancy: 435,
    fuel: 65,
    stations: [
      { name: "New Delhi", time: "07:40", status: "completed" },
      { name: "Panipat Jn", time: "09:12", status: "completed" },
      { name: "Ambala Cant", time: "11:20", status: "current" },
      { name: "Chandigarh", time: "12:30", status: "upcoming" },
    ]
  }
};

const aiSuggestions = {
  "12952": [
    {
      type: "optimization",
      title: "Maintain Current Speed",
      description: "Current schedule is optimal. Continue at 110 km/h to maintain on-time performance.",
      confidence: 95,
      impact: "low"
    }
  ],
  "12002": [
    {
      type: "speed",
      title: "Increase Speed to 95 km/h",
      description: "Weather conditions are clear. Increasing speed can recover 10 minutes of delay.",
      confidence: 88,
      impact: "medium"
    },
    {
      type: "priority",
      title: "Request Signal Priority",
      description: "Request priority at next 2 junctions to minimize stopping time.",
      confidence: 75,
      impact: "high"
    }
  ]
};

export default function TrainDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const trainId = searchParams.get("id") || "12952";
  const isOverride = searchParams.get("override") === "true";
  
  const train = trainData[trainId as keyof typeof trainData] || trainData["12952"];
  const suggestions = aiSuggestions[trainId as keyof typeof aiSuggestions] || aiSuggestions["12952"];

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
              <Train className="w-6 h-6" />
              {train.name} ({trainId})
            </h1>
            <p className="text-muted-foreground">{train.route}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <StatusIndicator status={train.statusColor} size="md" />
          <Badge variant={train.statusColor === 'green' ? 'default' : train.statusColor === 'yellow' ? 'secondary' : 'destructive'}>
            {train.status}
            {train.delay > 0 && ` (+${train.delay} min)`}
          </Badge>
        </div>
      </div>

      {isOverride && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-primary">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">Manual Override Mode Active</span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Current Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Current Location</span>
                <span className="text-sm font-medium">{train.currentLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Next Station</span>
                <span className="text-sm font-medium">{train.nextStation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">ETA</span>
                <span className="text-sm font-medium">{train.eta}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Current Speed</span>
                <span className="text-sm font-medium">{train.speed} km/h</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <Users className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                <p className="text-xs text-muted-foreground">Occupancy</p>
                <p className="text-sm font-medium">{Math.round((train.occupancy/train.capacity)*100)}%</p>
              </div>
              <div className="text-center">
                <Fuel className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                <p className="text-xs text-muted-foreground">Fuel</p>
                <p className="text-sm font-medium">{train.fuel}%</p>
              </div>
              <div className="text-center">
                <Clock className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                <p className="text-xs text-muted-foreground">Delay</p>
                <p className="text-sm font-medium">{train.delay} min</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Route Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Route className="w-5 h-5" />
              Route Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {train.stations.map((station, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {station.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-signal-green" />
                    ) : station.status === 'current' ? (
                      <div className="w-5 h-5 rounded-full bg-primary animate-pulse" />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-muted border-2 border-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      station.status === 'current' ? 'text-primary' : 
                      station.status === 'completed' ? 'text-muted-foreground' : 'text-foreground'
                    }`}>
                      {station.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{station.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-primary" />
              AI Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">{suggestion.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {suggestion.confidence}% confidence
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="default" className="flex-1">
                    Apply
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Dismiss
                  </Button>
                </div>
              </div>
            ))}
            
            {suggestions.length === 0 && (
              <div className="text-center py-4">
                <CheckCircle className="w-8 h-8 mx-auto text-signal-green mb-2" />
                <p className="text-sm text-muted-foreground">No suggestions needed</p>
                <p className="text-xs text-muted-foreground">Train is operating optimally</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}