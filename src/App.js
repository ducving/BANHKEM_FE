import { Route, Routes } from "react-router-dom"
import Home from "./compoment/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css"
import View from "./compoment/Views/View";
import Cart from "./compoment/Shopping/Cart";
import Test from "./compoment/Create/test";
import Login from "./compoment/Login/Login";
function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Login />}></Route>
                <Route path='/home' element={<Home />}></Route>
                <Route path='/cart' element={<Cart/>}></Route>
                <Route path='/views/:id' element={<View/>}></Route>
                <Route path='/test' element={<Test/>}></Route>

            </Routes>
        </>
    );
}
export default App;