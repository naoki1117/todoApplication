// import { useState } from "react";
// import { TodoType } from "../types/types";

// interface todoProps {
//   todoItem: TodoType;
// }

// export default function TodoItem({
//   todoItem: { title, content, createdAt, checked, removed },
// }: todoProps) {
//     const [isChecked,setIsChecked] = useState(false)
//   return (
//     <div>
//       <input type="checkbox" onChange={setIsChecked((prev)=>!isChecked)}/>
//       <span>{`タイトル: ${title}`}</span>
//       <span>{`詳細: ${content}`}</span>
//       <span>{`作成日: ${createdAt}`}</span>
//       {removed ? <button>復元</button> : <button>削除</button>}
//     </div>
//   );
// }
