import { Component, OnInit } from '@angular/core';
import { tree, trees } from '../tree-data';
import { NgxBootstrapTreeviewContextMenuData } from 'src/lib/models/ngx-bootstrap-treeview-context-menu-data.model';
import { ILoggingService } from 'src/lib/interfaces/ILoggingService.interface';

@Component({
    selector: 'app-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
    public tree = tree;
    public logger: ILoggingService = console;
    public treeContextMenu: NgxBootstrapTreeviewContextMenuData = {
        'Add a new branch': () => {
            console.log('Wanting to add a new branch');
        },
        'Add a leaf here': () => {
            console.log('Wanna add a leaf');
        }
    };

    constructor() {}

    ngOnInit() {}
}
