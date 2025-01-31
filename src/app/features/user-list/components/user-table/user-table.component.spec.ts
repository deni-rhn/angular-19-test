import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTableComponent } from './user-table.component';
import { UserService } from '@core/services/user.service';
import { of, throwError } from 'rxjs';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;
  let userServiceMock: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    userServiceMock = {
      getUsers: jasmine.createSpy('getUsers').and.returnValue(of([]))
    };

    await TestBed.configureTestingModule({
      // declarations: [UserTableComponent],
      imports: [HttpClientModule, RouterModule.forRoot([]), UserTableComponent, RouterTestingModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle error when fetching users fails', () => {
    const errorResponse = new HttpErrorResponse({ status: 500 });
    userServiceMock.getUsers.and.returnValue(throwError(() => errorResponse));
    component.ngOnInit();
    expect(component.data).toEqual([]); // Ensure users array remains empty on error
  });
});