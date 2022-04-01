import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  collapedSideBar: boolean;

  constructor(public router: Router) {}

  ngOnInit() {}
  logo = 'assets/images/inherit-logo.png';
  receiveCollapsed($event: any) {
    this.collapedSideBar = $event;
  }
}
