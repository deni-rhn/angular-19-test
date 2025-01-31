import { Component } from '@angular/core';
import { UserProfileComponent } from '@features/user-detail/user-profile/user-profile.component';

@Component({
  selector: 'app-user-detail',
  imports: [UserProfileComponent],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
  standalone: true
})
export class UserDetailComponent {

}
