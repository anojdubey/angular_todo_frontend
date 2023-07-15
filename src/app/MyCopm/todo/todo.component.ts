import { Component } from '@angular/core'
import { Todo } from './Todo'
import { HttpClient } from '@angular/common/http'
import { User } from 'src/app/shared/user'
import { AuthService } from 'src/app/shared/auth.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  todos: Todo[]
  currentUser: User = {}
  constructor(
    public http: HttpClient,
    public authService: AuthService,
    private actRoute: ActivatedRoute,
  ) {
    this.todos = []
    let id = this.actRoute.snapshot.paramMap.get('id')
    this.authService.getUserProfile(id).subscribe((res) => {
      this.currentUser = res.user
      this.getTodo(this.currentUser)
    })
  }
  getTodo = (currentUser: User) => {
    console.log('Get todo', currentUser)
    return this.http
      .post('http://localhost:5000/todo', { name: currentUser.name })
      .subscribe((res: any) => {
        this.todos = res.todos
        console.log(this.todos[0]._id)
      })
  }
  deleteTodo = (todo: Todo) => {
    const index = this.todos.indexOf(todo)
    const id = todo._id
    return this.http
      .delete(`http://localhost:5000/deletetodo/${id}`)
      .subscribe(() => {
        alert('Todo Deleted')
        this.getTodo(this.currentUser)
      })
  }
  editTodo = (todo: Todo) => {
    return this.http.put(`http://localhost:5000/edit`, todo).subscribe(() => {
      alert('Todo Edited')
      this.getTodo(this.currentUser)
    })
  }
  todoAdd = async (todo: Todo) => {
    console.log('Add todo', todo)
    return this.http
      .post('http://localhost:5000', { ...todo, name: this.currentUser.name })
      .subscribe((res) => {
        this.getTodo(this.currentUser)
        alert('Todo Added')
      })
  }
  checkTodo = (todo: Todo) => {
    const index = this.todos.indexOf(todo)
    this.todos[index].active = !this.todos[index].active
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }
  ngOnInit() {}
}
