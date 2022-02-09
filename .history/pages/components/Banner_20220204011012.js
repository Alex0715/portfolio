
function Banner() {
  return (<div className="container mt-16 flex justify-between items-center mx-auto text-white px-8 md:px-14 lg:px-24 w-full">
      <div className="flex flex-wrap md:flex-nowrap">
        <nav className="inline-block lg:mr-24 lg:w-4 fixed left-percentage hidden xl:block">
        <div className="absolute left-50 transform -translate-x-1/2 space-y-6 mt-36">
        <a href="#" className="nav-dot selected-circle block w-7 h-7 rounded-full border-4 border-nav bg-body hover:bg-theme">
        <span className="bg-black px-2 py-1 rounded-md ml-10 opacity-0">Home</span></a>
        
        <a href="#" className="nav-dot selected-circle block w-7 h-7 rounded-full border-4 border-nav bg-body hover:bg-theme">
        <span className="bg-black px-2 py-1 rounded-md ml-10 opacity-0">Works</span></a>
        
        <a href="#" className="nav-dot selected-circle block w-7 h-7 rounded-full border-4 border-nav bg-body hover:bg-theme">
        <span className="bg-black px-2 py-1 rounded-md ml-10 opacity-0">Clients</span></a>
        
        <a href="#" className="nav-dot selected-circle block w-7 h-7 rounded-full border-4 border-nav bg-body hover:bg-theme">
        <span className="bg-black px-2 py-1 rounded-md ml-10 opacity-0">Hire!</span></a>
        
        </div>
        </nav>
        <br/>
        
        <div className="flex flex-wrap lg:ml-20 justify-center md:justify-start max-w-xl mt-0 md:my-36 z-10">
          <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl text-center md:text-left bg-opacity-0">Building <br/> beautiful web experiencs</h1>
          <div className="flex mt-10">
          <a href="#"><button className="bg-theme px-10 py-2 font-bold rounded-md justify-center items-center hover:bg-blue-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-auto " fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
</svg> My works
          </button></a>
          </div>
          </div>

          <img src="\me.png" alt="Logo" class="w-full h-4/5 mt-8 md:absolute -mt-6 md:mt-0 right-0"/>
      </div>
      </div>
  
 
  )
}

export default Banner;
