import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './compnents/home/home.component';
import { TestComponent } from './compnents/snake/test/test.component';

const routes: Routes = [{path:'',component:HomeComponent},
                        {path:'snake',component:TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
