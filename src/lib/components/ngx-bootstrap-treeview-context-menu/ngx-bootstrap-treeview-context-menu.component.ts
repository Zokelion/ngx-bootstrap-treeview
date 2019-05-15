import {
    Component,
    OnInit,
    HostListener,
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
import { NgxBootstrapTreeviewContextMenuData } from 'src/lib/models/ngx-bootstrap-treeview-context-menu-data.model';
import { NgxBootstrapTreeviewContextMenuConfig } from 'src/lib/models/ngx-bootstrap-treeview-context-menu-config.model';
import { Tree } from 'src/lib/models/tree.model';
import { Leaf } from 'src/lib/models/leaf.model';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ngx-bootstrap-treeview-context-menu',
    templateUrl: './ngx-bootstrap-treeview-context-menu.component.html',
    styleUrls: ['./ngx-bootstrap-treeview-context-menu.component.scss']
})
export class NgxBootstrapTreeviewContextMenuComponent implements OnInit, OnChanges {
    public _defaultConfig = {
        containerClass: '',
        hoveredItemClass: '',
        itemsClass: '',
        data: {}
    };

    @Input()
    public config: NgxBootstrapTreeviewContextMenuConfig = this._defaultConfig;

    @Input()
    public target: Leaf | Tree;

    @Input()
    public firedBy: MouseEvent;

    @Output()
    public hidden = new EventEmitter<void>();

    @Output()
    public shown = new EventEmitter<void>();

    @ViewChild('container')
    public container: ElementRef<HTMLDivElement>;

    public isVisible = false;

    constructor(private _renderer: Renderer2, private _zone: NgZone) {}

    ngOnInit() {
        this.config = { ...this._defaultConfig, ...this.config };

        this._renderer.listen(document, 'click.out-zone', this.onDocumentClicked.bind(this));
        this._renderer.listen(document, 'keyup.out-zone', this.onKeyPressed.bind(this));
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.config = { ...this._defaultConfig, ...this.config };

        if (this.firedBy) {
            this.firedBy.preventDefault();
            this.firedBy.stopPropagation();

            const nativeElement = this.container.nativeElement;
            const x = this.firedBy.layerX.toString();
            const y = this.firedBy.layerY.toString();

            this._renderer.setStyle(nativeElement, 'top', y + 'px');
            this._renderer.setStyle(nativeElement, 'left', x + 'px');

            this.isVisible = true;
            this.shown.emit();
        }
    }

    public onDocumentClicked(event: Event) {
        if (this.isVisible) {
            event.preventDefault();
            event.stopPropagation();

            this.hide();
        }
    }

    public onKeyPressed(event: KeyboardEvent) {
        if (this.isVisible && event.key.toLowerCase() === 'escape') {
            this.hide();
        }
    }

    public getLabels(): string[] {
        return Object.keys(this.config.data) || [];
    }

    public onItemClicked(label: string): void {
        this.config.data[label](this.target);
    }

    public hide(): void {
        this._zone.run(() => {
            this.isVisible = false;

            this.hidden.emit();
        });
    }
}
