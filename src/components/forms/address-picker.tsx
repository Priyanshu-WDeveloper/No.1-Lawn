import { useState, useRef, useEffect } from 'react';
import { MapPin, Search, Navigation, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface AddressPickerProps {
  label: string;
  value?: string;
  onChange?: (address: string) => void;
  required?: boolean;
  apiKey?: string;
}

interface PlacePrediction {
  description: string;
  place_id: string;
  structured_formatting?: {
    main_text: string;
    secondary_text: string;
  };
}

// Mock predictions for demo - replace with Google Places API in production
const mockPredictions: PlacePrediction[] = [
  {
    description: '383A Richardson Road, Mount Roskill, Auckland',
    place_id: '1',
  },
  {
    description: '383 Richardson Road, Mount Roskill, Auckland',
    place_id: '2',
  },
  {
    description: '38 Richardson Road, Mount Roskill, Auckland',
    place_id: '3',
  },
  { description: 'Auckland, New Zealand', place_id: '4' },
  {
    description: 'Mount Roskill, Auckland, New Zealand',
    place_id: '5',
  },
  { description: '1041 Mount Roskill Road, Auckland', place_id: '6' },
  { description: 'New Zealand', place_id: '7' },
];

export function AddressPicker({
  label,
  value,
  onChange,
  required,
  apiKey,
}: AddressPickerProps) {
  const [searchQuery, setSearchQuery] = useState(value || '');
  const [predictions, setPredictions] = useState<PlacePrediction[]>(
    [],
  );
  const [showPredictions, setShowPredictions] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string>(
    value || '',
  );
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowPredictions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (query.length < 2) {
      setPredictions([]);
      setShowPredictions(false);
      return;
    }

    setIsLoading(true);

    // If Google API key is provided, use Google Places API
    if (apiKey) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${apiKey}&components=country:nz`,
        );
        const data = await response.json();
        if (data.predictions) {
          setPredictions(data.predictions);
          setShowPredictions(true);
        }
      } catch (error) {
        console.error('Google Places API error:', error);
        // Fallback to mock predictions
        filterMockPredictions(query);
      }
    } else {
      // Use mock predictions
      filterMockPredictions(query);
    }

    setIsLoading(false);
  };

  const filterMockPredictions = (query: string) => {
    const filtered = mockPredictions.filter((p) =>
      p.description.toLowerCase().includes(query.toLowerCase()),
    );
    setPredictions(filtered);
    setShowPredictions(true);
  };

  const handleSelectPrediction = (prediction: PlacePrediction) => {
    const address = prediction.description;
    setSelectedAddress(address);
    setSearchQuery(address);
    onChange?.(address);
    setShowPredictions(false);
    setPredictions([]);
  };

  const handleClear = () => {
    setSelectedAddress('');
    setSearchQuery('');
    onChange?.('');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleSearch(e.target.value);
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        <MapPin className="h-4 w-4 text-primary" />
        {label}
        {required && <span className="text-primary">*</span>}
      </label>

      {/* Search Input Container */}
      <div ref={dropdownRef} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
          <Input
            type="text"
            placeholder="Search for an address..."
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() =>
              searchQuery.length >= 2 && setShowPredictions(true)
            }
            className="h-12 pl-11 pr-10 border-border rounded-xl bg-background focus:bg-white focus:border-primary focus:ring-ring transition-all placeholder:text-muted-foreground"
          />
          {isLoading && (
            <Loader2 className="absolute right-10 top-1/2 -translate-y-1/2 h-4 w-4 text-primary animate-spin" />
          )}
          {selectedAddress && !isLoading && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Predictions Dropdown - Fixed z-index and positioning */}
        {showPredictions && predictions.length > 0 && (
          <div className="absolute z-[9999] w-full mt-2 bg-white rounded-xl border border-border shadow-xl overflow-hidden max-h-[280px] overflow-y-auto">
            {predictions.map((prediction, index) => (
              <button
                key={prediction.place_id || index}
                type="button"
                onClick={() => handleSelectPrediction(prediction)}
                className="w-full px-4 py-3 text-left hover:bg-primary/10 transition-colors flex items-start gap-3 border-b border-muted last:border-b-0"
              >
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="text-sm text-foreground block">
                    {prediction.structured_formatting?.main_text ||
                      prediction.description}
                  </span>
                  {prediction.structured_formatting
                    ?.secondary_text && (
                    <span className="text-xs text-muted-foreground">
                      {
                        prediction.structured_formatting
                          .secondary_text
                      }
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Address Display */}
      {selectedAddress && (
        <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
              <Navigation className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-primary font-medium">
                Selected Address
              </p>
              <p className="text-sm text-foreground truncate">
                {selectedAddress}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Map Placeholder */}
      <div className="relative h-40 rounded-xl overflow-hidden bg-[#f5f5f5] border border-border">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <MapPin className="h-8 w-8 text-[#ccc] mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Map preview</p>
            <p className="text-xs text-[#bbb] mt-1">
              {apiKey
                ? 'Google Maps connected'
                : 'Add Google API key for live map'}
            </p>
          </div>
        </div>
        {selectedAddress && (
          <div className="absolute inset-0 bg-primary/30" />
        )}
      </div>

      <p className="text-xs text-muted-foreground flex items-center gap-1">
        <MapPin className="h-3 w-3" />
        Search and select an address from the suggestions
      </p>
    </div>
  );
}
