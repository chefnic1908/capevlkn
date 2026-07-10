
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
toggle.addEventListener('click',()=>{nav.classList.toggle('open');toggle.setAttribute('aria-expanded',nav.classList.contains('open'))});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const items=[...document.querySelectorAll('.gallery-item')];
document.querySelectorAll('.filters button').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
 const f=btn.dataset.filter;items.forEach(i=>i.classList.toggle('hidden',f!=='All'&&i.dataset.category!==f));
}));

const box=document.querySelector('.lightbox'),boxImg=box.querySelector('img'),boxText=box.querySelector('p');
let visible=[],index=0;
function openAt(item){visible=items.filter(i=>!i.classList.contains('hidden'));index=visible.indexOf(item);show();box.classList.add('open');box.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function show(){const i=visible[index];boxImg.src=i.dataset.src;boxImg.alt=i.dataset.caption;boxText.textContent=i.dataset.caption}
items.forEach(i=>i.addEventListener('click',()=>openAt(i)));
box.querySelector('.lightbox-close').onclick=close;
box.querySelector('.lightbox-prev').onclick=()=>{index=(index-1+visible.length)%visible.length;show()};
box.querySelector('.lightbox-next').onclick=()=>{index=(index+1)%visible.length;show()};
box.addEventListener('click',e=>{if(e.target===box)close()});
document.addEventListener('keydown',e=>{if(!box.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')box.querySelector('.lightbox-prev').click();if(e.key==='ArrowRight')box.querySelector('.lightbox-next').click()});
function close(){box.classList.remove('open');box.setAttribute('aria-hidden','true');document.body.style.overflow=''}

document.getElementById('quoteForm').addEventListener('submit',e=>{
 e.preventDefault();const d=new FormData(e.target);
 const subject=encodeURIComponent(`Cape V inquiry: ${d.get('type')||'Event'}`);
 const body=encodeURIComponent(`Name: ${d.get('name')}\nEmail: ${d.get('email')}\nPhone: ${d.get('phone')||''}\nEvent date: ${d.get('date')||''}\nEvent type: ${d.get('type')||''}\nEstimated guests: ${d.get('guests')||''}\n\nVision / details:\n${d.get('details')||''}`);
 location.href=`mailto:capev.lkn@gmail.com?subject=${subject}&body=${body}`;
});

// Remove a gallery card if its image cannot load, preventing a blank tile.
document.querySelectorAll('.gallery-item img').forEach(img=>{
  img.addEventListener('error',()=>{
    const card=img.closest('.gallery-item');
    if(card) card.remove();
  });
});
