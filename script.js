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


// PNS_WHATSAPP_POPUP_JS_V1
(() => {
  'use strict';
let overlay = null;
  let previousFocus = null;

  function closePopup() {
    if (!overlay) return;
    const oldOverlay = overlay;
    overlay = null;
    document.removeEventListener('keydown', onKeyDown);
    oldOverlay.remove();
    if (previousFocus) previousFocus.focus();
    previousFocus = null;
  }

  function onKeyDown(event) {
    if (event.key === 'Escape') closePopup();
  }

  function openPopup(trigger) {
    if (overlay) return;
    previousFocus = trigger;

    overlay = document.createElement('div');
    overlay.className = 'pns-wa-overlay';
    overlay.innerHTML = `
      <section class="pns-wa-dialog" role="dialog" aria-modal="true"
        aria-labelledby="pns-wa-title">
        <button type="button" class="pns-wa-close" aria-label="Close">&times;</button>
        <h2 id="pns-wa-title">Chat with P&amp;S Infra</h2>
        <p>Choose a contact to continue on WhatsApp.</p>
        <a class="pns-wa-contact" href="https://wa.me/919815877931"
          target="_blank" rel="noopener noreferrer">
          <span class="pns-wa-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24" fill="currentColor"><path d="M20.52 3.48A11.82 11.82 0 0 0 12.1 0C5.55 0 .22 5.33.22 11.88c0 2.1.55 4.16 1.6 5.98L.12 24l6.3-1.65a11.9 11.9 0 0 0 5.68 1.44h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.23-6.15-3.47-8.43ZM12.1 21.77a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.65-.24-.38a9.86 9.86 0 0 1-1.52-5.25c0-5.46 4.45-9.9 9.91-9.9 2.65 0 5.13 1.03 7 2.9a9.84 9.84 0 0 1 2.9 7c0 5.46-4.45 9.9-9.91 9.9Zm5.43-7.41c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.64.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg></span>
          <span class="pns-wa-contact-copy"><strong>1. Business &amp; Project Enquiries</strong>
          <small>+91 98158 77931</small></span>
        </a>
        <a class="pns-wa-contact" href="https://wa.me/917870560445"
          target="_blank" rel="noopener noreferrer">
          <span class="pns-wa-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24" fill="currentColor"><path d="M20.52 3.48A11.82 11.82 0 0 0 12.1 0C5.55 0 .22 5.33.22 11.88c0 2.1.55 4.16 1.6 5.98L.12 24l6.3-1.65a11.9 11.9 0 0 0 5.68 1.44h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.23-6.15-3.47-8.43ZM12.1 21.77a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.65-.24-.38a9.86 9.86 0 0 1-1.52-5.25c0-5.46 4.45-9.9 9.91-9.9 2.65 0 5.13 1.03 7 2.9a9.84 9.84 0 0 1 2.9 7c0 5.46-4.45 9.9-9.91 9.9Zm5.43-7.41c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.64.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg></span>
          <span class="pns-wa-contact-copy"><strong>2. Manpower &amp; Recruitment</strong>
          <small>+91 78705 60445</small></span>
        </a>
      </section>`;

    document.body.appendChild(overlay);
    overlay.addEventListener('click', event => {
      if (event.target === overlay || event.target.closest('.pns-wa-close')) {
        closePopup();
      }
    });
    document.addEventListener('keydown', onKeyDown);
    overlay.querySelector('.pns-wa-close').focus();
  }

  document.addEventListener('click', event => {
    const trigger = event.target.closest('.footer-v2-social-link.whatsapp');
    if (!trigger) return;
    event.preventDefault();
    openPopup(trigger);
  });
})();
// END PNS_WHATSAPP_POPUP_JS_V1
