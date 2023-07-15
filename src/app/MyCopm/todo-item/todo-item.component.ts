import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Todo } from '../todo/Todo'
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'
import { MyModalComponent } from '../edit-modal/edit-modal.component'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo
  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter()
  @Output() todoCheck: EventEmitter<Todo> = new EventEmitter()
  @Output() todoEdit: EventEmitter<Todo> = new EventEmitter()

  constructor(public dialog: MatDialog, public http: HttpClient) {
    this.todo = {
      _id: '',
      srno: 1,
      title: 'This is title 1',
      desc: 'This is description 1',
      active: true,
    }
  }
  ngOnInit(): void {}
  openDialog(): void {
    const dialogRef = this.dialog.open(MyModalComponent, {
      width: '250px',
      data: { title: this.todo.title, desc: this.todo.desc, id: this.todo._id },
    })
    dialogRef.afterClosed().subscribe((res) => {
      this.todoEdit.emit(res)
    })
  }
  onClick() {
    console.log('Delete todo', this.todo)
    this.todoDelete.emit(this.todo)
  }
  onCheck() {
    this.todoCheck.emit(this.todo)
  }
}
