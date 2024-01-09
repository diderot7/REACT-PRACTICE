import { useRef, useState } from "react";

const DiaryEditor = ({ onCreate }) => {
  const [state, setState] = useState({
    // author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      // 객체 리터럴을 이용해 객체를 만들 때 변수에 담긴 문자열을 key로 활용하려면 반드시 대괄호에 담아 사용해야한다.
    });
  };
  // const authorInput = useRef();
  const contentInput = useRef();

  const handleSubmit = (e) => {
    // if (state.author.length < 1) {
    //   // alert("작성자 이름은 1글자 이상 입력해주세요");
    //   authorInput.current.focus();
    //   return;
    // }
    if (state.content.length < 5) {
      // alert("컨텐츠는 5글자 이상 입력해주세요");
      contentInput.current.focus();
      return;
    }
    onCreate(state.content, state.emotion);
    // state.author = "";
    alert("저장 성공");
    setState({
      // author: "",
      content: "",
      emotion: 1,
    });
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        {/* <input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleChangeState}
        /> */}
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default DiaryEditor;
