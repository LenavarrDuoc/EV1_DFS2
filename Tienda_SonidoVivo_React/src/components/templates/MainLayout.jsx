import { Outlet } from "react-router-dom";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import { itemsFooter } from "../../data/footerData";

export const MainLayout = () => {
    return (
    <div className="layout-container">
      <Header/>
      <main className="main-content">
        <Outlet/>
      </main>
      <Footer itemsFooter={itemsFooter}/>
    </div>
    )
}