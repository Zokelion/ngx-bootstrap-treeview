# Work in progress

Hi guys, this plugin is still under development and lacks a lot of features right now.
I will add some until I think this is complete and fits my needs as a tree plugin.

# Things I want to add

-   Boxes to select/unselect an entire branch
-   Async loading of children with a loadChildren callback
-   Possibility to disable animation and maybe add a set of fancy ones when folding/unfolding a branch
-   Allow a Tree array as an @Input() so this plugin can support multi-root trees
-   I'll probably have more ideas as this evolves

# Things ngx-bootstrap-treeview (nbt) uses

-   [Angular FontAwesome](https://github.com/FortAwesome/angular-fontawesome)
-   [Bootstrap](https://getbootstrap.com/) classes

# NgxBootstrapTreeview

This plugin includes a simple component that allows you to visualize/browse and interact with tree data.
It gives you access to three object classes: Leaf, Tree and LeafClickedEvent
And a component that will take a Tree as @Input()
