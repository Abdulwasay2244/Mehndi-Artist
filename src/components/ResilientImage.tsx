import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  loading?: 'eager' | 'lazy';
}

export function ResilientImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle,
  loading = 'eager',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F4EBE4] via-[#FDF8F5] to-[#EBDAD0] text-[#1E3F20] p-6 text-center"
      >
        <div className="w-12 h-12 rounded-full border border-[#D4AF37]/50 flex items-center justify-center mb-3 bg-[#FDF8F5]/80">
          <Sparkles className="w-5 h-5 text-[#8B3A2B]" aria-hidden="true" />
        </div>
        <p className="font-serif text-base font-medium text-[#1E3F20]">
          {fallbackTitle || alt}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
