import { useParams } from "react-router-dom";

// we want to know which product id was used in URL path - the page was loaded
// Then we can fetch data for specific product e.g in the backend
function ProductDetailPage() {
  const params = useParams(); // contains every dynamic path segment we defined in path definition as the property

  return (
    <>
      <h1>Product details!</h1>
      <p>{params.id}</p>
    </>
  );
}

export default ProductDetailPage;
