import Login from "./components/main/Login";
import Main from "./components/main/Main";
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />}></Route>
            <Route index path="/" element={<Main />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
