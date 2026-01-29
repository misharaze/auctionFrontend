import Footer from "./Components/Footer/Footer.jsx";
import Header from "./Components/Header/Header.jsx";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
       <Footer />
    </>
  );
};

export default Layout;
