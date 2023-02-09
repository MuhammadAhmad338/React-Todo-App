import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useEffect } from "react";
import { useState } from "react";
import { useCookies } from 'react-cookie';

const App = () => {

  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [tasks, setTasks] = useState(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && <><ListHeader listName={"🦚 Holiday Wish List"} getData={getData} />
      <p className="user-email">Welcome Back {cookies.Email}</p>
      {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}</>}
      <p className="copyright">CopyRight LLC </p>
    </div>
  );
}

export default App;
