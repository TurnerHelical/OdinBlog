import { Outlet } from "react-router";
import Header from './components/layout/header';

function App() {
  return (
    <>
    <header>
      <Header />
    </header>
    <main>
      <Outlet />
    </main>
    </>
  )
}

export default App
