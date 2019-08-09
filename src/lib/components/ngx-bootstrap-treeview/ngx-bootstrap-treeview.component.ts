import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnInit, Output, QueryList, Renderer2, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { faCheck, faCheckSquare, faFolder, faFolderOpen, faMinus, faSquare, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SelectedTreesService } from 'src/lib/services/selected-trees.service';
import { ILoggingService } from '../../interfaces/ILoggingService.interface';
import { LeafClickedEvent } from '../../models/leaf-clicked-event.model';
import { Leaf } from '../../models/leaf.model';
import { NgxBootstrapTreeviewContextMenus } from '../../models/ngx-bootstrap-treeview-context-menus.model';
import { Tree } from '../../models/tree.model';
import { ContextMenuService } from '../../services/context-menu.service';
import { NgxBootstrapTreeviewMapper } from '../../utils/ngx-bootstrap-treeview-mapper';

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
export class NgxBootstrapTreeviewComponent implements OnInit, OnChanges, AfterViewInit {
    @Input()
    public disableLeafSelection: boolean;

    @Input()
    public branchSelectedStyle: any;

    @Input() public branchSelectedClass: any;

    @Input() public leafSelectedStyle: any;

    @Input() public leafSelectedClass: any;

    @Input() public height: string;

    @Input()
    public contextMenus: NgxBootstrapTreeviewContextMenus = {
        leafMenu: {},
        branchMenu: {},
        rootMenu: {}
    };

    @Input()
    public disableSelectedElements = false;

    @Input()
    public emptyFolderLabel = 'This folder is empty';

    @Input()
    public isAnimationDisabled = false;

    @Input()
    public isFirstLevel = true;

    // This one is true IF AND ONLY IF we're at the top level, be it a root or a branch.
    // This is because a branch where isFirstLevel = true is not always our first treeview instance
    @Input()
    public isFirstInstance = true;

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
    public preselectedItems: string[] | number[];

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

    @Input()
    public matchBranches = true;

    @Output()
    public branchClicked = new EventEmitter<Tree>();

    @Output()
    public leafClicked = new EventEmitter<LeafClickedEvent>();

    @ViewChildren(NgxBootstrapTreeviewComponent)
    public children: QueryList<NgxBootstrapTreeviewComponent>;

    @ViewChild('treeview')
    public treeview: ElementRef<HTMLUListElement>;

    @ViewChild('rootsContainer')
    public rootsContainer: ElementRef<HTMLDivElement>;

    public selectedLeaves: Leaf[] = [];

    public leavesCount: number;

    // If our "tree" property has children, this is set to true
    public isBranch: boolean;

    // If our "tree" property has no children, this one is set to true
    public isLeaf: boolean;

    // If we have "trees" property set and it has more than one tree, this is set to true
    public isRoot: boolean;

    public displayedTrees: Tree[];

    public displayedTree: Tree;

    private _filterTrigger: any;

    constructor(
        private _host: ElementRef<HTMLElement>,
        private _renderer: Renderer2,
        private _zone: NgZone,
        private _changeDetector: ChangeDetectorRef,
        private _contextMenuService: ContextMenuService,
        private _selectedTreesService: SelectedTreesService
    ) {}

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
            // return;
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

        this._resetDisplayedData();

        if (!this.isRoot) {
            this.isLeaf = !this.isBranch;
        }

        // Handle pre selected itemps
        if (this.trees && this.preselectedItems) {
            this._selectedTreesService.selectPreselectedItems(this.preselectedItems, this.trees);
        } else if (this.tree && this.preselectedItems) {
            this._selectedTreesService.selectPreselectedItems(this.preselectedItems, [this.tree]);
        }

        // Select already selected leaves
        this._selectedTreesService
            .getSelectedTrees()
            .filter(
                tree =>
                    !tree.children &&
                    this.tree &&
                    this.tree.children &&
                    this.tree.children.some(child => child.value === tree.value)
            )
            .forEach(tree => {
                const leaf = new Leaf(tree);
                this._selectLeaf(leaf);
                const event = new LeafClickedEvent(leaf, this.selectedLeaves);
                this.leafClicked.emit(event);
            });

        // Select this tree
        if (this._selectedTreesService.isSelected(this.tree)) {
            if (this.isBranch) {
                this._branchToggle();
            } else {
                this._leafToggle();
            }
        }

