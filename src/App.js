import { Route, Routes } from "react-router-dom"
import Home from "./compoment/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css"
import View from "./compoment/Views/View";
import Cart from "./compoment/Shopping/Cart";
function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/cart' element={<Cart/>}></Route>
                <Route path='/views/:id' element={<View/>}></Route>

            </Routes>
        </>
    );
}
export default App;