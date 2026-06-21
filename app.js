/* ===================== GLOBAL ===================== */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
/* ===================== LOADER ===================== */
window.addEventListener('load', () => {
  let pct = 0;
  const pctEl = document.getElementById('loader-pct');
  const t = setInterval(() => {
    pct = Math.min(100, pct + Math.ceil(Math.random()*18));
    pctEl.textContent = pct + '%';
    if (pct >= 100) {
      clearInterval(t);
      setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
        startTyping();
        revealOnLoad();
      }, 250);
    }
  }, 120);
});
 
/* ===================== CUSTOM CURSOR ===================== */
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
const mouseLight = document.getElementById('mouse-light');
let mx = innerWidth/2, my = innerHeight/2, rx = mx, ry = my;
window.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx+'px'; dot.style.top = my+'px';
  mouseLight.style.left = mx+'px'; mouseLight.style.top = my+'px';
});
(function animRing(){
  rx += (mx-rx)*0.16; ry += (my-ry)*0.16;
  ring.style.left = rx+'px'; ring.style.top = ry+'px';
  requestAnimationFrame(animRing);
})();
document.querySelectorAll('a,button,.project-card,.skill-cat,input,textarea').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-grow'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-grow'));
});
 
/* ===================== SCROLL PROGRESS ===================== */
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = (h.scrollTop)/(h.scrollHeight - h.clientHeight) * 100;
  progressBar.style.width = pct + '%';
});
 
/* ===================== NAV ===================== */
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');
navToggle.addEventListener('click', ()=> navList.classList.toggle('open'));
navList.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navList.classList.remove('open')));
 
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  themeToggle.textContent = document.documentElement.classList.contains('light') ? '☀️' : '🌙';
});
 
/* ===================== TYPING ANIMATION ===================== */
const typingTarget = document.getElementById('typing');
const phrases = [
  'building generative AI applications…',
  'training neural networks…',
  'automating the web with Python…',
  'turning data into decisions…'
];
function startTyping(){
  if (reduceMotion) { typingTarget.textContent = phrases[0]; return; }
  let pi=0, ci=0, deleting=false;
  function tick(){
    const phrase = phrases[pi];
    typingTarget.textContent = phrase.slice(0, ci);
    if (!deleting){
      ci++;
      if (ci > phrase.length){ deleting = true; setTimeout(tick, 1400); return; }
    } else {
      ci--;
      if (ci === 0){ deleting=false; pi=(pi+1)%phrases.length; }
    }
    setTimeout(tick, deleting ? 28 : 48);
  }
  tick();
}
 
/* ===================== STAT COUNTER ===================== */
function animateCounters(){
  document.querySelectorAll('[data-count]').forEach(el=>{
    const target = parseInt(el.dataset.count,10);
    let cur = 0;
    const step = Math.max(1, Math.ceil(target/40));
    const t = setInterval(()=>{
      cur += step;
      if (cur >= target){ cur = target; clearInterval(t); }
      el.textContent = cur + '+';
    }, 40);
  });
}
 
/* ===================== SCROLL REVEAL ===================== */
function revealOnLoad(){
  if (window.gsap && window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll('.reveal').forEach((el,i)=>{
      gsap.to(el, {
        opacity:1, y:0, duration:0.8, ease:'power3.out',
        scrollTrigger:{ trigger: el, start:'top 88%' }
      });
    });
    ScrollTrigger.create({
      trigger:'#about', start:'top 75%',
      onEnter: () => animateCounters()
    });
  } else {
    document.querySelectorAll('.reveal').forEach(el=>{ el.style.opacity=1; el.style.transform='none'; });
    animateCounters();
  }
}
 
/* ===================== CONTACT FORM ===================== */
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', e => {
  e.preventDefault();
  status.textContent = 'Sending…';
  setTimeout(()=>{
    status.textContent = '✓ Message ready — opening your email client…';
    const name = document.getElementById('cf-name').value;
    const email = document.getElementById('cf-email').value;
    const msg = document.getElementById('cf-msg').value;
    const body = encodeURIComponent(`From: ${name} (${email})\n\n${msg}`);
    window.location.href = `mailto:dakshvyas750@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${body}`;
    form.reset();
  }, 700);
});
 
