import { Component, OnInit } from '@angular/core';
import { tree } from '../tree-data';
import { ILoggingService } from 'src/lib/interfaces/ILoggingService.interface';
import { NgxBootstrapTreeviewContextMenuConfig } from 'src/lib/models/ngx-bootstrap-treeview-context-menu-config.model';

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
            'Add a new branch': () => {
                console.log('Wanting to add a new branch');
            },
            'Add a leaf here': () => {
                console.log('Wanna add a leaf');
            }
        }
    };

    constructor() {}

    ngOnInit() {}
}
