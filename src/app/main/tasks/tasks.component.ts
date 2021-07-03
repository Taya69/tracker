import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FortasksService } from 'src/app/for-tasks.service';
import { Priority } from 'src/interfaces/priority';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/interfaces/task';




@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit { 
  
  constructor(private taskService: FortasksService, public dialog: MatDialog) { } 
  @ViewChild('inputForFile')
  inputForFileRef!: ElementRef;
  task: any
  file!: File;
  imagePreview: any
  priorities: Priority[] = [];  
  low: Task[] = []
  medium: Task[] = []
  high: Task[] = []
  priority: string = ''
  currentArr: any
  currentTask: any
  
   
  ngOnInit() {    
    this.taskService.getTasksByPriorities('low').subscribe((data)=> this.low = data)
    this.taskService.getTasksByPriorities('medium').subscribe((data)=> this.medium= data)
    this.taskService.getTasksByPriorities('high').subscribe((data)=> this.high = data)    
  }
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer !== event.container) {
    
      transferArrayItem(event.previousContainer.data, event.container.data,
        event.previousIndex, event.currentIndex)
        const currentPriority = this.getPriorityByDropElement(event.container.element.nativeElement.id)
        //const previosPriority = Object(event.container.data[event.currentIndex])['priority'] 
        const idTask = Object(event.container.data[event.currentIndex])['_id']         
        this.taskService.updateTask({priority : currentPriority}, idTask).subscribe()  
    } else {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  }
  getPriorityByDropElement(dropElement : string) : string {
    let priority = '';
    if (dropElement === 'cdk-drop-list-0') {priority = 'low'}
    if (dropElement === 'cdk-drop-list-1') {priority = 'medium'}
    if (dropElement === 'cdk-drop-list-2') {priority = 'high'}
    return priority
  }   
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  addTask() {
  let task = {
    name: "qqq",
    description: "sss",
    dateOfCreate: new Date(),    
  }
   this.taskService.addTask(task).subscribe()
  }
  save (properties: string[]) {
   
    this.taskService.addTask({
      name: properties[0],
      description: properties[1],
      priority: this.priority,
      dateOfCreate: new Date()
    }).subscribe((data) => {this.currentArr.push(data)})
  }
  setPriority (priority : string) {  
    this.priority = priority;
    
    if (this.priority === 'low') {
      this.currentArr = this.low
    }
    if (this.priority === 'medium') {
      this.currentArr = this.medium
    }
    if (this.priority === 'high') {
      this.currentArr = this.high      
    }
    
  }
  confirmOfdelete(task: Task) {
    this.currentTask = task
    const DialogRef = this.dialog.open(ConfimationDialog, {      
      data: task._id
    });    
    DialogRef.afterClosed().subscribe((el) => {
      if (el === 'delete') {
        let index = this.currentArr.indexOf(this.currentTask) 
        this.currentArr.splice(index, 1);
      }
      })
  }
  nothing () {

  }
 
 
}

@Component({
  selector: 'confimation-dialog',
  template: "<h2>Are you sure you want to delete the user?</h2><button mat-button (click)='delete()'>yes</button><button mat-button (click)='closeDialog()'>no</button>",
  styleUrls: ['./tasks.component.css']
})
export class ConfimationDialog {
  
constructor (@Inject(MAT_DIALOG_DATA) public data: string, public dialogRef2: MatDialogRef<ConfimationDialog>,
private taskService: FortasksService) {}
closeDialog () {
  this.dialogRef2.close("notDelete")
}

delete(): void {   
  this.taskService.deleteTask(this.data).subscribe();
  this.dialogRef2.close("delete")
}
}

