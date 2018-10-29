import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxBootstrapTreeviewComponent } from './components/ngx-bootstrap-treeview/ngx-bootstrap-treeview.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from 'src/app/app.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        FontAwesomeModule,
        RouterModule.forRoot([{ path: '', component: AppComponent }])
    ],
    declarations: [NgxBootstrapTreeviewComponent],
    exports: [NgxBootstrapTreeviewComponent]
})
export class NgxBootstrapTreeviewModule {}
