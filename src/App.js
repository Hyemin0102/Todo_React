
import { useCallback, useReducer, useRef } from 'react';
import './App.css';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

//데이터 많이 출력하기 위해 생성 
function createBulkTodos(){
  const array = [];
  for(let i = 1; i<=2500; i++){
    array.push({
      id:i,
      text:`할일${i}`,
      checked: false
    });
  }
  return array;
};

function todoReducer(todos, action){
  switch(action.type){
    case 'INSERT' :
      return todos.concat(action.todo);
    case 'REMOVE' :
      return todos.filter(todo=>todo.id !== action.id);
    case 'TOGGLE' :
      return  todos.map(todo => (
        todo.id === action.id ? {...todo, checked: !todo.checked} : todo
      ));
    default:
      return todos;
  }
}


function App() {
  const [todos, dispatch] = useReducer(todoReducer,undefined,createBulkTodos);
  //useReducer(함수, 초기상태)
  

  //할일 작성할때마다 id값 1씩 추가되도록, 1부터 설정
  const nextId = useRef(2501);

  const onInsert = useCallback(
    value=>{
      const todo = {
        id: nextId.current,
        text: value,
        checked:false
      };
      dispatch({type:'INSERT', todo});
      nextId.current += 1; //nextId에 1씩 더하기
    }
  ,[]);

  //todos 배열 중 id값이 파라미터로 전달 받은 id와 같지 않은 것만 새 배열로 만듦
  const onRemove=useCallback((id)=>{
    dispatch({type:'REMOVE', id});
  },[])

  //클릭한 id todos배열 중 checked상태를 반전시킴
  const onToggle = useCallback((id)=>{
    dispatch({type:'TOGGLE', id})
  },[]);

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


/* const onInsert = useCallback(
  value=>{
    const todo = {
      id: nextId.current,
      text: value,
      checked:false
    };
    setTodos(todos => todos.concat(todo));
    nextId.current += 1; //nextId에 1씩 더하기
  }
,[]);

//todos 배열 중 id값이 파라미터로 전달 받은 id와 같지 않은 것만 새 배열로 만듦
const onRemove=useCallback((id)=>{
  setTodos(todos => todos.filter(todo=>todo.id !== id));
},[])

//클릭한 id todos배열 중 checked상태를 반전시킴
const onToggle = useCallback((id)=>{
  setTodos(todos =>
    todos.map(todo => (
      todo.id === id ? {...todo, checked: !todo.checked} : todo
    ))
  )
},[]) */
