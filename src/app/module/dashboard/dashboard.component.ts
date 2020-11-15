import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'pm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {

  constructor(private _title: Title) {
    this._title.setTitle('Tableau de bord - PM');
  }

  ngOnInit(): void {
  }


}
