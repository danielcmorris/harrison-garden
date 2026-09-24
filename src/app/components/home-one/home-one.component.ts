import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

declare const Swiper: new (element: HTMLElement, options: object) => { destroy(deleteInstance: boolean, cleanStyles: boolean): void };

@Component({
  selector: 'app-home-one',
  templateUrl: './home-one.component.html',
  styleUrls: ['./home-one.component.scss']
})
export class HomeOneComponent implements AfterViewInit, OnDestroy {
  @ViewChild('slides', { static: true }) slides!: ElementRef<HTMLElement>;
  private swiper?: InstanceType<typeof Swiper>;

  ngAfterViewInit(): void {
    this.swiper = new Swiper(this.slides.nativeElement, {
      loop: true,
      slidesPerView: 1,
      autoplay: true,
      effect: 'fade',
      speed: 3000,
      pagination: {
        clickable: true,
        el: this.slides.nativeElement.querySelector('.swiper-pagination')
      }
    });
  }

  ngOnDestroy(): void {
    this.swiper?.destroy(true, true);
  }
}
