import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { SimpleDataComponent } from './simple-data/simple-data.component';
import { CustomStylingComponent } from './custom-styling/custom-styling.component';
import { MultirootTreeComponent } from './multiroot-tree/multiroot-tree.component';
import { UsingMapperComponent } from './using-mapper/using-mapper.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ProgrammaticFoldingComponent } from './programmatic-folding/programmatic-folding.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'simple-data', component: SimpleDataComponent },
            { path: 'custom-styling', component: CustomStylingComponent },
            { path: 'multiroot-tree', component: MultirootTreeComponent },
            { path: 'using-mapper', component: UsingMapperComponent },
            { path: 'context-menu', component: ContextMenuComponent },
            { path: 'programmatic-folding', component: ProgrammaticFoldingComponent }
        ]
    },
    { path: '**', redirectTo: '/' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule {}
