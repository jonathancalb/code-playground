// Centralized Event Bus - uses CustomEvents
class EventBus {
  constructor() {
    this.element = document.createElement('div');
    console.log('[EventBus] Instance created in HOST');
  }

  on(event, callback) {
    const handler = (e) => callback(e.detail);
    this.element.addEventListener(event, handler);
    console.log(`[EventBus] Listener registered: ${event}`);
    
    return () => {
      this.element.removeEventListener(event, handler);
    };
  }

  emit(event, data) {
    console.log(`[EventBus] Event emitted: ${event}`, data);
    const customEvent = new CustomEvent(event, { detail: data });
    this.element.dispatchEvent(customEvent);
  }
}

const eventBus = new EventBus();
export default eventBus;

