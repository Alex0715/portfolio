import Image from "next/image";
function Header() {
  return (
  <div className="font-poppins pb-12 ">
  <header className="text-white container py-6 flex justify-between items-center mx-auto px-8 md:px-14 lg:px-24 w-full">
        
      
      <div className="logo text-white text-3xl md:text-2xl lg:text-4xl">
        ARjUN</div>
      <div className="hidden md:flex space-x-12 items-center">
        <a href="#section1" className="text-selected-text">Home</a>
        <a href="#section2">My Works</a>
        <a href="#section3">Clients</a>
        <a href="#section4"><button className="bg-theme px-6 py-2 font-bold rounded-sm hover:bg-blue-800">Hire me</button></a>
      </div>
      <div className="md:hidden text-white w3-teal">
      <button class="w3-button w3-teal w3-xlarge" onclick="w3_open()"><svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd" />
</svg>
</button>
      </div>
  </header>
  <div class="w3-sidebar w3-bar-block w3-border-right" style="display:none" id="mySidebar">
  <button onclick="w3_close()" class="w3-bar-item w3-large">Close &times;</button>
  <a href="#" class="w3-bar-item w3-button">Link 1</a>
  <a href="#" class="w3-bar-item w3-button">Link 2</a>
  <a href="#" class="w3-bar-item w3-button">Link 3</a>
</div>
<script>
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
}
</script>
  </div>
  )
}
  
export default Header;
