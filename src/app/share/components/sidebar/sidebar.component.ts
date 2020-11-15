import {
  AfterViewInit, ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { VERSION } from '@angular/material/core';

import { Store } from '@ngrx/store';

import { NavItem } from '@share/models';
import { NavService } from '@share/services/nav.service';

import * as fromStore from '@module/auth/store';
import { SignInResponse } from '@module/auth/models';

@Component({
  selector: 'pm-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements AfterViewInit, OnInit {
  @ViewChild('appDrawer') appDrawer: ElementRef;
  version = VERSION;
  navItems: NavItem[] = [
    {
      displayName: 'Tableau de bord',
      iconName: 'dashboard',
      route: '/dashboard',
    },
    {
      displayName: 'Organisation',
      iconName: 'shop',
      children: [
        {
          displayName: 'Départements',
          iconName: 'leaderboard',
          route: '/organization/departments'
        },
        {
          displayName: 'Centre de coût',
          iconName: 'store',
          route: '/organization/cost-centers'
        },
        {
          displayName: 'Type de charges',
          iconName: 'payment',
          route: '/organization/charges'
        },
        {
          displayName: 'Circuits de validation',
          iconName: 'receipt_long',
          route: '/organization/workflows'
        },
        {
          displayName: 'Roles Master',
          iconName: 'rule',
          route: '/organization/functions'
        },
        {
          displayName: 'Adresses',
          iconName: 'place',
          route: '/organization/addresses'
        },
      ]
    },
    {
      displayName: 'Catalogue',
      iconName: 'local_laundry_service',
      children: [
        {
          displayName: 'Articles',
          iconName: 'inbox',
          route: '/catalog/products',
        },
        {
          displayName: 'Catégories',
          iconName: 'shop_two',
          route: '/catalog/categories',
        },
        {
          displayName: 'Catalogues',
          iconName: 'work',
          route: '/catalog/catalogs',
        },
      ],
    },
    {
      displayName: 'Administration',
      iconName: 'settings',
      authorities: ['ROLE_ADMIN', 'ROLE_MANAGER'],
      children: [
        {
          displayName: 'Utilisateurs',
          iconName: 'perm_identity',
          route: '/auth/users',
        },
        {
          displayName: 'Sociétés',
          iconName: 'business',
          route: '/company/companies',
          authorities: ['ROLE_ADMIN'],
        },
        {
          displayName: 'Tâches planifiées',
          iconName: 'schedule',
          route: '/cron/job-infos',
          authorities: ['ROLE_ADMIN'],
        },
        {
          displayName: 'Notifications',
          iconName: 'notifications',
          children: [
            {
              displayName: 'Emails',
              iconName: 'mail',
              route: '/notification/mails',
              authorities: ['ROLE_ADMIN', 'ROLE_MANAGER'],
            },
            {
              displayName: 'Serveurs emails',
              iconName: 'dns',
              route: '/notification/mail-servers',
              authorities: ['ROLE_ADMIN', 'ROLE_MANAGER'],
            },
            {
              displayName: "Modèles d'emails",
              iconName: 'inbox',
              route: '/notification/mail-templates',
              authorities: ['ROLE_ADMIN', 'ROLE_MANAGER'],
            },
          ],
        },
      ],
    },
  ];

  @Input() profile: SignInResponse;
  fullName: string;
  email: string;
  authorities: string[];

  constructor(
    private navService: NavService,
    private _store: Store<fromStore.SecurityState>
  ) {}

  ngOnInit() {
    if (this.profile != null) {
      // here we set default profile values to display
      this.fullName =
        this.profile.firstName != null
          ? this.profile.firstName + ' ' + this.profile.lastName
          : this.profile.lastName;
      this.email = this.profile.email;
      // where we set default menu to display depending authorities of logged profile
      this.authorities = this.profile.authorities.map(
        (authority: any) => authority.authority
      );
      this.navItems = this.navItems.map((navItem) =>
        this.checkNavItemAuthority(navItem)
      );
    }
  }
  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

  checkNavItemAuthority(navItem: NavItem): NavItem {
    if (navItem.authorities != null) {
      const matchAuthorities = navItem.authorities.filter((allowedAuthority) =>
        this.authorities.includes(allowedAuthority)
      );
      if (matchAuthorities.length === 0) {
        navItem = this.hideAllChild(navItem);
      }
    }
    if (navItem.children != null) {
      navItem.children.forEach((childrenNavItem) =>
        this.checkNavItemAuthority(childrenNavItem)
      );
    }
    return navItem;
  }

  hideAllChild(navItem: NavItem): NavItem {
    navItem.hidden = true;
    if (navItem.children != null) {
      navItem.children.forEach((childNavItem) =>
        this.hideAllChild(childNavItem)
      );
    }
    return navItem;
  }
}
