import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayoutComponent } from './main-layout.component';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { of, Subject } from 'rxjs';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
  let mockRouter: any;
  let mockActivatedRoute: any;
  let routerEvents$: Subject<any>;

  beforeEach(async () => {
    routerEvents$ = new Subject<any>();

    mockRouter = {
      events: routerEvents$.asObservable()
    };

    mockActivatedRoute = {
      snapshot: {
        data: { title: 'Test Title' }
      },
      firstChild: null
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, CommonModule, MainLayoutComponent, HeaderComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set title from activated route on init', () => {
    component.ngOnInit();
    expect(component.title).toBe('Test Title');
  });

  it('should update title on NavigationEnd event', () => {
    component.ngOnInit();
    mockActivatedRoute.snapshot.data.title = 'Updated Title';

    routerEvents$.next(new NavigationEnd(1, 'oldUrl', 'newUrl'));

    expect(component.title).toBe('Updated Title');
  });

  it('should unsubscribe on destroy', () => {
    component.ngOnInit();
    spyOn(component['routeSub'], 'unsubscribe');

    component.ngOnDestroy();

    expect(component['routeSub'].unsubscribe).toHaveBeenCalled();
  });
});
