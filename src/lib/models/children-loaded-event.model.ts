import { Tree } from './tree.model';

export class ChildrenLoadedEvent {
    public parent: Tree;

    constructor(parent: Tree) {
        this.parent = parent;
    }
}
