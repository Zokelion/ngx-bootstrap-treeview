import {
    Component,
    OnInit,
    HostListener,
    Input,
    ElementRef,
    Renderer2,
    SimpleChanges,
    OnChanges,
    ViewChild
} from '@angular/core';
import { NgxBootstrapTreeviewContextMenu } from 'src/lib/models/ngx-bootstrap-treeview-context-menu.model';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ngx-bootstrap-treeview-context-menu',
    templateUrl: './ngx-bootstrap-treeview-context-menu.component.html',
    styleUrls: ['./ngx-bootstrap-treeview-context-menu.component.scss']
})
export class NgxBootstrapTreeviewContextMenuComponent implements OnInit, OnChanges {
    @Input()
    public data: NgxBootstrapTreeviewContextMenu;

    @Input()
    public itemsClass: string;

    @Input()
    public containerClass: string;

    @Input()
    public hoveredItemClass: string;

    @Input()
    public firedBy: MouseEvent;

    @ViewChild('container')
    public container: ElementRef<HTMLDListElement>;

    public isVisible = false;

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {}

    ngOnInit() {}

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

    @HostListener('document:click', ['$event'])
    public onDocumentClicked(event: Event) {
        if (this.isVisible) {
            event.preventDefault();
            event.stopPropagation();

            this.isVisible = false;
        }
    }

    public getLabels(): string[] {
        return Object.keys(this.data) || [];
    }

    public onItemClicked(label: string): void {
        this.data[label]();
    }
}
