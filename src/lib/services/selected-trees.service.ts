import { Injectable } from '@angular/core';
import { Tree } from '../models/tree.model';

@Injectable({
    providedIn: 'root'
})
export class SelectedTreesService {
    private _selectedTrees: Tree[] = [];
    public selectedTree: Tree;

    constructor() {}

    public selectPreselectedItems(preselectedItems: string[] | number[], trees: Tree[]) {
        trees.forEach(tree => this._iterSelectPreselectedItems(preselectedItems, tree));
    }

    private _iterSelectPreselectedItems(preselectedItems: string[] | number[], tree: Tree) {
        if (
            this._isSelectable(tree) &&
            ((typeof tree.value === 'string' && (<string[]>preselectedItems).includes(<string>tree.value)) ||
                (typeof tree.value === 'number' && (<number[]>preselectedItems).includes(<number>tree.value)))
        ) {
            this._selectedTrees.push(tree);
        }
        if (tree.children) {
            tree.children.forEach(child => this._iterSelectPreselectedItems(preselectedItems, child));
        }
    }

    public getSelectedTrees() {
        return [...this._selectedTrees];
    }

    public isSelected(tree: Tree) {
        if (!tree) {
            return false;
        }
        return this._selectedTrees.some(t => t.value === tree.value);
    }

    public addTree(tree: Tree) {
        if (this._isSelectable(tree) && !this._selectedTrees.some(b => b.value === tree.value)) {
            this._selectedTrees.push(tree);
        }
    }

    public removeTree(tree: Tree) {
        if (this._isSelectable(tree)) {
            const index = this._selectedTrees.findIndex(b => b.value === tree.value);
            if (index !== -1) {
                this._selectedTrees.splice(index, 1);
            }
        }
    }

    private _isSelectable(tree: Tree): boolean {
        return !tree.children;
    }
}
