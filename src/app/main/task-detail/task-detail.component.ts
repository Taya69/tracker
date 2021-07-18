import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FortasksService } from 'src/app/for-tasks.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { FormBuilder, FormGroup } from '@angular/forms';
import {createPasswordStrengthValidator} from '../../dateValidator.validator'
import { Order } from 'src/interfaces/order';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit { 
  @ViewChild('inputForFile')
  inputForFileRef!: ElementRef;
  @ViewChild('linkOfFile')
  linkRef!: ElementRef;
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  task: any
  file!: File;
  files: string[] = []
  imagePreview: any
  id: string = ''
  name: string = ''
  description: string = ''
  dateOfCreation: Date = new Date()
  dateOfDeadLine: Date = new Date()
  order: string = ''
  priority: string = ''
  events: string[] = []
  loading: boolean = true
  selectable = true;
  removable = true;
  orders: Order[] = []
  constructor(
    private route: ActivatedRoute,
    private taskService: FortasksService,
    private location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.taskService.getOrders().subscribe(data => this.orders = data)
    this.getTask()
  }
  taskForm: FormGroup = this.fb.group({
    deadline: ['', [createPasswordStrengthValidator()]]  
  }) 
  getTask(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTaskById(this.id)
      .subscribe(task => {this.task = task, 
        this.files = this.task.file,
        this.name = this.task.name,
        this.description = this.task.description,
        this.dateOfDeadLine = this.task.dateDeadline,
        this.order = this.task.orderName,
        this.priority = this.task.priority
        this.loading = false
        console.log(task.file)
      });    
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.task) {     
    }
  }
  triggerOfUpload() {
    this.inputForFileRef.nativeElement.click()
  } 
  onFileUpload (event : any) {
    const file = event.target.files[0];    
    this.file = file;
    if (file.type === 'image/png' || file.type === 'image/jpeg' ) {
      const reader = new FileReader()
      reader.onload = () => {      
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(file);
  }   
  } 
  submitOfUpload() {
    const uploadFormData = new FormData();
    uploadFormData.append('file', this.file, this.file.name);    
    this.taskService.addFile(uploadFormData).subscribe((data) => {
      const newFiles = [...this.task.file, data]
      this.files.push(data.toString())
      this.imagePreview = null
      this.taskService.updateTask({file: newFiles}, this.id).subscribe()
    })
  }  
  addEvent(event: MatDatepickerInputEvent<Date>) {    
    this.dateOfDeadLine = event.value!    
  }
  saveChange () {
    if (!this.taskForm.valid) {console.log(1111); return}
    console.log(2222222)
    this.taskService.updateTask({
       name : this.name,
       dateDeadline: this.dateOfDeadLine,
       order: this.order,
       description: this.description
      }, this.task._id
      ).subscribe()
  } 
  async triggerDownload (file: string) {  
    console.log(file)
    const response = await this.taskService.downloadFile(file)
    if (response.status === 200) {
       const blob = await response.blob()
       console.log(window.URL)
       const downloadUrl = window.URL.createObjectURL(blob)
       const link = document.createElement('a')
       link.href = downloadUrl
       link.download = file
       document.body.appendChild(link)
       link.click()
       link.remove()
   }
  }  
  remove(file: string): void {
    const index = this.files.indexOf(file);
    if (index >= 0) {
      this.files.splice(index, 1);
    }
    this.taskService.updateTask({file: this.files}, this.id).subscribe()
  }
  changeOrder (event: any) {            
    this.order = event.target.value    
}
}

