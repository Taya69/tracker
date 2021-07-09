import { ChangeDetectorRef, Component, ElementRef, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FortasksService } from 'src/app/for-tasks.service';
import { Priority } from 'src/interfaces/priority';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/interfaces/task';

interface ColumnsForTasks {
  priority: Priority,
  array: Task[],
  showTask: boolean,
  orders: String[],
  selectOrder: String     
}


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit { 
  
  constructor(private taskService: FortasksService, public dialog: MatDialog, private cdr: ChangeDetectorRef,
    private zone:NgZone) { } 
  @ViewChild('inputForFile')
  inputForFileRef!: ElementRef;
  task: any
  file!: File;
  imagePreview: any
  priorities: Priority[] = [];  
  low: Task[] = []
  medium: Task[] = []
  high: Task[] = []
  customArray: Task[] = []
  customPriority: string = ''  
  testArray: Task[] = []
  priority: string = ''
  currentArr: any
  currentTask: any
  sorts: String[] = ['by order', 'by name'];   
  columns: ColumnsForTasks[] = []  
  selectedOrder = 'by order';
   test (event: any, column: ColumnsForTasks) {       
       column.array.sort(function(a,b){
        if (event.target.value === 'by name'){
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }          
          return 0;
        } else {
          if (a.order > b.order) {
            return 1;
          }
          if (a.order < b.order) {
            return -1;
          }          
          return 0;
        }
      
       })
     

   }
   ngOnInit() { 
    this.taskService.getPriorities().subscribe((data) => {this.priorities = data;
    
    for (let i = 0; i < this.priorities.length; i++) {      
      this.taskService.getTasksByPriorities(this.priorities[i].name, 'by order').subscribe((data)=> {       
        this.columns.push({priority: this.priorities[i], array: data, showTask : false, orders: this.sorts, selectOrder: 'by order'})
        this.columns.sort(function(a, b) {      
          if (a.priority.order > b.priority.order) {
            return 1;
          }
          if (a.priority.order < b.priority.order) {
            return -1;
          }          
          return 0;
        });        
      })       
    } 
  })
   
  }
  addColumn () {    
    const DialogRef = this.dialog.open(AddingOfColumn);    
    DialogRef.afterClosed().subscribe((el) => {    
      this.taskService.addPriority({name: el, custom: true, order: 3}).subscribe((data)=> {
        this.priorities.push(data);
        this.columns.push({priority: data, array: [], showTask: false, orders: this.sorts, selectOrder: 'by order'})
      })
      })

    this.taskService.getTasksByPriorities(this.customPriority, 'by order').subscribe()
  }
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer !== event.container) { 
      transferArrayItem(event.previousContainer.data, event.container.data,
        event.previousIndex, event.currentIndex)    
        const idTask = Object(event.container.data[event.currentIndex])['_id']            
        this.taskService.updateTask({priority : event.container.element.nativeElement.id}, idTask).subscribe()           
        }          
    else {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
} 
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  
  save (properties: any[]) {
   
    this.taskService.addTask({      
      name: properties[0],
      description: properties[1], 
      order: properties[3],
      dateDeadline: properties[2],     
      priority: this.priority,
      dateOfCreate: new Date()
    }).subscribe((data) => {this.currentArr.push(data)})
  }
  setPriority (priority : string) { 
  //  console.log(this.columns, priority) 
    this.priority = priority; 
    //  this.currentArr = this.columns.find((el)=> {el.priority === this.priority})?.array;   
    let arr: any = []
    for (let i = 0; i < this.columns.length; i++) {
      if (this.columns[i].priority.name === priority) {
        arr = this.columns[i].array
      }
    }  
    this.currentArr = arr;    
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

@Component({
  selector: 'adding-column',
  templateUrl: "tasksAddColumn.component.html",
  styleUrls: ['./tasks.component.css']
})
export class AddingOfColumn {
nameOfColumn: string = ''  
constructor (@Inject(MAT_DIALOG_DATA) public data: string, public dialogRef3: MatDialogRef<ConfimationDialog>,
private taskService: FortasksService) {}
closeDialog () {
 // this.taskService.addPriority({name: this.nameOfColumn, custom: true, order: 3}).subscribe()
  this.dialogRef3.close(this.nameOfColumn)
}
}

