import { Injectable } from '@angular/core';
import { Tree } from '../models/tree.model';

@Injectable({
    providedIn: 'root'
})
export class SelectedTreesService {
    private _selectedTrees: Tree[] = [];

    constructor() {}

    public selectPreselectedItems(preselectedItems: string[] | number[], trees: Tree[], selectOnlyBranches: boolean) {
        trees.forEach(tree => this._iterSelectPreselectedItems(preselectedItems, tree, selectOnlyBranches));
    }

    private _iterSelectPreselectedItems(
        preselectedItems: string[] | number[],
        tree: Tree,
        selectOnlyBranches: boolean
    ) {
        if (
            this._isSelectable(tree, selectOnlyBranches) &&
            ((typeof tree.value === 'string' && (<string[]>preselectedItems).includes(<string>tree.value)) ||
                (typeof tree.value === 'number' && (<number[]>preselectedItems).includes(<number>tree.value)))
        ) {
            this._selectedTrees.push(tree);
        }
        if (tree.children) {
            tree.children.forEach(child =>
                this._iterSelectPreselectedItems(preselectedItems, child, selectOnlyBranches)
            );
        }
    }

    public getSelectedTrees() {
        return [...this._selectedTrees];
    }

    public isSelected(tree: Tree) {
        return this._selectedTrees.some(t => t.value === tree.value);
    }

    public addTree(tree: Tree, selectOnlyBranches: boolean) {
        if (this._isSelectable(tree, selectOnlyBranches) && !this._selectedTrees.some(b => b.value === tree.value)) {
            this._selectedTrees.push(tree);
        }
    }

    public removeTree(tree: Tree, selectOnlyBranches: boolean) {
        if (this._isSelectable(tree, selectOnlyBranches)) {
            const index = this._selectedTrees.findIndex(b => b.value === tree.value);
            if (index !== -1) {
                this._selectedTrees.splice(index, 1);
            }
        }
    }

    private _isSelectable(tree: Tree, selectOnlyBranches: boolean): boolean {
        return (selectOnlyBranches && !!tree.children) || (!selectOnlyBranches && !tree.children);
    }
}
