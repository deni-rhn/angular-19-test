import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TableColumns } from '@core/models/table-columns';
import { User } from '@core/models/user';
import { openUrl } from '@core/utils/openUrl';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true
})
export class TableComponent {
  @Input() columns: TableColumns[] = [];
  @Input() keyValues: string[] = [];
  @Input() data: User[] | null = [];
  @Input() isNoResult: boolean = false;
  @Input() isErrorResult: boolean | null = false;
  @Input() redirectDetailKey!: string;
  @Input() redirectExternalKey!: string;

  constructor(
  ) {}

  openExternalUrl(url: string) {
    openUrl(url);
  }

  openDetail(id: string) {
    const param: string = id.replace(' ', '-');
    const idParam: User = this.data?.find(item => item.name === id) as User;
    window.open(`/list/${param}--${idParam.id}`, '_blank');
  }

  openMail(email: string) {
    const subject = encodeURIComponent("Hi");
    const body = encodeURIComponent("This is a email.");

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

}
