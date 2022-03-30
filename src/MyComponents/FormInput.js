import "./MyComponents.css";
import React from "react";

import { useNavigate } from "react-router-dom";

export default function FormInput(props) {

  const navigate = useNavigate();

 const handleUpdate = () => {
    props.submit();
    navigate("Showtodo")
 }


  return (
    <div className="container">
      {props.showButton ? (
        <button className="addBtn" onClick={props.show}>
          Add Todo
        </button>
      ) : (
        ""
      )}
      <form onSubmit={handleUpdate} >
        <h3 className="my-3 border-bottom border-danger">Todo list</h3>
        {props.showOff ? (
          <div className="">
            <input
              type="text"
              className="mx-2 border rounded border-dark"
              value={props.title}
              onChange={(e) => {
                props.setTitle(e.target.value);
              }}
            />
            {props.toggleSubmit ? (
              <button
                type="submit"
                className="btn btn-sm btn-success mx-2 my-2"
                
              >
                Save Todo
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-sm btn-success mx-2 my-2"
                
              >
                Update it
              </button>
            )}
          </div>
        ) : (
          <h2>
            Click Add Todo to Save Todo
            <hr />
          </h2>
        )}
      </form>
    </div>
  );
}
