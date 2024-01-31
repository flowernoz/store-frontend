import { Route, Routes } from "react-router";
import { Auth, Cart, Home, Login, Nasiya, Product } from "./routers";
import Layout from "./layout";

function Router() {
  return (
    <div className="router">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<Auth />}>
          <Route path="/" element={<Layout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/nasiya" element={<Nasiya />} />
            <Route path="/product" element={<Product />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default Router;
