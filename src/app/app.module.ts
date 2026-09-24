import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/common/about/about.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { GalleryComponent } from './components/common/gallery/gallery.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { HomeOneComponent } from './components/home-one/home-one.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    FooterComponent,
    GalleryComponent,
    NavbarComponent,
    HomeOneComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
