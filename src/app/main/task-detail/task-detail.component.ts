import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FortasksService } from 'src/app/for-tasks.service';


@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {  
  task: any
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
      .subscribe(task => {this.task = task});
    
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.task) {
     
    }
  }
 

}

