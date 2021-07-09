import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from './material-module.module'
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common'; 
import {HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { LoginLayoutComponent } from './login/login-layout/login-layout.component';
import { AuthorizationComponent } from './login/login-layout/authorization/authorization.component';
import { VerificationComponent } from './login/login-layout/verification/verification.component';
import { RegistrationComponent } from './login/login-layout/registration/registration.component';
import { RestoreOfPasswordComponent } from './login/login-layout/restore-of-password/restore-of-password.component';
import { LayoutsMainComponent } from './main/layouts/layouts.component';
import { AddingOfColumn, ConfimationDialog, TasksComponent } from './main/tasks/tasks.component';
import { OneOfTaskComponent } from './main/one-of-task/one-of-task.component';
import { NewtaskComponent } from './main/tasks/newtask/newtask.component';
import { TaskDetailComponent } from './main/task-detail/task-detail.component';




@NgModule({
  declarations: [
   AppComponent,
   LoginLayoutComponent,
   AuthorizationComponent,
   VerificationComponent,
   RegistrationComponent,
   RestoreOfPasswordComponent,
   LayoutsMainComponent,
   TasksComponent,
   OneOfTaskComponent,
   NewtaskComponent,
   ConfimationDialog,
   TaskDetailComponent,
   AddingOfColumn
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,  
    BrowserAnimationsModule,
    ObserversModule,
    DemoMaterialModule,
    CommonModule,
    MatNativeDateModule,    
    HttpClientModule, 
    
      
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
