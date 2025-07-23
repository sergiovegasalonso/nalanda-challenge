# Core

Core module is dedicated to **singleton providers (observable stores/services) provided in root injector**. Only one instance is created for each one of these services in app’s “lifetime” between page reloads. These services contain business logic used by other core services or app’s features.

An example of such service would be the `user` core service which is responsible for holding the state of the logged-in user.

Core module’s directories and files are structured like this:

```
core/
├── core-service-example/
│   ├── helpers/ (pure helper functions grouped by related functionalities)
│   │   ├── example.helpers.ts
│   │   └── ...
│   ├── services/ (observable stores, endpoints, regular Angular services (providers) etc.)
│   │   ├── core-service-example-resolver.service.ts (data providers used by Angular router - see https://angular.io/api/router/Resolve)
│   │   ├── core-service-example.endpoint.ts
│   │   ├── core-service-example.store.state.ts
│   │   ├── core-service-example.store.ts
│   │   └── ...
│   ├── types/ (TypeScript types, interfaces and classes)
│   │   ├── type-example.ts
│   │   └── ...
│   ├── core-service-example.config.ts
│   └── (core-submodule-example.module.ts) (optional for larger core submodules)
├── another-core-service-example/
│   └── ... (same as above)
└── core.module.ts
```
