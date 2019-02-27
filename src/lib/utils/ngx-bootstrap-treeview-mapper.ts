import { Tree } from '../models/tree.model';
import { Leaf } from '../models/leaf.model';
import { TreeMap } from '../models/tree-map.model';
import { LeafMap } from '../models/leaf-map.model';

export class NgxBootstrapTreeviewMapper<TreeSourceType extends Object, LeafSourceType extends Object> {
    treeMap: TreeMap;
    leafMap: LeafMap;

    constructor(treeMap: TreeMap, leafMap: LeafMap) {
        this.treeMap = treeMap;
        this.leafMap = leafMap;
    }

    mapTree(item: TreeSourceType): Tree {
        const { value, label, children, leaves } = {
            value: item[this.treeMap.value],
            label: item[this.treeMap.label],
            children: item[this.treeMap.children],
            leaves: item[this.treeMap.leavesKey]
        };

        const result: Tree = {
            value,
            label,
            children: {
                ...children.map(child => this.mapTree(child)),
                ...leaves.map(leaf => this.mapLeaf(leaf))
            }
        };

        return result;
    }

    mapLeaf(item: LeafSourceType): Leaf {
        return {
            value: item[this.leafMap.value],
            label: item[this.leafMap.label]
        };
    }
}
