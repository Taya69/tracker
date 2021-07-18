import { ChangeDetectorRef, Component, ElementRef, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FortasksService } from 'src/app/for-tasks.service';
import { Priority } from 'src/interfaces/priority';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/interfaces/task';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { inject } from '@angular/core/testing';
import { Order } from 'src/interfaces/order';

interface ColumnsForTasks {
  priority: Priority,
  array: Task[],
  showTask: boolean,
  orders: String[],
  selectOrder: String,
  rename: boolean      
}
interface DataForDialog {
  id : string,
  dialog: string
}


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {   
  constructor(private taskService: FortasksService, public dialog: MatDialog, private cdr: ChangeDetectorRef,
    private _bottomSheet: MatBottomSheet) { } 

  @ViewChild('inputForFile')  
  inputForFileRef!: ElementRef;

  task: any
  file!: File;
  imagePreview: any
  priorities: Priority[] = [];   
  customPriority: string = ''   
  priority: string = ''
  currentArr: Task[] = []
  currentTask: any
  sorts: String[] = ['by order', 'by name'];   
  columns: ColumnsForTasks[] = [] 
  currentColumn: any 
  selectedOrder = 'by order'
  //lastOrder: number = 0
  loading: boolean = true
  numberOfColumns: number = 3
  columnName: string = ''
  success: boolean = true
  orders: Order[] = []
  openBottomSheet(result: string): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet, {
      data: result
    });
  }
   changeSort (event: any,column: ColumnsForTasks) {     
    this.sortColumn(event.target.value) 
    column.selectOrder = event.target.value;   
   }
   sortColumn(sortBy: string) {
    this.currentArr.sort(function(a,b){
      if (sortBy === 'by name'){
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }          
        return 0;
      } else {
        if (a.orderOrder! > b.orderOrder!) {
          return 1;
        }
        if (a.orderOrder! < b.orderOrder!) {
          return -1;
        }          
        return 0;
      }    
     })     
   }
   ngOnInit() {     
    this.taskService.getPriorities().subscribe((data) => {this.priorities = data;
      this.numberOfColumns = data.length    
    for (let i = 0; i < this.priorities.length; i++) {      
      this.taskService.getTasksByPriorities(this.priorities[i].name, this.selectedOrder).subscribe((data)=> {       
        this.columns.push({priority: this.priorities[i], array: data, showTask : false, orders: this.sorts, selectOrder: this.selectedOrder, rename: false})
        this.columns.sort(function(a, b) {      
          if (a.priority.order > b.priority.order) {
            return 1;
          }
          if (a.priority.order < b.priority.order) {
            return -1;
          }          
          return 0;
        });        
      }
      )       
    } 
    this.loading = false;
  }  
  ) 
   this.taskService.getOrders().subscribe(data => {this.orders = data; this.orders.forEach(element => {
     
   })
  })
  }
 
  addColumn () {    
    const DialogRef = this.dialog.open(AddingOfColumn, {
      data: 'adding'
    });    
    DialogRef.afterClosed().subscribe((el) => { 
      this.taskService.getPriorities().subscribe((data) => {
        this.taskService.addPriority({name: el, custom: true, order: data[data.length-1].order+1}).subscribe((data)=> {
          this.priorities.push(data);
          this.columns.push({priority: data, array: [], showTask: false, orders: this.sorts, selectOrder: this.selectedOrder, rename: false})
        })
      })   
     
      })
    this.taskService.getTasksByPriorities(this.customPriority, 'by order').subscribe()
  }
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer !== event.container) { 
      transferArrayItem(event.previousContainer.data, event.container.data,
        event.previousIndex, event.currentIndex)    
        const idTask = Object(event.container.data[event.currentIndex])['_id']            
        this.taskService.updateTask({priority : event.container.element.nativeElement.id}, idTask).subscribe((data)=>
        {let result = data !== undefined ? 'success' : 'failed'
        this.openBottomSheet(result)}
      )           
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
        orderName: properties[3],
        dateDeadline: properties[2],     
        priority: this.priority,
        dateOfCreate: new Date(),
        orderOrder: Number(properties[4])
      }).subscribe((data) => {this.currentArr.push(data); this.sortColumn(this.currentColumn.selectOrder)})   
  }
  setPriority (column: ColumnsForTasks) {    
    this.priority = column.priority.name; 
    this.currentColumn = column       
    //  this.currentArr = this.columns.find((el)=> {el.priority === this.priority})?.array;   
    let arr: any = []
    for (let i = 0; i < this.columns.length; i++) {
      if (this.columns[i].priority.name === column.priority.name) {
        arr = this.columns[i].array
      }
    }  
    this.currentArr = arr;    
  }
  confirmOfdelete(task: Task) {
    this.currentTask = task
    const DialogRef = this.dialog.open(ConfimationDialog, {      
      data: {id: task._id, dialog: 'task'}
    });    
    DialogRef.afterClosed().subscribe((el) => {
      if (el === 'delete') {
        let index = this.currentArr.indexOf(this.currentTask) 
        this.currentArr.splice(index, 1);
      }
      })
  } 
  confirmOfdeleteColumn(priorityId : string | undefined) {    
    const DialogRef = this.dialog.open(ConfimationDialog, { 
      data: {id: priorityId, dialog: 'column'}  
    });    
    DialogRef.afterClosed().subscribe((el) => {
      if (el === 'delete') {
        let index = this.columns.indexOf(this.currentColumn) 
        this.columns.splice(index, 1);
      }
      })
  }
  renameColumnFunc(column: ColumnsForTasks) {
    const oldName = column.priority.name
    column.rename = !column.rename
    const DialogRef = this.dialog.open(AddingOfColumn, {
      data: {
        editing: true,
        name: column.priority.name
      }
    });    
    DialogRef.afterClosed().subscribe((el) => { 
    column.priority.name = el
    const priorityForEdit = {
      name: el
    }
    this.taskService.updatePriority(priorityForEdit, column.priority._id!).subscribe()
    
    this.taskService.getTasksByPriorities(oldName, 'by order').subscribe((data)=> {
      data.forEach(element => {
        this.taskService.updateTask({priority: el}, element._id!).subscribe((data)=> {
          if (data !== undefined) {this.success = true}
          else (this.success = false)
        })
      });
    })
     
      })
    this.taskService.getTasksByPriorities(this.customPriority, 'by order').subscribe()
  } 
}

