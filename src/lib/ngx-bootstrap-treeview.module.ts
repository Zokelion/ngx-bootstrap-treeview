import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBootstrapTreeviewComponent } from './components/ngx-bootstrap-treeview/ngx-bootstrap-treeview.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// tslint:disable-next-line: max-line-length
import { NgxBootstrapTreeviewContextMenuComponent } from './components/ngx-bootstrap-treeview-context-menu/ngx-bootstrap-treeview-context-menu.component';
import { EventManager } from '@angular/platform-browser';
import { NgxBootstrapTreeviewEventManagerService } from './services/ngx-bootstrap-treeview-event-manager.service';
import { ContextMenuService } from './services/context-menu.service';

@NgModule({
    imports: [CommonModule, FontAwesomeModule, RouterModule.forChild([])],
    declarations: [NgxBootstrapTreeviewComponent, NgxBootstrapTreeviewContextMenuComponent],
    exports: [NgxBootstrapTreeviewComponent],
    providers: [ContextMenuService, { provide: EventManager, useClass: NgxBootstrapTreeviewEventManagerService }]
})
export class NgxBootstrapTreeviewModule {}
