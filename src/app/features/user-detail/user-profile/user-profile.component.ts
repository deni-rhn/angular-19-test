import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { User } from '@core/models/user';
import { UserService } from '@core/services/user.service';
import { openUrl } from '@core/utils/openUrl';
import { LoaderComponent } from '@shared/component/loader/loader.component';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  imports: [RouterModule, LoaderComponent, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  standalone: true,
  providers: [UserService]
})
export class UserProfileComponent implements OnInit, OnDestroy {
  routeSubs!: Subscription;
  private destroy$ = new Subject<void>();
  user!: User;
  loading: boolean = false;
  isError: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSubs = this.route.params.subscribe({
      next: (param: Params) => {
        if (param['id']) {
          this.getUserDetail(param['id']);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubs?.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  getUserDetail(id: string) {
    this.loading = true;
    const userId: string = id.split('--')[1];
    this.userService.fetchUserDetail(userId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (result) => {
        const userDetail: User = result as User;
        this.user = userDetail;
        this.loading = false;
        this.isError = false;
      },
      error: (error) => {
        this.loading = false;
        this.isError = true;
      }
    });
  }

  openWeb() {
    openUrl(this.user.website);
  }
  
  openMail() {
    const subject = encodeURIComponent("Hi");
    const body = encodeURIComponent("This is a email.");

    window.location.href = `mailto:${this.user.email}?subject=${subject}&body=${body}`;
  }

}
