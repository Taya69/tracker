import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router} from '@angular/router';
import {AuthorizationComponent} from '../login/login-layout/authorization/authorization.component';


import { AuthGuard } from '../auth.guard';
import { LoginLayoutComponent } from '../login/login-layout/login-layout.component';
import { RegistrationComponent } from '../login/login-layout/registration/registration.component';
import { LayoutsMainComponent } from '../main/layouts/layouts.component';
import { TasksComponent } from '../main/tasks/tasks.component';
import { TaskDetailComponent } from '../main/task-detail/task-detail.component';

const routes: Routes = [  
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: '', component: LoginLayoutComponent, children: [
      {path: '', component: AuthorizationComponent},
      {path: 'registration', component: RegistrationComponent},
    ]   
  },
  {
    path: 'home', component: LayoutsMainComponent, canActivate: [AuthGuard], children: [
      {path: 'tasks', component: TasksComponent, },
      {path: 'tasks/:id', component: TaskDetailComponent,}
    ]
  }
 
 
];

@NgModule({  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor (public router : Router) {      
    // router.events.pipe(find(e => e instanceof NavigationEnd)).subscribe((e) => {            
    //   console.log(e) 
    // })  
}
 }