import { Component } from '@angular/core';
import { Tree } from '../lib/models/tree.model';
import { Leaf } from '../lib/models/leaf.model';
import { ILoggingService } from '../lib/interfaces/ILoggingService.interface';
import { LeafClickedEvent } from '../lib/models/leaf-clicked-event.model';
import { faFolder, faFolderOpen, faSquare, faCheckSquare, faCheck, faMinus } from '@fortawesome/pro-light-svg-icons';
// import { categories, Branch, Cost } from './categories';
import { NgxBootstrapTreeviewMapper } from 'src/lib/utils/ngx-bootstrap-treeview-mapper';

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

    public loggingService: ILoggingService = console;

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
            },
            {
                label: 'Empty folder test',
                value: 15,
                children: []
            }
        ]
    };

    public trees: Tree[] = [
        { ...this.tree },
        {
            value: 1111,
            label: 'Clients',
            children: [
                {
                    label: 'Airbus',
                    value: 156
                },
                {
                    label: 'Total',
                    value: 116
                },
                {
                    label: 'EDF',
                    value: 126
                },
                {
                    label: 'Cap Gemini',
                    value: 196
                }
            ]
        },
        {
            value: 100,
            label: 'Test 1'
        },
        {
            value: 101,
            label: 'Test 2'
        },
        {
            value: 102,
            label: 'Test 3'
        }
    ];

    // public item = categories[0];
    // public items = categories;
    // public mapper = new NgxBootstrapTreeviewMapper<Branch, Cost>(
    //     {
    //         children: 'children',
    //         leavesKey: 'costs',
    //         value: 'id',
    //         label: 'name'
    //     },
    //     {
    //         value: 'id',
    //         label: 'fullName'
    //     }
    // );

    public defaultStyleLeafClickedEventHandler(leafClickedEvent: LeafClickedEvent) {
        this.defaultStyleSelectedLeaves = leafClickedEvent.selectedLeaves;

        this.loggingService.log(
            `🍂🌲🍂 Eléments actuellement sélectionnés dans l'arbre Default:`,
            leafClickedEvent.selectedLeaves
        );
    }

    public lightStyleLeafClickedEventHandler(leafClickedEvent: LeafClickedEvent) {
        this.lightStyleSelectedLeaves = leafClickedEvent.selectedLeaves;

        this.loggingService.log(
            `🍂🌲🍂 Eléments actuellement sélectionnés dans l'arbre Light:`,
            leafClickedEvent.selectedLeaves
        );
    }
}
