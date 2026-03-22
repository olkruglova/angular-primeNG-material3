import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiUrl: string;
  featureFlags: { darkMode: boolean; analytics: boolean };
}

// InjectionToken gives a type-safe way to inject non-class values (objects,
// strings, numbers). The generic <AppConfig> ensures consumers get the right type.
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

export const APP_CONFIG_VALUE: AppConfig = {
  apiUrl: 'https://api.example.com',
  featureFlags: { darkMode: true, analytics: false },
};
