import React from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import VisibilityFilters from "./VisibilityFilters";
import "./styles.css";

import {connect} from 'react-redux';
import {setAuthState} from '../learnredux/actions'

const mapStateToProps = (state) => {
  return {
    id: state.authState.id,
    first_name: state.authState.first_name,
    last_name: state.authState.last_name,
    email: state.authState.email,
    jwt: state.authState.jwt,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNewAuthState: (authState) => {
      dispatch(setAuthState(authState))
    }
  }
}

const TodoApp = (props) => {
  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <p>{'id => ' + props.id}</p>
      <p>{'first_name => ' + props.first_name}</p>
      <p>{'last_name => ' + props.last_name}</p>
      <p>{'email => ' + props.email}</p>
      <p>{'jwt => ' + props.jwt}</p>
      <button onClick={() => props.setNewAuthState({first_name: 'asdf', last_name: 'last'})}>change state</button>


      {/* <AddTodo />
      <TodoList />
      <VisibilityFilters /> */}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)