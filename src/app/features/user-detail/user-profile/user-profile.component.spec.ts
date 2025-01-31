import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { User } from '@core/models/user';
import { of, Subject, throwError } from 'rxjs';
import { LoaderComponent } from '@shared/component/loader/loader.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockActivatedRoute: any;
  let destroy$: Subject<void>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['fetchUserDetail']);
    
    mockActivatedRoute = {
      params: of({ id: 'user--123' })
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, LoaderComponent, UserProfileComponent, HttpClientModule],
      declarations: [],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    destroy$ = new Subject<void>();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe from observables on destroy', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });

  it('should open user website when openWeb is called', () => {
    spyOn(window, 'open');
    component.user = { website: 'https://example.com' } as User;
    
    component.openWeb();

    expect(window.open).toHaveBeenCalledWith('https://example.com');
  });
  
});
