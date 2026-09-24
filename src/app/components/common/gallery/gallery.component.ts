import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements AfterViewInit, OnDestroy {
  private popups: any;

  constructor(private element: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.popups = $(this.element.nativeElement).find('.popup-btn');
    this.popups.magnificPopup({ type: 'image', gallery: { enabled: true } });
  }

  ngOnDestroy(): void {
    // Magnific Popup has no public destroy method; release its namespaced handlers and data.
    if ($.magnificPopup.instance.isOpen) {
      $.magnificPopup.close();
    }
    this.popups?.off('.magnificPopup').removeData('magnificPopup');
  }
}
