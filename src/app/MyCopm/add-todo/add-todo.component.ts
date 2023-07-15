import { Component ,Output,EventEmitter, Input} from '@angular/core';
import { Todo } from '../todo/Todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {
  @Input() todos: Todo[]=[];
  @Output() addTodo: EventEmitter<any> = new EventEmitter();
  title: string 
  desc: string
  constructor() {
    this.title = "";
    this.desc = "";
   }
   onAdd(){
    console.log("Add todo", this.title,this.desc);
    this.addTodo.emit({
      srno: this.todos.length + 1,
      title: this.title,
      desc: this.desc,
      active: true,
    })
   }
}
