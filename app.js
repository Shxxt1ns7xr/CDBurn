/* ===== PIXEL ART MADE IN CODE (change colours here) ===== */
const mk=(w,h,fn)=>{const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext&&c.getContext('2d');if(!x)return'none';fn((px,py,col)=>{x.fillStyle=col;x.fillRect(px,py,1,1)});return`url(${c.toDataURL()})`};
const disc=mk(40,40,p=>{for(let y=0;y<40;y++)for(let x=0;x<40;x++){const dx=x-19.5,dy=y-19.5,d=Math.hypot(dx,dy),a=Math.atan2(dy,dx);if(d>19.5)continue;let c='#4a4a4a';if(d>18)c='#1d1d1d';else if(d>9&&d<17&&(Math.abs(a+2.36)<.6||Math.abs(a-.78)<.6))c='#666';if(d<=7.6)c='#3a0810';if(d<=6.6)c='#e0192b';if(Math.abs(dx)<1.5&&Math.abs(dy)<1.5)c='#fff';p(x,y,c)}});
const dm=o=>mk(44,42,p=>{for(let y=0;y<42;y++)for(let x=0;x<44;x++){const cx=Math.min(x,43-x),cy=Math.min(y,41-y);if(cx<3&&cy<3&&(3-cx)**2+(3-cy)**2>9)continue;let c='#9aa0ad';if(x<2||y<2)c='#cfd4de';if(x>41||y>39)c='#5b6070';const d=Math.hypot(x-22,y-18.5);if(d<=15)c=o?'#05060c':'#b8bfcc';if(d<=15&&d>13.2)c=o?'#6cb8ff':'#7c8394';if(y>=34&&y<=36&&x>=8&&x<=36&&x%6<4)c=x<20?'#6cb8ff':'#e0192b';p(x,y,c)}});
const orn=mk(32,32,p=>{let s=11;const rn=()=>(s=s*16807%2147483647)/2147483647;for(let cy=0;cy<16;cy++)for(let cx=0;cx<16;cx++){const d=Math.hypot(cx,cy)/16;if(d<1&&rn()<1.15*(1-d)&&!(cx%3==1&&cy%3==1&&d<.65))for(let k=0;k<4;k++)p(cx*2+k%2,cy*2+(k>>1),'#6cb8ff')}});
{const R=document.documentElement.style;R.setProperty('--disc',disc);R.setProperty('--dmc',dm(0));R.setProperty('--dmo',dm(1));R.setProperty('--orn',orn);
const A=['#','##','#oo#'.slice(0,3).replace('oo','o'),'#oo#','#ooo#','#oooo#','#ooooo#','#oooooo#','#ooooooo#','#oooooooo#','#ooooo#####','#oo#oo#','#o#.#oo#','##..#oo#','#....#oo#','.....#oo#','......##'];
let r='';A.forEach((row,y)=>[...row].forEach((c,x)=>{if(c=='#'||c=='o')r+=`<rect x='${x*2}' y='${y*2}' width='2' height='2' fill='${c=='#'?'#000':'#fff'}'/>`}));
R.setProperty('--cur',`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='36' shape-rendering='crispEdges'>${r}</svg>`)}") 0 0,auto`)}
const $=s=>document.querySelector(s),O=$('#ov'),ov=(h,d)=>{O.innerHTML=h||'';O.className=d?'dim':''};
const hint=(t,e)=>{$('#hint').textContent=t;document.querySelectorAll('.pulse').forEach(x=>x.classList.remove('pulse'));e&&e.classList.add('pulse')};
const f=s=>Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');
const b64=s=>btoa(unescape(encodeURIComponent(s))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const ub=s=>decodeURIComponent(escape(atob(s.replace(/-/g,'+').replace(/_/g,'/'))));
const jp=u=>new Promise((ok,no)=>{const n='cb'+Math.random().toString(36).slice(2),s=document.createElement('script'),t=setTimeout(()=>{no();s.remove()},8000);window[n]=d=>{clearTimeout(t);ok(d);s.remove();delete window[n]};s.onerror=no;s.src=u+(u.includes('?')?'&':'?')+'callback='+n;document.head.append(s)});
const jf=async u=>{try{return await(await fetch(u)).json()}catch(e){return jp(u)}};
const mi=r=>({id:'i'+r.trackId,name:r.trackName,artist:r.artistName,art:r.artworkUrl100.replace('100x100','32x32'),big:r.artworkUrl100.replace('100x100','32x32'),prev:r.previewUrl,ms:r.trackTimeMillis||0,url:r.trackViewUrl});
const md=r=>({id:'d'+r.id,name:r.title,artist:r.artist.name,art:r.album.cover_small,big:r.album.cover_small,prev:r.preview,ms:r.duration*1000,url:r.link});
async function search(q){let a=[];try{a=((await jf('https://itunes.apple.com/search?media=music&entity=song&limit=15&term='+encodeURIComponent(q))).results||[]).filter(r=>r.previewUrl).map(mi)}catch(e){}
 if(a.length)return a;const d=await jp('https://api.deezer.com/search?output=jsonp&limit=15&q='+encodeURIComponent(q));return(d.data||[]).filter(r=>r.preview).map(md)}
async function lookup(ids){const I=ids.filter(i=>/^i?\d+$/.test(i)).map(i=>i.replace('i','')),by={};
 if(I.length)((await jf('https://itunes.apple.com/lookup?entity=song&id='+I.join(','))).results||[]).filter(r=>r.previewUrl).forEach(r=>by['i'+r.trackId]=mi(r));
 await Promise.all(ids.filter(i=>i[0]=='d').map(async i=>{try{const r=await jp('https://api.deezer.com/track/'+i.slice(1)+'?output=jsonp');if(r.preview)by[i]=md(r)}catch(e){}}));
 return ids.map(i=>by[/^\d+$/.test(i)?'i'+i:i]).filter(Boolean)}
let T=[],sel=[],R=[],BURN,RCV=false,cur=0,ins=false,open=false,NOTE='';
const au=new Audio(),pv=new Audio(),HOME='Step 1 · Click the CD to start burning your own mix.';
const art=()=>`url(${T[0].big}) center/cover`;

/* HOME */
$('#hcd').onkeydown=e=>e.key=='Enter'&&$('#hcd').click();
hint(HOME,$('#hcd'));
$('#hcd').onclick=()=>{hint('');ov(`<div class="win dlg"><div class="tb"><span>Burn CD</span></div><div class="pad"><p>Do you want to burn the CD?</p></div><div class="ft"><button id="y" class="pri">Yes</button><button id="n">No</button></div></div>`);
$('#y').onclick=()=>{sel=[];wiz(0)};$('#n').onclick=()=>{ov('');hint(HOME,$('#hcd'))}};

/* WIZARD */
function wiz(s){
 const side=['Select Music','Burn','Complete'].map((t,i)=>`<div class="st${i==s?' on':''}">${i+1}. ${t}</div>`).join('');
 const C=[`<h2>Select Music</h2><p>Type a song or artist, press <b>Search</b>, then click <b>Add</b> on the songs you want. Click a cover to hear a preview. When you're done, press <b>Next</b>.</p><form class="row" id="sf" autocomplete="off"><input id="q" type="text" placeholder="Search for music..." aria-label="Search for music"><button id="go" type="submit">Search</button></form><div class="list" id="rs"><p class="em">Search for music above.</p></div><h3 id="sc"></h3><div class="list" id="sl"></div>`,
 `<h2>Burning CD...</h2><p>Please wait while your CD is being burned.</p><p id="wr"></p><div class="bar"><i id="bf"></i></div><p id="pc" class="r"></p><div class="list" id="bl"></div>`,
 `<div class="ctr"><div class="cd" style="width:80px;height:80px"></div><h2>CD Burned Successfully!</h2><p>${sel.length} track${sel.length>1?'s':''} burned to disc.</p><p>Click <b>Finish</b> to eject your CD.</p></div>`][s];
 const F=['<button id="cn">Cancel</button><button id="nx" class="pri">Next ›</button>','<button id="cn">Cancel</button>','<button id="fn" class="pri">Finish</button>'][s];
 ov(`<div class="win wz"><div class="tb"><span>CD Burn Wizard</span><span class="x" id="cn2">x</span></div><div class="wb"><div class="sd">${side}</div><div class="mn">${C}</div></div><div class="ft">${F}</div></div>`);
 $('#cn2').onclick=()=>{clearInterval(BURN);pv.pause();ov('');hint(HOME,$('#hcd'))};
 if($('#cn'))$('#cn').onclick=$('#cn2').onclick;
 if(s==0){
  const row=(t,i,b)=>`<div class="it"><img src="${t.art}" data-p="${i}" title="Play preview"><span><b>${t.name}</b><br><small>${t.artist}</small></span>${b}</div>`;
  const drawRs=()=>{$('#rs').innerHTML=R.length?R.map((t,i)=>row(t,i,`<button data-a="${i}" ${sel.some(x=>x.id==t.id)?'disabled':''}>${sel.some(x=>x.id==t.id)?'Added':'Add'}</button>`)).join(''):'<p class="em">No songs found. Try another search.</p>'};
  const drawSel=()=>{$('#sc').textContent=`Selected Tracks (${sel.length})`;$('#sl').innerHTML=sel.length?sel.map((t,i)=>row(t,i,`<button data-r="${i}">Remove</button>`)).join(''):'<p class="em">No tracks selected yet.</p>';$('#nx').disabled=!sel.length};
  drawSel();
  const go=async()=>{const q=$('#q').value.trim();if(!q)return;$('#rs').innerHTML='<p class="em">Searching...</p>';try{R=await search(q);drawRs()}catch(e){$('#rs').innerHTML='<p class="em">Search failed. Check your internet connection and try again.</p>'}};
  $('#sf').onsubmit=e=>{e.preventDefault();go()};setTimeout(()=>$('#q').focus(),60);
  $('#rs').onclick=e=>{const d=e.target.dataset;if(d.p!=null){pv.src=R[d.p].prev;pv.play()}if(d.a!=null){if(sel.length>=30)return alert('A CD holds up to 30 tracks.');sel.push(R[d.a]);drawRs();drawSel()}};
  $('#sl').onclick=e=>{const d=e.target.dataset;if(d.p!=null){pv.src=sel[d.p].prev;pv.play()}if(d.r!=null){sel.splice(d.r,1);drawRs();drawSel()}};
  $('#nx').onclick=()=>{pv.pause();wiz(1)};
 }
 if(s==1){const t0=Date.now(),per=1800,tot=sel.length*per;
  BURN=setInterval(()=>{const e=Date.now()-t0,p=Math.min(1,e/tot),i=Math.min(sel.length-1,Math.floor(e/per));
   $('#bf').style.width=p*100+'%';$('#pc').textContent=Math.floor(p*100)+'%';$('#wr').textContent=`Writing track ${i+1} of ${sel.length} - ${sel[i].name}`;
   $('#bl').innerHTML=sel.map((t,j)=>`<div class="it"><b>${j+1}. ${t.name}</b><span>${j<i||p>=1?'Done':j==i?'Writing...':'Waiting'}</span></div>`).join('');
   if(p>=1){clearInterval(BURN);T=[...sel];wiz(2)}},60)}
 if(s==2)$('#fn').onclick=()=>{ov('');$('#home').classList.add('out');hint('');setTimeout(()=>{$('#home').hidden=true;stage()},600)};
}

/* STAGE */
function stage(){
 $('#stage').hidden=false;[...$('#stage').children].forEach(c=>c.classList.add('pop'));
 $('#cd').style.setProperty('--art',art());$('#cd').classList.add('art');cur=0;ins=false;open=false;dx=dy=0;
 if(RCV&&!$('#mk')){$('#stage').insertAdjacentHTML('beforeend',`<a id="mk" href="${location.href.split('?')[0]}">Make your own CD</a>`)}
 load(0);step();
}
function step(){
 if(ins)hint('Now playing! Use ⏮ ▶ ■ ⏭ to control it. Click ✉ Send to give this CD to a friend, or ⏏ Eject to take it out.',$('#bm'));
 else if(!open)hint('Step 2 · Click the CD player on the left to open its lid.',$('#dm'));
 else hint('Step 3 · Drag the CD onto the open player. The music starts by itself.',$('#cd'));
}
function load(i){cur=i;const t=T[i];au.src=t.prev;$('#pa').src=t.art;$('#pt').textContent=t.name;$('#pr').textContent=t.artist;
 $('#tc').textContent=`Tracks (${T.length})`;
 $('#tl').innerHTML=T.map((t,j)=>`<div class="it${j==i?' cur':''}" data-i="${j}"><span>${j+1}.</span><img src="${t.art}"><b>${t.name}</b><small>${t.artist}</small><small>${f(t.ms/1000)}</small>${RCV?`<a target="_blank" href="${t.url}">${String(t.id)[0]=='d'?'Deezer':'Apple'}</a><a target="_blank" href="https://open.spotify.com/search/${encodeURIComponent(t.name+' '+t.artist)}">Spotify</a>`:''}</div>`).join('')}
const need=()=>{if(!ins){hint(open?'Drag the CD onto the open player first.':'Click the CD player to open it, then drag the CD in.',open?$('#cd'):$('#dm'));return 1}};
function play(){if(need())return;if(au.paused){au.play();$('#cd').classList.add('spin');$('#bp').textContent='❚❚'}else{au.pause();$('#cd').classList.remove('spin');$('#bp').textContent='▶'}}
function stop(){au.pause();au.currentTime=0;$('#cd').classList.remove('spin');$('#bp').textContent='▶';$('#pf').style.width=0;$('#lcd').textContent=ins?'0:00 / 0:30':'--:-- / --:--'}
function go(i){if(need())return;load((i+T.length)%T.length);au.play();$('#cd').classList.add('spin');$('#bp').textContent='❚❚'}
au.ontimeupdate=()=>{const d=au.duration||30;$('#lcd').textContent=f(au.currentTime)+' / '+f(d);$('#pf').style.width=au.currentTime/d*100+'%'};
au.onended=()=>cur<T.length-1?go(cur+1):stop();
$('#bp').onclick=play;$('#bs').onclick=()=>{if(!need())stop()};$('#bn').onclick=()=>go(cur+1);$('#bv').onclick=()=>go(cur-1);
$('#tl').onclick=e=>{const r=e.target.closest('.it');if(r&&e.target.tagName!='A')go(+r.dataset.i)};
$('#dm').onclick=()=>{if(ins)return;open=!open;$('#dm').classList.toggle('open',open);step()};
$('#be').onclick=()=>{if(!ins){hint('There is no CD in the player yet.');return}stop();ins=false;dx=dy=0;const c=$('#cd');c.style.transition='transform .5s';c.style.transform='';$('#lcd').textContent='--:-- / --:--';step()};
let dx=0,dy=0,sx,sy,dr=0;const C=$('#cd');
C.onpointerdown=e=>{if(ins)return;dr=1;sx=e.clientX-dx;sy=e.clientY-dy;C.setPointerCapture(e.pointerId);C.style.transition='none';C.classList.remove('pulse')};
C.onpointermove=e=>{if(!dr)return;dx=e.clientX-sx;dy=e.clientY-sy;C.style.transform=`translate(${dx}px,${dy}px)`};
C.onpointerup=()=>{if(!dr)return;dr=0;C.style.transition='transform .4s';
 const a=C.getBoundingClientRect(),b=$('#dm').getBoundingClientRect(),ax=a.x+a.width/2,ay=a.y+a.height/2,bx=b.x+b.width/2,by=b.y+b.height*.44;
 if(Math.hypot(ax-bx,ay-by)>130){dx=dy=0;C.style.transform='';step();return}
 if(!open){dx=dy=0;C.style.transform='';hint('The lid is closed! Click the CD player to open it first.',$('#dm'));return}
 dx+=bx-ax;dy+=by-ay;C.style.transform=`translate(${dx}px,${dy}px)`;ins=true;load(0);setTimeout(()=>{au.play();C.classList.add('spin');$('#bp').textContent='❚❚';step()},400)};

/* SEND */
$('#bm').onclick=()=>{au.pause();$('#cd').classList.remove('spin');$('#bp').textContent='▶';
 const body=h=>`<div class="nt"><div>${h}</div><div class="case"><div class="cd art" style="--art:${art()}"></div><textarea id="nt" maxlength="60" placeholder="write a note here..."></textarea></div><div id="ac"></div></div>`;
 ov(body('Step 4 · Write a note on the CD (optional), then press <b>Send it</b>.'),1);hint('');
 $('#ac').innerHTML='<div class="row"><button id="sk">Skip</button><button id="si" class="pri">Send it</button></div>';
 const link=()=>{NOTE=$('#nt').value.trim();$('#nt').readOnly=true;
  const u=location.href.split('?')[0]+'?cd='+b64(T.map(t=>t.id).join(','))+(NOTE?'&note='+b64(NOTE):'');
  $('#ac').innerHTML=`<div class="win dlg" style="color:var(--ink);text-align:left;margin-top:-50px"><div class="tb"><span>Send CD to Friend</span></div><div class="pad"><b>Share this link with your friend:</b><p>Your friend can listen to 30-second previews and open every song in Spotify or Apple Music.</p><div class="row"><input id="lk" readonly value="${u}"><button id="cp" class="pri">Copy</button></div><button id="ct">Copy track list</button></div><div class="ft"><button id="dn">Done</button></div></div>`;
  const cb=(b,t,l)=>b.onclick=()=>{navigator.clipboard.writeText(t).catch(()=>{$('#lk').select();document.execCommand('copy')});b.textContent='Copied!';setTimeout(()=>b.textContent=l,1500)};
  cb($('#cp'),u,'Copy');cb($('#ct'),T.map((t,i)=>`${i+1}. ${t.name} - ${t.artist}`).join('\n'),'Copy track list');$('#dn').onclick=()=>{ov('');step()}};
 $('#sk').onclick=()=>{$('#nt').value='';link()};$('#si').onclick=link};

/* START: friend link or normal home */
(async()=>{const q=new URLSearchParams(location.search),ids=q.get('cd');if(!ids)return;
 try{T=await lookup(ub(ids).split(','));if(!T.length)throw 0;RCV=true;
  const n=q.get('note')?ub(q.get('note')):'';hint('');$('#home').hidden=true;
  ov(`<div class="nt"><div>Someone sent you a CD!</div><div class="case"><div class="cd art" style="--art:${art()}"></div><textarea readonly>${n.replace(/</g,'&lt;')}</textarea></div><button id="op" class="pri">Open it</button></div>`,1);
  $('#op').onclick=()=>{ov('');stage()}}catch(e){hint('Sorry, this CD link could not be opened.')}})();
