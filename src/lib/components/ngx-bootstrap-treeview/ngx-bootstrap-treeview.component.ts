import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tree } from '../../models/tree.model';
import {
    faSquare,
    faCheckSquare,
    faFolder,
    faFolderOpen,
    faMinus,
    faCheck,
    faSpinner,
    IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Leaf } from '../../models/leaf.model';
import { LeafClickedEvent } from '../../models/leaf-clicked-event.model';
import { ILoggingService } from '../../interfaces/ILoggingService.interface';
import { ChildrenLoadedEvent } from '../../models/children-loaded-event.model';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ngx-bootstrap-treeview',
    templateUrl: './ngx-bootstrap-treeview.component.html',
    styleUrls: ['./ngx-bootstrap-treeview.component.scss'],
    animations: [
        trigger('showHide', [
            state(
                'visible',
                style({
                    display: 'block'
                })
            ),
            state(
                'hidden',
                style({
                    display: 'none'
                })
            ),
            transition('visible => hidden', [
                animate(
                    '0.25s',
                    keyframes([
                        style({ transform: 'translateX(0)', offset: 0 }),
                        style({ transform: 'translateX(-100%)', display: 'none', offset: 1 })
                    ])
                )
            ]),
            transition('hidden => visible', [
                animate(
                    '0.25s',
                    keyframes([
                        style({ transform: 'translateX(-100%)', display: 'block', offset: 0 }),
                        style({ transform: 'translateX(0%)', offset: 1 })
                    ])
                )
            ])
        ])
    ]
})
export class NgxBootstrapTreeviewComponent implements OnInit {
    @Output()
    public leafClicked: EventEmitter<LeafClickedEvent> = new EventEmitter<LeafClickedEvent>();

    @Output()
    public childrenLoaded: EventEmitter<ChildrenLoadedEvent> = new EventEmitter<ChildrenLoadedEvent>();

    @Input()
    loggingService: ILoggingService;

    @Input()
    public tree: Tree;

    @Input()
    public isOpened: boolean;

    @Input()
    public canSelectBranch: boolean;

    // Icons inputs
    @Input()
    public openedFolderIcon: IconDefinition;

    @Input()
    public closedFolderIcon: IconDefinition;

    @Input()
    public unselectedLeafIcon: IconDefinition;

    @Input()
    public selectedLeafIcon: IconDefinition;

    @Input()
    public anyChildrenSelectedIcon: IconDefinition;

    @Input()
    public allChildrenSelectedIcon: IconDefinition;

    @Input()
    public loadingIcon: IconDefinition;

    public childrenState: string;

    public selectedLeaves: Leaf[] = [];

    public leavesCount: number;

    public isBranch: boolean;

    public isLeaf: boolean;

    constructor() {}

    ngOnInit() {
        // Simple icon settings if we don't have any given as Input()
        if (!this.openedFolderIcon) {
            this.openedFolderIcon = faFolderOpen;
        }

        if (!this.closedFolderIcon) {
            this.closedFolderIcon = faFolder;
        }

        if (!this.selectedLeafIcon) {
            this.selectedLeafIcon = faCheckSquare;
        }

        if (!this.unselectedLeafIcon) {
            this.unselectedLeafIcon = faSquare;
        }

        if (!this.allChildrenSelectedIcon) {
            this.allChildrenSelectedIcon = faCheck;
        }

        if (!this.anyChildrenSelectedIcon) {
            this.anyChildrenSelectedIcon = faMinus;
        }

        if (!this.loadingIcon) {
            this.loadingIcon = faSpinner;
        }

        if (this.tree.children || this.tree.loadChildren) {
            this.isBranch = true;
        } else {
            this.isBranch = false;
        }

        if (this.isOpened && !this.tree.children && this.tree.loadChildren) {
            this._loadChildren();
        }

        this.isLeaf = !this.isBranch;

        this.childrenState = this.isOpened ? 'visible' : 'hidden';
        this.updateLeavesCount();
    }

    public itemClicked(leafClickedEvent?: LeafClickedEvent) {
        /* If we don't have children, we're on a leaf and if we receive no event,
            that means our element got clicked
        */
        if (this.isLeaf && !leafClickedEvent) {
            this.leafClickedCallback();
        } else if (this.isBranch && leafClickedEvent) {
            this._leafClickedEventReceived(leafClickedEvent);
        } else if (this.isBranch && !leafClickedEvent) {
            // If leaf is not set but we have children, that means we clicked on a link to show/hide content
            // We change "childrenState" and "isOpened" accordingly
            if (this.loggingService) {
                this.loggingService.log(`🌴 Branche cliquée: ${this.tree.label}`);
            }

            this.isOpened = !this.isOpened;
            this.childrenState = this.isOpened ? 'visible' : 'hidden';
            if (!this.tree.children && this.tree.loadChildren) {
                this._loadChildren();
            }
        }
    }

