import Image from "next/image";
function Header() {
  return (
  <div className="font-poppins pb-12 ">
  <header className="text-white container py-6 flex justify-between items-center mx-auto px-8 md:px-14 lg:px-24 w-full">
        
      <section class="logo">
      <div className="text-white text-3xl">
        Chirantan Bose</div></section>
      <div className="hidden md:flex space-x-12 items-center">
        <a href="#" className="text-selected-text">Home</a>
        <a href="#">My Works</a>
        <a href="#">Clients</a>
        <a href="#"><button className="bg-theme px-6 py-2 font-bold rounded-sm">Hire me</button></a>
      </div>
      <div className="md:hidden text-white">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd" />
</svg>
      </div>
  </header>
  </div>
  )
}
  
export default Header;
