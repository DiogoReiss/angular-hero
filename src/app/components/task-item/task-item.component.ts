import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task, Task as TaskInterface } from 'src/app/@types/Tasks.types';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.sass'],
})
export class TaskItemComponent implements OnInit {
  @Input() task!: TaskInterface;

  @Output() taskClick: EventEmitter<TaskInterface> = new EventEmitter();
  @Output() onDeleteTask: EventEmitter<TaskInterface> = new EventEmitter();

  constructor() {}

  OnClick(task: TaskInterface) {
    this.taskClick.emit(task);
  }

  onDelete(task: TaskInterface) {
    this.onDeleteTask.emit(task);
  }

  ngOnInit(): void {}
}
