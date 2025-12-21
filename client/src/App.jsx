import React from "react";

import NavBar from "./components/navbar";
import Welcome from "./components/welcome";
import Services from "./components/services";
import Transactions from "./components/transactions";
import Footer from "./components/footer";

const App = () => {
  return (
  <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <NavBar/>
        <Welcome/>
      </div>
      <Services/>
      <Transactions/>
      <Footer/>
  </div>
    )
};

export default App;
