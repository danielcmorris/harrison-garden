import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeOneComponent } from './components/home-one/home-one.component';
import { HomeTwoComponent } from './components/home-two/home-two.component';
import { HomeThreeComponent } from './components/home-three/home-three.component';
import { HomeFourComponent } from './components/home-four/home-four.component';

const routes: Routes = [
    {path: '', component: HomeOneComponent},
    {path: 'home-2', component: HomeTwoComponent},
    {path: 'home-3', component: HomeThreeComponent},
    {path: 'home-4', component: HomeFourComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes,  {
        anchorScrolling: 'enabled',   // 👈 this enables anchor link scrolling
        onSameUrlNavigation: 'ignore',
        scrollPositionRestoration: 'enabled' // (optional) restores scroll on navigation
    }
)],
    exports: [RouterModule]
})
export class AppRoutingModule { }



