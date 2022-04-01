import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavHeaderComponent } from './header/header.component';
@NgModule({
  declarations: [LayoutComponent, NavHeaderComponent, SidebarComponent],
  imports: [RouterModule, CommonModule, NgbModule],
  exports: [
    LayoutComponent,
    NavHeaderComponent,
    SidebarComponent,
  ],
  // providers: [LoginService],
})
export class LayoutModule {
  static forRoot(): ModuleWithProviders<LayoutModule> {
    return {
      ngModule: LayoutModule,
      providers: [],
    };
  }
}
