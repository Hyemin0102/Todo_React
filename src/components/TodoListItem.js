import classNames from 'classnames';
import './TodoListItem.scss';
import { MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdIndeterminateCheckBox
} from "react-icons/md";
import React from 'react';

const TodoListItem = ({todo, onRemove,onToggle,style}) => {
  const {id, text, checked} = todo;

  //classnames 라이브러리 사용, 첫번째 인자는 공통 클라스, 두번째 인자는 조건부 설정
  //todo에서 받아온 checked의 상태에 따라 클라스 적용되고 따라서 클라스 이름과 props의 이름 같아야함
  return(
    <div className='TodoListItem-virtualized' style={style}>
      <div className='TodoListItem'>
        <div className={classNames('checkbox',{checked})} onClick={()=>onToggle(id)}>
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          <div className='text'>{text}</div>
        </div>
        <div className='remove' onClick={()=>onRemove(id)}>
          <MdIndeterminateCheckBox />
        </div>
      </div>
    </div>
    
  )
};

export default React.memo(TodoListItem);