import React from "react";
import "./MyComponents.css";
import { useNavigate, Link } from "react-router-dom";

export default function Todos(props) {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    props.onEdit(id);
    navigate("/");
  };
  return (
    <div key={props.id}>
      {props.todos.length === 0
        ? "No todos to display"
        : props.todos.map((todo) => {
            return (
              <div
                className=" container border rounded border-dark my-1"
                key={todo.id}
              >
                <div className="mx-2 my-3 ">
                  <input
                    type="checkbox"
                    defaultChecked={todo.done}
                    onClick={() => props.onCheck(todo.id)}
                  />
                  <span className="mx-2">{todo.title}</span>

                  <span className="float-right">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        props.onDelete(todo.id);
                      }}
                    >
                      <ion-icon name="trash-outline"></ion-icon>
                    </button>
                    <button
                      className="btn btn-sm btn-info mx-2"
                      onClick={() => handleEdit(todo.id)}
                    >
                      <ion-icon name="create-outline"></ion-icon>
                    </button>
                  </span>
                </div>
              </div>
            );
          })}
    </div>
  );
}
