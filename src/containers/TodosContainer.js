import React, {Component} from 'react';
import TodoModel from '../models/Todo';
import TodoList from '../components/TodoList';
import CreateTodoForm from '../components/CreateTodoForm';

class TodosContainer extends Component {
  constructor() {
    super()
    this.state = {
      todos: []
    }
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    TodoModel.all().then( (res) => {
      this.setState ({
        todos: res.todos
      })
    });
  }
  createTodo(newBody) {
    let newTodo = {
      body: newBody,
      completed: false
    }
    TodoModel.create(newTodo).then((res) => {
      let todos = this.state.todos;
      let newTodos = todos.push(res);
      this.setState({newTodos});
    })
  }
  updateTodo(newBody, id){
    let updatedTodo = {
      _id: id,
      body: newBody,
      completed: false
    }
    TodoModel.update(updatedTodo).then((res) => {
      this.fetchData();
    });
  }
  deleteTodo(todo) {
    TodoModel.delete(todo).then((res) => {
      let todos = this.state.todos.filter(function(todo) {
        return todo._id !== res._id;
      });
      this.setState({todos});
    })
  }
  render(){
    return (
      <div className='todos-container'>
        <CreateTodoForm 
          createTodo={this.createTodo.bind(this)}/>
        <TodoList
          todos={this.state.todos} 
          onUpdateTodo={this.updateTodo.bind(this)}
          onDeleteTodo={this.deleteTodo.bind(this)}/>
      </div>
    );
  }
}

export default TodosContainer;