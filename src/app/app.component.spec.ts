import { APP_BASE_HREF } from '@angular/common';
import { Component, Input } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { IconDefinition } from '@fortawesome/pro-light-svg-icons';
import { Tree } from '../lib/models/tree.model';
import { AppComponent } from './app.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ngx-bootstrap-treeview',
    template: ''
})
// tslint:disable-next-line:component-class-suffix
class NgxBootstrapTreeviewComponentStub {
    @Input()
    public isOpened: boolean;

    @Input()
    public tree: Tree;

    @Input()
    public openedFolderIcon: IconDefinition;

    @Input()
    public closedFolderIcon: IconDefinition;

    @Input()
    public anyChildrenSelectedIcon: IconDefinition;

    @Input()
    public allChildrenSelectedIcon: IconDefinition;

    @Input()
    public selectedLeafIcon: IconDefinition;

    @Input()
    public unselectedLeafIcon: IconDefinition;
}

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, NgxBootstrapTreeviewComponentStub],
            imports: [],
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should render title in a h1 tag', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        expect(compiled.querySelector('h1').textContent).toContain('Arbres');
    }));
});
