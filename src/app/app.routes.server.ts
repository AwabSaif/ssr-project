import { RenderMode, ServerRoute } from '@angular/ssr';


export const serverRoutes: ServerRoute[] = [

  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'about-us',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'contact-us',
    renderMode: RenderMode.Server,
  },
  {
    path: 'map',
    renderMode: RenderMode.Client,
  }, 
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },

];
