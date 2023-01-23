import { Component, OnInit } from '@angular/core';
import { Task, Task as TaskInterface } from 'src/app/@types/Tasks.types';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass'],
})
export class TasksComponent implements OnInit {
  tasks: TaskInterface[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  deleteTask(task: TaskInterface) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    });
  }

  toggleTask(task: TaskInterface) {
    this.taskService.updateTask(task).subscribe();
  }
}
