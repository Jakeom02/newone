import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule, ToastrService } from "ngx-toastr";

import {
  AlertComponent,
  AlertService,
  ValidationMessagesComponent,
  ValidationService,
  PhoneMaskDirective,
} from './components/index';
import { AuthGuard } from "./guards/index";
import { JwtInterceptorProvider, ErrorInterceptorProvider } from "./helpers/index";
import { LayoutModule } from "./layout/layout.module";
import { UserService } from "./services";
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    // TranslateModule,
    ToastrModule.forRoot(),
    //   ToastrModule.forRoot({
    //     timeOut: 3000,
    //     positionClass: 'toast-bottom-right',
    //     preventDuplicates: true
    // }),
  ],
  declarations: [
    AlertComponent,
    ValidationMessagesComponent,
    PhoneMaskDirective,
  ],
  exports: [
    AlertComponent,
    PhoneMaskDirective,
    ValidationMessagesComponent,
    ToastrModule,
    LayoutModule,
    NgxSpinnerModule,
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        AuthGuard,
        UserService,
        AlertService,
        ValidationService,
        JwtInterceptorProvider,
        ErrorInterceptorProvider,
        ToastrService,
      ],
    };
  }
}
