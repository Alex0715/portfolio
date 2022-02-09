import Head from 'next/head'
import Header from 'components/Header.js'
import Banner from 'components\Banner.js'


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


