import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchBox } from './search-box/search-box.component';

const routes: Routes = [
  { path: 'search', component: SearchBox },
  { path: '**', redirectTo: 'search' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchEngineRoutingModule { }