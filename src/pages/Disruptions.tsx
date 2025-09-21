import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { 
  AlertTriangle, 
  ArrowLeft, 
  Wrench, 
  Zap, 
  Construction,
  Train,
  Clock,
  MapPin,
  Users,
  Route
} from "lucide-react";

const incidents = [
  {
    id: "INC001",
    type: "signal",
    title: "Signal Failure at Junction A",
    location: "Delhi-Gwalior Section, KM 245",
    severity: "high",
    status: "active",
    startTime: "14:30",
    estimatedResolution: "16:00",
    affectedTrains: ["12952", "12002", "12626"],
    description: "Primary signal system failure causing traffic backup",
    aiSuggestions: [
      "Reroute trains via alternate track B",
      "Implement manual signaling protocol",
      "Hold trains at previous stations"
    ]
  },
  {
    id: "INC002", 
    type: "maintenance",
    title: "Track Maintenance Work",
    location: "Mumbai-Pune Section, KM 89-92",
    severity: "medium",
    status: "scheduled",
    startTime: "22:00",
    estimatedResolution: "04:00",
    affectedTrains: ["12283", "12009"],
    description: "Scheduled track replacement and ballast work",
    aiSuggestions: [
      "Reschedule affected trains by 30 minutes",
      "Use single line working procedure",
      "Coordinate with maintenance team"
    ]
  },
  {
    id: "INC003",
    type: "breakdown", 
    title: "Engine Breakdown",
    location: "Chennai Central Station",
    severity: "medium",
    status: "resolving",
    startTime: "11:15", 
    estimatedResolution: "13:30",
    affectedTrains: ["12841"],
    description: "Traction motor failure on lead locomotive",
    aiSuggestions: [
      "Deploy backup locomotive from yard",
      "Transfer passengers to alternate train",
      "Arrange bus service for short sectors"
    ]
  },
  {
    id: "INC004",
    type: "weather",
    title: "Dense Fog Conditions", 
    location: "Delhi-NCR Region",
    severity: "low",
    status: "monitoring",
    startTime: "06:00",
    estimatedResolution: "09:00",
    affectedTrains: ["Multiple"],
    description: "Visibility reduced to 50m, affecting train speeds",
    aiSuggestions: [
      "Reduce speed limits to 40 km/h",
      "Activate fog safety protocol",
      "Increase station announcements"
    ]
  }
];

const incidentIcons = {
  signal: Zap,
  maintenance: Construction, 
  breakdown: Wrench,
  weather: AlertTriangle
};

const severityColors = {
  high: "red" as const,
  medium: "yellow" as const,
  low: "green" as const
};

export default function Disruptions() {
  const navigate = useNavigate();
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);

  const handleIncidentClick = (incidentId: string) => {
    setSelectedIncident(selectedIncident === incidentId ? null : incidentId);
  };

  const handleViewAffectedTrains = (trainIds: string[]) => {
    navigate(`/train-details?id=${trainIds[0]}&affected=true`);
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
              <AlertTriangle className="w-6 h-6" />
              Disruptions & Alerts
            </h1>
            <p className="text-muted-foreground">Current incidents and AI-suggested actions</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <StatusIndicator status="red" size="md" animated />
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <StatusIndicator status="yellow" size="md" />
              <div>
                <p className="text-sm text-muted-foreground">Medium</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <StatusIndicator status="green" size="md" />
              <div>
                <p className="text-sm text-muted-foreground">Low</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Train className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Affected Trains</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Incidents List */}
      <div className="space-y-4">
        {incidents.map((incident) => {
          const IconComponent = incidentIcons[incident.type as keyof typeof incidentIcons];
          const isSelected = selectedIncident === incident.id;
          
          return (
            <Card 
              key={incident.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                isSelected ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleIncidentClick(incident.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <IconComponent className="w-5 h-5" />
                    {incident.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <StatusIndicator 
                      status={severityColors[incident.severity as keyof typeof severityColors]} 
                      size="md"
                      animated={incident.severity === 'high'}
                    />
                    <Badge 
                      variant={incident.status === 'active' ? 'destructive' : 
                               incident.status === 'resolving' ? 'secondary' : 'outline'}
                    >
                      {incident.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{incident.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>Started: {incident.startTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{incident.affectedTrains.length} trains affected</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{incident.description}</p>

                {isSelected && (
                  <div className="space-y-4 pt-4 border-t border-border">
                    {/* AI Suggestions */}
                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-primary" />
                        AI Suggested Actions
                      </h4>
                      <div className="space-y-2">
                        {incident.aiSuggestions.map((suggestion, index) => (
                          <div key={index} className="flex items-center justify-between bg-muted/20 rounded-lg p-2">
                            <span className="text-sm">{suggestion}</span>
                            <Button size="sm" variant="outline">
                              Apply
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Affected Trains */}
                    <div>
                      <h4 className="font-medium text-sm mb-2">Affected Trains</h4>
                      <div className="flex flex-wrap gap-2">
                        {incident.affectedTrains.map((trainId) => (
                          <Badge 
                            key={trainId} 
                            variant="outline" 
                            className="cursor-pointer hover:bg-muted"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/train-details?id=${trainId}`);
                            }}
                          >
                            {trainId}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewAffectedTrains(incident.affectedTrains);
                        }}
                      >
                        <Route className="w-4 h-4 mr-1" />
                        View Affected Trains
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/");
                        }}
                      >
                        Return to Dashboard
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}