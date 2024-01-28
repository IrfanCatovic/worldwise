import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import Homepage from "./Pages/Homepage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="home" element={<Homepage />} />
          <Route path="product" elemet={<Product />} />
          <Route path="pricing" element={<Pricing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
