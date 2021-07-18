import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FortasksService } from 'src/app/for-tasks.service';
import { Order } from 'src/interfaces/order';
import { Priority } from 'src/interfaces/priority';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewtaskComponent implements OnInit {
  @Output() onSave = new EventEmitter<any>();   
  
  @ViewChild('deadline') deadloneRef!: ElementRef;
  // Push a search term into the observable stream.
  
  constructor(private taskService: FortasksService) { }
  name: string = '';
  description: string = ''
  order: string = 'low'
  dateDeadline: Date = new Date()
  orders: Order[] = []
  //selectedOrder: Order = {name: '', order: 0}
  ngOnInit(): void {
    this.taskService.getOrders().subscribe(data => this.orders = data)
  }
  
  save() { 
    console.log(this.order) 
    const orderOrder = this.taskService.getOrderByName(this.order)     
    this.onSave.emit([this.name, this.description, this.dateDeadline, this.order, orderOrder]);
    this.name = '';       
    this.description = '';
    this.dateDeadline = new Date()
  }
  addEvent(event: MatDatepickerInputEvent<Date>) { 
    if (event.value! < new Date()) {
         
    } else {
      this.dateDeadline = event.value! 
    }       
  }
  changeOrder (event: any) {            
        this.order = event.target.value    
  }
}
