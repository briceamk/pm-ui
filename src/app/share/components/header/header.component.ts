import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() signOut: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  doToggleSideBar() {
    this.toggleSidebar.emit();
  }

  doSignOut() {
    this.signOut.emit();
  }

}
