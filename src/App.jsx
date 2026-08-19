import Header from './components/Header'
import Footer from "@/components/Footer.jsx";
import Shop from "@/components/shop/Shop.jsx";

function App() {
  return (
    <>
      <Header/>
      <main className={"h-[calc(100vh-110px)] w-full flex flex-col justify-between items-center gap-1 md:gap-4 p-1 md:p-4 overflow-y-auto"}>
        <Shop/>
      </main>
      <Footer/>
    </>
  )
}

export default App
