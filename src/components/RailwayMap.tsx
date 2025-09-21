import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Train } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TrainData {
  id: string;
  name: string;
  route: string;
  status: 'green' | 'yellow' | 'red';
  delay: number;
  coordinates: [number, number];
}

const trains: TrainData[] = [
  { id: "12952", name: "Rajdhani Express", route: "Delhi-Mumbai", status: "green", delay: 0, coordinates: [77.2090, 28.6139] }, // Delhi
  { id: "12002", name: "Shatabdi Express", route: "Delhi-Chandigarh", status: "yellow", delay: 15, coordinates: [76.7794, 30.7333] }, // Chandigarh
  { id: "12009", name: "Howrah Mail", route: "Delhi-Kolkata", status: "red", delay: 45, coordinates: [88.3639, 22.5726] }, // Kolkata
  { id: "12283", name: "Duronto Express", route: "Mumbai-Pune", status: "green", delay: 0, coordinates: [72.8777, 19.0760] }, // Mumbai
  { id: "12626", name: "Kerala Express", route: "Delhi-Kochi", status: "yellow", delay: 20, coordinates: [76.2673, 9.9312] }, // Kochi
  { id: "12617", name: "Mangala Express", route: "Delhi-Bangalore", status: "green", delay: 5, coordinates: [77.5946, 12.9716] }, // Bangalore
  { id: "12423", name: "Dibrugarh Express", route: "Delhi-Dibrugarh", status: "yellow", delay: 30, coordinates: [94.9120, 27.4728] }, // Dibrugarh
  { id: "12780", name: "Goa Express", route: "Delhi-Goa", status: "green", delay: 0, coordinates: [73.8267, 15.2993] }, // Goa
];

// Major Indian railway routes (simplified)
const railwayRoutes = [
  // Golden Quadrilateral routes
  [[77.2090, 28.6139], [72.8777, 19.0760]], // Delhi-Mumbai
  [[72.8777, 19.0760], [80.2707, 13.0827]], // Mumbai-Chennai  
  [[80.2707, 13.0827], [88.3639, 22.5726]], // Chennai-Kolkata
  [[88.3639, 22.5726], [77.2090, 28.6139]], // Kolkata-Delhi
  
  // Major branch lines
  [[77.2090, 28.6139], [76.7794, 30.7333]], // Delhi-Chandigarh
  [[72.8777, 19.0760], [73.8567, 18.5204]], // Mumbai-Pune
  [[80.2707, 13.0827], [77.5946, 12.9716]], // Chennai-Bangalore
  [[88.3639, 22.5726], [85.8245, 20.2961]], // Kolkata-Bhubaneswar
  [[77.5946, 12.9716], [76.2673, 9.9312]], // Bangalore-Kochi
  [[77.2090, 28.6139], [78.4867, 17.3850]], // Delhi-Hyderabad
];

interface RailwayMapProps {
  onTrainClick: (trainId: string) => void;
}

const RailwayMap: React.FC<RailwayMapProps> = ({ onTrainClick }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);

  const initializeMap = () => {
    if (!mapContainer.current || !apiKey) return;

    mapboxgl.accessToken = apiKey;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [78.9629, 20.5937], // Center of India
      zoom: 4.5,
      pitch: 0,
      bearing: 0
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      if (!map.current) return;

      // Add railway routes as lines
      railwayRoutes.forEach((route, index) => {
        map.current?.addSource(`railway-route-${index}`, {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route
            }
          }
        });

        map.current?.addLayer({
          id: `railway-route-${index}`,
          type: 'line',
          source: `railway-route-${index}`,
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3b82f6',
            'line-width': 3,
            'line-opacity': 0.8
          }
        });
      });

      // Add train markers
      trains.forEach((train) => {
        const el = document.createElement('div');
        el.className = 'train-marker';
        el.style.width = '24px';
        el.style.height = '24px';
        el.style.borderRadius = '50%';
        el.style.cursor = 'pointer';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        
        // Set color based on status
        const statusColors = {
          green: '#10b981',
          yellow: '#f59e0b', 
          red: '#ef4444'
        };
        
        el.style.backgroundColor = statusColors[train.status];
        el.style.border = '3px solid white';
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
        
        // Add train icon
        el.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <rect width="16" height="6" x="4" y="14" rx="2"/>
            <rect width="20" height="8" x="2" y="6" rx="2"/>
            <path d="M6 10h0"/>
            <path d="M10 10h4"/>
            <path d="M18 10h0"/>
            <path d="m9 22 1-1"/>
            <path d="m15 22-1-1"/>
            <path d="M7 22h10"/>
          </svg>
        `;

        // Add click event
        el.addEventListener('click', () => {
          onTrainClick(train.id);
        });

        // Add hover events
        el.addEventListener('mouseenter', () => {
          setSelectedTrain(train.id);
          el.style.transform = 'scale(1.2)';
        });

        el.addEventListener('mouseleave', () => {
          setSelectedTrain(null);
          el.style.transform = 'scale(1)';
        });

        // Create popup
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
          closeOnClick: false
        }).setHTML(`
          <div style="font-family: system-ui; font-size: 12px;">
            <div style="font-weight: 600; margin-bottom: 4px;">${train.name}</div>
            <div style="color: #666; margin-bottom: 2px;">${train.route}</div>
            ${train.delay > 0 ? `<div style="color: #ef4444; font-size: 11px;">Delayed: ${train.delay} min</div>` : '<div style="color: #10b981; font-size: 11px;">On Time</div>'}
          </div>
        `);

        const marker = new mapboxgl.Marker(el)
          .setLngLat(train.coordinates)
          .setPopup(popup)
          .addTo(map.current!);

        // Show popup on hover
        el.addEventListener('mouseenter', () => {
          popup.addTo(map.current!);
        });

        el.addEventListener('mouseleave', () => {
          popup.remove();
        });
      });
    });

    setShowApiKeyInput(false);
  };

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      initializeMap();
    }
  };

  return (
    <div className="relative w-full h-96">
      {showApiKeyInput ? (
        <Card className="absolute inset-0 flex items-center justify-center z-10">
          <CardHeader>
            <CardTitle>Configure Map</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enter your Mapbox public token to display the railway network map.
              Get yours at{' '}
              <a 
                href="https://mapbox.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="pk.eyJ1Ijoi..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleApiKeySubmit}>Load Map</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 text-xs space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-signal-green rounded-full"></div>
              <span>On Time</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-signal-yellow rounded-full"></div>
              <span>Minor Delay</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-signal-red rounded-full"></div>
              <span>Major Delay</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RailwayMap;