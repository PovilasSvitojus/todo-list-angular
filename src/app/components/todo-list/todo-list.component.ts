import { Component, OnInit } from '@angular/core';
import { ListTask } from 'src/app/models/list-task';
import { TodoListService } from 'src/app/services/todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoList: ListTask[] = [];

  constructor(private todoListService: TodoListService) { }

  ngOnInit(): void {
    this.todoListService.getAll().subscribe(data => {
      this.todoList = data;
    })
  }

}
