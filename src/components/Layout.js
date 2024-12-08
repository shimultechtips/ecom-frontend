import { useEffect } from "react";
import Footer from "../shared/Footer";
import Menu from "./Menu";

const Layout = ({ title = "Title", className, children }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="mb-3">
        <Menu />
      </div>
      <div className={`flex-grow-1 ${className}`}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
