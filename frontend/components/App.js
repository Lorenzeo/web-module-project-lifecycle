import React from 'react'
import { date } from 'yup'
import TodoList from './TodoList'
import Form from './Form'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  
  state = {
    listOfTodos: [],
    itemText: '',
    message: ''
  }
  
  componentDidMount(){
    axios.get(URL)
    .then(res=>{
      console.log(res.data.data)
      console.log(res.data.message)
      console.log(this.state)
      const listOfTodos = res.data.data
      const message = res.data.message
      this.setState({
        listOfTodos,
        message
      })
      })
    .catch(err=>{
      console.log(err)
    })
    console.log("componentDidMount")
  }



  addItem = (e, item) =>{
    const newItem = {
      id: Date.now(),
      name: item,
      completed: false
    }
    this.setState({
      listOfTodos: [...this.state.listOfTodos,
      newItem]
    })
  }

  clearCompleted = e =>{
    this.setState({
      listOfTodos: this.state.listOfTodos.filter(item => !item.completed)
    })
  }

  handleSubmit = e =>{
    e.preventDefault();
    this.addItem(e, this.state.itemText)
    e.target.reset()
  }

  toggleItem=(itemId)=>{
    this.setState({
      listOfTodos: this.state.listOfTodos.map(item =>{
        if(itemId === item.id){
          return {
            ...item,
            completed: !item.completed
          }
        }
        return item;
      })
    })
  }
  
  handleChanges = e => {
    this.setState({
      itemText: e.target.value
    })
  }


  componentDidUpdate(){
    console.log("componentDidUpdate")
  }
  render() {
    
  return (
    <div>
      
    <TodoList
      listOfTodos= {this.state.listOfTodos}
      toggleItem= {this.toggleItem}
      
      />
    <Form 
      addItem={this.addItem}
      clearCompleted={this.clearCompleted}
      handleSubmit = {this.handleSubmit}
      handleChanges = {this.handleChanges}
    />
    </div>
    )
  }
}
