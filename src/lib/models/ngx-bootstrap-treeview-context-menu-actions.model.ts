import { Tree } from './tree.model';

export interface NgxBootstrapTreeviewContextMenuActions {
    [label: string]: (clickedItem: Tree) => void;
}
