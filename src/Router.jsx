import { Route, Routes } from "react-router";
import {
  Auth,
  Statistics,
  Cart,
  Login,
  Nasiya,
  AllCreditUsers,
  CreateProduct,
} from "./routers";
import Layout from "./layout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Allproducts from "./routers/allproducts/Allproducts";
function Router() {
  return (
    <div className="router">
      <ToastContainer />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<Auth />}>
          <Route path="/" element={<Layout />}>
            <Route index path="/" element={<Statistics />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/nasiya" element={<AllCreditUsers />} />
            <Route path="/nasiyacreate" element={<Nasiya />} />
            <Route path="/product" element={<Allproducts />} />
            <Route path="/createProduct" element={<CreateProduct />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default Router;
