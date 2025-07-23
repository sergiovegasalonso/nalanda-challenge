# Features

Feature module is a module composed of related components, providers, types, constants, routing configs etc. All these **components work together to implement an app’s feature**. Their only concern should be this feature and they **should care as little as possible about other parts of the app**. This means that all of the **connections to the “outside world” are made from features’ services** to services in `CoreModule` or by features’ views synching query params’ state with state in features’ stores.

**A feature should never communicate with other features directly - this communications should be supported via services in** `CoreModules`. By adhering to this rule we prevent creating direct dependencies/tight coupling between features. We should be able to remove any non-core feature from our app without breaking other app’s features.

Feature modules live inside `app/features/` directory, each module in its own subdirectory, with a structure like this:

```
features/
├── feature-example/
│   ├── components/ (presentational components)
│   │   ├── component-example/
│   │   │   ├── component-example.component.html
│   │   │   ├── component-example.component.scss
│   │   │   ├── component-example.component.ts
│   │   │   └── private-type-example.ts (TypeScript type used by this presentational component only)
│   │   └── ...
│   ├── containers/ (container components that CAN'T be routed to, usually used by views to compose more complex interfaces)
│   │   ├── container-example/
│   │   │   ├── container-example.container.html
│   │   │   ├── container-example.container.scss
│   │   │   └── container-example.container.ts
│   │   └── ...
│   ├── helpers/ (pure helper functions grouped by related functionalities)
│   │   ├── example.helpers.ts
│   │   └── ...
│   ├── services/ (observable stores, endpoints, regular Angular services (providers) etc.)
│   │   ├── feature-example.endpoint.ts
│   │   ├── feature-example.store.state.ts
│   │   ├── feature-example.store.ts
│   │   └── ...
│   ├── types/ (TypeScript types, interfaces and classes)
│   │   ├── type-example.ts
│   │   └── ...
│   ├── views/ (container components that CAN be routed to)
│   │   ├── view-example/
│   │   │   ├── view-example.view.html
│   │   │   ├── view-example.view.scss
│   │   │   └── view-example.view.ts
│   │   └── ...
│   ├── feature-example-routing.module.ts
│   ├── feature-example.configs.ts
│   ├── feature-example.constants.ts
│   └── feature-example.module.ts
└── another-feature-example/
    └── ... (same as above)
```
