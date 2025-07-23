# Views

`ViewsModule` is another module that usually turns out to be quite simple. It holds the views that are not a part of any feature and whose routing paths are defined in `AppRoutingModule`. An example of such a view is a 404 page (`PageNotFoundView`).

```typescript
const appRoutes: Routes = [
  {
    path: "",
    redirectTo: coffeeListRoutingPaths.coffeeList,
    pathMatch: "full",
  },
  { path: "**", component: PageNotFoundView },
];
```

```
views/
├── page-not-found/
│   ├── page-not-found.component.html
│   ├── page-not-found.component.scss
│   └── page-not-found.component.ts
└── views.module.ts
```
