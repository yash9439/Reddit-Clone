import React,{useEffect, createContext, useReducer, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/Navbar";
import "./App.css"
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import CreatePost from "./components/CreatePost";
import MySubGreddiits from "./components/MySubGreddiits";
import {reducer, initialState} from "./reducers/userReducer"
import SubGreddiitPostPage from "./components/SubGreddiitPost/SubGreddiitPostPage";
import SubGreddiitPostTabs from "./components/SubGreddiitPost/SubGreddiitPostTabs";
import SavedPost from "./components/SavedPost"
import Dashboard from "./components/dashboard";
import ChatOption from "./components/ChatOption";
import Chat from "./components/Chat";

export const UserContext = createContext()

const Routing = () => {
  const navigate = useNavigate()
  const {state,dispatch} = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      // navigate('/')
    }
    else {
      navigate("/login")
    }
  },[])

  return (
    <Routes>
    <Route path = "/login" element={<Login />} />
    <Route exact path = "/" element={<Dashboard />} />
    <Route path = "/SubGreddiitPage" element={<Home />} />
    <Route path = "/profile" element={<Profile />} />
    <Route path = "/create" element={<CreatePost />} />
    <Route path = "/mySubGreddiits" element={<MySubGreddiits />} />
    <Route path = "/SubGreddiitPostPage" element={<SubGreddiitPostPage />} />
    {/* <Route path = "/createSubPost" element={<CreateSubPostModal />} /> */}
    <Route path = "/SubGreddiitPostTabs" element={<SubGreddiitPostTabs />} />
    <Route path = "/savedPost" element={<SavedPost />} />
    <Route path = "/chatOption" element={<ChatOption />} />
    <Route path = "/chat" element={<Chat />} />
    </Routes>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)

  // function handleCallbackResponse(response) {
  //   console.log("Encoded JWT ID token: " + response.credential) 
  // }

  // useEffect(() => {
  //   google.accounts.id.initialize({
  //     client_id: "344372028353-kkinb7lda1su1a6e3h2v6tp3k9ketmf1.apps.googleusercontent.com",
  //     callback: handleCallbackResponse
  //   });
  //   google.accounts.id.renderButton(
  //     document.getElementById("signInDiv"),
  //     {theme:"outline", size: "large"}
  //   );
  // },[]);

  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <NavBar />
    <Routing />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
