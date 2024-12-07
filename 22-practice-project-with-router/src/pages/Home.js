import { Link, useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate();

  function navigateHandler() {
    navigate('/products') // navigation done programatically - only for demo purposes. We should use LINK elements instead.
  }
  return (
    <>
      <h1>My home page</h1>
      {/* Link element prevents browser from sending unecessary HTTP request and lets react change view and URL without sendind http request */}
      <p>
        Go to <Link to="/products">list of products</Link>
      </p>
      <p>
        <button onClick={navigateHandler}>Navigate</button> 
      </p>
    </>
  );
}

export default HomePage;
