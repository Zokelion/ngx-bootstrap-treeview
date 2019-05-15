import { Tree } from './tree.model';

export interface NgxBootstrapTreeviewContextMenuData {
    [label: string]: (clickedItem: Tree) => void;
}
