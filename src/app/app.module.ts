import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgxBootstrapTreeviewModule } from '../lib/ngx-bootstrap-treeview.module';
import { RoutingModule } from './app.router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleDataComponent } from './simple-data/simple-data.component';
import { UsingMapperComponent } from './using-mapper/using-mapper.component';
import { CustomStylingComponent } from './custom-styling/custom-styling.component';
import { MultirootTreeComponent } from './multiroot-tree/multiroot-tree.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ProgrammaticFoldingComponent } from './programmatic-folding/programmatic-folding.component';
import { FilteringComponent } from './filtering/filtering.component';

@NgModule({
    declarations: [
        AppComponent,
        SimpleDataComponent,
        UsingMapperComponent,
        CustomStylingComponent,
        MultirootTreeComponent,
        ContextMenuComponent,
        ProgrammaticFoldingComponent,
        FilteringComponent
    ],
    imports: [BrowserModule, BrowserAnimationsModule, RoutingModule, NgxBootstrapTreeviewModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
