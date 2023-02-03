import { Route, Routes } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import Posts from "./components/Posts";


function App() {
  return (
    <>
    <Routes>
  
       <Route path='/' element={<Posts/>}/>
       <Route path='/createpost' element={<CreatePost/>}/>
   
    </Routes>
    </>
  );
}

export default App;
