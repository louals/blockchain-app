// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Services from "./components/Services";
import Transactions from "./components/Transactions";
import Footer from "./components/Footer";
import Send from "./components/send";
import Hero from "./components/hero";
import Home from "./pages/home";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/send" element={<Send />} />
            <Route path="/transactions" element={<Transactions />} />
            
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;