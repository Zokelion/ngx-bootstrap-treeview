import { Component, OnInit } from '@angular/core';
import { skillsByCategories, Skill, Category } from '../skills-by-categories';
import { TreeMap, LeafMap, NgxBootstrapTreeviewMapper, Leaf, LeafClickedEvent } from 'src/lib/public_api';
import { ILoggingService } from 'src/lib/interfaces/ILoggingService.interface';

@Component({
    selector: 'app-using-mapper',
    templateUrl: './using-mapper.component.html',
    styleUrls: ['./using-mapper.component.scss']
})
export class UsingMapperComponent implements OnInit {
    public logger: ILoggingService = console;
    public data = skillsByCategories;
    public selectedLeaves: Leaf[] = [];

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
