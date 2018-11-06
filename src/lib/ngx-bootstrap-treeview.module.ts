import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBootstrapTreeviewComponent } from './components/ngx-bootstrap-treeview/ngx-bootstrap-treeview.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [CommonModule, FontAwesomeModule, RouterModule.forChild([])],
    declarations: [NgxBootstrapTreeviewComponent],
    exports: [NgxBootstrapTreeviewComponent]
})
export class NgxBootstrapTreeviewModule {}
