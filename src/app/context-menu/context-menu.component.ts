import { Component, OnInit } from '@angular/core';
import { skillsByCategories, Category, Skill } from '../skills-by-categories';
import { ILoggingService } from 'src/lib/interfaces/ILoggingService.interface';
import { NgxBootstrapTreeviewContextMenuConfig } from 'src/lib/models/ngx-bootstrap-treeview-context-menu-config.model';
import {
    Tree,
    TreeMap,
    LeafMap,
    NgxBootstrapTreeviewMapper,
    NgxBootstrapTreeviewContextMenuActions
} from 'src/lib/public_api';
import { NgxBootstrapTreeviewContextMenus } from 'src/lib/models/ngx-bootstrap-treeview-context-menus.model';

@Component({
    selector: 'app-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
    public trees = skillsByCategories;
    public logger: ILoggingService = console;
    public branchContextMenuActions: NgxBootstrapTreeviewContextMenuActions = {
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
    };

    public leafContextMenuActions: NgxBootstrapTreeviewContextMenuActions = {
        'Context menu test': (target: Tree) => {
            alert('So... You wanted to do something on ' + target.label + ', huh ?');
        }
    };

    public rootContextMenuActions: NgxBootstrapTreeviewContextMenuActions = {
        'Add new root': (target: Tree) => {
            console.log(target);
        }
    };

    public treeContextMenu: NgxBootstrapTreeviewContextMenus = {
        branchMenu: this.branchContextMenuActions,
        leafMenu: this.leafContextMenuActions,
        rootMenu: this.rootContextMenuActions
    };

    public treeMap: TreeMap = {
        children: 'children',
        leavesKey: 'skills',
        value: 'id',
        label: 'name'
    };

    public leafMap: LeafMap = {
        value: 'id',
        label: 'label'
    };

    public mapper = new NgxBootstrapTreeviewMapper<Category, Skill>(this.treeMap, this.leafMap);

    constructor() {}

    ngOnInit() {}
}
