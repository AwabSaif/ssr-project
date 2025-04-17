import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeLayoutComponent,
        children: [
          {
            path:  '',
            loadComponent: () =>
              import(
                './components/home/home.component'
                    ).then((m) => m.HomeComponent),
          },
          {
            path:  'about-us',
            loadComponent: () =>
              import(
                './components/about-us/about-us.component'
                    ).then((m) => m.AboutUsComponent),
          },
          {
            path:  'contact-us',
            loadComponent: () =>
              import(
                './components/contact-us/contact-us.component'
                    ).then((m) => m.ContactUsComponent),
          },
          {
            path:  'map',
            loadComponent: () =>
              import(
                './components/map-viewer/map-viewer.component'
                    ).then((m) => m.MapViewerComponent),
                
          }
        ],
      },
];
