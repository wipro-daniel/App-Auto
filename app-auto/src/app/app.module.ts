import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatToolbarModule,
  MatSidenavModule,
  MatTableModule,
  MatCardModule,MatButtonModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs'

import { AppComponent } from './app.component';
import { SearchHeaderComponent } from './header/search-header.component';
import { SearchBox } from './search-box/search-box.component';
import { HealthCheckComponent } from './health-check/health-check.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PairsPipe } from './health-check/health-check.pipe';

const routes: Routes = [
  { path: '', redirectTo: '/SearchBox', pathMatch: 'full' },
  { path: 'SearchBox', component: SearchBox
/*     children:[
     {path:'',redirectTo:'SearchBox' ,pathMatch:'full'},
     {path:}

            ] */
  },
  

  { path: '**', redirectTo: 'SearchBox', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchHeaderComponent,
    SearchBox,
    HealthCheckComponent,
    DashboardComponent,
    PairsPipe
      ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    // MatRadioChange,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,MatButtonModule,
    /* RouterModule.forRoot([
      { path: '/hdetails', component: HealthCheckComponent},
      { path: '', component: AppComponent},
      { path:'**', redirectTo: ''}
    ]) */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
