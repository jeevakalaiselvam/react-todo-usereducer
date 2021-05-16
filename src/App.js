import "./App.css";
import { useReducer, useState } from "react";
import Todo from "./Todo";

export const ACTIONS = {
    ADD_TODO: "add_todo",
    REMOVE_TODO: "remove_todo",
    TOGGLE_TODO: "toggle_todo",
};

const reducer = (todos, action) => {
    switch (action.type) {
        case ACTIONS.ADD_TODO:
            return [...todos, newTodo(action.payload.name)];
        case ACTIONS.TOGGLE_TODO:
            return todos.map((todo) => {
                if (todo.id == action.payload.id) {
                    const changedTodo = { ...todo, complete: !todo.complete };
                    return changedTodo;
                }
                return todo;
            });

        case ACTIONS.REMOVE_TODO:
            return todos.filter((todo) => {
                if (todo.id !== action.payload.id) {
                    return todo;
                }
            });

        default:
            return todos;
    }
};

const newTodo = (name) => {
    return { id: Date.now(), name: name, complete: false };
};

function App() {
    const [todos, dispatch] = useReducer(reducer, [
        {
            id: Date.now(),
            name: "Get some eggs",
            completed: false,
        },
    ]);
    const [name, setName] = useState("");

    console.log(todos);

    const formSubmitHandler = (event) => {
        event.preventDefault();
        dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
        setName("");
    };

    return (
        <div className="App">
            <form onSubmit={formSubmitHandler} className="form-container">
                <input
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit" className="form-button">
                    Create
                </button>
            </form>
            <div className="all-todos">
                {todos.map((todo) => {
                    return (
                        <Todo dispatch={dispatch} key={todo.id} todo={todo} />
                    );
                })}
            </div>
        </div>
    );
}

export default App;
