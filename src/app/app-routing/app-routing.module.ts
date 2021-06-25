import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router} from '@angular/router';
import {AuthorizationComponent} from '../login/login-layout/authorization/authorization.component';


import { AuthGuard } from '../auth.guard';
import { LoginLayoutComponent } from '../login/login-layout/login-layout.component';
import { VerificationComponent } from '../login/login-layout/verification/verification.component';
import { RegistrationComponent } from '../login/login-layout/registration/registration.component';
import { RestoreOfPasswordComponent } from '../login/login-layout/restore-of-password/restore-of-password.component';
import { LayoutsMainComponent } from '../main/layouts/layouts.component';
import { TasksComponent } from '../main/tasks/tasks.component';
import { TaskDetailComponent } from '../main/task-detail/task-detail.component';

const routes: Routes = [  
  {
    path: '', component: LoginLayoutComponent, children: [
      {path: '', component: AuthorizationComponent},
      {path: 'verification', component: VerificationComponent},
      {path: 'registration', component: RegistrationComponent},
      {path: 'restorepassword', component: RestoreOfPasswordComponent}

    ]   
  },
  {
    path: 'home', component: LayoutsMainComponent, children: [
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