import {
  Check,
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Map,
  Hash,
  Globe,
  Navigation,
} from 'lucide-react';

interface AdminReviewCardProps {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
}

function ReviewField({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  const displayValue = value || 'Not provided';
  const isEmpty = !value;

  return (
    <div className="flex items-center gap-3 border-b border-[#e5e5e5] py-2 last:border-b-0">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center">
        <span className="text-[#777]">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[#777]">{label}</p>
      </div>
      <div className="text-right">
        <p
          className={`text-sm font-medium ${isEmpty ? 'text-[#777] italic' : 'text-[#151515]'}`}
        >
          {displayValue}
        </p>
      </div>
    </div>
  );
}

export function AdminReviewCard({
  firstName,
  lastName,
  email,
  countryCode,
  phoneNumber,
  address,
  city,
  state,
  postalCode,
  country,
  latitude,
  longitude,
}: AdminReviewCardProps) {
  return (
    <div className="rounded-xl border border-dashed border-[#e5e5e5] bg-[#fafaf8] p-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#edf8e7]">
          <Check className="h-6 w-6 text-[#16610E]" />
        </div>
        <h5 className="mb-2 text-lg font-semibold text-[#151515]">
          Review Customer Information
        </h5>
      </div>

      <div className="mt-6">
        <ReviewField
          icon={<User className="h-4 w-4" />}
          label="Name"
          value={`${firstName} ${lastName}`}
        />
        <ReviewField
          icon={<Mail className="h-4 w-4" />}
          label="Email"
          value={email}
        />
        <ReviewField
          icon={<Phone className="h-4 w-4" />}
          label="Phone"
          value={`${countryCode} ${phoneNumber}`}
        />
        <ReviewField
          icon={<MapPin className="h-4 w-4" />}
          label="Address"
          value={address}
        />
        <ReviewField
          icon={<Building2 className="h-4 w-4" />}
          label="City"
          value={city}
        />
        <ReviewField
          icon={<Map className="h-4 w-4" />}
          label="State"
          value={state}
        />
        <ReviewField
          icon={<Hash className="h-4 w-4" />}
          label="Postal Code"
          value={postalCode}
        />
        <ReviewField
          icon={<Globe className="h-4 w-4" />}
          label="Country"
          value={country}
        />
        <ReviewField
          icon={<Navigation className="h-4 w-4" />}
          label="Coordinates"
          value={`${latitude}, ${longitude}`}
        />
      </div>
    </div>
  );
}
