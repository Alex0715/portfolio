function Hire() {
  return <div className="container mt-64 flex justify-between items-center mx-auto px-8 md:px-14 lg:px-24 w-full" id="section4">
  <section className="w-full">
      <h2 id="hire" className="secondary-title text-gray-700">Hire me</h2>
      <p className="section-paragraph">Feel free to to contact me any time, through any method below.</p>

      <div className="w-full grid lg:grid-cols-2 gap-8 lg:gap-32 mt-24">
          <div className="space-y-12">
              <div>
                  <label className="text-gray-700 block mb-6 text-xl font-bold">Name</label>
                  <input className="w-full border border-input-border bg-input px-4 py-4 text-white"/>
              </div>
              <div>
                  <label className="text-gray-600 block mb-6 text-xl font-bold">Email</label>
                  <input type="email" className="w-full border border-input-border bg-input px-4 py-4 text-white"/>
              </div>
              <div>
                  <label className="text-gray-600 block mb-6 text-xl font-bold">Message</label>
                  <textarea type="email" className="w-full border border-input-border bg-input px-4 py-4 h-56 resize-none text-white"></textarea>
              </div>
              <button className="px-6 py-2 bg-theme text-white font-bold rounded-md hover:bg-blue-500">Send it!</button>
          </div>

          <div className="mt-12">
              
              <a href="https://wa.me/917003474297" className="text-gray-600 underline">07003474297</a>
              <a href="mailto:arjunbose.ar@gmail.com" className="text-gray-600 underline mt-3 block">arjunbose.ar@gmail.com</a>

              
              <div className="flex mt-20 space-x-6">
                  
                  <a href="https://www.facebook.com/arjun.rokz.75/">
                  <img src="https://img.icons8.com/nolan/64/facebook-circled.png" alt="fb"/>
                  </a>
                  
                  <a href="https://www.instagram.com/alex.mercer_ar/">
                  <img src="https://img.icons8.com/nolan/64/instagram-new.png" alt="insta"/>
                  </a>
              </div>
          </div>
          
      </div>

  </section>
  <script src="main.js">
      
  </script>
</div>;
}

export default Hire;
