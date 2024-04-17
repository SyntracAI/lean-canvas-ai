import { type ClassValue, clsx } from 'clsx';

import { twMerge } from '@syntrac/frontend-web-theme';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
