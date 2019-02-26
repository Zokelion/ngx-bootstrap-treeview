export class TreeMap {
    value: string;
    label: string;

    // Contains the key that will point to the property of the source object that will contain children of the same type
    // For a type T being the data source/branch type, this will point to the T[] type property
    children?: string;

    // Same idea as above, for type U indicating the datasource type, this will point to a U[]
    leavesKey: string;
}
