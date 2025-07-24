import { Route } from '@angular/router';
import { routes as tasksRoutes } from '@features/tasks/tasks-routing-module';

export const routesFromFeatures: Route[] = tasksRoutes;
//.concat(otherFeatureRoutes); // Add other feature routes as needed
