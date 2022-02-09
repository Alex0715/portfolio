import Head from 'next/head'
import Banner from './components/Banner'
import Client from './components/client'
import Header from './components/Header'
import Hire from './components/Hire'
import Work from './components/work'




export default function Home() {
  return (
    <div className='bg-black'>
      <Header/>
      <body >
        <Banner/>
        <Work />
        <Client/>
        <Hire />
        
      </body>
      <script src="main.js">
      
  </script>
    </div>
    
  )
}


