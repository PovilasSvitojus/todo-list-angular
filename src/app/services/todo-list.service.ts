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
}
