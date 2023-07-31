
import { useCallback, useRef, useState } from 'react';
import './App.css';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

function App() {
  const [todos, setTodos] = useState([]);
  console.log(todos)

  //할일 작성할때마다 id값 1씩 추가되도록, 1부터 설정
  const nextId = useRef(1);

  const onInsert = useCallback(
    value=>{
      const todo = {
        id: nextId.current,
        text: value,
        checked:false
      };
      setTodos(todos.concat(todo));
      nextId.current += 1; //nextId에 1씩 더하기
    }
  ,[todos]);

  return (
    <div>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert}/>
        <TodoList todos={todos}/>
      </TodoTemplate>
    </div>
  );
}

export default App;
