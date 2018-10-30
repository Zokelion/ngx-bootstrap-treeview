import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxBootstrapTreeviewComponent } from './components/ngx-bootstrap-treeview/ngx-bootstrap-treeview.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [BrowserAnimationsModule, CommonModule, FontAwesomeModule, RouterModule.forRoot([])],
    declarations: [NgxBootstrapTreeviewComponent],
    exports: [NgxBootstrapTreeviewComponent]
})
export class NgxBootstrapTreeviewModule {}
