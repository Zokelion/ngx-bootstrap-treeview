import { Tree } from './tree.model';

export class Leaf {
    public value: string | number;
    public label: string;
    public data?: any;

    constructor(tree: Tree) {
        this.value = tree.value;
        this.label = tree.label;
        this.data = tree.data;
    }
}
