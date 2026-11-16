import { Crown, Flower2, Gem, Heart, Moon, Sparkles } from 'lucide-react';
import type { ServiceIconKey } from '../data/mehndiData';

interface ServiceIconProps {
  name: ServiceIconKey;
  className?: string;
}

export function ServiceIcon({ name, className = 'w-5 h-5' }: ServiceIconProps) {
  switch (name) {
    case 'crown':
      return <Crown className={className} aria-hidden="true" />;
    case 'flower':
      return <Flower2 className={className} aria-hidden="true" />;
    case 'sparkles':
      return <Sparkles className={className} aria-hidden="true" />;
    case 'moon':
      return <Moon className={className} aria-hidden="true" />;
    case 'heart':
      return <Heart className={className} aria-hidden="true" />;
    case 'gem':
      return <Gem className={className} aria-hidden="true" />;
  }
}
