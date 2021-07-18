import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { GetUserService } from '../../../get-user.service'
import {Router} from '@angular/router'
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  hide: boolean = true;
  email1: string = '';
  password: string = ''
  constructor(private fb: FormBuilder, private userService: GetUserService, private router: Router, public dialog: MatDialog) {
  }
  ngOnInit() {    
  } 
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(1)]]
  }) 
  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }    
    this.userService.login(this.email1, this.password).subscribe((data)=> {
      console.log(this.email1, this.password)
      if (data === undefined){
        this.dialog.open(DialogDataExampleDialog);
                  return     
              } else {
                this.router.navigate(['/home/tasks'])
                localStorage.setItem("token", String(data))
                localStorage.setItem("name", this.email1)             
              }
            }          
    )
  }
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}