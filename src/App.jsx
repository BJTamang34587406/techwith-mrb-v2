import React, { useEffect, useRef, useState } from 'react';
import heroVideo from './assets/hero video/herovideo.mp4';
import './index.css';

const services = [
  ['01','IT Support & Repairs','Windows troubleshooting, computer repairs, printers, remote support and onsite assistance.'],
  ['02','Networks & Infrastructure','Wi-Fi troubleshooting, network setup, Synology NAS, permissions and remote access.'],
  ['03','Microsoft 365 & Cloud','Business email, user accounts, MFA, OneDrive, SharePoint and tenant administration.'],
  ['04','Cybersecurity','Endpoint monitoring, Sophos Central, access controls and practical security improvements.'],
  ['05','Websites & Business Apps','Responsive websites, custom workflows, dashboards and small-business applications.'],
  ['06','AI & Automation','Automate repetitive tasks, streamline business processes and connect everyday tools.']
];
const projects = [
  ['Network & NAS Deployment','Infrastructure','Configured network storage, user permissions and remote access in managed IT environments.'],
  ['Security Monitoring','Cybersecurity','Reviewed endpoint alerts and prepared high-level threat monitoring reports using Sophos Central.'],
  ['Microsoft 365 Operations','Cloud','Supported business accounts, devices, email, permissions and cloud services.'],
  ['Business Technology Solutions','Development','Developing websites, custom business applications and automation solutions.']
];
const contactEmail = ''; // Set your business contact email before enabling direct email enquiries.
const bookingUrl = ''; // Paste your published appointment scheduling URL here.

