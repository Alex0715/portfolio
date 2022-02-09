
function Banner() {
  return (<div className="container mt-16 flex justify-between items-center mx-auto text-white px-8 md:px-14 lg:px-24 w-full">
      <div className="flex flex-wrap md:flex-nowrap">
        <nav className="inline-block lg:mr-24 lg:w-4 fixed left-percentage hidden xl:block">
        <div className="absolute left-50 transform -translate-x-1/2 space-y-6 mt-36">
        
        <a href="#" className="nav-dot selected-circle block w-7 h-7 rounded-full border-4 border-nav bg-body hover:bg-theme">
        <span className="bg-black px-2 py-1 rounded-md ml-10 opacity-0">Home</span></a>
        
        <a href="#" className="nav-dot selected-circle block w-7 h-7 rounded-full border-4 border-nav bg-body hover:bg-theme">
        <span className="bg-black px-2 py-1 rounded-md ml-10 opacity-0">Home</span></a>
        
        <a href="#" className="nav-dot selected-circle block w-7 h-7 rounded-full border-4 border-nav bg-body hover:bg-theme">
        <span className="bg-black px-2 py-1 rounded-md ml-10 opacity-0">Home</span></a>
        
        <a href="#" className="nav-dot selected-circle block w-7 h-7 rounded-full border-4 border-nav bg-body hover:bg-theme">
        <span className="bg-black px-2 py-1 rounded-md ml-10 opacity-0">Home</span></a>
        
        </div>
        </nav>
      </div>
  </div>)
}

export default Banner;
