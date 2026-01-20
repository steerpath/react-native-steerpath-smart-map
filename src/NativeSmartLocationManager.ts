import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  // Methods to control the native SDK
  readonly startUpdatingLocation: () => void;
  readonly stopUpdatingLocation: () => void;
  
  // These are standard for Event-emitting modules
  readonly addListener: (eventName: string) => void;
  readonly removeListeners: (count: number) => void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNSmartLocationManager');