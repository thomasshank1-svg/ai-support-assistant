let lastQuestion='';
async function refresh(){
 const state=await api('state');$('#mode').textContent=state.mode;
 $('#documents').innerHTML=state.documents.map(d=>`<details class="item"><summary>${esc(d.title)}</summary><p>${esc(d.text)}</p></details>`).join('');
 $('#tickets').innerHTML=state.tickets.length?state.tickets.map(t=>`<div class="item"><div class="row between"><strong>#${t.id}</strong><span class="pill">${esc(t.status)}</span></div><p class="small">${esc(t.question)}</p></div>`).join(''):'<p class="muted small">No open tickets. Unanswered questions can be saved here.</p>';
}
$('#ask-form').addEventListener('submit',e=>{e.preventDefault();action($('#ask'),async()=>{
 const question=$('#question').value.trim();lastQuestion=question;
 const result=await api('ask',{question});
 $('#conversation').insertAdjacentHTML('beforeend',`<div class="message user">${esc(question)}</div><div class="message"><span class="pill">${esc(result.mode)}</span><p>${esc(result.answer)}</p>${result.sources.length?`<div class="source small">Sources: ${result.sources.map(s=>esc(s.title)).join(' · ')}</div>`:''}</div>`);
 $('#conversation').scrollTop=$('#conversation').scrollHeight;
 if(result.warning)toast(result.warning);
});});
$('#handoff').onclick=()=>action($('#handoff'),async()=>{const result=await api('tickets',{question:$('#question').value.trim()||lastQuestion});await refresh();toast(`Ticket #${result.id} saved to the local support queue.`);});
document.querySelectorAll('[data-question]').forEach(b=>b.onclick=()=>{$('#question').value=b.dataset.question;$('#ask-form').requestSubmit();});
refresh().catch(e=>toast(e.message));
