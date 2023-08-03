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
## 🙄문제점 & 해결
예시라서 리스트가 간단하지만 만약 이 리스트가 1000개가 넘어가면 어떻게 될까? 를 고민하다 리스트가 많을 시 렌더링 성능을 어떻게 최적화 할 수 있을지 공부하였다.

우선 리스트를 임의로 2500개 렌더링되도록 함수 추가 후 할 일 체크하는데 성능을 측정해보니 500ms 정도의 시간이 소요되었다.
<img src="https://github.com/Hyemin0102/Todo_React/assets/128768462/c19ed081-e02d-4610-9d27-6d4651a7eeea" width="70%">
### React.memo
462ms 로 살짝 줄어듦
```javascript
export default React.memo(TodoListItem);
```
그러나 이 페이지는 todos 배열 업데이트시마다 onToggle, onRemove 같은 함수가 렌더링되기때문에 이 함수들의 성능을 최적화 시켜주어야한다. 그러기 위해 두가지 방법이 있는데,  
### 1. useState 함수형 업데이트
setTodos 함수 업데이트 시 새로운 값을 파라미터처럼 넣는게 아니라 함수형으로 넣어줌 
```javascript
const onRemove=useCallback((id)=>{
  setTodos(todos => todos.filter(todo=>todo.id !== id));
},[])
```
<img src="https://github.com/Hyemin0102/Todo_React/assets/128768462/93846d0a-67d6-4b16-8d77-c719a48842bb" width="70%">
렌더링 소요 시간이 18ms로 훨씬 많이 줄어든 것을 확인 할 수 있었다!!

### 2. useReducer
useReducer를 사용하면 코드를 많이 수정해야하긴 하지만 한 눈에 모아서 보기도 편하고 관리하기도 편한 것 같다. 최종 성능 확인 결과는 useState를 함수형 업데이트하는 것과 거의 동일했다. 
```javascript
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
```

그리고 마지막으로 특히 리스트 컴포넌트의 성능을 최적화 하는 방법으로 화면에 보이지 않는데 렌더링된 항목들을 관리하는 것이다.
보여지는 화면 전체 크기와 리스트 아이템마다 크기를 지정해 화면 밖의 아이템들은 크기만 차지해놓고 스크롤 시 화면에 렌더링 되게 하는 방법으로,
react-virtualized 라이브러리를 사용했다.
```javascript
const TodoList = ({todos, onRemove,onToggle}) => {

  const rowRenderer = useCallback(
    ({index,key,style})=>{
      const todo = todos[index];
      return(
        <TodoListItem 
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      )
    },[onRemove,onToggle,todos])

  return(
    <List 
      className='TodoList'
      width={512} //전체 크기
      height={513} //전체 높이
      rowCount={todos.length} //항목개수
      rowHeight={57} //항목 높이
      rowRenderer={rowRenderer}//렌더링할 때 쓰는 함수
      list={todos} //배열
      style={{outline:'none'}} //List에 기본 적용되는 스타일
    />
  )
};
```
이렇게 스크롤 아이템까지 관리해주면 최종 렌더링 속도가 7ms 로 처음보다 엄청나게 확 줄어든 것을 확인할 수 있었다!!
<img src="https://github.com/Hyemin0102/Todo_React/assets/128768462/eecd43fd-1e8e-480b-b66a-b19a17fc9838" width="70%">


## 😊프로젝트를 마치며
- 아주 간단한 Todo 페이지를 리액트를 사용해 복습 개념으로 만들었고, useCallback 훅을 더 유연하게 사용할 수 있도록 연습했다.
- 리액트 프로젝트의 성능 개선을 처음 해보았는데 결과적으로 굉장히 많은 차이가 나서 성능 최적화에 대한 중요성을 깨달았고 지금까지 만든 프로젝트들도 성능 최적화 작업을 추가적으로 해야겠다.
- 리스트 페이지 만들 시 react-virtualized 라이브러리를 사용해 가벼우면서 효율적으로 기능을 구현할 수 있게 되어 매우 뿌듯하다.



