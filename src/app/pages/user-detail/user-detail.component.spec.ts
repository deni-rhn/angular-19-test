import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailComponent } from './user-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    // Create a mock ActivatedRoute with 'params' observable
    mockActivatedRoute = {
      params: of({ id: 'user--1' }) // Replace with actual params you want to test with
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterModule, UserDetailComponent],
      declarations: [],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
