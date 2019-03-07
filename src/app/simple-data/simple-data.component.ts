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

    constructor() {}

    ngOnInit() {}

    public onLeafClicked(leafClickedEvent: LeafClickedEvent) {
        this.selectedLeaves = leafClickedEvent.selectedLeaves;

        this.logger.log(
            `🍂🌲🍂 Eléments actuellement sélectionnés dans l'arbre "Default":`,
            leafClickedEvent.selectedLeaves
        );
    }
}
