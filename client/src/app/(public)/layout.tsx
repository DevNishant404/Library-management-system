import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar></Navbar>
      <div>
        {children}
      </div>
      <Footer></Footer>
      
    </>
  );
}