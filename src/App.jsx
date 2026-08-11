import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Analytics from "./components/Analytics/Analytics";
import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/About";
import News from "./pages/News";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Analytics />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
