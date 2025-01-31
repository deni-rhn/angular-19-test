import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = 'https://jsonplaceholder.typicode.com';

  constructor(
    private http: HttpClient
  ) {}

  fetchUserList() {
    return this.http.get(`${this.apiUrl}/users`).pipe(
      map((result) => result),
      catchError((error) => error)
    );
  }

  fetchUserDetail(id: string) {
    return this.http.get(`${this.apiUrl}/users/${id}`).pipe(
      map((result) => result),
      catchError((error) => error)
    );
  }

}