import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "My First Book",
    description: "First book i ever wrote",
  },
  {
    id: "p2",
    price: 5,
    title: "My Second Book",
    description: "Second book i ever wrote",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((item) => {
          return (
            <ProductItem
              key={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              id={item.id}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
