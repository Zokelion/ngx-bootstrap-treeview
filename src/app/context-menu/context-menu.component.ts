import { Component, OnInit } from '@angular/core';
import { tree } from '../tree-data';
import { ILoggingService } from 'src/lib/interfaces/ILoggingService.interface';
import { NgxBootstrapTreeviewContextMenuConfig } from 'src/lib/models/ngx-bootstrap-treeview-context-menu-config.model';
import { Tree } from 'src/lib/public_api';
import { NgxBootstrapTreeviewContextMenus } from 'src/lib/models/ngx-bootstrap-treeview-context-menus.model';

@Component({
    selector: 'app-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
    public tree = tree;
    public logger: ILoggingService = console;
    public branchContextMenuConfig: NgxBootstrapTreeviewContextMenuConfig = {
        data: {
            'Add a new branch': (target: Tree) => {
                console.log('Wanting to add a new branch to the tree', target.label);
                target.children = [
                    ...target.children,
                    {
                        label: 'Added branch',
                        value: Math.round(Math.random() * 100000),
                        children: []
                    }
                ];
            },
            'Add a leaf here': (target: Tree) => {
                console.log('Wanna add a leaf to', target.label);

                target.children = [
                    ...target.children,
                    {
                        value: Math.round(Math.random() * 100000),
                        label: 'Added by test'
                    }
                ];
            }
        }
    };

    public leafContextMenuConfig = {
        data: {
            'Context menu test': (target: Tree) => {
                alert('So... You wanted to do something on ' + target.label + ', huh ?');
            }
        }
    };

    public treeContextMenu: NgxBootstrapTreeviewContextMenus = {
        branchMenu: this.branchContextMenuConfig,
        leafMenu: this.leafContextMenuConfig
    };

    constructor() {}

    ngOnInit() {}
}
