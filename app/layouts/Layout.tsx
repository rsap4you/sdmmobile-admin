import React from "react";
import { Footer, Header, Sidebar } from "../../Components/Layouts/index";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Sidebar />
    <Header />
    <div className="pc-container">
      <div className="pc-content">{children}</div>
    </div>
    <Footer />
  </>
);

export default Layout;
