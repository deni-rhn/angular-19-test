import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableColumns } from '@core/models/table-columns';
import { User } from '@core/models/user';
import { UserService } from '@core/services/user.service';
import { TableLoadingComponent } from '@shared/component/table-loading/table-loading.component';
import { TableComponent } from '@shared/component/table/table.component';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-table',
  imports: [CommonModule, TableComponent, TableLoadingComponent],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
  standalone: true,
  providers: [UserService]
})
export class UserTableComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  data: User[] = [];
  originalData: User[] = [];
  tableColumns: TableColumns[] = [
    {
      key: 1,
      title: 'Name'
    },
    {
      key: 2,
      title: 'Email'
    },
    {
      key: 3,
      title: 'Website'
    }
  ];
  keyValues: string[] = ['name', 'email', 'website'];
  redirectDetailKey: string = 'name';
  redirectExternalKey: string = 'website';
  searchQuery: string = '';
  searchSubject = new Subject<string>();
  isNoResult: boolean = false;
  isErrorResult: boolean = false;
  loading: boolean = false;

  constructor(
    private userService: UserService
  ) {
    this.searchSubject.pipe(debounceTime(300)).subscribe((query) => {
        this.searchQuery = query;
        this.data = this.searchData(this.searchQuery);
        if (this.data.length === 0) {
          this.isNoResult = true;
        } else {
          this.isNoResult = false;
        }
      });
  }

  ngOnInit(): void {
    this.getUserList();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getUserList() {
    this.loading = true;
    this.userService.fetchUserList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (result) => {
        const resultData = result as User[];
        this.data = resultData;
        this.originalData = resultData;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.isErrorResult = true;
        this.loading = false;
      }
    });
  }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchSubject.next(inputElement.value);
  }

  searchData(search: string) {
    const lowerQuery = search.toLowerCase();
  
    return this.originalData.filter((user: User) =>
      user.name.toLowerCase().includes(lowerQuery) ||
      user.email.toLowerCase().includes(lowerQuery) ||
      user.website.toLowerCase().includes(lowerQuery)
    );
  }

}
