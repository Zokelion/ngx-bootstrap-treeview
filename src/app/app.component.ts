import { Component } from '@angular/core';
import { Tree } from '../lib/models/tree.model';
import { Leaf } from '../lib/models/leaf.model';
import { ILoggingService } from '../lib/interfaces/ILoggingService.interface';
import { LeafClickedEvent } from '../lib/models/leaf-clicked-event.model';
import { faFolder, faFolderOpen, faSquare, faCheckSquare, faCheck, faMinus } from '@fortawesome/pro-light-svg-icons';
// import { categories, Branch, Cost } from './categories';
import { NgxBootstrapTreeviewMapper } from 'src/lib/utils/ngx-bootstrap-treeview-mapper';
import { skillsByCategories, Category, Skill } from './skills-by-categories';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public selectedLeaves = {
        defaultStyle: [],
        lightStyle: [],
        multiroot: [],
        singleRootFromMapper: [],
        multirootFromMapper: []
    };

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
            label: 'Customers',
            children: [
                {
                    label: 'Norton',
                    value: 156
                },
                {
                    label: 'Symantec',
                    value: 116
                },
                {
                    label: 'Some company',
                    value: 126
                },
                {
                    label: 'Zokelion',
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

    public item = skillsByCategories[0];
    public items = skillsByCategories;
    public mapper = new NgxBootstrapTreeviewMapper<Category, Skill>(
        {
            children: 'children',
            leavesKey: 'skills',
            value: 'id',
            label: 'name'
        },
        {
            value: 'id',
            label: 'label'
        }
    );

    public defaultStyleSingleRootLeafClickedEventHandler(leafClickedEvent: LeafClickedEvent) {
        this.selectedLeaves.defaultStyle = leafClickedEvent.selectedLeaves;

        this.loggingService.log(
            `🍂🌲🍂 Eléments actuellement sélectionnés dans l'arbre "Default":`,
            leafClickedEvent.selectedLeaves
        );
    }

    public lightStyleSinglerootLeafClickedEventHandler(leafClickedEvent: LeafClickedEvent) {
        this.selectedLeaves.lightStyle = leafClickedEvent.selectedLeaves;

        this.loggingService.log(
            `🍂🌲🍂 Eléments actuellement sélectionnés dans l'arbre "Light":`,
            leafClickedEvent.selectedLeaves
        );
    }

    public multirootTreeLeafClickedEventHandler(leafClickedEvent: LeafClickedEvent) {
        this.selectedLeaves.multiroot = leafClickedEvent.selectedLeaves;

        this.loggingService.log(
            `🍂🌲🍂 Eléments actuellement sélectionnés dans l'arbre "Multiroot":`,
            leafClickedEvent.selectedLeaves
        );
    }

    public multirootFromMapperLeafClickedEventHandler(leafClickedEvent: LeafClickedEvent) {
        this.selectedLeaves.multirootFromMapper = leafClickedEvent.selectedLeaves;

        this.loggingService.log(
            `🍂🌲🍂 Eléments actuellement sélectionnés dans l'arbre "multiroot from mapper":`,
            leafClickedEvent.selectedLeaves
        );
    }

    public singlerootFromMapperLeafClickedEventHandler(leafClickedEvent: LeafClickedEvent) {
        this.selectedLeaves.multirootFromMapper = leafClickedEvent.selectedLeaves;

        this.loggingService.log(
            `🍂🌲🍂 Eléments actuellement sélectionnés dans l'arbre "singleroot from mapper":`,
            leafClickedEvent.selectedLeaves
        );
    }
}
