import React from 'react'



const Form = props =>{
  
  return (
    <div>
    <button onClick={props.clearCompleted}>
      Clear Completed
    </button>
    <form onSubmit = {props.handleSubmit}>
        <input
        type="text"
        name="item"
        value = {props.itemText}
        onChange = {props.handleChanges}
        />
    <button onClick={props.addItem}>Add Todo</button>
    </form>
    </div>
  )
}

export default Form