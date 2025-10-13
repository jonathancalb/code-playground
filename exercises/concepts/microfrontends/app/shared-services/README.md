# Shared Services Microfrontend

Este microfrontend expone servicios compartidos que pueden ser consumidos por otros microfrontends via Module Federation.

## Servicios expuestos

- **httpInterceptor**: Cliente HTTP centralizado con manejo de errores
- **eventBus**: Sistema de comunicación entre microfrontends usando CustomEvents

## Configuración

```javascript
// En cualquier microfrontend que quiera usar estos servicios
federation({
  name: 'myMF',
  remotes: {
    sharedServices: 'http://localhost:5003/assets/remoteEntry.js',
  },
  // ... resto de configuración
})
```

## Uso

```javascript
// Importar servicios desde el MF
import { httpInterceptor } from 'sharedServices/httpInterceptor';
import eventBus from 'sharedServices/eventBus';

// Usar directamente
httpInterceptor.request('/api/data')
eventBus.emit('customEvent', data)
```

## Ventajas sobre window

- ✅ Type-safe imports
- ✅ Tree-shaking
- ✅ Versionado automático
- ✅ Mejor para testing
- ✅ No contamina el scope global

## Desarrollo

```bash
npm install
npm run dev  # Puerto 5003
```

Este MF no necesita React ni ninguna vista - solo expone servicios puros.
