import Head from 'next/head'
import Banner from './components/Banner'
import Client from './components/client'
import Header from './components/header'
import Work from './components/work'




export default function Home() {
  return (
    <div>
      <Header/>
      <body className='bg-body'>
        <Banner/>
        <Work />
        <Client/>
      </body>
    </div>
    
  )
}
