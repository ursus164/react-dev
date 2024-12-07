import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <>
      <h1>My home page</h1>
      {/* Link element prevents browser from sending unecessary HTTP request and lets react change view and URL without sendind http request */}
      <p>
        Go to <Link to="/products">list of products</Link>
      </p>
    </>
  );
}

export default HomePage;
