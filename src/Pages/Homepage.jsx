import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import AppNav from "../components/AppNav";

function Homepage() {
  return (
    <div>
      <PageNav />
      <AppNav />
      <h1>HOMEPAGE</h1>
      {/* <a href="/pricing">Pricing</a> old way to rout */}
      <Link to="/app">Go to the App</Link>
    </div>
  );
}

export default Homepage;
