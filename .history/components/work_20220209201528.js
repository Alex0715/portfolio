function Work() {
  return (<div className="container mt-64 flex justify-between items-center mx-auto px-8 md:px-14 lg:px-24 w-full" id="section2">
  <section className="w-full">
      <h2 id="work" className="secondary-title text-white">My work</h2>
      <p className="section-paragraph">I’ve newly started FreeLancing and want to be a veteran.<br/> I learn from my mistakes very fast and which i think is my best part in web development as you always learn something new.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <a href="https://back-benchers.vercel.app/"><img src="/back.jpg" target="_blank" className="w-full bg-nav h-36 lg:h-72 object-cover"/>
          <p className="section-paragraph">BackBenchers<br></br>An ecom design inspired from amazon india. I used nextJs and Tailwindcss</p>
          </a>
          <a href="https://tlggaming.com/"><img src="/tlg1.jpg" target="_blank" className="w-full bg-nav h-36 lg:h-72 object-cover"/>
          <p className="section-paragraph">TLG Gaming <br></br> I used to work as a website manager and also in SEO management.</p>
          </a>
          <a href="https://www.buyprimeaccount.com/"><img src="/buycsgo.jpg" className="w-full hidden md:block bg-nav h-36 lg:h-72 object-cover" target="_blank"/>
          <p className="section-paragraph">BuyPrimeAccount <br></br> I used to work as a website manager and also in SEO management.</p>
          </a>
          <a><img src="/java.jpg" className="w-full hidden md:block bg-nav h-36 lg:h-72 object-cover"/>
          <p className="section-paragraph">Advanced Java <br></br> I did my advanced java courses from ISOEH(Indian School of Ethical Hacking) Kolkata.</p>
          </a>
          <a><img src="/btech.jpg" className="w-full hidden md:block bg-nav h-36 lg:h-72 object-cover"/>
          <p className="section-paragraph">B.Tech CSE <br></br> I did my B.tech courses in Computer Science from University of Engineering and Management,Kolkata.</p>
          </a>
          <a><img src="/webd.jpeg" className="w-full hidden md:block bg-nav h-36 lg:h-72 object-cover"/>
          <p className="section-paragraph">Web Development <br></br> I did my front-end courses on react and nextjs from youtube and other web sources.</p>
          </a>
          <a><img src="guitar.jpg" className="w-full hidden md:block bg-nav h-36 lg:h-72 object-cover"/>
          <p className="section-paragraph">Playing Guitar <br></br> I play good guitar, even when i am stuck at any problem or solving difficult problems playing it helps me calm down and to focus more.</p>
          </a>
          <a><img src="/comp.jpg" className="w-full hidden md:block bg-nav h-36 lg:h-72 object-cover"/>
          <p className="section-paragraph">Building PC <br></br>Being a tech nred I love assembling computer parts and I made near about 18-20 builds last year for clients, friends and family</p>
          </a>
          <a className="w-full hidden md:block md:col-span-2 lg:col-span-1 bg-nav h-36 lg:h-72 object-cover"><img src="/football.jpeg" className="w-full hidden md:block md:col-span-2 lg:col-span-1 bg-nav h-36 lg:h-72 object-cover"/>
          <p className="section-paragraph">I Love playing Football <br></br> I played for several local clubs, school team and also college team and this helps me to take up any situaion sportingly.</p>
          </a>
      </div>
  </section>
</div>
)
}

export default Work;
