import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/common/about/about.component';
import { AgentComponent } from './components/common/agent/agent.component';
import { ContactComponent } from './components/common/contact/contact.component';
import { FeedbackComponent } from './components/common/feedback/feedback.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { GalleryComponent } from './components/common/gallery/gallery.component';
import { MapsComponent } from './components/common/maps/maps.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { PreloaderComponent } from './components/common/preloader/preloader.component';
import { PropertyDetailsComponent } from './components/common/property-details/property-details.component';
import { ServicesComponent } from './components/common/services/services.component';
import { HomeOneComponent } from './components/home-one/home-one.component';
import { HomeTwoComponent } from './components/home-two/home-two.component';
import { HomeThreeComponent } from './components/home-three/home-three.component';
import { HomeFourComponent } from './components/home-four/home-four.component';
import { FeaturesComponent } from './components/common/features/features.component';
import { PropertyDetailsTwoComponent } from './components/common/property-details-two/property-details-two.component';
import { FloorPlansComponent } from './components/common/floor-plans/floor-plans.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AgentComponent,
    ContactComponent,
    FeedbackComponent,
    FooterComponent,
    GalleryComponent,
    MapsComponent,
    NavbarComponent,
    PreloaderComponent,
    PropertyDetailsComponent,
    ServicesComponent,
    HomeOneComponent,
    HomeTwoComponent,
    HomeThreeComponent,
    HomeFourComponent,
    FeaturesComponent,
    PropertyDetailsTwoComponent,
    FloorPlansComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
