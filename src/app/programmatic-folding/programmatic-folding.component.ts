import { Component, OnInit, ViewChild } from '@angular/core';
import { tree } from '../tree-data';
import { ILoggingService } from '../../lib/interfaces/ILoggingService.interface';
import { Tree, Leaf, NgxBootstrapTreeviewComponent, LeafClickedEvent } from '../../lib/public_api';

@Component({
    selector: 'app-programmatic-folding',
    templateUrl: './programmatic-folding.component.html',
    styleUrls: ['./programmatic-folding.component.scss']
})
export class ProgrammaticFoldingComponent implements OnInit {
    public selectedLeaves: Leaf[] = [];
    public tree: Tree = tree;
    public logger: ILoggingService = console;

    @ViewChild('treeview')
    public treeview: NgxBootstrapTreeviewComponent;

    constructor() {}

    ngOnInit() {}

    public onLeafClicked(leafClickedEvent: LeafClickedEvent) {
        this.selectedLeaves = leafClickedEvent.selectedLeaves;

        this.logger.log(
            `🍂🌲🍂 Eléments actuellement sélectionnés dans l'arbre "Default":`,
            leafClickedEvent.selectedLeaves
        );
    }

    public onFoldButtonClicked(id: number) {
        this.treeview.fold(id);
    }

    public onUnfoldButtonClicked(id: number) {
        this.treeview.unfold(id);
    }
}
