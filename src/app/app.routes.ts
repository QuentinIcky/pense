import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { ProjetsComponent } from './pages/projets/projets.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'projets/:id', component: ProjetsComponent},
    {path: 'collection/:collectionName', component: CollectionComponent},
    {path: '**', component: HomeComponent},
];
