import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Leaf } from '../models/leaf.model';
import { Tree } from '../models/tree.model';
import { ContextMenuEvent } from '../models/context-menu-event.model';

@Injectable({
    providedIn: 'root'
})
export class ContextMenuService {
    public lastContextMenuEvent = new BehaviorSubject<ContextMenuEvent>(null);

    constructor() {}

    fire(event: ContextMenuEvent) {
        this.lastContextMenuEvent.next(event);
    }
}
