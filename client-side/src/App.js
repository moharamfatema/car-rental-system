import {React} from "react";
import { BrowserRouter, Route , Routes} from "react-router-dom";


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Home from "./components/Home";

function App() {


  return (
    <BrowserRouter>
      <div className="App">
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='/recipe'>
            {/* <RecipePage/> */}
        </Route>
        <Route path='/signup'>
            {/* <SignUp/> */}
        </Route>
        <Route path='/login'>
            {/* <Login /> */}
        </Route>
        <Route path='/profile'>

            {/* <Profile/> */}

        </Route>
    </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;

// TODO: change fetch url