import { Navbar } from './component/Navbar'
import { ToDo } from './Tools/To-Do'
import { AddModal } from './component/AddModal'
import { useEffect } from "react";
import { loadTheme } from "./component/DarkMode";

function App() {
  useEffect(() => {
    loadTheme();
  }, []);  
  return (
    <>
        <Navbar />
        
        <ToDo />
    </>
  )
}

export default App