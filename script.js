const menu=document.querySelector('.menu'), nav=document.querySelector('.navlinks');
if(menu){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open);menu.textContent=open?'×':'☰';});}
document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>{nav?.classList.remove('open');if(menu){menu.textContent='☰';menu.setAttribute('aria-expanded','false')}}));

const images=[...document.querySelectorAll('.hero-image')];
const copies=[...document.querySelectorAll('.hero-copy-layer')];
const dots=[...document.querySelectorAll('.dot')];
const hero=document.querySelector('.hero');
let current=0,timer;

function showSlide(i){
  current=(i+images.length)%images.length;
  images.forEach((el,n)=>el.classList.toggle('active',n===current));
  copies.forEach((el,n)=>el.classList.toggle('active',n===current));
  dots.forEach((el,n)=>{
    el.classList.toggle('active',n===current);
    el.setAttribute('aria-current',n===current?'true':'false');
  });
}
function restart(){clearInterval(timer);timer=setInterval(()=>showSlide(current+1),6500);}

document.querySelector('.next')?.addEventListener('click',()=>{showSlide(current+1);restart()});
document.querySelector('.prev')?.addEventListener('click',()=>{showSlide(current-1);restart()});
dots.forEach((d,i)=>d.addEventListener('click',()=>{showSlide(i);restart()}));
hero?.addEventListener('mouseenter',()=>clearInterval(timer));
hero?.addEventListener('mouseleave',restart);

showSlide(0);
restart();

if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){clearInterval(timer);}

/* =========================================================
   ANNOUNCEMENT POPUP — GLOBAL
   Works on every P&S Infra page
   ========================================================= */

(function(){

  const trigger = document.querySelector('.announcement-trigger');
  if(!trigger) return;

  let modal = document.querySelector('#announcementModal');

  /* Create announcement popup automatically on pages
     where the HTML is not already present */
  if(!modal){

    modal=document.createElement('div');
    modal.id='announcementModal';
    modal.className='announcement-modal';
    modal.setAttribute('aria-hidden','true');

    modal.innerHTML=`
      <div class="announcement-backdrop"></div>

      <div class="announcement-card"
           role="dialog"
           aria-modal="true"
           aria-labelledby="announcementTitle">

        <button class="announcement-close"
                type="button"
                aria-label="Close announcement">&times;</button>

        <div class="announcement-label">
          <span></span>
          LATEST ANNOUNCEMENT
        </div>

        <div class="announcement-kicker">
          P&amp;S INFRA
        </div>

        <h2 id="announcementTitle">
          A NEW CHAPTER FOR <span>P&amp;S INFRA.</span>
        </h2>

        <p class="announcement-text">
          We have initiated the necessary steps for our upcoming manpower operations at the <strong>Adani Power Plant project at Pirpainti, Bihar</strong>, under the <strong>Tata Group</strong>. Preparations and workforce mobilisation are already underway, and we expect operations to commence shortly.
        </p>

        <div class="announcement-meta">
          <span>PROJECT UPDATE</span>
          <span>•</span>
          <span>PIRPAINTI, BIHAR</span>
        </div>

        <a class="announcement-cta"
           href="/pages/contact.html">
          Discuss Your Requirement
          <span>&#8594;</span>
        </a>

      </div>
    `;

    document.body.appendChild(modal);
  }

  const close=modal.querySelector('.announcement-close');
  const backdrop=modal.querySelector('.announcement-backdrop');

  function openAnnouncement(){
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('announcement-open');
  }

  function closeAnnouncement(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('announcement-open');
    localStorage.setItem('pns-announcement-seen','1');
  }

  /* Bell button */
  trigger.addEventListener('click',openAnnouncement);

  /* Close button */
  close?.addEventListener('click',closeAnnouncement);

  /* Click outside popup */
  backdrop?.addEventListener('click',closeAnnouncement);

  /* ESC key */
  document.addEventListener('keydown',(e)=>{
    if(e.key==='Escape' && modal.classList.contains('open')){
      closeAnnouncement();
    }
  });

  /* CTA closes popup before navigation */
  modal.querySelectorAll('.announcement-cta').forEach(link=>{
    link.addEventListener('click',closeAnnouncement);
  });

  /* Automatic popup — only once */
  if(!localStorage.getItem('pns-announcement-seen')){
    setTimeout(openAnnouncement,1200);
  }

  /* Gallery mobile navigation */
  const gallery=document.querySelector('.nav-gallery');
  const galleryToggle=document.querySelector('.nav-gallery-toggle');

  galleryToggle?.addEventListener('click',(event)=>{
    if(window.innerWidth<=760){
      event.preventDefault();
      gallery?.classList.toggle('open');
    }
  });

  gallery?.querySelectorAll('.nav-gallery-menu a').forEach(link=>{
    link.addEventListener('click',()=>{
      gallery?.classList.remove('open');
    });
  });

})();
/* =========================================================
   P&S INFRA — CINEMATIC GALLERY
   ========================================================= */

