import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  Shield, 
  Users,
  Database,
  Activity,
  Server,
  Wifi,
  HardDrive,
  Cpu,
  Eye,
  UserX,
  RefreshCw,
  Download,
  Upload,
  AlertTriangle
} from "lucide-react";

const systemStats = {
  uptime: "99.8%",
  totalTrains: 1247,
  activeOperators: 12,
  dataProcessed: "2.4 TB",
  avgResponseTime: "120ms",
  serverLoad: 67,
  memoryUsage: 78,
  diskSpace: 45
};

const activeUsers = [
  { id: 1, name: "Rajesh Kumar", role: "Control Manager", location: "Delhi", lastActive: "2 min ago", status: "online" },
  { id: 2, name: "Priya Sharma", role: "Operations Head", location: "Mumbai", lastActive: "5 min ago", status: "online" },
  { id: 3, name: "Arjun Singh", role: "Technical Lead", location: "Chennai", lastActive: "1 min ago", status: "online" },
  { id: 4, name: "Kavya Patel", role: "Safety Officer", location: "Bangalore", lastActive: "15 min ago", status: "away" },
  { id: 5, name: "Vikram Joshi", role: "Maintenance Chief", location: "Kolkata", lastActive: "3 min ago", status: "online" },
];

const systemLogs = [
  { time: "14:32:15", level: "INFO", message: "Train 12952 route optimization completed", user: "System" },
  { time: "14:31:48", level: "WARN", message: "High traffic detected on Delhi-Agra section", user: "AI Engine" },
  { time: "14:30:22", level: "INFO", message: "User login: Rajesh Kumar (Delhi)", user: "Auth System" },
  { time: "14:29:55", level: "ERROR", message: "Signal communication timeout at Junction A", user: "Signal System" },
  { time: "14:28:33", level: "INFO", message: "Weather data updated for all regions", user: "Weather API" },
];

export default function Admin() {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const handleUserAction = (userId: number, action: string) => {
    console.log(`${action} user ${userId}`);
    // Implement user management actions
  };

  const handleSystemAction = (action: string) => {
    console.log(`System action: ${action}`);
    // Implement system actions
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
              <Shield className="w-6 h-6" />
              Admin Panel
            </h1>
            <p className="text-muted-foreground">System administration and monitoring</p>
          </div>
        </div>
        
        <Badge variant="secondary" className="flex items-center gap-1">
          <Activity className="w-3 h-3" />
          System Online
        </Badge>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Server className="w-5 h-5 text-signal-green" />
              <div>
                <p className="text-sm text-muted-foreground">System Uptime</p>
                <p className="text-2xl font-bold">{systemStats.uptime}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Active Operators</p>
                <p className="text-2xl font-bold">{systemStats.activeOperators}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Data Processed</p>
                <p className="text-2xl font-bold">{systemStats.dataProcessed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Wifi className="w-5 h-5 text-signal-yellow" />
              <div>
                <p className="text-sm text-muted-foreground">Response Time</p>
                <p className="text-2xl font-bold">{systemStats.avgResponseTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-5 h-5" />
              System Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Server Load</span>
                <span className="text-sm font-medium">{systemStats.serverLoad}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    systemStats.serverLoad > 80 ? 'bg-signal-red' :
                    systemStats.serverLoad > 60 ? 'bg-signal-yellow' : 'bg-signal-green'
                  }`}
                  style={{ width: `${systemStats.serverLoad}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Memory Usage</span>
                <span className="text-sm font-medium">{systemStats.memoryUsage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    systemStats.memoryUsage > 80 ? 'bg-signal-red' :
                    systemStats.memoryUsage > 60 ? 'bg-signal-yellow' : 'bg-signal-green'
                  }`}
                  style={{ width: `${systemStats.memoryUsage}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Disk Space</span>
                <span className="text-sm font-medium">{systemStats.diskSpace}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-signal-green"
                  style={{ width: `${systemStats.diskSpace}%` }}
                />
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <Button size="sm" variant="outline" className="w-full" onClick={() => handleSystemAction('refresh')}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Stats
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Active Users ({activeUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeUsers.map((user) => (
              <div 
                key={user.id}
                className={`border border-border rounded-lg p-3 cursor-pointer hover:bg-muted/20 transition-colors ${
                  selectedUser === user.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-sm">{user.name}</h4>
                  <Badge 
                    variant={user.status === 'online' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {user.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{user.role} • {user.location}</p>
                <p className="text-xs text-muted-foreground">Last active: {user.lastActive}</p>
                
                {selectedUser === user.id && (
                  <div className="flex gap-1 mt-2">
                    <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, 'monitor')}>
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, 'disconnect')}>
                      <UserX className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="w-5 h-5" />
              System Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label>Data Management</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" variant="outline" onClick={() => handleSystemAction('backup')}>
                  <Download className="w-4 h-4 mr-1" />
                  Backup
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleSystemAction('restore')}>
                  <Upload className="w-4 h-4 mr-1" />
                  Restore
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>System Control</Label>
              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full" onClick={() => handleSystemAction('restart')}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Restart Services
                </Button>
                <Button size="sm" variant="outline" className="w-full" onClick={() => handleSystemAction('maintenance')}>
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Maintenance Mode
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Quick Actions</Label>
              <div className="space-y-2">
                <Button size="sm" variant="secondary" className="w-full" onClick={() => navigate("/disruptions")}>
                  View All Alerts
                </Button>
                <Button size="sm" variant="secondary" className="w-full" onClick={() => navigate("/analytics")}>
                  System Reports
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent System Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {systemLogs.map((log, index) => (
              <div key={index} className="flex items-center gap-3 text-sm border-b border-border pb-2 last:border-b-0">
                <span className="text-muted-foreground font-mono w-20">{log.time}</span>
                <Badge 
                  variant={log.level === 'ERROR' ? 'destructive' : log.level === 'WARN' ? 'secondary' : 'outline'}
                  className="w-16 justify-center text-xs"
                >
                  {log.level}
                </Badge>
                <span className="flex-1">{log.message}</span>
                <span className="text-muted-foreground w-24 text-right">{log.user}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}