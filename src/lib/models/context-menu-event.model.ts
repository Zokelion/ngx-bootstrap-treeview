import { Tree } from './tree.model';

export interface ContextMenuEvent {
    target: Tree;
    event: MouseEvent;
}