/* ===================== RESUME BUTTON ===================== */
document.getElementById('resume-btn').addEventListener('click', e => {
  e.preventDefault();
  window.location.href = 'mailto:dakshvyas750@gmail.com?subject=Resume Request';
});
 
/* ===================== CHATBOT WIDGET ===================== */
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatBody = document.getElementById('chat-body');
chatToggle.addEventListener('click', () => chatWindow.classList.toggle('open'));
const answers = {
  skills: "Daksh works across Python, C/C++/Java, SQL/MySQL, PyTorch, Neural Networks, CNNs, Generative AI, NumPy/Pandas, Flask, Selenium/Playwright, Docker, Power BI and more.",
  projects: "Highlights: a Web Scraping Automation System (Selenium + Playwright, 200+ products extracted), an AI-based website build, and a Python/Pygame Snake Game.",
  contact: "You can reach Daksh at dakshvyas750@gmail.com, +91-7803031026, or on LinkedIn at linkedin.com/in/daksh-vyas.",
  education: "Daksh is pursuing a B.Tech in Computer Science (2024–2028) at Swami Vivekanand Group of Engineering, Indore, with a current CGPA of 7.23."
};
function addMsg(text, who){
  const m = document.createElement('div');
  m.className = 'msg ' + who;
  m.textContent = text;
  chatBody.appendChild(m);
  chatBody.scrollTop = chatBody.scrollHeight;
}
document.querySelectorAll('.chat-quick button').forEach(b=>{
  b.addEventListener('click', ()=>{
    addMsg(b.textContent, 'user');
    setTimeout(()=> addMsg(answers[b.dataset.q], 'bot'), 400);
  });
});
 
/* ===================== THREE.JS — PARTICLE FIELD ===================== */
(function particleField(){
  const canvas = document.getElementById('particle-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true });
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 1000);
  camera.position.z = 60;
 
  const count = window.innerWidth < 700 ? 400 : 900;
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count*3);
  for (let i=0;i<count;i++){
    positions[i*3] = (Math.random()-0.5)*200;
    positions[i*3+1] = (Math.random()-0.5)*200;
    positions[i*3+2] = (Math.random()-0.5)*200;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(positions,3));
  const mat = new THREE.PointsMaterial({ color:0x00f5ff, size:0.6, transparent:true, opacity:0.55 });
  const points = new THREE.Points(geo, mat);
  scene.add(points);
 
  function resize(){
    const w = canvas.clientWidth || innerWidth, h = canvas.clientHeight || innerHeight;
    renderer.setSize(w,h,false);
    camera.aspect = w/h; camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize); resize();
 
  let mxN=0, myN=0;
  window.addEventListener('mousemove', e=>{
    mxN = (e.clientX/innerWidth - 0.5);
    myN = (e.clientY/innerHeight - 0.5);
  });
 
  function loop(){
    points.rotation.y += 0.0006;
    points.rotation.x += 0.0002;
    camera.position.x += (mxN*8 - camera.position.x)*0.02;
    camera.position.y += (-myN*8 - camera.position.y)*0.02;
    camera.lookAt(scene.position);
    renderer.render(scene,camera);
    requestAnimationFrame(loop);
  }
  if (!reduceMotion) loop(); else renderer.render(scene,camera);
})();
 
