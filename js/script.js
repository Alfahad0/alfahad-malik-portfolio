'use strict';
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
const metaTheme = document.querySelector('meta[name="theme-color"]');

function setTheme(theme){
  const isDark = theme === 'dark';
  root.setAttribute('data-theme', isDark ? 'dark' : 'light');
  root.dataset.theme = isDark ? 'dark' : 'light';
  if(themeIcon){
    themeIcon.textContent = isDark ? '☀' : '☾';
    themeIcon.style.transform = isDark ? 'rotate(360deg)' : 'rotate(0deg)';
  }
  if(themeToggle){
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  if(metaTheme){
    metaTheme.setAttribute('content', isDark ? '#0d1422' : '#f8fafc');
  }
  try{localStorage.setItem('alfahad-theme', isDark ? 'dark' : 'light')}catch(e){}
}

const savedTheme = localStorage.getItem('alfahad-theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme === 'dark' ? 'dark' : (savedTheme === 'light' ? 'light' : (prefersDark ? 'dark' : 'light'));
setTheme(initialTheme);

if(themeToggle){
  themeToggle.addEventListener('click', ()=>{
    const isDark = root.getAttribute('data-theme') === 'dark';
    setTheme(isDark ? 'light' : 'dark');
  });
}
function closeMenu(){nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open navigation');menuToggle.textContent='☰'}
menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');menuToggle.textContent=open?'✕':'☰'});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
document.getElementById('year').textContent=new Date().getFullYear();
const projects={
 mrdoc:{title:'Mr Doc — Medical Helping Website',description:'A comprehensive healthcare website that brings essential medical tools together in one accessible interface. Developed responsive components and connected frontend interactions with backend services.',features:['Interactive chatbot for initial medical guidance','Symptom checker for preliminary information','Responsive frontend and backend service integration'],tags:['HTML','CSS','JavaScript','MongoDB']},
 waste:{title:'Smart Waste Segregation Monitoring System',description:'An Arduino-based smart bin monitoring system using IoT sensors to identify bin fill levels and moisture conditions, with a companion web dashboard and data APIs.',features:['Monitor fill percentage and moisture conditions','Display bin status and disposal alerts on a dashboard','Store sensor readings through backend APIs for analytics'],tags:['Arduino','IoT Sensors','React.js','Node.js','Express.js','MongoDB']},
 petpal:{title:'PETPAL — Pet Care Assistant',description:'A pet-care web platform designed to help owners manage everyday pet health and wellbeing tasks, alongside pet adoption and listing features.',features:['Pet health records and vaccination tracking','Medication, feeding, grooming and exercise reminders','Symptom checker and pet marketplace module'],tags:['HTML','CSS','JavaScript','PHP','MySQL']},
 erp:{title:'Cloud-Based Academic Department ERP System',description:'A centralized academic management system developed to manage department-level student records, attendance, marks, and announcements. Features role-specific workflows for Students, Faculty, Department Office, and HOD with cloud data management via Google Sheets API.',features:['Centralized student records, attendance tracking, marks, and announcements','Role-specific workflows for Students, Faculty, Department Office, and HOD','Modular web application built with Python, Flask, Jinja2, HTML, CSS, and JS','Cloud academic data handling and reporting with Google Sheets API'],tags:['Python','Flask','Jinja2','HTML5','CSS3','JavaScript','Google Sheets API']}
};
const dialog=document.getElementById('project-dialog');
document.querySelectorAll('.detail-btn').forEach(button=>button.addEventListener('click',()=>{const project=projects[button.dataset.project];if(!project)return;document.getElementById('dialog-title').textContent=project.title;document.getElementById('dialog-description').textContent=project.description;const list=document.getElementById('dialog-features');list.replaceChildren(...project.features.map(item=>{const li=document.createElement('li');li.textContent=item;return li}));const tags=document.getElementById('dialog-tags');tags.replaceChildren(...project.tags.map(item=>{const tag=document.createElement('span');tag.textContent=item;return tag}));dialog.showModal()}));
function closeDialog(){dialog.close()}
document.getElementById('close-dialog').addEventListener('click',closeDialog);
document.getElementById('close-dialog-bottom').addEventListener('click',closeDialog);
dialog.addEventListener('click',e=>{if(e.target===dialog)closeDialog()});
document.getElementById('contact-form').addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;const name=form.elements.name.value.trim(),email=form.elements.email.value.trim(),message=form.elements.message.value.trim();const subject=encodeURIComponent('Portfolio inquiry from '+name);const body=encodeURIComponent('From: '+name+'\nReply to: '+email+'\n\n'+message);document.getElementById('form-note').textContent='Opening your email application. Please press Send there to deliver the message.';window.location.href='mailto:alfahadmalik00@gmail.com?subject='+subject+'&body='+body});
const links=[...nav.querySelectorAll('a')];if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id))}})},{rootMargin:'-25% 0px -60% 0px'});document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section))}
