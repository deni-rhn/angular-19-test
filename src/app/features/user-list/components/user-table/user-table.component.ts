import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TableColumns } from '@core/models/table-columns';
import { TableComponent } from '@shared/component/table/table.component';
import { TableLoadingComponent } from '@shared/component/table-loading/table-loading.component';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UserTableStore } from '@core/store/user-table.component';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, TableComponent, TableLoadingComponent, FormsModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
  providers: [UserTableStore]
})
export class UserTableComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') inputElement!: ElementRef<HTMLInputElement>;
  private destroy$ = new Subject<void>();

  tableColumns: TableColumns[] = [
    { key: 1, title: 'Name' },
    { key: 2, title: 'Email' },
    { key: 3, title: 'Website' }
  ];
  keyValues: string[] = ['name', 'email', 'website'];
  redirectDetailKey = 'name';
  redirectExternalKey = 'website';
  searchValue: string | null = null;

  constructor(
    private userTableStore: UserTableStore,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  get users$() {
    return this.userTableStore.filteredUsers();
  }

  get loading$() {
    return this.userTableStore.loading;
  }

  get error$() {
    return this.userTableStore.error;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params: Params) => {
      const searchQuery = params['search'] || null;
      this.searchValue = searchQuery;
      this.userTableStore.setSearchQuery(searchQuery);
    });

    this.userTableStore.fetchUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearch() {
    const query = this.inputElement.nativeElement.value;
    this.router.navigate(['.'], { relativeTo: this.activatedRoute, queryParams: { search: query || null } });
  }
}
