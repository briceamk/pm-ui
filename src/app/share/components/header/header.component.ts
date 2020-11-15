import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SignInResponse} from '@module/auth/models';

@Component({
  selector: 'pm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

  @Input() profile: SignInResponse;
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