(function(){

  const gallery=document.querySelector('.pns-cinematic-gallery');
  if(!gallery) return;

  const image=document.getElementById('pnsGalleryImage');
  const title=document.getElementById('pnsGalleryTitle');
  const description=document.getElementById('pnsGalleryDescription');
  const current=document.getElementById('pnsGalleryCurrent');
  const total=document.getElementById('pnsGalleryTotal');

  const prev=document.getElementById('pnsGalleryPrev');
  const next=document.getElementById('pnsGalleryNext');
  const zoom=document.getElementById('pnsGalleryZoom');

  const lightbox=document.getElementById('pnsGalleryLightbox');
  const lightboxImage=document.getElementById('pnsGalleryLightboxImage');
  const close=document.getElementById('pnsGalleryClose');

  const slides=[
    {
      image:'../assets/hero-power-project.png',
      title:'Power & Industrial Projects',
      description:'Project environments, industrial infrastructure and execution-focused work.',
      alt:'Power and industrial project'
    },
    {
      image:'../assets/hero-project-execution.png',
      title:'Project Execution',
      description:'Site execution environments supporting construction and project requirements.',
      alt:'Project execution site'
    },
    {
      image:'../assets/hero-power-energy.png',
      title:'Industrial Infrastructure',
      description:'Industrial and power-sector environments representing project execution support.',
      alt:'Industrial infrastructure project'
    }
  ];

  let index=0;

  total.textContent=String(slides.length).padStart(2,'0');

  function showSlide(newIndex){

    index=(newIndex+slides.length)%slides.length;

    const slide=slides[index];

    image.style.opacity='0';

    setTimeout(()=>{
      image.src=slide.image;
      image.alt=slide.alt;
      title.textContent=slide.title;
      description.textContent=slide.description;
      current.textContent=String(index+1).padStart(2,'0');
      image.style.opacity='1';
    },180);
  }

  prev?.addEventListener('click',()=>{
    showSlide(index-1);
  });

  next?.addEventListener('click',()=>{
    showSlide(index+1);
  });

  function openLightbox(){

    lightboxImage.src=image.src;
    lightboxImage.alt=image.alt;

    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden','false');

    document.body.style.overflow='hidden';
  }

  function closeLightbox(){

    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden','true');

    document.body.style.overflow='';
  }

  zoom?.addEventListener('click',openLightbox);
  image?.addEventListener('click',openLightbox);
  close?.addEventListener('click',closeLightbox);

  lightbox?.addEventListener('click',(event)=>{
    if(event.target===lightbox){
      closeLightbox();
    }
  });

  document.addEventListener('keydown',(event)=>{

    if(event.key==='Escape' && lightbox?.classList.contains('is-open')){
      closeLightbox();
      return;
    }

    if(lightbox?.classList.contains('is-open')) return;

    if(event.key==='ArrowLeft'){
      showSlide(index-1);
    }

    if(event.key==='ArrowRight'){
      showSlide(index+1);
    }

  });

  image.style.transition='opacity .18s ease';

})();

/* =========================================================
   P&S INFRA — AUTO ACTIVE NAVIGATION
   ========================================================= */

(function(){

  const path = window.location.pathname
    .replace(/\/+$/,'')
    .toLowerCase();

  const links = document.querySelectorAll('.navlinks > a:not(.quote)');
  const gallery = document.querySelector('.nav-gallery');
  const galleryLinks = gallery?.querySelectorAll('.nav-gallery-menu a') || [];

  links.forEach(link=>{
    link.classList.remove('active');
  });

  gallery?.classList.remove('active');

  let matched = false;

  links.forEach(link=>{
    const href = link.getAttribute('href');
    if(!href) return;

    const cleanHref = href
      .replace(/\/+$/,'')
      .toLowerCase();

    if(
      (path === '' || path === '/') &&
      (cleanHref === '' || cleanHref === '/')
    ){
      link.classList.add('active');
      matched = true;
      return;
    }

    if(
      cleanHref !== '/' &&
      path === cleanHref
    ){
      link.classList.add('active');
      matched = true;
    }
  });

  galleryLinks.forEach(link=>{
    const href = link.getAttribute('href');
    if(!href) return;

    const cleanHref = href
      .replace(/\/+$/,'')
      .toLowerCase();

    if(path === cleanHref){
      gallery?.classList.add('active');
      matched = true;
    }
  });

  /* Any gallery-related page keeps Gallery highlighted */
  if(
    path.includes('/pages/gallery.html') ||
    path.includes('/pages/workforce-gallery.html') ||
    path.includes('/pages/safety-site-practices.html') ||
    path.includes('/pages/video-gallery.html')
  ){
    gallery?.classList.add('active');
  }

})();
