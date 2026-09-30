const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }));
const services = {
 consulting: ['Quality management consulting', 'Practical support for developing, implementing and maintaining quality management systems.', ['API Q1 and API Q2 requirements support', 'ISO 9001 quality management systems', 'System development, documentation and maintenance']],
 audit: ['Auditing services', 'Understand your gaps and create a clear path toward improvement.', ['Internal, supplier and HSE audits', 'Gap assessments and pre-certification reviews', 'Corrective action support']],
 inspection: ['Inspection services', 'Specialist oversight for equipment, structures and supplier activities.', ['Vendor and source inspection', 'AWS-certified welding inspection expertise', 'Drilling-rig and well-servicing structural inspections']],
 training: ['Quality, risk and auditor training', 'Develop practical capability through online and customized instructor-led learning.', ['Quality management training', 'Risk and auditor learning', 'Explore current offerings at TIEC Academy']]
};
const dialog = document.querySelector('dialog');
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => { const [title, copy, bullets] = services[button.dataset.service]; document.querySelector('#detail-title').textContent = title; document.querySelector('#detail-copy').textContent = copy; const list = document.querySelector('#detail-list'); list.replaceChildren(...bullets.map(text => { const li = document.createElement('li'); li.textContent = text; return li; })); dialog.showModal(); }));
dialog.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.querySelector('a').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
document.querySelector('form').addEventListener('submit', event => { event.preventDefault(); const data = new FormData(event.currentTarget); document.querySelector('.form-status').textContent = `Preview ready for ${data.get('name')}: ${data.get('service')}. This inquiry has not been sent or saved. Please contact TIEC through its official website for a real request.`; });
