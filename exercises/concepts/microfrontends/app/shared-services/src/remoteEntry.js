// Remote entry point for shared services
// This file exposes services through Module Federation

import eventBus from './eventBus';
import { httpInterceptor } from './httpInterceptor';

// Export individual services
export { default as eventBus } from './eventBus';
export { httpInterceptor } from './httpInterceptor';

console.log('[Shared Services] Remote entry loaded and services initialized');
