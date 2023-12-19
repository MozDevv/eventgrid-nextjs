import Featured from "@/components/featured/Featured";
import styles from "./homepage.module.css";
import Menu from "@/components/menu/Menu";
import Section from "@/components/section/Section";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="wrapper">
        <Featured />
        <Menu />
        <Section />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