/* ===================== THREE.JS — AI BRAIN (HERO) ===================== */
(function aiBrain(){
  const canvas = document.getElementById('hero-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true });
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 9;
 
  const group = new THREE.Group();
  scene.add(group);
 
  // Core brain shape: deformed icosahedron wireframe
  const coreGeo = new THREE.IcosahedronGeometry(2.6, 3);
  const posAttr = coreGeo.attributes.position;
  for (let i=0;i<posAttr.count;i++){
    const x=posAttr.getX(i), y=posAttr.getY(i), z=posAttr.getZ(i);
    const n = (Math.sin(x*1.8)+Math.cos(y*1.8)+Math.sin(z*1.8))*0.12;
    const len = Math.sqrt(x*x+y*y+z*z);
    const scale = (len+n)/len;
    posAttr.setXYZ(i, x*scale, y*scale, z*scale);
  }
  coreGeo.computeVertexNormals();
  const coreMat = new THREE.MeshBasicMaterial({ color:0x00f5ff, wireframe:true, transparent:true, opacity:0.35 });
  const core = new THREE.Mesh(coreGeo, coreMat);
  group.add(core);
 
  const coreMat2 = new THREE.MeshBasicMaterial({ color:0x7b61ff, wireframe:true, transparent:true, opacity:0.18 });
  const core2 = new THREE.Mesh(new THREE.IcosahedronGeometry(2.85, 2), coreMat2);
  group.add(core2);
 
  // Neural network nodes + connections
  const nodeCount = window.innerWidth < 700 ? 36 : 60;
  const nodePositions = [];
  for (let i=0;i<nodeCount;i++){
    const r = 3.4 + Math.random()*1.6;
    const theta = Math.random()*Math.PI*2;
    const phi = Math.acos((Math.random()*2)-1);
    const x = r*Math.sin(phi)*Math.cos(theta);
    const y = r*Math.sin(phi)*Math.sin(theta);
    const z = r*Math.cos(phi);
    nodePositions.push(new THREE.Vector3(x,y,z));
  }
  const nodeGeo = new THREE.BufferGeometry();
  const nodeArr = new Float32Array(nodeCount*3);
  nodePositions.forEach((p,i)=>{ nodeArr[i*3]=p.x; nodeArr[i*3+1]=p.y; nodeArr[i*3+2]=p.z; });
  nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodeArr,3));
  const nodeMat = new THREE.PointsMaterial({ color:0xff4ecd, size:0.09, transparent:true, opacity:0.9 });
  const nodes = new THREE.Points(nodeGeo, nodeMat);
  group.add(nodes);
 
  // connections between nearby nodes
  const lineGeo = new THREE.BufferGeometry();
  const linePts = [];
  for (let i=0;i<nodePositions.length;i++){
    for (let j=i+1;j<nodePositions.length;j++){
      if (nodePositions[i].distanceTo(nodePositions[j]) < 1.8 && Math.random() < 0.35){
        linePts.push(nodePositions[i].x,nodePositions[i].y,nodePositions[i].z);
        linePts.push(nodePositions[j].x,nodePositions[j].y,nodePositions[j].z);
      }
    }
  }
  lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePts),3));
  const lineMat = new THREE.LineBasicMaterial({ color:0x7b61ff, transparent:true, opacity:0.22 });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  group.add(lines);
 
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const light1 = new THREE.PointLight(0x00f5ff, 1.4, 50);
  light1.position.set(6,4,6);
  scene.add(light1);
  const light2 = new THREE.PointLight(0xff4ecd, 1.0, 50);
  light2.position.set(-6,-4,4);
  scene.add(light2);
 
  function resize(){
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w,h,false);
    camera.aspect = w/h; camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize); resize();
 
  let mxN=0, myN=0;
  window.addEventListener('mousemove', e=>{
    mxN = (e.clientX/innerWidth - 0.5);
    myN = (e.clientY/innerHeight - 0.5);
  });
 
  function loop(t){
    group.rotation.y += 0.0028;
    group.rotation.x = Math.sin(t*0.0002)*0.15;
    group.rotation.y += mxN*0.002;
    group.rotation.x += -myN*0.001;
    core.rotation.y -= 0.0015;
    core2.rotation.y += 0.001;
    nodeMat.size = 0.09 + Math.sin(t*0.002)*0.02;
    renderer.render(scene,camera);
    if (!reduceMotion) requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
 
/* ===================== THREE.JS — SKILL SPHERE ===================== */
(function skillSphere(){
  const wrap = document.querySelector('.skill-sphere-wrap');
  const canvas = document.getElementById('skill-canvas');
  if (!wrap || !canvas) return;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true });
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 11;
 
  const skills = ['Python','C','C++','Java','SQL','MySQL','PyTorch','Neural Nets','CNN','GenAI',
    'NumPy','Pandas','Matplotlib','Seaborn','Selenium','Playwright','Flask','Docker','GitHub',
    'Power BI','Excel','VS Code','Android Studio'];
 
  const group = new THREE.Group();
  scene.add(group);
 
  const radius = 4.4;
  const n = skills.length;
  const labelObjs = [];
 
  // create sprite labels using canvas textures
  function makeLabel(text, accent){
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d');
    const scale = 4;
    c.width = 256*scale; c.height = 64*scale;
    ctx.scale(scale,scale);
    ctx.font = '600 26px Space Grotesk, sans-serif';
    const w = ctx.measureText(text).width + 40;
    c.width = w*scale; c.height = 64*scale;
    ctx.scale(scale,scale);
    ctx.font = '600 26px Space Grotesk, sans-serif';
    ctx.fillStyle = 'rgba(10,15,36,0.55)';
    roundRect(ctx, 2, 8, w-4, 48, 24);
    ctx.fill();
    ctx.strokeStyle = accent; ctx.lineWidth = 1.5;
    roundRect(ctx, 2, 8, w-4, 48, 24); ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 20, 32);
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    const mat = new THREE.SpriteMaterial({ map:tex, transparent:true });
    const sprite = new THREE.Sprite(mat);
    const ratio = c.width/c.height;
    sprite.scale.set(1.1*ratio, 1.1, 1);
    return sprite;
  }
  function roundRect(ctx,x,y,w,h,r){
    ctx.beginPath();
    ctx.moveTo(x+r,y);
    ctx.arcTo(x+w,y,x+w,y+h,r);
    ctx.arcTo(x+w,y+h,x,y+h,r);
    ctx.arcTo(x,y+h,x,y,r);
    ctx.arcTo(x,y,x+w,y,r);
    ctx.closePath();
  }
 
  const accents = ['#00F5FF','#7B61FF','#FF4ECD'];
  for (let i=0;i<n;i++){
    const phi = Math.acos(1 - 2*(i+0.5)/n);
    const theta = Math.PI*(1+Math.sqrt(5))*(i+0.5);
    const x = radius*Math.sin(phi)*Math.cos(theta);
    const y = radius*Math.sin(phi)*Math.sin(theta);
    const z = radius*Math.cos(phi);
    const sprite = makeLabel(skills[i], accents[i%3]);
    sprite.position.set(x,y,z);
    group.add(sprite);
    labelObjs.push(sprite);
  }
 
  const wireGeo = new THREE.IcosahedronGeometry(radius*0.96, 1);
  const wireMat = new THREE.MeshBasicMaterial({ color:0x7b61ff, wireframe:true, transparent:true, opacity:0.12 });
  group.add(new THREE.Mesh(wireGeo, wireMat));
 
  function resize(){
    const w = wrap.clientWidth, h = wrap.clientHeight;
    renderer.setSize(w,h,false);
    camera.aspect = w/h; camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize); resize();
 
  let dragging=false, lastX=0, lastY=0, velX=0.0018, velY=0;
  canvas.addEventListener('pointerdown', e=>{ dragging=true; lastX=e.clientX; lastY=e.clientY; });
  window.addEventListener('pointerup', ()=> dragging=false);
  window.addEventListener('pointermove', e=>{
    if (!dragging) return;
    const dx = e.clientX-lastX, dy = e.clientY-lastY;
    group.rotation.y += dx*0.005;
    group.rotation.x += dy*0.005;
    velX = dx*0.0006;
    lastX=e.clientX; lastY=e.clientY;
  });
 
  function loop(){
    if (!dragging){ group.rotation.y += velX; group.rotation.x *= 0.98; }
    labelObjs.forEach(s=> s.lookAt(camera.position));
    renderer.render(scene,camera);
    if (!reduceMotion) requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
 
