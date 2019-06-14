import { Component, OnInit } from '@angular/core';
import { NgxBootstrapTreeviewMapper, LeafMap, TreeMap, Leaf, LeafClickedEvent } from 'src/lib/public_api';
import { Category, Skill, skillsByCategories } from '../skills-by-categories';
import { ILoggingService } from 'src/lib/interfaces/ILoggingService.interface';

@Component({
    selector: 'app-filtering',
    templateUrl: './filtering.component.html',
    styleUrls: ['./filtering.component.scss']
})
export class FilteringComponent implements OnInit {
    public logger: ILoggingService = console;
    public data = skillsByCategories;
    public selectedLeaves: Leaf[] = [];
    public filterString = '';

    public treeMap: TreeMap = {
        children: 'children',
        leavesKey: 'skills',
        value: 'id',
        label: 'name'
    };

    public leafMap: LeafMap = {
        value: 'id',
        label: 'label'
    };

    public mapper = new NgxBootstrapTreeviewMapper<Category, Skill>(this.treeMap, this.leafMap);

    constructor() {}

    ngOnInit() {}

    public onBranchClicked(event) {
        console.log(event);
    }

    public onLeafClicked(event: LeafClickedEvent) {
        console.log(event);
        this.selectedLeaves = event.selectedLeaves;
    }
}
