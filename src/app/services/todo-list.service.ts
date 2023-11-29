import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../global-constants';
import { Observable } from 'rxjs';
import { ListTask } from '../models/list-task';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private baseUrl = GlobalConstants.baseUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ListTask[]> {
    return this.http.get<ListTask[]>(this.baseUrl + 'tasks');
  }

  addNewTask(newTask: ListTask): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'tasks', newTask, {observe: 'response'});
  }

  editTask(taskToEdit: ListTask): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'tasks/' + taskToEdit.taskId, taskToEdit, {observe: 'response'});
  }

  removeTask(taskToRemove: ListTask): Observable<any> {
    return this.http.delete<any>(this.baseUrl + 'tasks/' + taskToRemove.taskId, {observe: 'response'});
  }
}
