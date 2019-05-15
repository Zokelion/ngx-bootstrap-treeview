import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBootstrapTreeviewComponent } from './components/ngx-bootstrap-treeview/ngx-bootstrap-treeview.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxBootstrapTreeviewContextMenuComponent } from './components/ngx-bootstrap-treeview-context-menu/ngx-bootstrap-treeview-context-menu.component';

@NgModule({
    imports: [CommonModule, FontAwesomeModule, RouterModule.forChild([])],
    declarations: [NgxBootstrapTreeviewComponent, NgxBootstrapTreeviewContextMenuComponent],
    exports: [NgxBootstrapTreeviewComponent]
})
export class NgxBootstrapTreeviewModule {}
