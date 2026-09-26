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
   ANNOUNCEMENT POPUP
   ========================================================= */

(function(){
  const modal = document.querySelector('#announcementModal');
  const trigger = document.querySelector('.announcement-trigger');
  const close = document.querySelector('.announcement-close');
  const backdrop = document.querySelector('.announcement-backdrop');
  const gallery = document.querySelector('.nav-gallery');
  const galleryToggle = document.querySelector('.nav-gallery-toggle');

  if(!modal) return;

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

  trigger?.addEventListener('click',openAnnouncement);
  close?.addEventListener('click',closeAnnouncement);
  backdrop?.addEventListener('click',closeAnnouncement);

  document.addEventListener('keydown',(e)=>{
    if(e.key === 'Escape' && modal.classList.contains('open')){
      closeAnnouncement();
    }
  });

  document.querySelectorAll('.announcement-cta').forEach(link=>{
    link.addEventListener('click',closeAnnouncement);
  });

  // Show automatically only once
  if(!localStorage.getItem('pns-announcement-seen')){
    setTimeout(openAnnouncement,1200);
  }

  // Gallery navigation
  galleryToggle?.addEventListener('click',(event)=>{
    if(window.innerWidth <= 760){
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
