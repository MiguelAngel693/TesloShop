import { Routes } from "@angular/router";
import { StoreFrontLayout } from "./layouts/store-front-layout/store-front-layout";
import { Home } from "./pages/home/home";
import { Gender } from "./pages/gender-page/gender-page";
import { Product } from "./pages/product/product";
import { NotFound } from "./pages/not-found/not-found";

export const storeFrontRoutes: Routes = [
  {
    path: '',
    component: StoreFrontLayout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: 'gender/:gender',
        component: Gender
      },
      {
        path: 'product/:idSlug',
        component: Product
      },
      {
        path: '**',
        component: NotFound,
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
  }
]


export default storeFrontRoutes;
