import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeOneComponent } from './components/home-one/home-one.component';

const routes: Routes = [
    {path: '', component: HomeOneComponent},
    {path: 'home-2', redirectTo: '', pathMatch: 'full'},
    {path: 'home-3', redirectTo: '', pathMatch: 'full'},
    {path: 'home-4', redirectTo: '', pathMatch: 'full'},
    {path: '**', redirectTo: ''},
];

@NgModule({
    imports: [RouterModule.forRoot(routes,  {
        anchorScrolling: 'enabled',
        onSameUrlNavigation: 'ignore',
        scrollPositionRestoration: 'enabled'
    }
)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
