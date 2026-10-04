const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
$('#menu')?.addEventListener('click',()=>$('nav ul').classList.toggle('open'));
$$('nav a:not(.logo)').forEach(a=>{if(a.getAttribute('href')===location.pathname.split('/').pop()||(a.getAttribute('href')==='index.html'&&!location.pathname.split('/').pop()))a.classList.add('on')});
$$('.year').forEach(e=>e.textContent=new Date().getFullYear());
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');$$('.bar i',e.target).forEach(b=>b.style.width=b.dataset.w+'%');io.unobserve(e.target)}}),{threshold:.15});
$$('.reveal').forEach((e,i)=>{e.style.transitionDelay=(i%4)*.08+'s';io.observe(e)});
$$('.card').forEach(c=>{c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(700px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-4px)`});c.addEventListener('mouseleave',()=>c.style.transform='')});
const ty=$('#typed');if(ty){const w=['Systems Engineer','Cybersecurity Student','Cloud & Network Specialist','CEO, Cyber_Techx Engineering'];let i=0,j=0,del=false;(function t(){const s=w[i];ty.textContent=s.slice(0,j);if(!del&&j===s.length){del=true;return setTimeout(t,1400)}if(del&&j===0){del=false;i=(i+1)%w.length}j+=del?-1:1;setTimeout(t,del?40:80)})()}
$$('[data-count]').forEach(el=>{const n=+el.dataset.count;let v=0;const o=new IntersectionObserver(([e])=>{if(!e.isIntersecting)return;o.disconnect();const k=setInterval(()=>{v+=Math.ceil(n/40);if(v>=n){v=n;clearInterval(k)}el.textContent=v+(el.dataset.suffix||'')},35)});o.observe(el)});
// Academic planner
const form=$('#taskForm');if(form){let tasks=JSON.parse(localStorage.getItem('tasks')||'[]');const ul=$('#list');
const save=()=>localStorage.setItem('tasks',JSON.stringify(tasks));
function render(){ul.innerHTML='';tasks.forEach((t,i)=>{const li=document.createElement('li');li.className=t.done?'done':'';li.innerHTML=`<input type="checkbox" ${t.done?'checked':''} aria-label="Complete task"><span></span><small>${t.due||''}</small><button aria-label="Delete task">✕</button>`;$('span',li).textContent=t.text;$('input',li).onchange=()=>{tasks[i].done=!t.done;save();render()};$('button',li).onclick=()=>{li.style.opacity=0;setTimeout(()=>{tasks.splice(i,1);save();render()},200)};ul.append(li)});
const d=tasks.filter(t=>t.done).length;$('#count').textContent=`${tasks.length} total · ${d} completed · ${tasks.length-d} pending`}
form.addEventListener('submit',e=>{e.preventDefault();const v=$('#taskText').value.trim();if(!v)return;tasks.push({text:v,due:$('#taskDue').value,done:false});save();form.reset();render()});render()}
// Contact validation
const cf=$('#contactForm');if(cf){const rules={name:v=>v?'':'Name is required',email:v=>!v?'Email is required':/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)?'':'Enter a valid email address',phone:v=>!v?'Phone number is required':/^\d+$/.test(v)?'':'Phone must contain digits only',message:v=>v?'':'Message cannot be empty'};
cf.addEventListener('submit',e=>{e.preventDefault();let ok=true;Object.keys(rules).forEach(k=>{const f=cf.elements[k],m=rules[k](f.value.trim());$('#e-'+k).textContent=m;if(m)ok=false});
const s=$('#status');s.textContent=ok?'✅ Thank you, '+cf.elements.name.value.trim()+'! Your message has been sent (simulated).':'';if(ok)cf.reset()})}
