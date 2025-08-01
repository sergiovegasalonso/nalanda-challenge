# Layout

```LayoutModule``` is a place where I recommend putting the components like header and footer used to create basic app layout.These components are usually rendered in the UI at all times and are often included directly into root `AppComponent`:

```html
<sva-header class="sva-header"></sva-header>

<div class="sva-view-container">
  <router-outlet></router-outlet>
</div>
```

```html
layout/
├── footer/
│   ├── footer.component.html
│   ├── footer.component.scss
│   └── footer.component.ts
├── header/
│   ├── header.component.html
│   ├── header.component.scss
│   └── header.component.ts
└── layout.module.ts
```
