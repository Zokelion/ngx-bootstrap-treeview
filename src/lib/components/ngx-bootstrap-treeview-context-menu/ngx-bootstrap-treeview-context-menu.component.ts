import {
    Component,
    OnInit,
    Input,
    ElementRef,
    Renderer2,
    SimpleChanges,
    OnChanges,
    ViewChild,
    NgZone,
    Output,
    EventEmitter
} from '@angular/core';
import { NgxBootstrapTreeviewContextMenuConfig } from '../../models/ngx-bootstrap-treeview-context-menu-config.model';
import { NgxBootstrapTreeviewContextMenuActions } from '../../models/ngx-bootstrap-treeview-context-menu-actions.model';
import { ContextMenuService } from '../../services/context-menu.service';
import { ContextMenuEvent } from '../../models/context-menu-event.model';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ngx-bootstrap-treeview-context-menu',
    templateUrl: './ngx-bootstrap-treeview-context-menu.component.html',
    styleUrls: ['./ngx-bootstrap-treeview-context-menu.component.scss']
})
export class NgxBootstrapTreeviewContextMenuComponent implements OnInit, OnChanges {
    public _defaultConfig: NgxBootstrapTreeviewContextMenuConfig = {
        containerClass: '',
        hoveredItemClass: '',
        itemsClass: ''
    };

    @Input()
    public config: NgxBootstrapTreeviewContextMenuConfig = {};

    @Input()
    public rootContextMenu: NgxBootstrapTreeviewContextMenuActions = null;

    @Input()
    public branchContextMenu: NgxBootstrapTreeviewContextMenuActions = null;

    @Input()
    public leafContextMenu: NgxBootstrapTreeviewContextMenuActions = null;

    @Output()
    public hidden = new EventEmitter<void>();

    @Output()
    public shown = new EventEmitter<void>();

    @ViewChild('container')
    public container: ElementRef<HTMLDivElement>;

    private _activeMenu: NgxBootstrapTreeviewContextMenuActions = null;

    public lastContextMenuEvent: ContextMenuEvent;

    constructor(private _renderer: Renderer2, private _zone: NgZone, private _contextMenuService: ContextMenuService) {}

    ngOnInit() {
        this.config = { ...this._defaultConfig, ...this.config };

        this._contextMenuService.lastContextMenuEvent.subscribe((lastContextMenuEvent: ContextMenuEvent) => {
            if (lastContextMenuEvent) {
                this.show(lastContextMenuEvent);
            } else {
                this.hide();
            }
        });

        this._renderer.listen(document, 'click.out-zone', this.onDocumentClicked.bind(this));
        this._renderer.listen(document, 'keyup.out-zone', this.onKeyPressed.bind(this));
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('config' in changes) {
            this.config = { ...this._defaultConfig, ...changes.config.currentValue };
        }
    }

    public onDocumentClicked(event: Event) {
        if (this.lastContextMenuEvent) {
            event.preventDefault();
            event.stopPropagation();

            this.hide();
        }
    }

    public onKeyPressed(event: KeyboardEvent) {
        if (this.lastContextMenuEvent && event.key.toLowerCase() === 'escape') {
            this.hide();
        }
    }

    public getLabels(): string[] {
        return this._activeMenu ? Object.keys(this._activeMenu) : [];
    }

    public onItemClicked(label: string): void {
        this._activeMenu[label](this.lastContextMenuEvent.target);
    }

    public hide(): void {
        this._zone.run(() => {
            this._activeMenu = null;
            this.lastContextMenuEvent = null;

            this.hidden.emit();
        });
    }

    public show(contextMenuEvent: ContextMenuEvent): void {
        this.lastContextMenuEvent = contextMenuEvent;

        if (!contextMenuEvent.target) {
            this._activeMenu = this.rootContextMenu;
        } else if (contextMenuEvent.target.children) {
            this._activeMenu = this.branchContextMenu;
        } else {
            this._activeMenu = this.leafContextMenu;
        }

        const nativeElement = this.container.nativeElement;
        const x = this.lastContextMenuEvent.event.pageX.toString();
        const y = this.lastContextMenuEvent.event.pageY.toString();

        this._renderer.setStyle(nativeElement, 'top', y + 'px');
        this._renderer.setStyle(nativeElement, 'left', x + 'px');

        this.shown.emit();
    }
}
