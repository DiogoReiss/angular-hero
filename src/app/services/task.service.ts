import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task, Task as TaskInterface } from 'src/app/@types/Tasks.types';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) {}

  getTaskByID(task: TaskInterface['id']): Observable<TaskInterface[]> {
    let url = `${this.apiUrl}?id=${task}`;
    return this.http.get<TaskInterface[]>(url, httpOptions);
  }

  getTasks(): Observable<TaskInterface[]> {
    return this.http.get<TaskInterface[]>(this.apiUrl);
  }

  deleteTask(task: TaskInterface): Observable<TaskInterface> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<TaskInterface>(url);
  }

  updateTask(task: TaskInterface): Observable<TaskInterface> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<TaskInterface>(url, task);
  }

  createTask(task: TaskInterface): Observable<TaskInterface> {
    return this.http.post<TaskInterface>(this.apiUrl, task);
  }
}
