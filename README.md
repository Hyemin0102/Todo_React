# Todo_React
리액트로 만든 기본 Todo 웹페이지 입니다. (개인 공부용)

# 📌코드 리뷰
### ✏Todo 입력
- 할일 입력 함수 useCallback 훅 사용해 할 일 배열 변경되었을때만 생성되도록
```javascript
const onInsert = useCallback(
    value=>{
      const todo = {
        id: nextId.current,
        text: value,
        checked:false
      };
      setTodos(todos.concat(todo));
      nextId.current += 1; //nextId에 1씩 더하기
    } //todos 배열 변경될 때마다 함수 생성
  ,[todos]);
  ```
- form submit 시 onInsert함수에 value를 매개변수로 보냄
```javascript
const onSubmit = useCallback(
    e => {
      onInsert(value); 
      //value 즉, 입력한 값을 onInsert 함수의 파라미터로 보냄
      setValue('');
      e.preventDefault();
    },[onInsert, value]);
```
- map을 사용해 컴포넌트 화면 출력
```javascript
const TodoList = ({todos}) => {
  return(
    <div className='TodoList'>
      {todos.map(todo=>(
        <TodoListItem todo={todo} key={todo.id}/>
      ))}
    </div>
  )
};
```
### ✏Todo 삭제, 체크
- App.js 가장 상위 컴포넌트에 삭제함수와 체크토글함수를 정의하고 하위 컴포넌트에 props로 전달시킴.
- 하위 컴포넌트에서 사용 시 id값을 파라미터로 보냄
```javascript
  const onRemove=useCallback((id)=>{
    setTodos(todos.filter(todo=>todo.id !== id));
  },[todos]);

const onToggle = useCallback((id)=>{
    setTodos(
      todos.map(todo => (
        todo.id === id ? {...todo, checked: !todo.checked} : todo
      ))
    )
  },[todos])
```

## 😊프로젝트를 마치며
아주 간단한 Todo 페이지를 리액트를 사용해 복습 개념으로 만들었고, useCallback 훅을 더 유연하게 사용할 수 있도록 연습했다.

자바스크립트로 Todo 기능을 구현하는 것보다 훨씬 간단하고 직관적으로 코드를 짤 수 있어 효율적으로 느껴졌다.

