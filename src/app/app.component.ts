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

    public loggingService: ILoggingService = console;

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
