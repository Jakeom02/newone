import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { GoogleChartsModule } from 'angular-google-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxEditorModule } from 'ngx-editor';
import { NgxStripeModule } from 'ngx-stripe';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FileValidatorComponent } from './components/file-validator/file-validator.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FileValidatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    NgbModule,
    TabModule,
    GoogleChartsModule,
    Ng2GoogleChartsModule,
    ChartsModule,
    Ng2TelInputModule,
    HttpClientModule,
    CoreModule.forRoot(),
    NgxStripeModule.forRoot(
      'pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3'
    ),
    BrowserAnimationsModule,
    NgxEditorModule,
    PdfViewerModule,
  ],
  exports: [],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
