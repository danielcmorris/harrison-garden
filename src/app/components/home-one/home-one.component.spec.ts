import { TestBed } from '@angular/core/testing';
import { HomeOneComponent } from './home-one.component';
import { AboutComponent } from '../common/about/about.component';
import { GalleryComponent } from '../common/gallery/gallery.component';

declare const $: any;

describe('Home plugin lifecycle', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeOneComponent, AboutComponent, GalleryComponent]
    }).compileComponents();
  });

  it('initializes once per view and destroys Swiper when the view leaves', () => {
    const destroy = jasmine.createSpy('destroy');
    const initialize = spyOn(window as any, 'Swiper').and.returnValue({ destroy });
    const fixture = TestBed.createComponent(HomeOneComponent);
    fixture.detectChanges();
    fixture.detectChanges();
    expect(initialize).toHaveBeenCalledTimes(1);
    expect(initialize.calls.mostRecent().args[0]).toBe(fixture.nativeElement.querySelector('.home-slides'));
    fixture.destroy();
    expect(destroy).toHaveBeenCalledOnceWith(true, true);
  });

  it('removes popup handlers and closes an open gallery on teardown', () => {
    const fixture = TestBed.createComponent(GalleryComponent);
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('.popup-btn');
    expect($(link).data('magnificPopup')).toBeDefined();
    $(link).magnificPopup('open', 0);
    expect($.magnificPopup.instance.isOpen).toBeTrue();
    fixture.destroy();
    expect($.magnificPopup.instance.isOpen).toBeFalse();
    expect($(link).data('magnificPopup')).toBeUndefined();
    expect($._data(link, 'events')).toBeUndefined();
  });

  it('uses lazy thumbnails and separate popup sources', () => {
    const fixture = TestBed.createComponent(GalleryComponent);
    fixture.detectChanges();
    const links: HTMLAnchorElement[] = Array.from(fixture.nativeElement.querySelectorAll('.popup-btn'));
    expect(links.length).toBe(8);
    for (const link of links) {
      const image = link.querySelector('img');
      expect(image.loading).toBe('lazy');
      expect(image.getAttribute('width')).toBeTruthy();
      expect(image.getAttribute('height')).toBeTruthy();
      expect(image.src).toContain('-thumb.webp');
      expect(link.href).toContain('-large.webp');
    }
  });
});
