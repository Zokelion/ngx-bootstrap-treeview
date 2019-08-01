import { Tree } from '../lib/public_api';

export const tree: Tree = {
    label: 'Programming',
    value: 1,
    children: [
        {
            label: 'C++',
            value: 11
        },
        {
            label: 'Angular',
            value: 12
        },
        {
            label: 'C#',
            value: 13,
            children: [
                {
                    label: 'LinQ',
                    value: 131
                },
                {
                    label: 'UWP',
                    value: 132
                },
                {
                    label: 'Sharepoint',
                    value: 133
                },
                {
                    label: 'WPF',
                    value: 134
                }
            ]
        },
        {
            label: 'Java',
            value: 14,
            children: [
                {
                    label: 'J2E',
                    value: 141
                },
                {
                    label: 'Spring Framework',
                    value: 142
                },
                {
                    label: 'Vanilla Java',
                    value: 143
                },
                {
                    label: 'Android',
                    value: 144
                }
            ]
        },
        {
            label: 'Empty folder test',
            value: 15,
            children: []
        }
    ]
};

export const trees: Tree[] = [
    { ...this.tree },
    {
        value: 1111,
        label: 'Customers',
        children: [
            {
                label: 'Norton',
                value: 156
            },
            {
                label: 'Symantec',
                value: 116
            },
            {
                label: 'Some company',
                value: 126
            },
            {
                label: 'Zokelion',
                value: 196
            }
        ]
    },
    {
        value: 100,
        label: 'Test 1'
    },
    {
        value: 101,
        label: 'Test 2'
    },
    {
        value: 102,
        label: 'Test 3'
    }
];
