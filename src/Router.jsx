import { Route, Routes } from "react-router";
import {
  Auth,
  Cart,
  Login,
  Nasiya,
  AllCreditUsers,
  CreateProduct,
} from "./routers";

import Statistics from "./routers/statistics/Statistics";
import { Register } from "./routers/register/Register";
import Layout from "./layout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Allproducts from "./routers/allproducts/Allproducts";
import Popular from "./routers/popular/Popular";
import Registered from "./routers/registered/Registered";
import FinishedCreditUsers from "./routers/finished-credit-users/FinishedCreditUsers";
import DebtPayment from "./routers/debtPayment/DebtPayment";

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
            <Route path="/finishedCredits" element={<FinishedCreditUsers />} />
            <Route path="/product" element={<Allproducts />} />
            <Route path="/createProduct" element={<CreateProduct />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registered" element={<Registered />} />
            <Route path="/debtpayment" element={<DebtPayment />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default Router;
