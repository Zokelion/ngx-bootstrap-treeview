import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxBootstrapTreeviewModule } from './modules/ngx-bootstrap-treeview/ngx-bootstrap-treeview.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, FontAwesomeModule, NgxBootstrapTreeviewModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
