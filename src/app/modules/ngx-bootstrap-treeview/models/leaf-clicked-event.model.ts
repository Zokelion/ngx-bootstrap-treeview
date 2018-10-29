import { Leaf } from './leaf.model';

export class LeafClickedEvent {
    public leaf: Leaf;
    public selectedLeaves?: Leaf[];

    constructor(leaf: Leaf, selectedLeaves: Leaf[]) {
        this.leaf = leaf;
        this.selectedLeaves = selectedLeaves;
    }
}
