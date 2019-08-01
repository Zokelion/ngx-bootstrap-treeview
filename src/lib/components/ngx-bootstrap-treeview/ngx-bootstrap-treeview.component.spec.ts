import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBootstrapTreeviewComponent } from './ngx-bootstrap-treeview.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { APP_BASE_HREF } from '@angular/common';
import { Tree } from '../../models/tree.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NgxBootstrapTreeviewComponent', () => {
    let component: NgxBootstrapTreeviewComponent;
    let fixture: ComponentFixture<NgxBootstrapTreeviewComponent>;
    let nativeElement: HTMLElement;

    let tree: Tree;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FontAwesomeModule, RouterModule.forRoot([]), BrowserAnimationsModule],
            declarations: [NgxBootstrapTreeviewComponent],
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgxBootstrapTreeviewComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.debugElement.nativeElement;
        tree = {
            label: 'Langages de programmation',
            value: 1,
            children: [
                {
                    label: 'C++',
                    value: 11
                },
                {
                    label: 'Angular',
                    value: 12
                },
                {
                    label: 'C#',
                    value: 13,
                    children: [
                        {
                            label: 'LinQ',
                            value: 131
                        },
                        {
                            label: 'UWP',
                            value: 132
                        },
                        {
                            label: 'Sharepoint',
                            value: 133
                        },
                        {
                            label: 'WPF',
                            value: 134
                        }
                    ]
                },
                {
                    label: 'Java',
                    value: 14,
                    children: [
                        {
                            label: 'J2E',
                            value: 141
                        },
                        {
                            label: 'Spring Framework',
                            value: 142
                        },
                        {
                            label: 'Vanilla Java',
                            value: 143
                        },
                        {
                            label: 'Android',
                            value: 144
                        }
                    ]
                }
            ]
        };

        component.tree = tree;

        expect(component).toBeDefined();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should change when link clicked', () => {
        const isOpened = component.isOpened;

        component.itemClicked();

        expect(component.isOpened).toBe(!isOpened);
    });

    it('should emit itemClicked when we click the link', () => {
        spyOn(component, 'itemClicked');

        nativeElement.querySelector('a').click();

        fixture.whenStable().then(() => {
            expect(component.itemClicked).toHaveBeenCalled();
        });
    });
});
