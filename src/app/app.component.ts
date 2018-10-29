import { Component } from '@angular/core';
import { Tree } from './modules/ngx-bootstrap-treeview/models/tree.model';
import { Leaf } from './modules/ngx-bootstrap-treeview/models/leaf.model';
import { ILoggingService } from './modules/ngx-bootstrap-treeview/interfaces/ILoggingService.interface';
import { LeafClickedEvent } from './modules/ngx-bootstrap-treeview/models/leaf-clicked-event.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public selectedLeaves: Leaf[];

    public _loggingService: ILoggingService = console;

    public tree: Tree = {
        label: 'Langages de programmation',
        value: 1,
        children: [
            {
                label: 'C++',
                value: 11
            },
            {
                label: 'Angular',
                value: 12
            },
            {
                label: 'C#',
                value: 13,
                children: [
                    {
                        label: 'LinQ',
                        value: 131
                    },
                    {
                        label: 'UWP',
                        value: 132
                    },
                    {
                        label: 'Sharepoint',
                        value: 133
                    },
                    {
                        label: 'WPF',
                        value: 134
                    }
                ]
            },
            {
                label: 'Java',
                value: 14,
                children: [
                    {
                        label: 'J2E',
                        value: 141
                    },
                    {
                        label: 'Spring Framework',
                        value: 142
                    },
                    {
                        label: 'Vanilla Java',
                        value: 143
                    },
                    {
                        label: 'Android',
                        value: 144
                    }
                ]
            }
        ]
    };

    public leafClickedEventHandler(leafClickedEvent: LeafClickedEvent) {
        this.selectedLeaves = leafClickedEvent.selectedLeaves;

        this._loggingService.log(
            `🍂🌲🍂 Eléments actuellement sélectionnés dans l'arbre:`,
            leafClickedEvent.selectedLeaves
        );
    }
}
