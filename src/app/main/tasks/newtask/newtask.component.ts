import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewtaskComponent implements OnInit {
  @Output() onSave = new EventEmitter<any>();   

  // Push a search term into the observable stream.
  
  constructor() { }
  name: string = '';
  description: string = ''
  order: number = 0
  dateDeadline: Date = new Date()
  ngOnInit(): void {
  }
  save() {
    console.log(this.name)
    this.onSave.emit([this.name, this.description, this.dateDeadline, this.order])
  }
}
