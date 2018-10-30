import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxBootstrapTreeviewModule } from '../lib/ngx-bootstrap-treeview.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, NgxBootstrapTreeviewModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
