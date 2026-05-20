import { useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { MapPin, ExternalLink } from 'lucide-react';

const containerStyle = {
  width: '100%',
  borderRadius: '12px',
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060,
};

interface StaticMapProps {
  lat: number;
  lng: number;
  height?: number;
  zoom?: number;
}

export function StaticMap({
  lat,
  lng,
  height = 300,
  zoom = 15,
}: StaticMapProps) {
  
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey || '',
  });

  const center = useCallback(
    () => ({
      lat: lat || defaultCenter.lat,
      lng: lng || defaultCenter.lng,
    }),
    [lat, lng],
  );

  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  // No API key or loading error - show fallback
  if (!apiKey || loadError) {
    return (
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#edf8e7] hover:bg-[#dff0d4] border border-[#c7e8b9] rounded-xl text-[#16610E] font-medium transition-colors"
      >
        <MapPin className="h-4 w-4" />
        View on Google Maps
        <ExternalLink className="h-3 w-3" />
      </a>
    );
  }

  if (!isLoaded) {
    return (
      <div
        className="w-full bg-gray-100 rounded-xl flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-gray-500 text-sm">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div
        className="overflow-hidden rounded-xl border border-[#ececec]"
        style={{ height }}
      >
        <GoogleMap
          mapContainerStyle={{ ...containerStyle, height: '100%' }}
          center={center()}
          zoom={zoom}
          options={{
            disableDefaultUI: false,
            zoomControl: true,
            streetViewControl: true,
            mapTypeControl: false,
            fullscreenControl: true,
          }}
        >
          <Marker position={{ lat, lng }} />
        </GoogleMap>
      </div>
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#edf8e7] hover:bg-[#dff0d4] border border-[#c7e8b9] rounded-xl text-[#16610E] font-medium transition-colors"
      >
        <MapPin className="h-4 w-4" />
        View on Google Maps
        <ExternalLink className="h-3 w-3" />
      </a>
    </div>
  );
}
