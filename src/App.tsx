import { Route, Routes } from "react-router-dom"
import Details from "./pages/Details"
import Home from "./pages/Home"
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/details/:id" element={<Details/>}></Route>
      </Routes>
    </div>
  )
}

export default App