import Model from "./Model";
import { useState } from "react";
import { useCookies } from "react-cookie";

const ListHeader = ({ listName, getData}) => {
    
    const [ showModel, setShowModel ] = useState(null);
  const [cookies, setCookie, removeCookie ] = useCookies(null);
    
    const signOut = () => {
     
      removeCookie("Email");
      removeCookie("AuthToken");
      window.location.reload();
    }

    return (
    <div className="list-header">
      <h1>{listName}</h1>
        <div className="button-container">
            <button className="create" onClick={() => setShowModel(true)}>ADD NEW</button>
            <button className="signout" onClick={signOut}>SIGN OUT</button>
        </div>
      {showModel && <Model mode={"create"} setShowModel={setShowModel} getData={getData}/> }
    </div>
  );
}

export default ListHeader;