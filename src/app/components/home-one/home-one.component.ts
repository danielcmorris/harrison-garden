import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

declare const Swiper: new (element: HTMLElement, options: object) => { destroy(deleteInstance: boolean, cleanStyles: boolean): void; autoplay: { start(): void; stop(): void } };

@Component({
  selector: 'app-home-one',
  templateUrl: './home-one.component.html',
  styleUrls: ['./home-one.component.scss']
})
export class HomeOneComponent implements AfterViewInit, OnDestroy {
  @ViewChild('slides', { static: true }) slides!: ElementRef<HTMLElement>;
  paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  private swiper?: InstanceType<typeof Swiper>;

  ngAfterViewInit(): void {
    this.swiper = new Swiper(this.slides.nativeElement, {
      loop: true,
      slidesPerView: 1,
      autoplay: this.paused ? false : { disableOnInteraction: false },
      effect: 'fade',
      speed: 3000,
      pagination: {
        clickable: true,
        el: this.slides.nativeElement.querySelector('.swiper-pagination')
      }
    });
  }

  toggleAutoplay(): void {
    this.paused = !this.paused;
    if (this.paused) this.swiper?.autoplay.stop();
    else this.swiper?.autoplay.start();
  }

  ngOnDestroy(): void {
    this.swiper?.destroy(true, true);
  }
}
