import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChildren,
    QueryList,
    HostListener,
    ViewChild,
    ElementRef
} from '@angular/core';
import { Tree } from '../../models/tree.model';
import {
    faSquare,
    faCheckSquare,
    faFolder,
    faFolderOpen,
    faMinus,
    faCheck,
    IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Leaf } from '../../models/leaf.model';
import { LeafClickedEvent } from '../../models/leaf-clicked-event.model';
import { ILoggingService } from '../../interfaces/ILoggingService.interface';
import { NgxBootstrapTreeviewMapper } from '../../utils/ngx-bootstrap-treeview-mapper';
import { NgxBootstrapTreeviewContextMenuData } from 'src/lib/models/ngx-bootstrap-treeview-context-menu-data.model';
import { NgxBootstrapTreeviewContextMenuConfig } from 'src/lib/models/ngx-bootstrap-treeview-context-menu-config.model';

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

    @Input()
    public loggingService: ILoggingService;

    @Input()
    public tree: Tree;

    @Input()
    public trees: Tree[];

    @Input()
    public mapper: NgxBootstrapTreeviewMapper<Object, Object>;

    @Input()
    public item: Object;

    @Input()
    public items: Object[];

    @Input()
    public isOpened: boolean;

    @Input()
    public canSelectBranch: boolean;

    // Icons inputs
    @Input()
    public openedFolderIcon: IconDefinition = faFolderOpen;

    @Input()
    public closedFolderIcon: IconDefinition = faFolder;

    @Input()
    public unselectedLeafIcon: IconDefinition = faSquare;

    @Input()
    public selectedLeafIcon: IconDefinition = faCheckSquare;

    @Input()
    public anyChildrenSelectedIcon: IconDefinition = faMinus;

    @Input()
    public allChildrenSelectedIcon: IconDefinition = faCheck;

    @Input()
    public emptyFolderLabel = 'This folder is empty';

    @Input()
    public contextMenuConfig: NgxBootstrapTreeviewContextMenuConfig = {
        data: {}
    };

    @ViewChildren(NgxBootstrapTreeviewComponent)
    public children: QueryList<NgxBootstrapTreeviewComponent>;

    public childrenState: string;

    public selectedLeaves: Leaf[] = [];

    public leavesCount: number;

    // If our "tree" property has children, this is set to true
    public isBranch: boolean;

    // If our "tree" property has no children, this one is set to true
    public isLeaf: boolean;

    // If we have "trees" property set and it has more than one tree, this is set to true
    public isRoot: boolean;

    public lastContextMenuEvent: MouseEvent;

    constructor() {}

    ngOnInit() {
        // We throw an exception if we have item or items but no mapper indicating how to handle them
        if (!this.mapper && (this.item || this.items)) {
            throw new Error('"item" or "items" are invalid parameters if you don\'t provide a mapper');
        }

        // If we have a mapper, it will handle "item" and "items"
        if (this.mapper) {
            if (this.items) {
                this.trees = this.items.map(item => this.mapper.mapTree(item));
            }

            if (this.item) {
                this.tree = this.mapper.mapTree(this.item);
            }
        }

        // If we want to display one or more trees
        if (this.trees && this.trees.length > 1) {
            this.isRoot = true;
            this.isBranch = this.isLeaf = false;
            return;
        } else if (this.trees) {
            // Otherwise, we have trees but with less than 2 elements, we assign it to tree
            // So ngOnInit() can keep going normaly
            this.tree = this.trees[0];
        }

        if (this.tree && (this.tree.children || this.tree.loadChildren)) {
            this.isBranch = true;
        } else {
            this.isBranch = false;
        }

        this.isLeaf = !this.isBranch;

        this.childrenState = this.isOpened ? 'visible' : 'hidden';
        this.leavesCount = this.countLeaves(this.tree);
    }

    public itemClicked(leafClickedEvent?: LeafClickedEvent) {
        /*
            If we 're on a leaf and we receive no event,
            that means our element got clicked
        */
        if (this.isLeaf && !leafClickedEvent) {
            this.leafClickedCallback();
        } else if ((this.isBranch || this.isRoot) && leafClickedEvent) {
            this._leafClickedEventReceived(leafClickedEvent);
        } else if (this.isBranch && !leafClickedEvent) {
            // If leaf is not set but we have children, that means we clicked on a link to show/hide content
            // We change "childrenState" and "isOpened" accordingly
            if (this.loggingService) {
                this.loggingService.log(`🌴 Branche cliquée: ${this.tree.label}`);
            }

            this.isOpened = !this.isOpened;
            this.childrenState = this.isOpened ? 'visible' : 'hidden';
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
        if (tree && (!tree.children || tree.loadChildren)) {
            leavesCount = 1;
        } else if (tree) {
            tree.children.forEach(child => {
                leavesCount += this.countLeaves(child);
            });
        }

        return leavesCount;
    }

    public select(value: number | string) {
        if (this.isLeaf && !this.isOpened && this.tree.value === value) {
            // If unselectedLeaf, we act as if we got clicked
            this.leafClickedCallback();
        } else {
            // this.isRoot || this.isTree
            this.children.forEach((child: NgxBootstrapTreeviewComponent) => {
                child.select(value);
            });
        }
    }

    public unselect(value: number | string) {
        if (this.isLeaf && this.isOpened && this.tree.value === value) {
            // If selectedLeaf, we act as if we got clicked
            this.leafClickedCallback();
        } else {
            // this.isRoot || this.isTree
            this.children.forEach((child: NgxBootstrapTreeviewComponent) => {
                child.select(value);
            });
        }
    }

    public toggle(value: number | string) {
        if (this.isLeaf && this.tree.value === value) {
            // We act as if we got clicked
            this.leafClickedCallback();
        } else {
            // this.isRoot || this.isTree
            this.children.forEach((child: NgxBootstrapTreeviewComponent) => {
                child.toggle(value);
            });
        }
    }

    public onContextMenu(event: MouseEvent): void {
        // The event will be stopped by context menu component
        this.lastContextMenuEvent = event;
    }

    private _selectLeaf(leaf: Leaf) {
        if (!this.isRoot && this.loggingService) {
            this.loggingService.log(`✔️ Feuille sélectionnée dans ${this.tree.label}:`, leaf);
        } else if (this.loggingService) {
            this.loggingService.log(`✔️ Feuille sélectionnée dans la racine:`, leaf);
        }

        if (!this._leafExistsIn(this.selectedLeaves, leaf)) {
            this.selectedLeaves = [...this.selectedLeaves, leaf];
        }
    }

    private _unselectLeaf(leaf: Leaf) {
        if (!this.isRoot && this.loggingService) {
            this.loggingService.log(`❌ Feuille désélectionnée dans ${this.tree.label}:`, leaf);
        } else if (this.loggingService) {
            this.loggingService.log(`❌ Feuille désélectionnée dans la racine:`, leaf);
        }

        const index = this._leafIndex(this.selectedLeaves, leaf);
        if (index !== -1) {
            this.selectedLeaves.splice(index, 1);
        }
    }

    private _leafClickedEventReceived(leafClickedEvent: LeafClickedEvent) {
        if (this.loggingService && this.isBranch) {
            this.loggingService.log(`➡ Event entrant dans le parent ${this.tree.label}:`, leafClickedEvent);
        } else if (this.loggingService && this.isRoot) {
            this.loggingService.log(`➡ Event entrant dans la racine:`, leafClickedEvent);
        }

        // When a child leaf is clicked, we check our selectedLeaves to select or unselect the clicked one
        if (!this._leafExistsIn(this.selectedLeaves, leafClickedEvent.leaf)) {
            this._selectLeaf(leafClickedEvent.leaf);
        } else {
            this._unselectLeaf(leafClickedEvent.leaf);
        }

        // Now that the leaf is selected/unselected, we merge our selectedLeaves with the ones of the event
        leafClickedEvent.selectedLeaves = this.selectedLeaves;

        if (this.isBranch && this.loggingService) {
            this.loggingService.log(`⬅ Event sortant de ${this.tree.label} vers un parent:`, leafClickedEvent);
        } else if (this.loggingService && this.isRoot) {
            this.loggingService.log(`⬅ Event sortant de la racine:`, leafClickedEvent);
        }

        this.leafClicked.emit(leafClickedEvent);
    }

    // Function used to check if a given leaf does exist in sleectedLeaves array
    // We use this because of the new Leaf(), which causes reference comparison of Array.indexOf() not to work
    private _leafIndex(leaves: Leaf[], leaf: Leaf): number {
        let result = -1;

        leaves.forEach((selectedLeaf, index) => {
            if (selectedLeaf.value === leaf.value && selectedLeaf.label === leaf.label) {
                result = index;
            }
        });

        return result;
    }

    private _leafExistsIn(leaves: Leaf[], leaf: Leaf) {
        return this._leafIndex(leaves, leaf) !== -1;
    }
}
