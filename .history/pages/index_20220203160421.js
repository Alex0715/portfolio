import Head from 'next/head'
import Banner from './components/Banner'
import Header from './components/header'



export default function Home() {
  return (
    <div>
      <Header/>
      <body className='bg-body'>
        <Banner/>
      </body>
    </div>
    
  )
}
