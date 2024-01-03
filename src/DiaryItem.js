// import userEvent from "@testing-library/user-event";
import { useRef, useState } from "react";

const DiaryItem = ({
  author,
  content,
  emotion,
  created_date,
  onDelete,
  id,
  onEdit,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);
  const [localContent, setLocalContent] = useState(content);

  // console.log(isEdit);
  const handleRemove = () => {
    // 일기 데이터를 삭제하는 함수
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onDelete(id);
    }
  };
  const handleChange = (e) => {
    // 수정하기 버튼 클릭시 content의 상태를 변경하기 위한 ㅎ삼수
    setLocalContent(e.target.value);
  };

  const handleQuitEdit = () => {
    // 수정취소 버튼을 눌렀을때 원본 content로 돌리는 함수
    toggleIsEdit();
    setLocalContent(content);
  };

  const contentInput = useRef();
  const handleEdit = () => {
    if (localContent.length < 5) {
      return contentInput.current.focus();
    }
    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정 : {emotion}
        </span>

        <br />
        <span className="date">
          작성시간 : {new Date(created_date).toLocaleString()}
        </span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              value={localContent}
              onChange={handleChange}
              ref={contentInput}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정완료</button>
        </>
      ) : (
        <>
          {" "}
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default DiaryItem;
