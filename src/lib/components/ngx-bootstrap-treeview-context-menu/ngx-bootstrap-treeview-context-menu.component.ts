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
    NgZone
} from '@angular/core';
import { NgxBootstrapTreeviewContextMenuData } from 'src/lib/models/ngx-bootstrap-treeview-context-menu-data.model';
import { NgxBootstrapTreeviewContextMenuConfig } from 'src/lib/models/ngx-bootstrap-treeview-context-menu-config.model';

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
    public firedBy: MouseEvent;

    @ViewChild('container')
    public container: ElementRef<HTMLDListElement>;

    public isVisible = false;

    constructor(private _renderer: Renderer2, private _zone: NgZone) {}

    ngOnInit() {
        this.config = { ...this._defaultConfig, ...this.config };

        this._renderer.listen(document, 'click.out-zone', this.onDocumentClicked.bind(this));
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.firedBy) {
            this.firedBy.preventDefault();
            this.firedBy.stopPropagation();

            const nativeElement = this.container.nativeElement;
            const x = this.firedBy.layerX.toString();
            const y = this.firedBy.layerY.toString();

            this._renderer.setStyle(nativeElement, 'top', y + 'px');
            this._renderer.setStyle(nativeElement, 'left', x + 'px');

            this.isVisible = true;
        }
    }

    public onDocumentClicked(event: Event) {
        console.log('Click outside of zone JS received');
        if (this.isVisible) {
            event.preventDefault();
            event.stopPropagation();

            this._zone.run(() => {
                this.isVisible = false;
            });
        }
    }

    public getLabels(): string[] {
        return Object.keys(this.config.data) || [];
    }

    public onItemClicked(label: string): void {
        this.config.data[label]();
    }
}
