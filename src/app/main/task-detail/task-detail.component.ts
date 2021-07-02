import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FortasksService } from 'src/app/for-tasks.service';


@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit { 
  @ViewChild('inputForFile')
  inputForFileRef!: ElementRef;
  task: any
  file!: File;
  imagePreview: any
  constructor(
    private route: ActivatedRoute,
    private taskService: FortasksService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getTask()
  }
  getTask(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTaskById(id)
      .subscribe(task => {this.task = task; this.imagePreview = task.imgSrc});    
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
    // const reader = new FileReader()
    // reader.onload = () => {
    //   this.imagePreview = reader.result
    // }
    // reader.readAsDataURL(file);
    const uploadFormData = new FormData();
    uploadFormData.append('file', this.file, this.file.name);    
    this.taskService.addFile(uploadFormData).subscribe((data) => console.log(data))
  } 
    
}

