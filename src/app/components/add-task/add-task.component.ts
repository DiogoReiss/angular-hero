import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task as TaskInterface } from 'src/app/@types/Tasks.types';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.sass'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<TaskInterface> = new EventEmitter();

  text!: string;
  day!: string;
  reminder: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {}

  onSubmit() {
    if (!this.text) {
      alert('Please add a task!');
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    this.onAddTask.emit(newTask);

    this.text, (this.day = '');
    this.reminder = false;
  }
}
