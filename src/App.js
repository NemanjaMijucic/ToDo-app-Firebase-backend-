import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import ToDo from "./ToDo";
import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  querySnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  //Create todo
  const createTodo = async (e) => {
    e.preventDefault();

    if (todo === "") {
      console.log("please enter value");
      return;
    }

    await addDoc(collection(db, "todos"), {
      text: todo,
      completed: false,
    });
  };

  //Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todos = [];
      querySnapshot.forEach((doc) => {
        todos.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todos);
    });

    return () => unsubscribe();
  }, []);

  //Update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  //Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>To Do App</h3>
        <form className={style.form} onSubmit={createTodo}>
          <input
            className={style.input}
            type="text"
            placeholder="add ToDo"
            onChange={(e) => setTodo(e.target.value)}
          />
          <button className={style.button}>
            {" "}
            <AiOutlinePlus size={30} />{" "}
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => {
            return (
              <ToDo
                todo={todo}
                key={index}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            );
          })}
        </ul>
        <p className={style.count}>{`you have ${todos.length} todos`}</p>
      </div>
    </div>
  );
}

export default App;
