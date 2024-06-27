// client/src/App.js
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import React from 'react';
import './App.css';
import Register from './pages/Register';
import Home from "./pages/Home"
import Login from './pages/Login';
import Profile from './pages/Profile';


function App() {
  

  return (
    <BrowserRouter>
 
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/> 
        <Route path='/register' element={<Register />}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;









// // client/src/App.js
// import { BrowserRouter,Routes,Route } from 'react-router-dom'
// import React from 'react';
// import './App.css';
// import Register from './pages/Register';
// import Home from "./pages/Home"
// import Login from './pages/Login';
// import Profile from './pages/Profile';
// import Notes from './pages/Notes'

// function App() {
  

//   return (
//     <BrowserRouter>
 
//       <Routes>
//         <Route path='/' element={<Home/>}/>
//         <Route path='/login' element={<Login/>}/> 
//         <Route path='/register' element={<Register />}/>
//         <Route path='/profile' element={<Profile/>}/>
//         <Route path='/notes' element={<Notes/>}/>
//       </Routes>
    
//     </BrowserRouter>
//   );
// }

// export default App;
