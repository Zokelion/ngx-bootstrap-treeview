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
- [API Documentation](#api-documentation)
  - [NgxBootstrapTreeviewComponent](#ngxbootstraptreeviewcomponent)
  - [LeafClickedEvent](#leafclickedevent)
  - [Tree (model)](#tree-model)
  - [Leaf (model)](#leaf-model)
- [Todo List](#todo-list)
- [Things ngx-bootstrap-treeview uses](#things-ngx-bootstrap-treeview-uses)

## Quick warning

Hi guys, this plugin is still under development and lacks a lot of features right now.
I will add some until I think this is complete and fits my needs as a treeview plugin.

The name might be quite confusing but at the moment, there is not any [ngx-bootstrap](https://www.npmjs.com/package/ngx-bootstrap) component involved in this plugin.
At first I thought I'd need it, then realised I could do everything, at least until now, without using it and I'll try to keep everything going this way.

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

### Simple singleroot tree

### Simple multiroot tree

### Icons customization

### Using mapper

## API Documentation

### NgxBootstrapTreeviewComponent
Here is a list of all the @Input():

|          Name           |            Type            | Required |      default value       | Description                                                                                                                           |
| :---------------------: | :------------------------: | :------: | :----------------------: | :------------------------------------------------------------------------------------------------------------------------------------ |
|          tree           |            Tree            |    ❌     |       `undefined`        | Used as datasource for singleroot trees. Equivalent to giving `trees` with only one item                                              |
|          trees          |           Tree[]           |    ❌     |       `undefined`        | Used when giving an array of [`Tree`](#tree-model) as the datasource                                                                  |
|         mapper          | NgxBootstrapTreeviewMapper |    ❌     |       `undefined`        | This is mandatory when providing the `items` or `item` parameter. It is used when building the treeview. Further documentation below. |
|          item           |           Object           |    ❌     |       `undefined`        | The object you want to display in the tree. Equivalent to giving `items` with only one entry.                                         |
|          items          |          Object[]          |    ❌     |       `undefined`        | List of objects you want to display in the treeview. The tree will use the mapper and iterate over this to build the view.            |
|        isOpened         |          boolean           |    ❌     |         `false`          | If true, first level tree(s) is/are opened by default                                                                                 |
|     canSelectBranch     |          boolean           |    ❌     |         `false`          | Not implemented yet, will come with custom right click implementation                                                                 |
|    openedFolderIcon     |       IconDefinition       |    ❌     |      `faFolderOpen`      | Icon used to represent an opened branch                                                                                               |
|    closedFolderIcon     |       IconDefinition       |    ❌     |        `faFolder`        | Icon used to represent a closed branch                                                                                                |
|   unselectedLeafIcon    |       IconDefinition       |    ❌     |        `faSquare`        | Icon used on not selected leaves                                                                                                      |
|    selectedLeafIcon     |       IconDefinition       |    ❌     |     `faCheckSquare`      | Icon used on selected meaves                                                                                                          |
| anyChildrenSelectedIcon |       IconDefinition       |    ❌     |        `faMinus`         | Icon that will be put inside of the folder icon if it contains at least one ticked leaf                                               |
| allChildrenSelectedIcon |       IconDefinition       |    ❌     |        `faCheck`         | Icon that will be put inside of the folder icon if all of its children are selected                                                   |
|    emptyFolderLabel     |           string           |    ❌     | `"This folder is empty"` | The label to display inside empty branches                                                                                            |
### LeafClickedEvent

### Tree (model)

This class and the next one are pretty self-explanatory. Just use them as interfaces if you ever need them.

```ts
export class Tree {
    children?: Tree[];
    loadChildren?: Function;
    label: string;
    value: number | string;
}
```

### Leaf (model)

```ts
export class Leaf {
    public value: string | number;
    public label: string;

    constructor(tree: Tree) {
        this.value = tree.value;
        this.label = tree.label;
    }
}
```

## Todo List

-   Boxes or custom right click to select/unselect an entire branch
-   Async loading of children with a loadChildren callback **(started working on it, paused right now)**
-   Possibility to disable animation and maybe add a set of fancy ones when folding/unfolding a branch
-   ~~Allow a Tree array as an @Input() so this plugin can support multi-root trees~~ **(Done)**
-   I'll probably have more ideas as this evolves

## Things ngx-bootstrap-treeview uses

-   [Angular FontAwesome](https://github.com/FortAwesome/angular-fontawesome) when it comes to icons
-   Some of the [Bootstrap](https://getbootstrap.com/) classes
