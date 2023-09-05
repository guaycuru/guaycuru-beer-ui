import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StockTableComponent } from './components/stock-table/stock-table.component';
import { BeerFormComponent } from './components/beer-form/beer-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: StockTableComponent },
      { path: 'cadastro-cerveja', component: BeerFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
