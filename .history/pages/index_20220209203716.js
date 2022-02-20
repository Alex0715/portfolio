import Head from 'next/head'
import Header from '../components/Header'
import Banner from '../components/Banner'
import Work from '../components/work'
import Client from '../components/client'
import Hire from '../components/Hire'

export default function Home() {
  return (
    <div className='bg-black'>
      <Header />
      
      <body >
        <Banner />
        <Work />
        <Client/>
        <Hire />
        
      </body>
      <script src="main.js">
      
  </script>
    </div>
    
  )
}