@Component({
  selector: 'confimation-dialog',
  templateUrl: "deleteColumn.component.html",
  styleUrls: ['./tasks.component.css']
})
export class ConfimationDialog {
  
constructor (@Inject(MAT_DIALOG_DATA) public data: DataForDialog, public dialogRef2: MatDialogRef<ConfimationDialog>,
private taskService: FortasksService) {}
closeDialog () {
  console.log(this.data.dialog)
  this.dialogRef2.close("notDelete")
}
delete(): void {   
  this.taskService.deleteTask(this.data.id).subscribe();
  this.dialogRef2.close("delete")
}
deleteColumn() {
  this.taskService.getPriorityById(this.data.id).subscribe((priority)=> {
    console.log(priority, this.data);
    
    this.taskService.deletePriority(this.data.id).subscribe();
    this.taskService.getTasksByPriorities(priority.name, 'by order').subscribe((tasks)=> {
      tasks.forEach(element => {
        this.taskService.deleteTask(element._id!).subscribe()
      });
      this.dialogRef2.close("delete")
    })
  }) 
}
}

@Component({
  selector: 'adding-column',
  templateUrl: "tasksAddColumn.component.html",
  styleUrls: ['./tasks.component.css']
})
export class AddingOfColumn implements OnInit{
nameOfColumn: string = ''  
constructor (@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef3: MatDialogRef<ConfimationDialog>,
private taskService: FortasksService) {}
ngOnInit() {
  if(this.data.editing ) {    
    this.nameOfColumn = this.data.name
  }
}
closeDialog () { 
  this.dialogRef3.close(this.nameOfColumn)
}
}

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'bottomSheet.component.html',
})
export class BottomSheetOverviewExampleSheet implements OnInit{
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}
ngOnInit() {  
  setTimeout(()=> {this._bottomSheetRef.dismiss()}, 500)
}
  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();    
  }
}