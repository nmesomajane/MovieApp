import { useEffect } from "react";

import axios from "axios";

import "./index.css";
import { AppRoutes } from "./config/routers/routes";

function App() {
  

  useEffect(() => {
    axios.defaults.baseURL = "https://api.themoviedb.org/3";
    axios.defaults.headers.common["Authorization"] = `Bearer 8e79ce40aad9453d489a602e695e1423`;
  }, []);

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
