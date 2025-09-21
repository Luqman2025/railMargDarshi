import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Settings as SettingsIcon, 
  Brain,
  Cloud,
  Shield,
  Bell,
  Gauge,
  Save,
  RotateCcw
} from "lucide-react";

interface SettingsState {
  aiAutomation: boolean;
  weatherResponse: boolean;
  manualOverride: boolean;
  alertsEnabled: boolean;
  speedThreshold: number[];
  delayThreshold: number[];
  autoRerouting: boolean;
  priorityTrains: boolean;
  maintenanceAlerts: boolean;
  fuelOptimization: boolean;
}

export default function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<SettingsState>({
    aiAutomation: true,
    weatherResponse: true,
    manualOverride: false,
    alertsEnabled: true,
    speedThreshold: [80],
    delayThreshold: [15],
    autoRerouting: true,
    priorityTrains: true,
    maintenanceAlerts: true,
    fuelOptimization: false
  });

  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = <K extends keyof SettingsState>(
    key: K, 
    value: SettingsState[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    // Simulate saving settings
    console.log("Saving settings:", settings);
    setHasChanges(false);
    // Show success toast or notification
  };

  const handleResetDefaults = () => {
    setSettings({
      aiAutomation: true,
      weatherResponse: true,
      manualOverride: false,
      alertsEnabled: true,
      speedThreshold: [80],
      delayThreshold: [15],
      autoRerouting: true,
      priorityTrains: true,
      maintenanceAlerts: true,
      fuelOptimization: false
    });
    setHasChanges(true);
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
              <SettingsIcon className="w-6 h-6" />
              Settings & Control
            </h1>
            <p className="text-muted-foreground">Configure AI automation and system preferences</p>
          </div>
        </div>
        
        {hasChanges && (
          <Badge variant="secondary" className="animate-pulse">
            Unsaved Changes
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Automation Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              AI Automation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="ai-automation">AI-Powered Decision Making</Label>
                <p className="text-sm text-muted-foreground">
                  Allow AI to make automatic routing decisions
                </p>
              </div>
              <Switch
                id="ai-automation"
                checked={settings.aiAutomation}
                onCheckedChange={(checked) => updateSetting('aiAutomation', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="auto-rerouting">Automatic Rerouting</Label>
                <p className="text-sm text-muted-foreground">
                  Enable AI to reroute trains during disruptions
                </p>
              </div>
              <Switch
                id="auto-rerouting"
                checked={settings.autoRerouting}
                onCheckedChange={(checked) => updateSetting('autoRerouting', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="manual-override">Manual Override Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Require manual approval for AI suggestions
                </p>
              </div>
              <Switch
                id="manual-override"
                checked={settings.manualOverride}
                onCheckedChange={(checked) => updateSetting('manualOverride', checked)}
              />
            </div>

            <div className="space-y-2">
              <Label>Speed Alert Threshold: {settings.speedThreshold[0]} km/h</Label>
              <Slider
                value={settings.speedThreshold}
                onValueChange={(value) => updateSetting('speedThreshold', value)}
                max={120}
                min={40}
                step={5}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Alert when train speed drops below threshold
              </p>
            </div>

            <div className="space-y-2">
              <Label>Delay Alert Threshold: {settings.delayThreshold[0]} minutes</Label>
              <Slider
                value={settings.delayThreshold}
                onValueChange={(value) => updateSetting('delayThreshold', value)}
                max={60}
                min={5}
                step={5}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Alert when delay exceeds threshold
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Weather & Environmental Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-primary" />
              Weather Response
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="weather-response">Weather-Based Adjustments</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically adjust schedules based on weather
                </p>
              </div>
              <Switch
                id="weather-response"
                checked={settings.weatherResponse}
                onCheckedChange={(checked) => updateSetting('weatherResponse', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="priority-trains">Priority Train Handling</Label>
                <p className="text-sm text-muted-foreground">
                  Give priority to express and premium trains
                </p>
              </div>
              <Switch
                id="priority-trains"
                checked={settings.priorityTrains}
                onCheckedChange={(checked) => updateSetting('priorityTrains', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="fuel-optimization">Fuel Optimization</Label>
                <p className="text-sm text-muted-foreground">
                  Optimize routes and speeds for fuel efficiency
                </p>
              </div>
              <Switch
                id="fuel-optimization"
                checked={settings.fuelOptimization}
                onCheckedChange={(checked) => updateSetting('fuelOptimization', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Alerts & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="alerts-enabled">System Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications for critical events
                </p>
              </div>
              <Switch
                id="alerts-enabled"
                checked={settings.alertsEnabled}
                onCheckedChange={(checked) => updateSetting('alertsEnabled', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="maintenance-alerts">Maintenance Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Notifications for scheduled maintenance
                </p>
              </div>
              <Switch
                id="maintenance-alerts"
                checked={settings.maintenanceAlerts}
                onCheckedChange={(checked) => updateSetting('maintenanceAlerts', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              System Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Last Security Scan</p>
                <p className="font-medium">2 hours ago</p>
              </div>
              <div>
                <p className="text-muted-foreground">System Status</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-signal-green rounded-full" />
                  <p className="font-medium">Secure</p>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground">Active Sessions</p>
                <p className="font-medium">3 operators</p>
              </div>
              <div>
                <p className="text-muted-foreground">Data Backup</p>
                <p className="font-medium">Up to date</p>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full">
              <Shield className="w-4 h-4 mr-2" />
              Run Security Check
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handleResetDefaults}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset to Defaults
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
          >
            Return to Dashboard
          </Button>
          <Button 
            onClick={handleSaveChanges}
            disabled={!hasChanges}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}