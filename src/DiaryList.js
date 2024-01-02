import DiaryItem from "./DiaryItem";

const DiaryList = ({ diaryList, onDelete, onEdit }) => {
  // console.log(diaryList);
  return (
    <div className="DiaryList">
      <h2>다이어리 리스트 영역입니다</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} onDelete={onDelete} onEdit={onEdit} />
          // <div key={it.id}>
          //   <div> 작성자 : {it.author} </div>
          //   <div> 일기 : {it.content} </div>
          //   <div> 감정 : {it.emotion} </div>
          //   <div> 작성시간(ms) : {it.created_date} </div>
          // </div>
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;

// Array.prototype.map() expects a return value from arrow function  array-callback-return

//https://velog.io/@rgfdds98/%EC%98%A4%EB%A5%98%ED%95%B4%EA%B2%B0-Array.prototype.map-expects-a-value-to-be-returned-at-the-end-of-arrow-function

// return문을 넣어서 해결 {} 중괄호가 있으면 return을 넣어야한다.
// 중괄호가 없게 보이려면 (()=>()) 이렇게 작성해야함
