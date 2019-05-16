# Ngx-bootstrap-treeview <!-- omit in toc -->

[![npm](https://img.shields.io/npm/v/ngx-bootstrap-treeview.svg?style=flat-square&color=orange&logo=npm)](https://www.npmjs.com/package/ngx-bootstrap-treeview)

> An easy way to integrate a tree widget within your Angular projects

## Summary

- [Summary](#summary)
- [Quick warning](#quick-warning)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Setting up in a project](#setting-up-in-a-project)
- [Usage](#usage)
  - [Simple demo](#simple-demo)
  - [Complete demo with FA Pro styles](#complete-demo-with-fa-pro-styles)
- [Features](#features)
  - [Simple singleroot tree](#simple-singleroot-tree)
  - [Simple multiroot tree](#simple-multiroot-tree)
  - [Icons customization](#icons-customization)
- [Using mapper](#using-mapper)
  - [Declaring a mapper](#declaring-a-mapper)
  - [Understanding the maps](#understanding-the-maps)
  - [Wrap it all together](#wrap-it-all-together)
- [Customizing context menu](#customizing-context-menu)
- [API Documentation](#api-documentation)
  - [NgxBootstrapTreeviewComponent](#ngxbootstraptreeviewcomponent)
  - [NgxBootstrapTreeviewMapper](#ngxbootstraptreeviewmapper)
  - [LeafClickedEvent](#leafclickedevent)
  - [Tree (model)](#tree-model)
  - [Leaf (model)](#leaf-model)
  - [TreeMap](#treemap)
  - [LeafMap](#leafmap)
- [Todo List](#todo-list)
- [Things ngx-bootstrap-treeview uses](#things-ngx-bootstrap-treeview-uses)

## Quick warning

Hi guys, this plugin is still under development and still lacks some features.

The name might be quite confusing but at the moment, there is not any [ngx-bootstrap](https://www.npmjs.com/package/ngx-bootstrap) component involved in this plugin.
At first I thought I'd need it, then realised I could do everything, at least until now, without using it and I'll try to keep everything going this way.

PS: I think this readme is quite complete. If you find anything missing, don't hesitate to open an issue, I wrote a mnay things over a short period of time, it's highly probable that I forgot to mention something here 😅.

## Getting Started

### Installation

```sh
npm install ngx-bootstrap-treeview
```

Or, if you're using an older version of npm:

```sh
npm install ngx-bootstrap-treeview --save
```

### Setting up in a project

In your app.module.ts

```ts
// Import module in your file
import { NgxBootstrapTreeviewModule } from 'ngx-bootstrap-treeview';

@NgModule({
    // And then you add it to your array of imports
    imports: [NgxBootstrapTreeviewModule]
})
```

Now in your HTML files, you can use the `<ngx-bootstrap-treeview>` tag.

## Usage

The purpose of this part is to just show some code that you can copy and use straight out of the clipboard.
For further documentation refer to the [API Documentation](#api-documentation) part.

### Simple demo

```html
<ngx-bootstrap-treeview [isOpened]="true" (leafClicked)="defaultStyleLeafClickedEventHandler($event)" [tree]="tree">
</ngx-bootstrap-treeview>
```

### Complete demo with FA Pro styles

```html
<ngx-bootstrap-treeview
    [isOpened]="true"
    (leafClicked)="lightStyleLeafClickedEventHandler($event)"
    [tree]="tree"
    [canSelectBranch]="false"
    [selectedLeafIcon]="faCheckSquare"
    [unselectedLeafIcon]="faSquare"
    [openedFolderIcon]="faFolderOpen"
    [closedFolderIcon]="faFolder"
    [anyChildrenSelectedIcon]="faMinus"
    [allChildrenSelectedIcon]="faCheck"
>
</ngx-bootstrap-treeview>
```

## Features
For this section, we'll consider having a Tree[] with the following value: 
```ts
const roots = [
    {
        label: 'Langages de programmation',
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
    }, {
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
    }
]
```

The next paragraphs will just show some HTML snippets that rely on these datas. We'll see later [how to use custom objects to build our tree](#using-mapper)

### Simple singleroot tree
```html
<!-- Here, roots[0] is a Tree since roots is a Tree[] -->
<ngx-bootstrap-treeview
    [tree]="roots[0]"
    [mapper]="mapper"
    [isOpened]="true"
>
</ngx-bootstrap-treeview>
```
### Simple multiroot tree
```html
<ngx-bootstrap-treeview
    [trees]="roots"
    [mapper]="mapper"
    [isOpened]="true"
>
</ngx-bootstrap-treeview>
```
### Icons customization
All icons can be customized, as long as you have access to them in your FontAwesome library. As an example, here, we're using FontAwesome light style. First, let's take an eye to what our TS should look like:
```ts
// Import the every IconDefinition you'll want to use
import { faFolder, faFolderOpen, faSquare, faCheckSquare, faCheck, faMinus } from '@fortawesome/pro-light-svg-icons';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    // Register them into your component
    public faFolder = faFolder;
    public faFolderOpen = faFolderOpen;
    public faSquare = faSquare;
    public faCheckSquare = faCheckSquare;
    public faMinus = faMinus;
    public faCheck = faCheck;
}
```

And then, back to some HTML:
```html
<!-- [propertyYouWantToChangeIcon]="nameInComponent" -->
<ngx-bootstrap-treeview
    [isOpened]="true"
    [trees]="trees"
    [canSelectBranch]="false"
    [selectedLeafIcon]="faCheckSquare"
    [unselectedLeafIcon]="faSquare"
    [openedFolderIcon]="faFolderOpen"
    [closedFolderIcon]="faFolder"
    [anyChildrenSelectedIcon]="faMinus"
    [allChildrenSelectedIcon]="faCheck"
>
</ngx-bootstrap-treeview>
```

## Using mapper
The mapper takes two maps as a params as well as 2 types. For our example, we'll use these 2 classes to generate our treeview:
```ts
class Skill {
    public id: number;
    public label: string;
    public categoryId: number;
}

class Category {
    public id: number;
    public name: string;
    public children: Category[];
    public skills: Skill[];
}
```

Some properties differ from our Tree and Leaf models and we don't need to have the categoryId inside our leaves. A Category stands for a branch and a Skill stands for a Leaf.

If we want to get a tree from such data, we must first re-organize it. That's what the mapper stands for.

### Declaring a mapper
As explained above, a mapper takes two types as arguments. First one is the type that will be converted in branch (Tree object), second one is the type that will be converted in leaves.
Here, our declaration would look like so:
```ts
const mapper: NgxBootsrapTreeviewMapper<Category, Skill>;
```
Note that it's just a declaration. To instanciate it, we'll need to indicate how our data will be mapped. So let's dive a bit further into the maps.

### Understanding the maps
We have two types of map: [TreeMap](#treemap) and [LeafMap](#leafmap) which are respectively used for mapping trees and leaves.
[TreeMap](#treemap) has the exact same properties as [Tree](#tree-model) and [LeafMap](#leafmap) has the exact same properties as [Leaf](#leaf-model) except that for the maps, all of the properties are of type string because they must contain the name of the key, in the source objects, that will be converted to the given property.

Maps for a treeview that displays skills by categories would look like this:
```ts
const treeMap = {
    children: 'children',
    leavesKey: 'skills',
    value: 'id',
    label: 'name'
};

const leafMap = {
    value: 'id',
    label: 'label'
};
```

### Wrap it all together
So now that we have all of the keys, let's wrap everything we have to get a working mapper:
```ts
const mapper = new NgxBootsrapTreeviewMapper<Category, Skill>(treeMap, leafMap);
```

And then we just give it to our treeview within the HTML
```html
<ngx-bootstrap-treeview
    [items]="skillsByCategories"
    [mapper]="mapper"
    [isOpened]="true"
>
</ngx-bootstrap-treeview>
```

## Customizing context menu

Version 1.1 introduced a feature that allow user to have a custom context menu when right clicking the tree.
This is done by giving an NgxBootstrapTreeviewContextMenus object as an @Input() to the treeview
Every interface you may need can be directly imported from ngx-bootstrap-treeview
For now, this feature does not support nested menus.
<!-- Write a lot more documentation about this later -->

## API Documentation

### NgxBootstrapTreeviewComponent
Here is a list of all the @Input():

|          Name           |               Type               |     default value      | Description                                                                                                                               |
| :---------------------: | :------------------------------: | :--------------------: | :---------------------------------------------------------------------------------------------------------------------------------------- |
|          tree           |       [Tree](#tree-model)        |      `undefined`       | Used as datasource for singleroot trees. Equivalent to giving `trees` with only one item                                                  |
|          trees          |      [Tree](#tree-model)[]       |      `undefined`       | Used when giving an array of [Tree](#tree-model) as the datasource                                                                        |
|         mapper          |    NgxBootstrapTreeviewMapper    |      `undefined`       | This is mandatory when providing the `items` or `item` parameter. It is used when building the treeview. Further documentation below.     |
|          item           |              Object              |      `undefined`       | The object you want to display in the tree. Equivalent to giving `items` with only one entry.                                             |
|          items          |             Object[]             |      `undefined`       | List of objects you want to display in the treeview. The tree will use the mapper and iterate over this to build the view.                |
|        isOpened         |             boolean              |        `false`         | If true, first level tree(s) is/are opened by default                                                                                     |
|     canSelectBranch     |             boolean              |        `false`         | Not implemented yet, will come with custom right click implementation                                                                     |
|    openedFolderIcon     |          IconDefinition          |     `faFolderOpen`     | Icon used to represent an opened branch                                                                                                   |
|    closedFolderIcon     |          IconDefinition          |       `faFolder`       | Icon used to represent a closed branch                                                                                                    |
|   unselectedLeafIcon    |          IconDefinition          |       `faSquare`       | Icon used on not selected leaves                                                                                                          |
|    selectedLeafIcon     |          IconDefinition          |    `faCheckSquare`     | Icon used on selected meaves                                                                                                              |
| anyChildrenSelectedIcon |          IconDefinition          |       `faMinus`        | Icon that will be put inside of the folder icon if it contains at least one ticked leaf                                                   |
| allChildrenSelectedIcon |          IconDefinition          |       `faCheck`        | Icon that will be put inside of the folder icon if all of its children are selected                                                       |
|    emptyFolderLabel     |              string              | "This folder is empty" | The label to display inside empty branches                                                                                                |
|      contextMenus       | NgxBootstrapTreeviewContextMenus |     `empty menus`      | An object describing what your context menus on the tree should look like. If this is not specified, context menu will simply be disabled |

None of these inputs are mandatory. Just remember that the tree MUST have a datasource. Either by providing `tree` or `trees`, or by giving a `mapper` + `item` or `items`.

### NgxBootstrapTreeviewMapper
The purpose of this class is to map a given object to a Tree.
Its constructor takes 2 params, `treeMap` which indicates how to map a tree and find its leaves and `leafMap` which indicates how to map a leaf when we find some.
For more informations about all of this, check the [Using mapper](#using-mapper) part.

### LeafClickedEvent
This event is emitted whenever a leaf gets selected or unselected. It contains the leaf that was click along with a complete list of all the leaves that are ticked inside the tree.

Here is what it looks like:
```ts
class LeafClickedEvent {
    public leaf: Leaf;
    public selectedLeaves?: Leaf[];
}
```

### Tree (model)

This class and the next one are pretty self-explanatory. Just use them as interfaces if you ever need them.

```ts
class Tree {
    children?: Tree[];
    loadChildren?: Function;
    label: string;
    value: number | string;
}
```

### Leaf (model)

```ts
class Leaf {
    public value: string | number;
    public label: string;
}
```

### TreeMap

```ts
interface TreeMap {
    value: string;
    label: string;

    // Contains the key that will point to the property of the source object that will contain children of the same type
    // For a type T being the data source/branch type, this will point to the T[] type property
    children?: string;

    // Same idea as above, for type U indicating the datasource type, this will point to a U[]
    leavesKey: string;
}
```
### LeafMap
```ts
interface LeafMap {
    value: string;
    label: string;
}
```

## Todo List

-   ~~Find a way to support custom objects as datasource~~ **(See [Using Mapper](#using-mapper) part of the readme)**
-   Boxes or custom right click to select/unselect an entire branch
-   Async loading of children with a loadChildren callback **(started working on it, paused right now)**
-   Possibility to disable animation and maybe add a set of fancy ones when folding/unfolding a branch
-   ~~Allow a [Tree](#tree-model) array as an @Input() so this plugin can support multi-root trees~~ **(Done)**
-   I'll probably have more ideas as this evolves

## Things ngx-bootstrap-treeview uses

-   [Angular FontAwesome](https://github.com/FortAwesome/angular-fontawesome) when it comes to icons
-   Some of the [Bootstrap](https://getbootstrap.com/) classes
