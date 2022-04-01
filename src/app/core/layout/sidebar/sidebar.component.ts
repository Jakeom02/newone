import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  collapseItem: boolean;
  items: RouteInfo[];
}

export const adminArray: RouteInfo[] = [
  {
    path: '/default/client-layout/client-overview',
    title: 'Overview',
    icon: 'fa-fw fa-dashboard',
    class: '',
    collapseItem: true,
    items: [],
  },
  {
    path: '/default/client-layout/client-detail',
    title: 'Client Profile',
    icon: 'fa-fw fa-dashboard',
    class: '',
    collapseItem: true,
    items: [],
  },
  {
    path: '/default/client-layout/parties-details',
    title: 'Parties',
    icon: 'fa-id-card-o',
    class: '',
    collapseItem: true,
    items: [],
  },
  {
    path: '/default/client-layout/assets-check-list/-1',
    title: 'Assets',
    icon: 'fa-id-card-o',
    class: '',
    collapseItem: true,
    items: [],
  },
  {
    path: '/default/client-layout/assets-liabilities',
    title: 'Liabilities',
    icon: 'fa-id-card-o',
    class: '',
    collapseItem: true,
    items: [],
  },
  {
    path: '/default/client-layout/assets-overview',
    title: 'Assets & Liabilities',
    icon: 'fa-id-card-o',
    class: '',
    collapseItem: true,
    items: [],
  },
  {
    path: '/default/client-layout/assets-allocation',
    title: 'Assets Allocation',
    icon: 'fa-id-card-o',
    class: '',
    collapseItem: true,
    items: [],
  },
  {
    path: '/default/client-layout/deposition',
    title: 'Specific Gifts',
    icon: 'fa-id-card-o',
    class: '',
    collapseItem: true,
    items: [],
  },
  {
    path: '/default/client-layout/provisions',
    title: 'Provisions',
    icon: 'fa-id-card-o',
    class: '',
    collapseItem: true,
    items: [],
  },
  {
    path: '/default/client-layout/clause',
    title: 'Clauses',
    icon: 'fa-id-card-o',
    class: '',
    collapseItem: true,
    items: [],
  },
  {
    path: '/default/client-layout/editor',
    title: 'Document',
    icon: 'fa-id-card-o',
    class: '',
    collapseItem: true,
    items: [],
  },
];
export const UserArray: RouteInfo[] = [];
export const clientArray: RouteInfo[] = [
  {
    path: '/default/client-layout/client-overview',
    title: 'Overview',
    icon: 'fa-fw fa-dashboard',
    class: '',
    collapseItem: true,
    items: [],
  },
  {
    path: '/default/client-layout/client-detail',
    title: 'Client Profile',
    icon: 'fa-fw fa-dashboard',
    class: '',
    collapseItem: true,
    items: [],
  },
  {
    path: '/default/client-layout/parties-details',
    title: 'Parties',
    icon: 'fa-id-card-o',
    class: '',
    collapseItem: true,
    items: [],
  },
  {
    path: '/default/client-layout/assets-check-list/-1',
    title: 'Assets',
    icon: 'fa-id-card-o',
    class: '',
    collapseItem: true,
    items: [],
  },

  {
    path: '/default/client-layout/assets-liabilities',
    title: 'Liabilities',
    icon: 'fa-id-card-o',
    class: '',
    collapseItem: true,
    items: [],
  },
  {
    path: '/default/client-layout/assets-overview',
    title: 'Assets & Liabilities',
    icon: 'fa-id-card-o',
    class: '',
    collapseItem: true,
    items: [],
  },
  {
    path: '/default/client-layout/assets-allocation',
    title: 'Assets Allocation',
    icon: 'fa-id-card-o',
    class: '',
    collapseItem: true,
    items: [],
  },
  {
    path: '/default/client-layout/deposition',
    title: 'Specific Gifts',
    icon: 'fa-id-card-o',
    class: '',
    collapseItem: true,
    items: [],
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isActive: boolean;
  collapsed = false;
  public open = false;
  isTreeOpen = '';
  showMenu: string;
  pushRightClass: string;
  menuItems: RouteInfo[];
  master: RouteInfo[];
  document_id: any;
  @Output() collapsedEvent = new EventEmitter<boolean>();
  clientId: any;
  user: any;

  constructor(
    public router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.router.events.subscribe((val) => {
      if (
        val instanceof NavigationEnd &&
        window.innerWidth <= 992 &&
        this.isToggled()
      ) {
        this.toggleSidebar();
      }
    });
  }

  ngOnInit(): void {
    this.gotoTop();
    this.isActive = false;

    let x: any = localStorage.getItem('collapse');
    const collapse = JSON.parse(x);
    this.collapsed = collapse;
    this.showMenu = '';
    this.pushRightClass = 'push-right';
    this.collapsedEvent.emit(this.collapsed);
    if (this.user.ROLE == 'CLIENT') {
      this.menuItems = clientArray;
    } else {
      this.menuItems = adminArray;
    }
    // console.log('this.menuItems', this.menuItems);
    
    // this.getAllParties();
    this.getChecklistById();
  }

  eventCalled(): void {
    this.isActive = !this.isActive;
  }

  addExpandClass(element: any): void {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
    this.collapsedEvent.emit(this.collapsed);
    localStorage.setItem('collapse', JSON.stringify(this.collapsed));
  }

  isToggled(): boolean {
    const dom: any = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar(): void {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  navigateTo(page: string) {
    this.router.navigateByUrl('/default/' + page);
  }
  getChecklistById() {
    this.spinner.show();
    
  }
  getAllParties() {
    this.spinner.show();
    
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
