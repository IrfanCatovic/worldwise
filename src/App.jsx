/* eslint-disable no-unused-vars */
//ovo je da mi ne bi prijavljivalo gresku nego samo upozorenje
import { lazy, Suspense } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./Pages/ProtectedRoute";

import CityList from "./components/CItyList";
import CountriesList from "./components/CountriesList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Product from "./Pages/Product";
// import Pricing from "./Pages/Pricing";
// import Homepage from "./Pages/Homepage";
// import PageNotFound from "./Pages/PageNotFound";
// import AppLayout from "./Pages/AppLayout";
// import Login from "./Pages/Login";

const Homepage = lazy(() => import("./Pages/Homepage"));
const Product = lazy(() => import("./Pages/Product"));
const Pricing = lazy(() => import("./Pages/Pricing"));
const Login = lazy(() => import("./Pages/Login"));
const AppLayout = lazy(() => import("./Pages/AppLayout"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              {/* Default  */}
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route
                path="app"
                element={
                  //ovo radimo da bismo sprecili da ljudi udju na neke rute u aplikaciji kada nisu logovani
                  //ovo je vid zastite
                  //radimo oko applayout jer je to ustvari nas app gde sve funkcionise
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* Navigate koristimo kao pocetna odrednica, kada koristimo index napisemo navigate i gde ce da nas povede u koji element  */}
                {/* replace koristimo jer bez njega strelica za back nece da nas vrati nazad */}
                <Route index element={<Navigate replace to="cities" />} />
                {/* prvi route pravimo kao default kada otvorimo app  */}
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountriesList />} />
                <Route path="form" element={<Form />} />
                {/* 3 child routes  */}
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
