import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, switchMap } from 'rxjs';
import { User } from '@core/models/user';
import { UserService } from '@core/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserTableStore {
  private users$ = new BehaviorSubject<User[]>([]);
  private searchQuery$ = new BehaviorSubject<string | null>(null);
  private loading$ = new BehaviorSubject<boolean>(false);
  private error$ = new BehaviorSubject<boolean>(false);

  constructor(private userService: UserService) {}

  get users() {
    return this.users$.asObservable();
  }

  get loading() {
    return this.loading$.asObservable();
  }

  get error() {
    return this.error$.asObservable();
  }

  get searchQuery() {
    return this.searchQuery$.asObservable();
  }

  fetchUsers() {
    this.loading$.next(true);
    this.error$.next(false);

    this.userService.fetchUserList().pipe(
      map((result) => result as User[]), 
      catchError((err: HttpErrorResponse) => {
          this.error$.next(true);
          this.loading$.next(false);
          return of([]);
        })
      ).subscribe((users) => {
        this.users$.next(users);
        this.loading$.next(false);
      }
    );
  }

  setSearchQuery(query: string | null) {
    this.searchQuery$.next(query);
  }

  filteredUsers() {
    return this.searchQuery$.pipe(
      switchMap((query) =>
        this.users$.pipe(
          map((users) =>
            query
              ? users.filter((user) =>
                  user.name.toLowerCase().includes(query.toLowerCase()) ||
                  user.email.toLowerCase().includes(query.toLowerCase()) ||
                  user.website.toLowerCase().includes(query.toLowerCase())
                )
              : users
          )
        )
      )
    );
  }
}
