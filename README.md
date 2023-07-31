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