    public leafClickedCallback() {
        if (this.loggingService) {
            this.loggingService.log('🍂 Feuille cliqué:', this.tree.label);
        }

        this.isOpened = !this.isOpened;

        const leaf = new Leaf(this.tree);
        const selectedLeafIndex = this._leafIndex(this.selectedLeaves, leaf);

        // If the leaf isn't already selected, we select it, otherwise we unselect it
        if (selectedLeafIndex === -1) {
            this._selectLeaf(leaf);
        } else {
            this._unselectLeaf(leaf);
        }

        const event = new LeafClickedEvent(leaf, this.selectedLeaves);

        if (this.loggingService) {
            this.loggingService.log(`⬅ Event sortant de ${this.tree.label} vers un parent:`, event);
        }

        this.leafClicked.emit(event);
    }

    public countLeaves(tree: Tree): number {
        let leavesCount = 0;

        if (!tree.children || tree.loadChildren) {
            leavesCount = 1;
        } else {
            tree.children.forEach(child => {
                leavesCount += this.countLeaves(child);
            });
        }

        return leavesCount;
    }

    public childrenLoadedEventHandler(event: ChildrenLoadedEvent) {
        this.updateLeavesCount();
    }

    public updateLeavesCount(): void {
        this.leavesCount = this.countLeaves(this.tree);
    }

    private _selectLeaf(leaf: Leaf) {
        if (this.loggingService) {
            this.loggingService.log(`✔️ Feuille sélectionnée dans ${this.tree.label}:`, leaf);
        }

        this.selectedLeaves = [...this.selectedLeaves, leaf];
    }

    private _unselectLeaf(leaf: Leaf) {
        if (this.loggingService) {
            this.loggingService.log(`❌ Feuille désélectionnée dans ${this.tree.label}:`, leaf);
        }

        const index = this._leafIndex(this.selectedLeaves, leaf);

        this.selectedLeaves.splice(index, 1);
    }

    private _leafClickedEventReceived(leafClickedEvent: LeafClickedEvent) {
        if (this.loggingService) {
            this.loggingService.log(`➡ Event entrant dans le parent ${this.tree.label}:` + leafClickedEvent);
        }
        // When a child leaf is clicked, we check our selectedLeaves to select or unselect the clicked one
        const leafIndexInSelectedLeaves = this._leafIndex(this.selectedLeaves, leafClickedEvent.leaf);

        if (leafIndexInSelectedLeaves === -1) {
            this._selectLeaf(leafClickedEvent.leaf);
        } else {
            this._unselectLeaf(leafClickedEvent.leaf);
        }

        // Now that the leaf is selected/unselected, we merge our selectedLeaves with the ones of the event
        leafClickedEvent.selectedLeaves = this.selectedLeaves;

        if (this.loggingService) {
            this.loggingService.log(`⬅ Event sortant de ${this.tree.label} vers un parent:`, leafClickedEvent);
        }
        this.leafClicked.emit(leafClickedEvent);
    }

    // Function used to check if a given leaf does exist in sleectedLeaves array
    // We use this because of the new Leaf(), which causes reference comparison of Array.indexOf() not to work
    private _leafIndex(leaves: Leaf[], leaf: Leaf): number {
        let result = -1;

        leaves.forEach((selectedLeaf, index) => {
            if (this.loggingService) {
                this.loggingService.log(index);
            }

            if (selectedLeaf.value === leaf.value && selectedLeaf.label === leaf.label) {
                result = index;
            }
        });

        return result;
    }

    // Function that is called when we load children in a deferred way
    private _loadChildren(): void {
        this.tree.loadChildren().subscribe((children: Tree[]) => {
            this.tree.children = children.map(child => {
                if (child.hasChildren === true) {
                    return {
                        ...child,
                        loadChildren: this.tree.loadChildren
                    };
                } else {
                    return child;
                }
            });
        });

        // We emit the fact that we loaded more children so every parent can recompute their leavesCount
        this.childrenLoaded.emit(new ChildrenLoadedEvent(this.tree));
    }
}
