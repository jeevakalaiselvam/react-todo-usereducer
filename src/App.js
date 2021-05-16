import "./App.css";
import { useReducer, useState } from "react";
import Todo from "./Todo";

//Action references to be used in UseEffect
export const ACTIONS = {
    ADD_TODO: "add_todo", //This action denoted creating a new todo
    REMOVE_TODO: "remove_todo", //This action denotes deleting a todo
    TOGGLE_TODO: "toggle_todo", //This action toggles already present todo
};

/**
 * @author Jeeva Kalaiselvam
 * @param {Object} todos todo state that is defined in the application.
 * @param {Object} action action argument passed when calling dispatch function
 * @returns {Object} This function returns new state of todos after working on it
 */
const reducer = (todos, action) => {
    //Check for what action is needed and act on old state object todos accordingly and return new state for todos
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

/**
 * @author Jeeva Kalaiselvam
 * @param {String} name The name of the todo item
 * @returns {Object} A todo object containing all information related to the todo
 */
const newTodo = (name) => {
    return { id: Date.now(), name: name, complete: false };
};

/**
 * @author Jeeva Kalaiselvam
 * @returns HTML component for creating new todos and list for all created todos
 */
function App() {
    //UseReducer hook declaration for creating and maintaining todo states and action definitions to act on them
    const [todos, dispatch] = useReducer(reducer, [
        {
            id: Date.now(),
            name: "Get some eggs",
            completed: false,
        },
    ]);

    //Maintaining the todo to be creating using UseState hook
    const [name, setName] = useState("");

    const formSubmitHandler = (event) => {
        event.preventDefault();
        dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
        setName("");
    };

    //JSX being returned from component containing a form and list of all existing todos
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
