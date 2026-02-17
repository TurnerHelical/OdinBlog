import { Outlet } from "react-router";
import {useModal} from './hooks/useModal.js'
import Header from "./components/layout/header.jsx";

function App() {
  const modal = useModal();
  return (
    <>
    <Header />
    <main>
      <Outlet />
    </main>
    </>
  )
}

export default App
