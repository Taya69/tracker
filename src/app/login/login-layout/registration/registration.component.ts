import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { GetUserService } from '../../../get-user.service'
import {Router} from '@angular/router'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  id : number = 0;
  hide: boolean = true;
  email: string = '';
  password: string = ''
  constructor(private fb: FormBuilder, private userService: GetUserService, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(1)]]
  })
    
  addUser() {    
    if (!this.loginForm.valid) {            
      return;
    }          
    this.userService.register(this.email, this.password).subscribe((data)=> {
      if (data === undefined) {
        this.dialog.open(DialogRegistration);
      } else {
        console.log(data)
        this.userService.login(data.email, data.password).subscribe(data => {
          localStorage.setItem('token', String(data)); this.router.navigate( ['/home/tasks'])
        })        
      }
    }   
    )   
  }
}

@Component({
  selector: 'dialog-refistration',
  templateUrl: 'registrationDialog.component.html',
})
export class DialogRegistration {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}

