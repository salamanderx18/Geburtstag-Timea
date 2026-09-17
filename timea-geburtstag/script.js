// floating hearts background
  const heartsField = document.getElementById('heartsField');
  const heartEmojis = ['🤍','💗','🌸','✨'];
  for(let i=0;i<16;i++){
    const s = document.createElement('span');
    s.textContent = heartEmojis[i % heartEmojis.length];
    s.style.left = Math.random()*100 + 'vw';
    s.style.setProperty('--drift', (Math.random()*60-30)+'px');
    s.style.animationDuration = (10 + Math.random()*10) + 's';
    s.style.animationDelay = (Math.random()*10) + 's';
    s.style.fontSize = (14 + Math.random()*16) + 'px';
    heartsField.appendChild(s);
  }

  function showScreen(id){
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo(0,0);
  }

  function confettiBurst(){
    const canvas = document.createElement('canvas');
    canvas.style.position='fixed'; canvas.style.inset='0'; canvas.style.zIndex='40'; canvas.style.pointerEvents='none';
    canvas.width = innerWidth; canvas.height = innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const colors = ['#e8547c','#f0b64f','#ff9cb8','#ffffff','#c23a63'];
    const pieces = Array.from({length:80}, ()=>({
      x: innerWidth/2, y: innerHeight*0.35,
      vx:(Math.random()-0.5)*14, vy: Math.random()*-10-4,
      size: 5+Math.random()*5, color: colors[Math.floor(Math.random()*colors.length)],
      rot: Math.random()*360, vr:(Math.random()-0.5)*14
    }));
    let frame=0;
    function tick(){
      frame++;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pieces.forEach(p=>{
        p.vy += 0.35; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot*Math.PI/180);
        ctx.fillStyle = p.color; ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size*0.6);
        ctx.restore();
      });
      if(frame<110){ requestAnimationFrame(tick); } else { canvas.remove(); }
    }
    tick();
  }

  document.getElementById('cakeBtn').addEventListener('click', ()=>{
    confettiBurst();
    setTimeout(()=> showScreen('flowers'), 250);
    setTimeout(()=> showScreen('cardScreen'), 2400);
  });

  document.getElementById('toGifts').addEventListener('click', ()=> showScreen('gifts'));

  document.getElementById('playBtn').addEventListener('click', function(){
    window.open('https://www.youtube.com/watch?v=KlyXNRrsk4A','_blank');
  });

  function openOverlay(id){ document.getElementById(id).classList.add('active'); }
  function closeOverlay(el){ el.classList.remove('active'); }

  // ---- flower-cover transition: fills the screen with flowers, then
  // opens the target overlay underneath and lets the flowers wilt away ----
  const FLOWER_EMOJI = ['🌸','🌷','🌺','🌼','🌻','💐','🌹','🪷'];
  const flowerCover = document.getElementById('flowerCover');
  const FLOWER_COUNT = 8 * 16; // matches the CSS grid (8 cols x 16 rows)

  function buildFlowers(){
    flowerCover.innerHTML = '';
    for(let i=0;i<FLOWER_COUNT;i++){
      const s = document.createElement('span');
      s.className = 'fl';
      s.textContent = FLOWER_EMOJI[Math.floor(Math.random()*FLOWER_EMOJI.length)];
      s.style.animationDelay = (Math.random()*0.35) + 's';
      flowerCover.appendChild(s);
    }
  }

  function openWithFlowers(targetId){
    buildFlowers();
    flowerCover.classList.remove('wilt');
    flowerCover.classList.add('active','bloom');

    // once the bloom has fully covered the screen, open the real content behind it
    setTimeout(()=>{ openOverlay(targetId); }, 550);

    // hold fully covered for a beat, then let the flowers wilt away to reveal it
    setTimeout(()=>{
      flowerCover.classList.remove('bloom');
      flowerCover.classList.add('wilt');
    }, 900);

    // clean up once the wilt animation has finished
    setTimeout(()=>{
      flowerCover.classList.remove('active','wilt');
      flowerCover.innerHTML = '';
    }, 1400);
  }

  document.getElementById('giftFlower').addEventListener('click', ()=> openWithFlowers('ovFlower'));
  document.getElementById('giftPhoto').addEventListener('click', ()=> openWithFlowers('ovPhoto'));
  document.getElementById('giftLetter').addEventListener('click', ()=> openWithFlowers('ovLetter'));

  document.querySelectorAll('.overlay').forEach(ov=>{
    ov.addEventListener('click', (e)=>{ if(e.target === ov) closeOverlay(ov); });
  });
  document.querySelectorAll('[data-close]').forEach(btn=>{
    btn.addEventListener('click', (e)=> closeOverlay(e.target.closest('.overlay')));
  });

  // countdown
  (function(){
    const target = new Date('2026-09-20T00:00:00');
    const chip = document.getElementById('countdownChip');
    const now = new Date();
    const diff = target - now;
    if(diff > 0){
      const days = Math.ceil(diff / (1000*60*60*24));
      chip.textContent = days === 1 ? 'Nur noch 1 Tag bis zu deinem Fest 🎈' : 'Nur noch ' + days + ' Tage bis zu deinem Fest 🎈';
      chip.style.display='block';
    } else if (diff > -1000*60*60*24) {
      chip.textContent = 'Alles Gute zum Geburtstag! 🎉';
      chip.style.display='block';
    }
  })();
