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

  // Mobile gallery accordion
  galleryToggle?.addEventListener('click',()=>{
    if(window.innerWidth <= 760){
      gallery?.classList.toggle('open');
    }
  });
})();