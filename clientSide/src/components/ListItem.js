import Model from "./Model";
import ProgressBar from './ProgressBar';
import TickIcon from './TickIcon.js';
import { useState } from "react";

const ListItem = ({ task , getData }) => {
  
  const [showModel, setShowModel] = useState(null);
   
  const deleteItem = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <li className="list-item">

      <div className="info-container">
        <TickIcon />  
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress}/>   
      </div>

      <div className="button-container">
        <button className='edit' onClick={() => setShowModel(true)}>EDIT</button>
        <button className='delete' onClick={deleteItem}>DELETE</button>
      </div>

      {showModel && <Model task={task} setShowModel={setShowModel} mode={"edit"} getData={getData}/>}

    </li>
  );
}

export default  ListItem;