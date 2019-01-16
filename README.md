## Work in progress

Hi guys, this plugin is still under development and lacks a lot of features right now.
I will add some until I think this is complete and fits my needs as a tree plugin.

The name might be quite confusing but at the moment, there is not any [ngx-bootstrap](https://www.npmjs.com/package/ngx-bootstrap) component involved in this plugin.
At first I thought I'd need it, then realised I could do everything, at least until now, without using it and I'll try to keep everything going this way.

## Warning

For those who are already using this even though it's under development, this package will move to @zokelion/ngx-bootstrap-treeview or maybe @zokelion/ngx-fontawesome-treeview since it relies more on font-awesome than bootstrap right now, not sure how it will evolve though. Anyway, the final name will be displayed here as of 0.2.9 and 0.3.0 will introduce the option to give an Array<Tree> instead of a simple tree (currently #1 thing I want to do). This is probably the most blocking issue right now for many use cases so I'll consider fixing it fast.

## Things I want to add

-   Boxes to select/unselect an entire branch
-   Async loading of children with a loadChildren callback
-   Possibility to disable animation and maybe add a set of fancy ones when folding/unfolding a branch
-   Allow a Tree array as an @Input() so this plugin can support multi-root trees
-   I'll probably have more ideas as this evolves

## Things ngx-bootstrap-treeview (nbt) uses

-   [Angular FontAwesome](https://github.com/FortAwesome/angular-fontawesome)
-   [Bootstrap](https://getbootstrap.com/) classes

## NgxBootstrapTreeview

This plugin includes a simple component that allows you to visualize/browse and interact with tree data.
It gives you access to three object classes: Leaf, Tree and LeafClickedEvent
And a component that will take a Tree as @Input()