        this.leavesCount = this.countLeaves(this.tree);
    }

    ngOnChanges(changes: SimpleChanges): void {
        // The this.tree || this.trees is used to avoid anerror since ngOnChanges is called before ngOnInit()
        if ('filterString' in changes && (this.displayedTree || this.displayedTrees)) {
            this._zone.runOutsideAngular(() => {
                if (this._filterTrigger) {
                    clearTimeout(this._filterTrigger);
                    this._filterTrigger = null;
                }

                this._filterTrigger = setTimeout(() => {
                    this._zone.run(() => {
                        if (this.displayedTrees) {
                            this.displayedTrees = this._filterTrees();
                        } else if (this.displayedTree) {
                            this.displayedTree = this._filterTree(this.displayedTree);
                        }

                        this._changeDetector.detectChanges();

                        if (this.filterString) {
                            this.unfoldAll();
                        } else {
                            this._resetDisplayedData();
                            this.foldAll();
                        }
                    });
                }, 250);
            });
        }
    }

    ngAfterViewInit() {
        this._updateRootsContainerHeight();
    }

    public onClick() {
        if (this.isLeaf && !this.disableLeafSelection) {
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
        if (
            !this._leafExistsIn(this.selectedLeaves, leafClickedEvent.leaf) &&
            this._leafExistsIn(leafClickedEvent.selectedLeaves, leafClickedEvent.leaf)
        ) {
            this._selectLeaf(leafClickedEvent.leaf);
        } else if (!this._leafExistsIn(leafClickedEvent.selectedLeaves, leafClickedEvent.leaf)) {
            this._unselectLeaf(leafClickedEvent.leaf);
        }

        // Now that the leaf is selected/unselected, we merge our selectedLeaves with the ones of the event
        leafClickedEvent.selectedLeaves = [...this.selectedLeaves];

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
        this._updateRootsContainerHeight();
    }

    private _updateRootsContainerHeight() {
        if (this.rootsContainer && !this.height) {
            requestAnimationFrame(() => {
                // We use requestAnimationFrame because we want this to be processed once rerendering is complete
                this.rootsContainer.nativeElement.style.height = this.computeHeight() + 'px';
            });
        }
    }

    public onContextMenu(event: MouseEvent): void {
        event.stopPropagation();
        event.preventDefault();

        this._contextMenuService.fire({
            target: this.tree,
            event: event
        });
    }

    public onElementAdded(): boolean {
        this.leavesCount = this.countLeaves(this.tree);

        return true;
    }

    public onRootContextMenu(event: MouseEvent) {
        event.stopPropagation();
        event.preventDefault();

        this._contextMenuService.fire({
            event,
            target: null
        });
    }

    public fold(id?: number | string): void {
        if (!id) {
            this._fold();
        } else {
            this._foldId(id);
        }
    }

    public unfold(id?: number | string): void {
        if (!id) {
            this._unfold();
        } else {
            this._unfoldId(id);
        }
    }

    public show() {
        const domElement = this._host.nativeElement;

        this._renderer.removeClass(domElement, 'd-none');
    }

    public hide() {
        const domElement = this._host.nativeElement;

        this._renderer.addClass(domElement, 'd-none');
    }

    public filter(filterString: string, item?: Tree): void {
        if (this.isRoot) {
            this.children.forEach((child: NgxBootstrapTreeviewComponent) => {
                child.filter(this.filterString);
            });
        } else {
            if (!item) {
                item = this.tree;
            }

            const matchingElementsCount = this.countFilteredItems(filterString, item);

            if (matchingElementsCount === 0) {
                this.hide();
            } else {
                this.show();

                if (filterString !== '') {
                    this._unfold();
                } else {
                    this._fold();
                }
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

        return matchingElementsCount;
    }

    public unfoldAll() {
        // A branch will unfold itself
        if (this.isBranch && !this.isOpened) {
            this._branchToggle();
            this._changeDetector.detectChanges();
        }

        // If we're not a leaf, we unfold all of our children
        if (!this.isLeaf) {
            this.children.forEach((child: NgxBootstrapTreeviewComponent) => {
                child.unfoldAll();
            });
        }
    }

    public foldAll() {
        // A branch will fold itself
        if (this.isBranch && this.isOpened) {
            this._branchToggle();
        }

        // If we're not a leaf, we unfold all of our children
        if (!this.isLeaf) {
            this.children.forEach((child: NgxBootstrapTreeviewComponent) => {
                child.foldAll();
            });
        }
    }

    public computeHeight(): number {
        if (!this.isRoot) {
            return this.treeview.nativeElement.scrollHeight;
        }

        return this.children.reduce((prevValue: number, currentValue: NgxBootstrapTreeviewComponent) => {
            return prevValue + currentValue.computeHeight();
        }, 0);
    }

    private _unfold() {
        if (this.isBranch && !this.isOpened) {
            this._branchToggle();
        }
    }

    private _fold() {
        if (this.isBranch && this.isOpened) {
            this._branchToggle();
        }
    }

    private _unfoldId(id: number | string) {
        if (this.isBranch && this.tree.value === id && !this.isOpened) {
            this._branchToggle();
        } else if (this.isBranch && this.children.length) {
            this.children.forEach((child: NgxBootstrapTreeviewComponent) => {
                child.unfold(id);
            });
        }
    }

    private _foldId(id: number | string) {
        if (this.isBranch && this.tree.value === id && this.isOpened) {
            this._branchToggle();
        } else if (this.isBranch && this.children.length) {
            this.children.forEach((child: NgxBootstrapTreeviewComponent) => {
                child.fold(id);
            });
        }
    }

    private _leafToggle(): void {
        this.isOpened = !this.isOpened;

        const leaf = new Leaf(this.tree);

        if (this.isOpened) {
            this._selectLeaf(leaf);
            this._selectedTreesService.addTree(this.tree);
        } else {
            this._unselectLeaf(leaf);
            this._selectedTreesService.removeTree(this.tree);
        }

        const event = new LeafClickedEvent(leaf, this.selectedLeaves);

        this.leafClicked.emit(event);
    }

    private _branchToggle(): void {
        this.isOpened = !this.isOpened;
        this._selectedTreesService.selectedTree = this.tree;
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

    private _copyTree(tree: Tree) {
        const isTree = !!tree.children;

        const result = {
            value: tree.value,
            label: tree.label,
            data: tree.data
        };

        if (isTree) {
            const children = tree.children.map(child => this._copyTree(child));

            return {
                ...result,
                children
            };
        } else {
            return result;
        }
    }

    private _copyTrees(trees: Tree[]): Tree[] {
        return trees.map((tree: Tree) => this._copyTree(tree));
    }

    private _filterTrees(trees = this.trees, filterString = this.filterString): Tree[] {
        const copies = this._copyTrees(trees);

        if (filterString !== '') {
            const displayedTrees = copies
                .map(copy => {
                    return this._filterTree(copy, filterString);
                })
                .filter(filteredCopy => !!filteredCopy);

            return displayedTrees;
        } else {
            return copies;
        }
    }

    // This method alters tree.children and returns true if any elements matched the filter string
    private _filterTree(tree: Tree, filterString = this.filterString): Tree {
        const regex = new RegExp(filterString, 'i');

        if (!tree.children) {
            // Leaf handling
            return regex.test(tree.label) ? tree : null;
        } else if (tree.children && tree.children.length) {
            if (this.matchBranches && regex.test(tree.label)) {
                return tree;
            }

            // Non empty branches handling
            tree.children = tree.children.map((child: Tree) => this._filterTree(child)).filter(child => !!child);

            return tree.children.length ? tree : null;
        }

        return null;
    }

    private _resetDisplayedData() {
        if (this.tree) {
            this.displayedTree = this._copyTree(this.tree);
        } else if (this.trees) {
            this.displayedTrees = this._copyTrees(this.trees);
        }
    }

    public getStyle(): any {
        return this._getEitherIfBranchOrLeafSelected(this.branchSelectedStyle, this.leafSelectedStyle);
    }

    public getClass(): any {
        return this._getEitherIfBranchOrLeafSelected(this.branchSelectedClass, this.leafSelectedClass);
    }

    private _getEitherIfBranchOrLeafSelected(brancheSelectedAny: any, leafSelectedAny: any): any {
        if (this._selectedTreesService.selectedTree === this.tree && this.tree.children) {
            return brancheSelectedAny;
        } else if (this.isOpened && !this.tree.children) {
            return leafSelectedAny;
        }
    }
}
