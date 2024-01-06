import { Routes, Route } from "react-router-dom";
import { Monitor } from "./pages/Monitor";
import { Home } from ".";
import { Network } from "./pages/Network";
import { Storage } from "./pages/storage";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/monitor" element={<Monitor />} />
      <Route path="/storage" element={<Storage />} />
      <Route path="/network" element={<Network />} />
    </Routes>
  );
};
