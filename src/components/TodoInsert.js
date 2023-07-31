import { useCallback, useState } from 'react';
import './TodoInsert.scss';
import { IoMdAdd } from "react-icons/io";

const TodoInsert = ({onInsert}) => {
  const [value, setValue] = useState('');
  console.log(value,'dddd')

  //재사용성 위해 useCallback 사용. 입력 값 value에 할당
  const onChange = useCallback(e=>{
    setValue(e.target.value);
  },[]);

  const onSubmit = useCallback(
    e => {
      onInsert(value); 
      //value 즉, 입력한 값을 파라미터로 보내면 함수 정의할 때 value로 받고 그게 text에 할당됨
      setValue('');
      e.preventDefault();
    },[onInsert, value]);

  return(
    <form className='TodoInsert' onSubmit={onSubmit}>
      <input placeholder='할일을 입력하세요'
        value={value}
        onChange={onChange}
      />
      <button type='submit'>
      <IoMdAdd />
      </button>
    </form>
  )
};

export default TodoInsert;