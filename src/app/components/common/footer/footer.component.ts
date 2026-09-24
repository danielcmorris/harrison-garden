import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
  showBackToTop = window.scrollY > 300;

  @HostListener('window:scroll')
  onScroll(): void {
    this.showBackToTop = window.scrollY > 300;
  }

  backToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
