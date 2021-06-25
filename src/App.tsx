import React, { Fragment, useState } from "react";
import "./App.css";

type formElement = React.FormEvent<HTMLFormElement>;

interface ITodo {
  text: string;
  complete: boolean;
}

function App(): JSX.Element {
  const [todo, setTodo] = useState<string>("");
  const [todosArr, setTodosArr] = useState<ITodo[]>([]);

  const handleSubmitButton = (e: formElement): void => {
    e.preventDefault();
    addTodo(todo);
    setTodo("");
  };

  const addTodo = (text: string): void => {
    const newTodo: ITodo[] = [...todosArr, { text, complete: false }];

    setTodosArr(newTodo);
  };

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todosArr];
    newTodos[index].complete = !newTodos[index].complete;
    setTodosArr(newTodos);
  };

  const removeTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todosArr].filter(
      (todo) => todo.text !== text
    );
    setTodosArr(newTodos);
  };

  return (
    <Fragment>
      <h1>Todo list</h1>
      <form onSubmit={handleSubmitButton}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          required
        />
        <button type="submit">ADD TODO</button>
      </form>
      <section>
        {todosArr &&
          todosArr.map((todo: ITodo, index: number) => (
            <Fragment key={index}>
              <div
                style={{ textDecoration: todo.complete ? "line-through" : "" }}
              >
                {todo.text}
              </div>
              <button onClick={() => completeTodo(index)}>
                {todo.complete ? "incomplete" : "complete"}
              </button>
              <button type="button" onClick={() => removeTodo(todo.text)}>X</button>
            </Fragment>
          ))}
      </section>
    </Fragment>
  );
}

export default App;
