import { useState } from "react";
import { TodoType } from "../types/types";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid"; // uuidをインポート
import "../App.css";

export default function InputForm() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [todoItem, setTodoItem] = useState<TodoType>({
    id: "",
    title: "",
    content: "",
    checked: false,
    removed: false,
    createdAt: format(new Date(), "yyyyMMdd"),
  });
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setTodoItem({
      ...todoItem,
      id: uuidv4(),
      [e.target.name]: e.target.value,
    });
  };
  const checkEvent = (id: string, checked: boolean) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, checked, removed: checked } : todo
    );
    setTodos(newTodos);
  };
  const deleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodos);
    console.log(newTodos);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoItem.title == "" || todoItem.content == "") {
      alert("タイトルと詳細を入力してください");
      return;
    }
    setTodos([...todos, todoItem]);

    setTodoItem({
      id: "",
      title: "",
      content: "",
      checked: false,
      removed: false,
      createdAt: format(new Date(), "yyyyMMdd"),
    });
  };
  return (
    <div>
      <div>
        <form onSubmit={onSubmit} className="inputForm">
          <input
            type="text"
            name="title"
            placeholder="title"
            value={todoItem.title}
            onChange={handleChange}
            className="inputTodoTitle"
            id="formText"
          />
          <textarea
            value={todoItem.content}
            name="content"
            placeholder="content"
            onChange={handleChange}
            className="inputTodoContent"
            id="formText"
            rows={2}
            cols={30}
          />
          <input type="submit" value="送信" className="submitButton" />
        </form>
      </div>
      <div>
        {todos.map(({ id, title, content, checked, removed, createdAt }) => (
          <ul key={id} style={{ paddingLeft: 0 }}>
            <li className="todoList">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => {
                  checkEvent(id, !checked);
                }}
              />
              <details>
                <span></span>
                <summary>
                  {`${title}
                  _____作成日: ${createdAt}`}
                </summary>
                <p>{content}</p>
              </details>

              {removed ? (
                <span>
                  <button onClick={() => deleteTodo(id)}>削除</button>
                </span>
              ) : (
                <span>
                  <button>復元</button>
                </span>
              )}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
