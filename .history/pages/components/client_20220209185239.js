function Client() {
  return <div className="container mt-72 flex justify-between items-center mx-auto px-8 md:px-14 lg:px-24 w-full" id="section3">
  <section className="w-full">
      <h2 id="clients" className="secondary-title text-white">Clients</h2>
      <p className="section-paragraph ">I’ve had the pleasure of working with multiple Fortune companies, designing and implementing both frontend and backend.</p>

      
      <div className="space-y-12 my-16">
          <div className="w-full border border-nav p-16 lg:px-32 lg:py-20 lg:space-x-32 flex justify-center lg:justify-start flex-wrap lg:flex-nowrap">
              
              
              <div className="mb-6 lg:mb-0">
                  <img src="/tlg.png" className="flex flex-grow justify-content items-center"/>
                                   
              </div>

              
              <div className="flex flex-wrap justify-center text-center lg:text-left lg:block">
                  <h3 className="text-white text-3xl font-semibold">TLG Gaming</h3>

                  <div className="w-full lg:w-auto flex flex-wrap justify-center lg:justify-start gap-3 mt-6 mb-8">
                      <div className="badge text-white">SEO</div>
                      <div className="badge text-white">Frontend development</div>
                      <div className="badge text-white">Website Management</div>
                  </div>

                  <p className="text-white">I’ve had the pleasure of working with TLG Gaming. I used to manage the frontend ,seo and website management of their website</p>
                  <p className="text-white">From May 2021 till November 2021</p>
              </div>

          </div>
          
          <div className="w-full border border-nav p-16 lg:px-32 lg:py-20 lg:space-x-32 flex justify-center lg:justify-start flex-wrap lg:flex-nowrap">
              
              
              <div className="mb-6 lg:mb-0">
              <img src="bp.png" alt="fb" className="flex-grow items-center "/>
              </div>

              
              <div className="flex flex-wrap justify-center text-center lg:text-left lg:block">
                  <h3 className="text-white text-3xl font-semibold">buyprimeaccount.com</h3>

                  <div className="w-full lg:w-auto flex flex-wrap justify-center lg:justify-start gap-3 mt-6 mb-8">
                      <div className="badge text-white">SEO</div>
                      <div className="badge text-white">Frontend development</div>
                  </div>

                  <p className="text-gray-800">I’ve had the pleasure of working with multiple Fortune 500 companies, designing and implementing both frontend and backend.</p>
              </div>

          </div>
      </div>

  </section>
</div>;
}

export default Client;
