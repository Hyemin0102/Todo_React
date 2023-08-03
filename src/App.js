
import { useCallback, useRef, useState } from 'react';
import './App.css';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

function App() {
  const [todos, setTodos] = useState([]);
  //console.log(todos)

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

  //todos 배열 중 id값이 파라미터로 전달 받은 id와 같지 않은 것만 새 배열로 만듦
  const onRemove=useCallback((id)=>{
    setTodos(todos.filter(todo=>todo.id !== id));
  },[todos])

  //클릭한 id todos배열 중 checked상태를 반전시킴
  const onToggle = useCallback((id)=>{
    setTodos(
      todos.map(todo => (
        todo.id === id ? {...todo, checked: !todo.checked} : todo
      ))
    )
  },[todos])

  return (
    <div>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert}/>
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
      </TodoTemplate>
    </div>
  );
}

export default App;
