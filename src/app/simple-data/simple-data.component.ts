import { Component, OnInit } from '@angular/core';
import { Tree, Leaf, LeafClickedEvent } from 'src/lib/public_api';
import { tree } from '../tree-data';
import { ILoggingService } from 'src/lib/interfaces/ILoggingService.interface';

@Component({
    selector: 'app-simple-data',
    templateUrl: './simple-data.component.html',
    styleUrls: ['./simple-data.component.scss']
})
export class SimpleDataComponent implements OnInit {
    public selectedLeaves: Leaf[] = [];
    public tree: Tree = tree;
    public logger: ILoggingService = console;
    public clickedItem: Tree | Leaf;

    constructor() {}

    ngOnInit() {}

    public onLeafClicked(leafClickedEvent: LeafClickedEvent) {
        this.selectedLeaves = leafClickedEvent.selectedLeaves;
        this.clickedItem = leafClickedEvent.leaf;

        this.logger.log(
            `🍂🌲🍂 Eléments actuellement sélectionnés dans l'arbre "Default":`,
            leafClickedEvent.selectedLeaves
        );
    }

    public onBranchClicked(branch: Tree) {
        this.clickedItem = branch;
    }
}
