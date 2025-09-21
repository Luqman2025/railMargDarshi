import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { RailSidebar } from "@/components/RailSidebar";
import Dashboard from "./pages/Dashboard";
import TrainDetails from "./pages/TrainDetails";
import Analytics from "./pages/Analytics";
import Disruptions from "./pages/Disruptions";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <RailSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-12 flex items-center border-b border-border bg-card/50 backdrop-blur-sm">
                <SidebarTrigger className="ml-4" />
                <div className="ml-4">
                  <span className="text-sm text-muted-foreground">Indian Railways Traffic Control System</span>
                </div>
              </header>
              <main className="flex-1 overflow-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/train-details" element={<TrainDetails />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/disruptions" element={<Disruptions />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
