import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CollectionComponent } from './pages/collection/collection.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'collection', component: CollectionComponent},
    {path: '**', component: HomeComponent},
];
