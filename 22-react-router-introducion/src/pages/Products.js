import { Link } from "react-router-dom";

// Simulation of data possibly got from backend
const PRODUCTS = [
  {id: 'p1', title: 'Product 1'},
  {id: 'p2', title: 'Product 2'},
  {id: 'p3', title: 'Product 3'},
  {id: 'p4', title: 'Product 4'},
  {id: 'p5', title: 'Product 5'}
]

function ProductsPage() {
  return (
    <>
      <h1>The products page</h1>
      <ul>
       {PRODUCTS.map(product => <li key={product.id}>
         <Link to={`${product.id}`}>{product.title}</Link>
       </li>)}
      </ul>
    </>
  );
}

export default ProductsPage;
