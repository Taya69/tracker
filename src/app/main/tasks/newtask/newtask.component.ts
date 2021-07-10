import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Priority } from 'src/interfaces/priority';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewtaskComponent implements OnInit {
  @Output() onSave = new EventEmitter<any>();   
  @Input() lastOrder?: number
  // Push a search term into the observable stream.
  
  constructor() { }
  name: string = '';
  description: string = ''
  order: number = 1
  dateDeadline: Date = new Date()
  ngOnInit(): void {
    this.order = this.lastOrder!
  }
  setLastOrder () {
    this.order = this.lastOrder!+1
  }
  save() {
    
    this.onSave.emit([this.name, this.description, this.dateDeadline, this.order]);
    this.name = '';
    this.order = 1;
    this.description = '';
    this.dateDeadline = new Date()
  }
  addEvent(event: MatDatepickerInputEvent<Date>) {    
    this.dateDeadline = event.value!    
  }
}
