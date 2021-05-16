import React from "react";
import "./Todo.css";
import { ACTIONS } from "./App.js";

export default function Todo({ todo, dispatch }) {
    return (
        <div className="single-todo">
            <h2
                className="single-todo-name"
                style={
                    ({ color: todo.complete ? "#AAA" : "#000" },
                    {
                        textDecoration: !todo.complete
                            ? "none"
                            : "line-through",
                    })
                }
            >
                {todo.name}
            </h2>
            <div className="todo-actions">
                <button
                    type="text"
                    className="button"
                    onClick={() =>
                        dispatch({
                            type: ACTIONS.TOGGLE_TODO,
                            payload: { id: todo.id },
                        })
                    }
                >
                    {todo.complete ? (
                        <i className="fas fa-toggle-on"></i>
                    ) : (
                        <i className="fas fa-toggle-off"></i>
                    )}
                </button>
                <button
                    type="text"
                    className="button"
                    onClick={() =>
                        dispatch({
                            type: ACTIONS.REMOVE_TODO,
                            payload: { id: todo.id },
                        })
                    }
                >
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </div>
    );
}
