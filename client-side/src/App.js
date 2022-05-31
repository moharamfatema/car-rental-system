import { React } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Reservation from "./components/parts/Reservation";
import NewCar from "./components/parts/NewCar";
import DisplayCars from "./components/parts/DisplayCars";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CarSearch from "./components/parts/CarSearch";
import AdvancedSearch from "./components/parts/AdvancedSearch";
import Reports from "./components/Reports";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  //car.plate_number, car.model, car.brand, car.`year`
  let props = [{ "id": "0", "model": "11" ,'brand':'Active',"year":'5'}];
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App" >
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/reservation" element={<Reservation {...props} />} />
            <Route path="/newcar" element={<NewCar />} />
            <Route path="/carsearch" element={<CarSearch/>}/>
            <Route path="/displaycars" element={<DisplayCars />}/>
            <Route path="/reports" element={<Reports/>}/>
            <Route path="/advancedsearch" element={<AdvancedSearch/>}/>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

// TODO: change fetch url
