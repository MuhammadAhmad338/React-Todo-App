import { useState } from "react";
import { useCookies } from "react-cookie";

const Model = ({ mode, setShowModel, getData, task }) => {

   const editMode = mode === "edit" ? true : false;

   const [cookies, setCookie, removeCookie] = useCookies();
   const [data, setData] = useState({
      user_email: editMode ? task.user_email : cookies.Email,
      title: editMode ? task.title : null,
      progress: editMode ? task.progress : 50,
      date: editMode ? task.date : new Date()
   });

   const postData = async (e) => {
      e.preventDefault();
      try {
         const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
         });
         console.log(response.status);
         if (response.status === 200) {
            setShowModel(false);
            getData();
         }
      } catch (error) {
         console.log(error);
      }
   }

   const editData = async (e) => {
      e.preventDefault();
      try {
         const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
         });
         if (response.status === 200) {
            setShowModel(false);
            getData();
         }
      } catch (error) {
         console.log(error);
      }
   }

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData(data => ({
         ...data,
         [name]: value
      }));
   }

   return (
      <div className="overlay">
         <div className="model">
            <div className="form-title-container">
               <h3>Let's {mode} your task</h3>
               <button onClick={() => setShowModel(false)}>X</button>
            </div>
            <form>
               <input
                  required
                  placeholder="Your task goes here"
                  maxLength={30}
                  value={data.title}
                  name="title"
                  onChange={handleChange}
               />
               <br />
               <label for="range">Drag to select your current progress</label>
               <input
                  required
                  type="range"
                  id="range"
                  min="0"
                  max="100"
                  name="progress"
                  value={data.progress}
                  onChange={handleChange}
               />
               <input className={mode} type="submit" onClick={editMode ? editData : postData} />
            </form>
         </div>
      </div>
   );
}

export default Model;
