export class Tree {
    children?: Tree[];
    loadChildren?: Function;
    label: string;
    value: number | string;
    data?: any;
}
