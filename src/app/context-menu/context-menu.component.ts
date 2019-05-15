import { Component, OnInit } from '@angular/core';
import { tree } from '../tree-data';
import { ILoggingService } from 'src/lib/interfaces/ILoggingService.interface';
import { NgxBootstrapTreeviewContextMenuConfig } from 'src/lib/models/ngx-bootstrap-treeview-context-menu-config.model';
import { Tree } from 'src/lib/public_api';

@Component({
    selector: 'app-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
    public tree = tree;
    public logger: ILoggingService = console;
    public treeContextMenuConfig: NgxBootstrapTreeviewContextMenuConfig = {
        data: {
            'Add a new branch': (target: Tree) => {
                console.log('Wanting to add a new branch to the tree', target.label);
            },
            'Add a leaf here': (target: Tree) => {
                console.log('Wanna add a leaf to', target.label);
            }
        }
    };

    constructor() {}

    ngOnInit() {}
}
