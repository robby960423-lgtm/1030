const fs=require('fs');
const p='app.js';let s=fs.readFileSync(p,'utf8');
let a=s.indexOf('function openModal('),b=s.indexOf('function closeModal()',a);
if(a<0||b<0)throw new Error('modal function markers missing');
const open=`function openModal(type='task',editId=null){const task=type==='task',existing=editId?(task?data.tasks:data.events).find(x=>x.id===editId):null;$('#entryType').value=type;$('#modalTitle').textContent=existing?(task?'編輯任務':'編輯行程'):(task?'新增任務':'新增行程');$('#modalKicker').textContent=task?'ADD SOMETHING TO YOUR DAY':'MAKE TIME FOR WHAT MATTERS';$('#entryName').placeholder=task?'例如：整理本週工作計畫':'例如：和朋友喝咖啡';$('#dateField label').innerHTML=task?'截止日期 <span class="required">*</span>':'行程日期 <span class="required">*</span>';$('#entryDate').value=existing?existing.date:selectedDate;$('#entryDate').min=task?todayISO():'';$('#entryLead').value=existing?(existing.lead??1):'1';$('#entryLead').disabled=!task;$('#leadField').style.opacity=task?'1':'.45';$('#timeField').hidden=task;$('#durationField').hidden=task;if(existing){$('#entryName').value=existing.title;if(!task){$('#entryTime').value=existing.time||'09:00';$('#entryDuration').value=String(existing.duration||60)}}$('#modalNote').innerHTML=task?'<span>✳</span>必填名稱與截止日期，其餘設定可留白。':'<span>✳</span>每天早上 9:20 提醒當日所有固定時間行程。';$('#submitEntry').innerHTML=existing?(task?'儲存任務 <span>→</span>':'儲存行程 <span>→</span>'):(task?'新增任務 <span>→</span>':'新增行程 <span>→</span>');$('#entryForm').dataset.editId=editId||'';$('#modalBackdrop').classList.add('open');$('#modalBackdrop').setAttribute('aria-hidden','false');document.body.style.overflow='hidden';setTimeout(()=>$('#entryName').focus(),60)}
`;
s=s.slice(0,a)+open+s.slice(b);
a=s.indexOf('function closeModal()');b=s.indexOf("$$('.add-task-trigger')",a);
if(a<0||b<0)throw new Error('close modal markers missing');
s=s.slice(0,a)+`function closeModal(){$('#entryForm').dataset.editId='';$('#modalBackdrop').classList.remove('open');$('#modalBackdrop').setAttribute('aria-hidden','true');document.body.style.overflow='';$('#entryForm').reset()}
`+s.slice(b);
a=s.indexOf("$('#entryForm').addEventListener('submit'");b=s.indexOf("$('#closeModal').addEventListener",a);
if(a<0||b<0)throw new Error('submit markers missing');
const submit=`$('#entryForm').addEventListener('submit',e=>{e.preventDefault();const type=$('#entryType').value,title=$('#entryName').value.trim(),date=$('#entryDate').value,editId=$('#entryForm').dataset.editId;if(!title||!date)return;const id=editId||(crypto.randomUUID?crypto.randomUUID():String(Date.now()));if(type==='task'){const item=editId?data.tasks.find(t=>t.id===editId):null;if(item){Object.assign(item,{title,date,lead:Math.max(0,Number($('#entryLead').value)||0)});toast('任務已更新')}else{data.tasks.push({id,title,date,lead:Math.max(0,Number($('#entryLead').value)||0),done:false});toast('任務已加入，期限幫你記好了')}}else{const item=editId?data.events.find(x=>x.id===editId):null;if(item){Object.assign(item,{title,date,time:$('#entryTime').value||'09:00',duration:Number($('#entryDuration').value)||60});toast('行程已更新')}else{data.events.push({id,title,date,time:$('#entryTime').value||'09:00',duration:Number($('#entryDuration').value)||60});toast('行程已加入當日安排')}}persist();closeModal();render()});
`;
s=s.slice(0,a)+submit+s.slice(b);
const cal='function renderCalendar()';a=s.indexOf(cal);
if(a<0)throw new Error('calendar marker missing');
s=s.slice(0,a)+`$$('[data-edit-task]').forEach(b=>b.addEventListener('click',()=>openModal('task',b.dataset.editTask)));
`+s.slice(a);
fs.writeFileSync(p,s);
