import "./App.css";
import {Routes, Route} from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.compnent";
import Authentication from "./routes/authentication/authentication.component.jsx";

const Shop = () => <h1>Awesome shop page</h1>;

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
