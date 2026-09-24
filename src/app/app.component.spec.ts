import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { FooterComponent } from './components/common/footer/footer.component';

describe('Harrison application shell', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, NavbarComponent, FooterComponent]
    }).compileComponents();
  });

  it('renders the property navigation and company footer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(Array.from(element.querySelectorAll('.nav-link')).map(link => link.textContent.trim()))
      .toEqual(['Home', 'About', 'Gallery']);
    expect(element.querySelector('footer').textContent).toContain('Morris Development, Inc.');
    expect(element.querySelector('router-outlet')).not.toBeNull();
  });

  it('opens the mobile menu and closes it when a section is selected', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const toggle = element.querySelector<HTMLButtonElement>('.navbar-toggler');
    toggle.click();
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(element.querySelector('.navbar-collapse').classList.contains('show')).toBeTrue();
    element.querySelector<HTMLAnchorElement>('.nav-link').click();
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('updates sticky navigation when scrolling', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    spyOnProperty(window, 'scrollY').and.returnValue(400);
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('nav').classList.contains('is-sticky')).toBeTrue();
  });

  it('returns to the top from the footer control', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const scroll = spyOn(window, 'scrollTo');
    fixture.componentInstance.showBackToTop = true;
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.go-top').click();
    expect(scroll.calls.mostRecent().args).toEqual([{ top: 0, behavior: 'smooth' }] as any);
  });
});
