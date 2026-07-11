const menu=document.querySelector('.menu'),links=document.querySelector('.links');
menu.addEventListener('click',()=>links.classList.toggle('open'));
document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
document.getElementById('quoteForm').addEventListener('submit',e=>{
 e.preventDefault();
 const d=new FormData(e.target);
 const subject=encodeURIComponent('Cape V Event Inquiry — '+(d.get('name')||'New Client'));
 const body=encodeURIComponent(`Name: ${d.get('name')||''}\nEmail: ${d.get('email')||''}\nPhone: ${d.get('phone')||''}\nEvent date: ${d.get('date')||''}\nEvent type: ${d.get('type')||''}\n\nEvent details:\n${d.get('details')||''}`);
 window.location.href=`mailto:capev.lkn@gmail.com?subject=${subject}&body=${body}`;
});