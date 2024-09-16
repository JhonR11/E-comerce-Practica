import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "home",
        loadChildren: ()=> import("./home/home-shell/home.route"),
    },{
        path:"products",
        loadChildren: ()=> import("./products/features/product-shell/product.route"),
    },
    {
        path: "**",
        redirectTo:"home"
    }
];
