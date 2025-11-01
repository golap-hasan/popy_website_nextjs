import Navbar from "@/components/common/navbar/Navbar";
import Footer from "@/components/common/footer/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
        {children}
      <Footer />
    </>
  );
}