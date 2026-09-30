const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); menu.focus(); } });
const services = {
 consulting: {title:'Quality, built into the way you work.',copy:'Practical support for developing, implementing and maintaining quality management systems.',list:['API Q1 and API Q2 requirements support','ISO 9001 quality management systems','System development, documentation and maintenance'],image:'consulting.jpg',alt:'Quality management consulting',code:'CONSULTING / 01'},
 audit: {title:'An independent view. A clearer way forward.',copy:'Understand system gaps and translate findings into focused improvement.',list:['Internal, supplier and HSE audits','Gap assessments and pre-certification reviews','Corrective action support'],image:'audit.jpg',alt:'Quality audit review',code:'AUDITING / 02'},
 inspection: {title:'Technical assurance. Where the work happens.',copy:'Specialist oversight for equipment, structures and supplier activities.',list:['Vendor and source inspection','AWS-certified welding inspection expertise','Drilling-rig and well-servicing structural inspections'],image:'inspection.jpg',alt:'Technical industrial inspection',code:'INSPECTION / 03'},
 training: {title:'Knowledge your people can put to work.',copy:'Develop practical capability through online and customized instructor-led learning.',list:['Quality management training','Risk and auditor learning','Current course offerings at TIEC Academy'],image:'training.png',alt:'Illustrative quality training workshop',code:'TRAINING / 04'}
};
const tabs = [...document.querySelectorAll('[role=tab]')];
const panel = document.querySelector('#service-panel');
function selectService(tab) {
 const service = services[tab.dataset.service];
 tabs.forEach(item => {const selected = item === tab; item.setAttribute('aria-selected', String(selected)); item.tabIndex = selected ? 0 : -1;});
 panel.setAttribute('aria-labelledby',tab.id);
 document.querySelector('#service-title').textContent = service.title;
 document.querySelector('#service-copy').textContent = service.copy;
 document.querySelector('#service-code').textContent = service.code;
 const img = document.querySelector('#service-image'); img.src = '../assets/' + service.image; img.alt = service.alt;
 document.querySelector('#service-list').replaceChildren(...service.list.map(text => {const li=document.createElement('li');li.textContent=text;return li;}));
 if (!reducedMotion) {panel.classList.remove('panel-enter'); void panel.offsetWidth; panel.classList.add('panel-enter');}
}
 tabs.forEach((tab,index) => {tab.addEventListener('click',()=>selectService(tab));tab.addEventListener('keydown',event=>{let next;if(['ArrowRight','ArrowDown'].includes(event.key)) next=(index+1)%tabs.length;else if(['ArrowLeft','ArrowUp'].includes(event.key)) next=(index-1+tabs.length)%tabs.length;else if(event.key==='Home') next=0;else if(event.key==='End') next=tabs.length-1;else return;event.preventDefault();selectService(tabs[next]);tabs[next].focus();});});
 document.querySelector('form').addEventListener('submit', event => {event.preventDefault();const data=new FormData(event.currentTarget);document.querySelector('.form-status').textContent=`Preview ready for ${data.get('name')}: ${data.get('service')}. This inquiry has not been sent or saved. Please use TIEC's official website for a real request.`;});
 if ('IntersectionObserver' in window) {document.documentElement.classList.add('js');const reveals=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');reveals.unobserve(entry.target);}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(element=>reveals.observe(element));const active=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){nav.querySelectorAll('a[href^="#"]').forEach(link=>{const current=link.getAttribute('href')==='#'+entry.target.id;link.classList.toggle('active',current);if(current)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}}),{rootMargin:'-15% 0px -55% 0px'});document.querySelectorAll('main section[id]').forEach(section=>active.observe(section));}
let scheduled=false;function updateProgress(){const max=document.documentElement.scrollHeight-window.innerHeight;document.querySelector('.progress').style.transform=`scaleX(${max>0?Math.min(1,window.scrollY/max):0})`;scheduled=false;}window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateProgress);}},{passive:true});window.addEventListener('resize',updateProgress);updateProgress();
