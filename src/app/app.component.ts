import { Component } from '@angular/core';
import { Tree } from '../lib/models/tree.model';
import { Leaf } from '../lib/models/leaf.model';
import { ILoggingService } from '../lib/interfaces/ILoggingService.interface';
import { LeafClickedEvent } from '../lib/models/leaf-clicked-event.model';
import { faFolder, faFolderOpen, faSquare, faCheckSquare, faCheck, faMinus } from '@fortawesome/pro-light-svg-icons';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public defaultStyleSelectedLeaves: Leaf[];
    public lightStyleSelectedLeaves: Leaf[];

    public faFolder = faFolder;
    public faFolderOpen = faFolderOpen;
    public faSquare = faSquare;
    public faCheckSquare = faCheckSquare;
    public faMinus = faMinus;
    public faCheck = faCheck;

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

    public defaultStyleLeafClickedEventHandler(leafClickedEvent: LeafClickedEvent) {
        this.defaultStyleSelectedLeaves = leafClickedEvent.selectedLeaves;

        this._loggingService.log(
            `🍂🌲🍂 Eléments actuellement sélectionnés dans l'arbre Default:`,
            leafClickedEvent.selectedLeaves
        );
    }

    public lightStyleLeafClickedEventHandler(leafClickedEvent: LeafClickedEvent) {
        this.lightStyleSelectedLeaves = leafClickedEvent.selectedLeaves;

        this._loggingService.log(
            `🍂🌲🍂 Eléments actuellement sélectionnés dans l'arbre Light:`,
            leafClickedEvent.selectedLeaves
        );
    }
}
