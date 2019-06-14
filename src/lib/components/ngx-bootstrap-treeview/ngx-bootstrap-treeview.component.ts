import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChildren,
    QueryList,
    ElementRef,
    Renderer2,
    AfterViewInit,
    SimpleChanges,
    OnChanges,
    NgZone
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
import { NgxBootstrapTreeviewContextMenus } from '../../models/ngx-bootstrap-treeview-context-menus.model';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ngx-bootstrap-treeview',
    templateUrl: './ngx-bootstrap-treeview.component.html',
    styleUrls: ['./ngx-bootstrap-treeview.component.scss'],
    animations: [
        trigger('childrenAnimationTrigger', [
            transition(':leave', [animate('0.25s', style({ transform: 'translateX(-100%)', display: 'none' }))]),
            transition(':enter', [
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
export class NgxBootstrapTreeviewComponent implements OnInit, OnChanges {
    @Input()
    public canSelectBranch: boolean;

    @Input()
    public contextMenus: NgxBootstrapTreeviewContextMenus = {
        leafMenu: { data: {} },
        branchMenu: { data: {} }
    };

    @Input()
    public disableSelectedElements = false;

    @Input()
    public emptyFolderLabel = 'This folder is empty';

    @Input()
    public isAnimationDisabled = false;

    @Input()
    public isFirstLevel = true;

    @Input()
    public isOpened: boolean;

    @Input()
    public item: Object;

    @Input()
    public items: Object[];

    @Input()
    public loggingService: ILoggingService;

    @Input()
    public mapper: NgxBootstrapTreeviewMapper<Object, Object>;

    @Input()
    public preselectedItems: any[] = [];

    @Input()
    public tree: Tree;

    @Input()
    public trees: Tree[];

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
    public filterString = '';

    @Output()
    public branchClicked = new EventEmitter<Tree>();

    @Output()
    public leafClicked: EventEmitter<LeafClickedEvent> = new EventEmitter<LeafClickedEvent>();

    @ViewChildren(NgxBootstrapTreeviewComponent)
    public children: QueryList<NgxBootstrapTreeviewComponent>;

    public 5: string;

    public selectedLeaves: Leaf[] = [];

    public leavesCount: number;

    // If our "tree" property has children, this is set to true
    public isBranch: boolean;

    // If our "tree" property has no children, this one is set to true
    public isLeaf: boolean;

    // If we have "trees" property set and it has more than one tree, this is set to true
    public isRoot: boolean;

    public lastContextMenuEvent: MouseEvent;

    constructor(private _host: ElementRef<HTMLElement>, private _renderer: Renderer2, private _zone: NgZone) {}

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

        this.leavesCount = this.countLeaves(this.tree);

        this.preselectedItems.forEach(value => {
            this.select(value);
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        // The this.tree || this.trees is used to avoid anerror since ngOnChanges is called before ngOnInit()
        if ('filterString' in changes && (this.tree || this.trees)) {
            this._zone.runOutsideAngular(() => {
                this.filter(this.filterString);
            });
        }
    }
    public onClick() {
        if (this.isLeaf) {
            this.onLeafClicked();
        }

        if (this.isBranch) {
            if (this.loggingService) {
                this.loggingService.log(`🌴 Branche cliquée: ${this.tree.label}`);
            }

            this.onBranchClicked();
        }
    }

    public onChildLeafClicked(leafClickedEvent: LeafClickedEvent): void {
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

    public onLeafClicked() {
        if (this.loggingService) {
            this.loggingService.log('🍂 Feuille cliqué:', this.tree.label);
        }

        if (!this.disableSelectedElements || !this.isOpened) {
            this._leafToggle();
        }
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

    public select(value: any) {
        if (this.isLeaf && this.tree.value === value && !this.isOpened) {
            this._leafToggle();
        } else if (this.isRoot || this.isBranch) {
            this.children.forEach((child: NgxBootstrapTreeviewComponent) => {
                child.select(value);
            });
        }
    }

    public unselect(value: any) {
        if (this.isLeaf && this.tree.value === value && this.isOpened) {
            this._leafToggle();
        } else if (this.isRoot || this.isBranch) {
            this.children.forEach((child: NgxBootstrapTreeviewComponent) => {
                child.unselect(value);
            });
        }
    }

    public onBranchClicked() {
        this._branchToggle();

        this.branchClicked.emit(this.tree);
    }

    public onChildBranchClicked(branch: Tree) {
        this.branchClicked.emit(branch);
    }

    public onContextMenu(event: MouseEvent): void {
        // The event will be stopped by context menu component
        this.lastContextMenuEvent = event;
    }

    public onElementAdded(): boolean {
        this.leavesCount = this.countLeaves(this.tree);

        return true;
    }

    public fold(id: number | string): void {
        if (this.isBranch && this.tree.value === id && this.isOpened) {
            this._branchToggle();
        } else if (this.isBranch && this.children.length) {
            this.children.forEach((child: NgxBootstrapTreeviewComponent) => {
                child.fold(id);
            });
        }
    }

    public unfold(id: number | string): void {
        if (this.isBranch && this.tree.value === id && !this.isOpened) {
            this._branchToggle();
        } else if (this.isBranch && this.children.length) {
            this.children.forEach((child: NgxBootstrapTreeviewComponent) => {
                child.unfold(id);
            });
        }
    }

    public show() {
        const domElement = this._host.nativeElement;

        this._renderer.removeClass(domElement, 'd-none');
    }

    public hide() {
        const domElement = this._host.nativeElement;

        console.log('Hid ', this.tree.label);
        this._renderer.addClass(domElement, 'd-none');
    }

    public filter(filterString: string, item?: Tree): void {
        if (this.isRoot) {
            console.log('Filtering on root');
            this.children.forEach((child: NgxBootstrapTreeviewComponent) => {
                child.filter(this.filterString);
            });
        } else {
            if (!item) {
                item = this.tree;
                console.log('Item set to', this.tree, this.trees, this.item, this.items);
            }

            const matchingElementsCount = this.countFilteredItems(filterString, item);

            if (matchingElementsCount === 0) {
                this.hide();
            } else {
                this.show();
            }
        }
    }

    public countFilteredItems(filterString: string, item: Tree): number {
        let matchingElementsCount = 0;

        if (item.children) {
            if (!filterString.length) {
                return 1;
            }

            matchingElementsCount = item.children.reduce(
                (acc: number, child: Tree) => acc + this.countFilteredItems(filterString, child),
                0
            );
        } else {
            const regex = new RegExp(filterString, 'i');

            if (regex.test(item.label)) {
                matchingElementsCount++;
            }
        }

        if (this.tree) {
            console.log(matchingElementsCount, 'matching elements in', item.label);
        } else if (this.trees) {
            console.log(matchingElementsCount, 'matching elements in root');
        }

        return matchingElementsCount;
    }

    private _leafToggle(): void {
        this.isOpened = !this.isOpened;

        const leaf = new Leaf(this.tree);

        if (this.isOpened) {
            this._selectLeaf(leaf);
        } else {
            this._unselectLeaf(leaf);
        }

        const event = new LeafClickedEvent(leaf, this.selectedLeaves);

        this.leafClicked.emit(event);
    }

    private _branchToggle(): void {
        this.isOpened = !this.isOpened;
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
