import { Component, OnInit } from '@angular/core';
import { LeafClickedEvent, Leaf, Tree } from '../../lib/public_api';
import { ILoggingService } from '../../lib/interfaces/ILoggingService.interface';
import { faCheck, faMinus, faCheckSquare, faSquare, faFolderOpen, faFolder } from '@fortawesome/free-solid-svg-icons';
import { tree } from '../tree-data';

@Component({
    selector: 'app-custom-styling',
    templateUrl: './custom-styling.component.html',
    styleUrls: ['./custom-styling.component.scss']
})
export class CustomStylingComponent implements OnInit {
    public faFolder = faFolder;
    public faFolderOpen = faFolderOpen;
    public faSquare = faSquare;
    public faCheckSquare = faCheckSquare;
    public faMinus = faMinus;
    public faCheck = faCheck;

    public selectedLeaves: Leaf[] = [];
    public logger: ILoggingService = console;
    public tree: Tree = tree;

    constructor() {}

    ngOnInit() {}
    public onLeafClicked(leafClickedEvent: LeafClickedEvent) {
        this.selectedLeaves = leafClickedEvent.selectedLeaves;

        this.logger.log(
            `🍂🌲🍂 Eléments actuellement sélectionnés dans l'arbre "Light":`,
            leafClickedEvent.selectedLeaves
        );
    }
}
