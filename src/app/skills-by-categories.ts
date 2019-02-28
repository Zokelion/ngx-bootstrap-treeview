export class Skill {
    public id: number;
    public label: string;
    public categoryId: number;
}

export class Category {
    public id: number;
    public name: string;
    public children: Category[];
    public skills: Skill[];
}

export const skillsByCategories: Category[] = [
    {
        id: 1,
        name: 'Programming',
        children: [
            {
                id: 2,
                name: 'CSS',
                children: [],
                skills: [
                    {
                        id: 1,
                        label: 'CSS 3',
                        categoryId: 2
                    },
                    {
                        id: 2,
                        label: 'SCSS',
                        categoryId: 2
                    }
                ]
            },
            {
                id: 3,
                name: 'Frontend Frameworks',
                children: [],
                skills: [
                    {
                        id: 5,
                        label: 'Angular',
                        categoryId: 2
                    },
                    {
                        id: 6,
                        label: 'React',
                        categoryId: 2
                    },
                    {
                        id: 7,
                        label: 'VueJS',
                        categoryId: 2
                    }
                ]
            }
        ],
        skills: [
            {
                id: 3,
                label: 'Java',
                categoryId: 1
            },
            {
                id: 4,
                label: 'C#',
                categoryId: 1
            }
        ]
    },
    {
        id: 12,
        name: 'Sports',
        children: [
            {
                id: 10,
                name: 'Running',
                children: [],
                skills: [
                    {
                        id: 10,
                        label: 'Parkour',
                        categoryId: 10
                    },
                    {
                        id: 11,
                        label: 'Jogging',
                        categoryId: 10
                    },
                    {
                        id: 12,
                        label: 'Freerun',
                        categoryId: 10
                    }
                ]
            }
        ],
        skills: [
            {
                label: 'Climbing',
                id: 20,
                categoryId: 12
            }
        ]
    }
];
