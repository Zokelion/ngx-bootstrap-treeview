import { Observable } from 'rxjs';

export class Tree {
    children?: Tree[];
    loadChildren?: () => Observable<Tree[]>;
    hasChildren?: boolean;
    label: string;
    value: number | string;
}
