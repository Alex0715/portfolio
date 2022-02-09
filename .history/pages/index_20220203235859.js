import Head from 'next/head'
import Banner from './components/Banner'
import Client from './components/client'
import Header from './components/header'
import Hire from './components/Hire'
import Work from './components/work'




export default function Home() {
  return (
    <div>
      <Header/>
      <body className='bg-body'>
        <Banner/>
        <Work />
        <Client/>
        <Hire />
        <br/><br/>
      </body>
    </div>
    
  )
}

function updateList() {
	const titles = [...document.querySelectorAll('h1, h2')].sort((a, b) => {
		return Math.abs(a.getBoundingClientRect().top) - Math.abs(b.getBoundingClientRect().top);
	});

	document.querySelectorAll(".selected-circle").forEach(c => c.classList.remove("selected-circle"));
	
	document.querySelectorAll(".nav-dot")[[...document.querySelectorAll('h1, h2')].indexOf(titles[0])].classList.add("selected-circle");
}

updateList();
window.addEventListener('scroll', () => {
    updateList();
})
