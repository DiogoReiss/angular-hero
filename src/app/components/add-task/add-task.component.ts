import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { subscribeOn, Subscription } from 'rxjs';
import { Task as TaskInterface } from 'src/app/@types/Tasks.types';
import { TaskService } from 'src/app/services/task.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.sass'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<TaskInterface> = new EventEmitter();

  // forms data
  text!: string;
  day!: string;
  reminder: boolean = false;

  // UI provider/subscription
  showAddTask!: boolean;
  subscription!: Subscription;

  constructor(private taskService: TaskService, private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

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
