# Shared

`SharedModule` is a place to store all the **reusable presentational components**, directives, pipes, helpers and types used by features to create their UI. **No component, directive or anything else from `SharedModule` should depend on any other module, component, provider etc**. There should be **no business logic** implemented by the members of `SharedModule`. You should think about `SharedModule` as of a private `node_modules` collection of reusable functionalities.

Shared module’s directories and files are structured like this:

```
shared/
├── components/
│   ├── complex-component-example/ (larger and more complex reusable components with many sub-components)
│   │   ├── components/
│   │   │   ├── simple-component-example/
│   │   │   │   ├── component-example.component.html
│   │   │   │   ├── component-example.component.scss
│   │   │   │   ├── component-example.component.ts
│   │   │   │   └── private-type-example.ts
│   │   │   └── ...
│   │   ├── types/
│   │   │   ├── type-example.ts
│   │   │   └── ...
│   │   ├── complex-component-example.component.html
│   │   ├── complex-component-example.component.scss
│   │   ├── complex-component-example.component.ts
│   │   └── complex-component-example.module.ts
│   ├── simple-component-example/
│   │   ├── component-example.component.html
│   │   ├── component-example.component.scss
│   │   ├── component-example.component.ts
│   │   └── private-type-example.ts
│   └── ...
├── directives/
│   ├── directive-example.directive.ts
│   └── ...
├── helpers/
│   ├── example.helpers.ts
│   └── ...
├── pipes/
│   ├── pipe-example.pipe.ts
│   └── ...
├── types/
│   ├── type-example.ts
│   └── ...
└── shared.module.ts
```
