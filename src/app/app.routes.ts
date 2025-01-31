import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { UserDetailComponent } from '@pages/user-detail/user-detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: MainLayoutComponent,
    data: {
      title: "Default Data"
    },
    children: [
      {
        path: '',
        component: UserListComponent,
        data: {
          title: "List Data"
        }
      },
      {
        path: ':id',
        component: UserDetailComponent,
        data: {
          title: "Detail Data"
        }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];
