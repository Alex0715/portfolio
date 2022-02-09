import Head from 'next/head'
import Banner from './components/Banner'
import Client from './components/client'
import Header from './components/header'
import Hire from './components/Hire'
import Work from './components/work'




export default function Home() {
  return (
    <div className='bg-black'>
      <Header/>
      <body className='bg-black'>
        <Banner/>
        <Work />
        <Client/>
        <Hire />
        <br/><br/>
      </body>
    </div>
    
  )
}


