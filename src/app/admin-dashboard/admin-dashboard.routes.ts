import { Routes } from "@angular/router";
import { AdminDashboard } from "./layouts/admin-dashboard/admin-dashboard";
import { ProductsAdmin } from "./pages/products-admin/products-admin";
import { ProductAdmin } from "./pages/product-admin/product-admin";


export const AdminDashboardRoutes: Routes = [
  {
    path: '',
    component: AdminDashboard,
    children:[
      {
        path:'products',
        component: ProductsAdmin
      },
      {
        path:'product/:id',
        component: ProductAdmin
      },
      {
        path:'**',
        redirectTo:'products',
      }
    ]
  }
]

export default AdminDashboardRoutes;
