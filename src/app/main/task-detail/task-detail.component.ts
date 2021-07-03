import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FortasksService } from 'src/app/for-tasks.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit { 
  @ViewChild('inputForFile')
  inputForFileRef!: ElementRef;
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  task: any
  file!: File;
  files: String[] = []
  imagePreview: any
  id: string = ''
  name: string = ''
  description: string = ''
  dateOfCreation: Date = new Date()
  dateOfDeadLine: Date = new Date()
  order: number = 0
  priority: string = ''
  events: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private taskService: FortasksService,
    private location: Location,
    private _ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.getTask()
  }
  getTask(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTaskById(this.id)
      .subscribe(task => {this.task = task, 
        this.files = this.task.file,
        this.name = this.task.name,
        this.description = this.task.description,
        this.dateOfDeadLine = this.task.dateDeadline,
        this.order = this.task.order,
        this.priority = this.task.priority
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
    this.taskService.updateTask({
       name : this.name,
       dateDeadline: this.dateOfDeadLine,
       order: this.order,
       description: this.description
      }, this.task._id
      ).subscribe()
  } 
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }
}

