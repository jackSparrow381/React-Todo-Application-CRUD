import "./App.css";
import React, { useState, useEffect } from "react";
import Todos from "./MyComponents/Todos";
import FormInput from "./MyComponents/FormInput";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function App() {
  // get local storage

  const getLocalTodos = () => {
    let getTodos = localStorage.getItem("todos");

    if (getTodos) {
      return JSON.parse(localStorage.getItem("todos"));
    } else {
      return [];
    }
  };

  // Defining States

  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState(getLocalTodos());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  const [showOff, setShowOff] = useState(false);
  const [showButton, setShowButton] = useState(true);

  // setting in local storage

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Adding a todo

  const addTodo = (title) => {
    console.log("I'm adding todo", title);

    if (!title) {
      alert("Please fill input");
    } else if (title && !toggleSubmit) {
      setTodos(
        todos.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, title: title };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      console.log();
      setIsEditItem(null);
    } else {
      const myTodo = { id: Math.random() * 100, title: title, done: false };
      setTodos([...todos, myTodo]);

      console.log(myTodo);
    }
  };

  // Deleting a todo

  const onDelete = (id) => {
    console.log("I'm on delete", id);

    setTodos(
      todos.filter((e) => {
        return e.id !== id;
      })
    );
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // editing a todo

  const onEdit = (id) => {
    console.log("I'm on Edit", id);

    const selected = todos.find((f) => {
      return f.id === id;
    });
    setShowOff(true);
    setShowButton(false);
    setToggleSubmit(false);
    setTitle(selected.title);

    setIsEditItem(id);
    console.log(selected);
  };

  // onCheck function

  const onCheck = (id) => {
    console.log("I'm on checkBox", id);

    const checkTodos = todos.map((check) => {
      if (check.id === id) {
        check.done = !check.done;
      }
      return check;
    });

    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(todos);
    return {
      todos: checkTodos,
    };
  };

  // function when form is submitted
  const submit = (e) => {
    // e.preventDefault();
    addTodo(title);
    setTitle("");
    setShowOff(false);
    setShowButton(true);
  };

  const show = () => [setShowOff(true), setShowButton(false)];

  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-info text-dark">
        <Link className="navbar-brand text-dark mx-1" to="#">
          Todo App
        </Link>
        <Link to="/" className="text-dark nav-link">
          Home
        </Link>
        <Link to="Showtodo" className="text-dark nav-link">
          Show Todo
        </Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <FormInput
              addTodo={addTodo}
              toggleSubmit={toggleSubmit}
              title={title}
              setTitle={setTitle}
              submit={submit}
              show={show}
              showOff={showOff}
              showButton={showButton}
            />
          }
        />

        <Route
          path="Showtodo"
          element={
            <Todos
              todos={todos}
              onDelete={onDelete}
              onEdit={onEdit}
              onCheck={onCheck}
            />
          }
        />
      </Routes>
    </Router>
  );
}
