import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Task as TaskInterface } from 'src/app/@types/Tasks.types';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.sass'],
})
export class TaskInfoComponent implements OnInit {
  id!: number;
  task: TaskInterface = {
    id: 0,
    day: '',
    reminder: false,
    text: '',
  };

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((response) => {
      this.id = response['id'];
      this.taskService.getTaskByID(this.id).subscribe((response) => {
        this.task = response[0];
      });
    });
  }
}
