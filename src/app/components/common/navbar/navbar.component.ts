import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  sticky = window.scrollY > 120;
  menuOpen = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.sticky = window.scrollY > 120;
  }
}
