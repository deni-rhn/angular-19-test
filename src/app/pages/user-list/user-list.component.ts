import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserTableComponent } from '../../features/user-list';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, UserTableComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  standalone: true
})
export class UserListComponent {

}