function Scene() {
  const ref=useRef(null);
  useEffect(()=>{
    const canvas=ref.current,ctx=canvas.getContext('2d');
    if(!ctx || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    let raf,w,h,points=[],pointer={x:0,y:0};
    const resize=()=>{w=canvas.width=canvas.clientWidth;h=canvas.height=canvas.clientHeight;points=Array.from({length:Math.min(95,Math.floor(w*h/13000))},()=>({x:Math.random()*w,y:Math.random()*h,s:Math.random()*1.5+.4}))};
    const move=e=>{const r=canvas.getBoundingClientRect();pointer={x:(e.clientX-r.left-w/2)/w,y:(e.clientY-r.top-h/2)/h}};
    resize();window.addEventListener('resize',resize);canvas.addEventListener('pointermove',move);
    function frame(t){ctx.clearRect(0,0,w,h);points.forEach((p,i)=>{const x=p.x+Math.sin(t*.00024+i)*18+pointer.x*25*p.s,y=p.y+Math.cos(t*.00021+i)*18+pointer.y*25*p.s;ctx.fillStyle=i%4===0?'#ae85ff':'#64e5f4';ctx.globalAlpha=.3+p.s*.35;ctx.beginPath();ctx.arc(x,y,p.s,0,Math.PI*2);ctx.fill()});ctx.globalAlpha=1;raf=requestAnimationFrame(frame)}
    raf=requestAnimationFrame(frame);return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);canvas.removeEventListener('pointermove',move)}
  },[]);
  return <canvas className="starfield" ref={ref} aria-hidden="true"/>;
}
function App(){
  const [menu,setMenu]=useState(false),[service,setService]=useState('IT Support & Repairs');
  const [message,setMessage]=useState('');
  const send=e=>{
    e.preventDefault();
    if(!contactEmail){setMessage('Online enquiries are being configured. Please use the booking option once available.');return;}
    const d=new FormData(e.currentTarget);
    const subject=encodeURIComponent('TechWith Mr.B enquiry — '+d.get('service'));
    const body=encodeURIComponent('Name: '+d.get('name')+'\nReply email: '+d.get('email')+'\nService: '+d.get('service')+'\nMessage: '+d.get('message'));
    window.location.href='mailto:'+contactEmail+'?subject='+subject+'&body='+body;
    setMessage('Your email application should open with the enquiry prepared. Please press Send there.');
  };
  return <>
    <header className="topbar"><a className="brand" href="#home">TECHWITH <span>MR.B</span><small>PERTH / AUSTRALIA</small></a>
      <button className="menu-toggle" aria-expanded={menu} aria-label="Toggle navigation" onClick={()=>setMenu(!menu)}>☰</button>
      <nav className={menu?'nav open':'nav'} aria-label="Main navigation">{[['About','#about'],['Services','#services'],['Work','#work'],['Skills','#skills'],['Contact','#contact']].map(([label,href])=><a key={href} href={href} onClick={()=>setMenu(false)}>{label}</a>)}</nav>
      <a className="nav-cta" href="#contact">START A PROJECT ↗</a>
    </header>
    <main>
      <section className="hero" id="home">
        <video className="hero-video" autoPlay muted loop playsInline aria-hidden="true"><source src={heroVideo} type="video/mp4"/></video>
        <div className="hero-shade"/><Scene/>
        <div className="hero-content"><p className="eyebrow">IT OFFICER · CYBERSECURITY · DIGITAL BUILDER</p>
          <h1>TECH IS MY <em>PLAYGROUND.</em></h1>
          <p className="hero-lead">I'm Mr.B — a Perth-based IT professional solving real-world technology problems and building smarter digital experiences.</p>
          <div className="actions"><a className="button primary" href="#services">EXPLORE SERVICES ↗</a><a className="button outline" href="#work">SEE MY WORK ↓</a></div>
        </div>
        <div className="hero-foot"><span>YOUR LOCAL TECH MATE IN PERTH</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>
      <section id="about" className="section about"><div className="section-label">01 / INTRODUCING MR.B</div>
        <div className="about-grid"><div><h2>YOUR TECH.<br/><i>MY MISSION.</i></h2><p className="body-copy">I'm an IT professional based in Perth, Western Australia, originally from Nepal. I completed a Master's in Information Technology specialising in Cybersecurity and Networking.</p><p className="body-copy">My work spans managed IT support, remote and onsite troubleshooting, Microsoft 365, networking, endpoint security, websites and business automation. I like making technology useful, secure and straightforward.</p><div className="pill-row"><span>MASTER'S IN IT</span><span>CYBERSECURITY</span><span>NETWORKING</span><span>SOPHOS CERTIFIED</span></div></div>
        <div className="identity-card"><div className="identity-mark">B<span>.</span></div><div className="identity-caption"><strong>MR.B / TECHWITH MR.B</strong><span>PERSONAL PORTRAIT COMING SOON</span></div></div></div>
      </section>
      <section id="services" className="section services"><div className="section-label">02 / WHAT I OFFER</div><h2>TECH PROBLEMS?<br/><i>LET'S SOLVE THEM.</i></h2><p className="section-intro">Practical IT and digital solutions for Perth individuals and small businesses.</p><div className="service-grid">{services.map(([num,title,desc])=><article className="service-card" key={num}><span className="card-num">{num} / SERVICE</span><h3>{title}</h3><p>{desc}</p><a href="#contact" onClick={()=>setService(title)}>LET'S TALK ↗</a></article>)}</div></section>
      <section id="work" className="section work"><div className="section-label">03 / SELECTED EXPERIENCE</div><h2>BEHIND THE <i>SCREENS.</i></h2><p className="section-intro">Representative technical work and areas of experience. Client names and confidential details are intentionally omitted.</p><div className="project-grid">{projects.map(([title,tag,desc],i)=><article className="project-card" key={title}><div className="project-art"><span>{String(i+1).padStart(2,'0')}</span><div className="orb"/></div><div className="project-info"><small>{tag.toUpperCase()}</small><h3>{title}</h3><p>{desc}</p></div></article>)}</div></section>
      <section id="skills" className="section skills"><div className="section-label">04 / MY TOOLKIT</div><h2>THE TOOLS <i>I WORK WITH.</i></h2><div className="skill-groups">{[['SUPPORT & SYSTEMS','Windows','Remote Support','Microsoft 365','SharePoint','Synology NAS'],['NETWORK & SECURITY','Networking','Sophos Central','Endpoint Monitoring','Access Control','SMB'],['BUILD & AUTOMATE','Web Development','Business Apps','AI Automation','GitHub','Cloudflare']].map(([label,...items])=><div className="skill-group" key={label}><h3>{label}</h3><div className="pill-row">{items.map(x=><span key={x}>{x}</span>)}</div></div>)}</div></section>
      <section id="contact" className="section contact"><div className="section-label">05 / LET'S CONNECT</div><h2>HAVE A TECH <i>CHALLENGE?</i></h2><p className="section-intro">Tell me what you're working on. We'll find a practical next step.</p><div className="contact-grid"><form onSubmit={send}><label>Your name<input name="name" required placeholder="Your name"/></label><label>Email address<input type="email" name="email" required placeholder="you@example.com"/></label><label>How can I help?<select name="service" value={service} onChange={e=>setService(e.target.value)}>{services.map(([,title])=><option key={title}>{title}</option>)}</select></label><label>Tell me more<textarea name="message" required rows="5" placeholder="Describe your issue or project"/></label><button className="button primary" type="submit">PREPARE ENQUIRY ↗</button><p className="form-note" role="status">{message||'Enquiry email delivery is not yet configured. Do not submit sensitive credentials or private client data.'}</p></form>
        <aside className="booking-panel"><span className="eyebrow">BOOK A SESSION</span><h3>LET'S MAKE IT HAPPEN.</h3><p>Need troubleshooting or want to discuss a project? Appointment scheduling will be available once a booking calendar is connected.</p>{bookingUrl?<a className="button outline" href={bookingUrl} target="_blank" rel="noopener noreferrer">VIEW AVAILABLE TIMES ↗</a>:<span className="coming-soon">ONLINE BOOKINGS COMING SOON</span>}<div className="booking-location">📍 PERTH, WESTERN AUSTRALIA</div></aside></div></section>
    </main><footer><a className="brand" href="#home">TECHWITH <span>MR.B</span></a><p>© {new Date().getFullYear()} TechWith Mr.B · Perth WA</p><a href="#home">BACK TO TOP ↑</a></footer>
  </>;
}
export default App;