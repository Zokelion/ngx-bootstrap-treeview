import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxBootstrapTreeviewModule } from '../lib/ngx-bootstrap-treeview.module';
import { RoutingModule } from './app.router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleDataComponent } from './simple-data/simple-data.component';
import { UsingMapperComponent } from './using-mapper/using-mapper.component';
import { CustomStylingComponent } from './custom-styling/custom-styling.component';
import { MultirootTreeComponent } from './multiroot-tree/multiroot-tree.component';

@NgModule({
    declarations: [
        AppComponent,
        SimpleDataComponent,
        UsingMapperComponent,
        CustomStylingComponent,
        MultirootTreeComponent
    ],
    imports: [BrowserModule, BrowserAnimationsModule, RoutingModule, NgxBootstrapTreeviewModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
