import { Outlet } from "react-router";
import Header from './components/layout/header';

function App() {
  return (
    <>
    <header>
      <Header />
    </header>
    <main>
      <div className="contentBox">
        <Outlet />
      </div>
    </main>
    </>
  )
}

export default App
