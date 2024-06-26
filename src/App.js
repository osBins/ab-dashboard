import React from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ExperimentList from "./pages/experiment/experiment";
import List from "./pages/goals/Goal"
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { userInput, productInput } from "./formSource";
import "./app.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

const App = () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="experiments">
              <Route index element={<ExperimentList />} />
              <Route path=":expId" element={<Single />} />
              <Route
                path="new"
                element={<New datas={userInput} title="Create New Experiment" />}
              />
            </Route>
            <Route path="goals">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New datas={productInput} title="Add New Product" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
