import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListTask } from 'src/app/models/list-task';
import { TodoListService } from 'src/app/services/todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  newTask: ListTask = {
    taskDesc: '',
    taskStatus: 'Not Started'
  };
  todoList: ListTask[] = [];
  editTaskId: number = 0;
  editTaskOriginalDesc: string = '';

  constructor(private todoListService: TodoListService) { }

  ngOnInit(): void {
    this.getTodoList();
  }

  getTodoList(): void {
    this.todoListService.getAll().subscribe(data => {
      this.todoList = data;
    });
  }

  addNewTask(inputTask: ListTask): void {
    this.todoListService.addNewTask(inputTask).subscribe(x => {
      if(x.status == 201){
        console.log('success');
        this.newTask.taskDesc = '';
      }
      this.getTodoList();
    });
  }

  editTask(taskToEdit: ListTask): void {
    this.editTaskId = taskToEdit.taskId!;
    this.editTaskOriginalDesc = taskToEdit.taskDesc;
  }

  editComplete(taskToEdit: ListTask): void {
    this.todoListService.editTask(taskToEdit).subscribe(x => {
      if(x.status == 200){
        console.log('success');
      }
      this.editTaskId = 0;
      this.editTaskOriginalDesc = '';
      this.getTodoList();
    });
    console.log('edit complete');
  }

  editCancel(taskToEdit: ListTask): void {
    this.editTaskId = 0;
    taskToEdit.taskDesc = this.editTaskOriginalDesc;
    this.editTaskOriginalDesc = '';
    console.log('edit cancelled');
  }

  setStatusNotStarted(taskToEdit: ListTask): void {
    taskToEdit.taskStatus = 'Not Started';
    this.todoListService.editTask(taskToEdit).subscribe(x => {
      if(x.status == 200){
        console.log('success');
      }
      this.getTodoList();
    });
  }

  setStatusStarted(taskToEdit: ListTask): void {
    taskToEdit.taskStatus = 'Started';
    this.todoListService.editTask(taskToEdit).subscribe(x => {
      if(x.status == 200){
        console.log('success');
      }
      this.getTodoList();
    });
  }

  setStatusCompleted(taskToEdit: ListTask): void {
    taskToEdit.taskStatus = 'Completed';
    this.todoListService.editTask(taskToEdit).subscribe(x => {
      if(x.status == 200){
        console.log('success');
      }
      this.getTodoList();
    });
  }

  removeTask(taskToRemove: ListTask): void {
    this.todoListService.removeTask(taskToRemove).subscribe(x => {
      if(x.status == 200){
        console.log('success');
      }
      this.getTodoList();
    });
  }


}
