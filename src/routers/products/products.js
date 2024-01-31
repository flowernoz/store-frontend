import Allproducts from "./allproducts/Allproducts";
import CreateProduct from "./createProduct/CreateProduct";

function products() {
  return (
    <div className="products">
      <CreateProduct />
      <Allproducts />
    </div>
  );
}

export default products;
