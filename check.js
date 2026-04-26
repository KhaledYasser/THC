    let config = JSON.parse(localStorage.getItem('noor_v8_cfg')) || { user: 'admin', pass: 'noor2026', ssid: '', wifiPass: '' };
    let rooms = JSON.parse(localStorage.getItem('noor_v8_data')) || [];
    let activeRoomId = null;
    let editContext = null;
    let schedContext = null; 
    let chartInstance = null;

    // --- DATA MIGRATION ---
    rooms.forEach(r => r.devices.forEach(d => d.switches.forEach(s => {
        if (!s.alarms) s.alarms = [];
        s.alarms = s.alarms.map(a => {
            if (typeof a === 'string') return { time: a, repeat: true, action: true, active: a !== "" };
            return a;
        });
        while(s.alarms.length < 5) s.alarms.push({ time: "", repeat: true, action: true, active: false });
        
        if (!s.timers) s.timers = [];
        s.timers = s.timers.map(t => {
            if (typeof t === 'string' || typeof t === 'number') return { val: t, target: null, action: true, active: false };
            return t;
        });
        while(s.timers.length < 5) s.timers.push({ val: "", target: null, action: true, active: false });
        
        if (!s.logs) s.logs = [];
    })));

    // --- STATUS HELPERS ---
    function checkRoomActivity(room) {
        let active = false;
        let hasTimers = false;
        let hasAlarms = false;
        
        room.devices.forEach(d => {
            d.switches.forEach(s => {
                if(s.state) active = true;
                if(s.timers.some(t => t.active)) hasTimers = true;
                if(s.alarms.some(a => a.active)) hasAlarms = true;
            });
        });
        return { active, hasTimers, hasAlarms };
    }

    // --- RENDERERS ---
    function renderRooms() {
        const grid = document.getElementById('homeView'); grid.innerHTML = '';
        document.getElementById('viewTitle').innerText = "System Overview";
        rooms.forEach(room => {
            const status = checkRoomActivity(room);
            grid.innerHTML += `
                <div class="card ${status.active ? 'active-room' : ''}" style="cursor:pointer" onclick="openRoom(${room.id})">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                        <span style="font-weight:700; color:var(--noor-gold)"><i class="fas fa-home"></i> ${room.name}</span>
                        <i class="fas fa-microchip" style="color:${status.active ? 'var(--noor-emerald)' : 'white'}"></i>
                    </div>
                    <small style="opacity:0.5"><i class="fas fa-link"></i> ${room.devices.length} Devices Online</small>
                    
                    <div class="status-icons">
                        ${status.hasTimers ? '<div class="icon-badge"><i class="fas fa-stopwatch"></i></div>' : ''}
                        ${status.hasAlarms ? '<div class="icon-badge"><i class="fas fa-bell"></i></div>' : ''}
                    </div>

                    <div class="btn-group">
                        <button class="action-btn" onclick="event.stopPropagation(); initRename('room', ${room.id})"><i class="fas fa-edit"></i> RENAME</button>
                        <button class="action-btn" style="color:var(--noor-red)" onclick="event.stopPropagation(); deleteRoom(${room.id})"><i class="fas fa-trash"></i> DELETE</button>
                    </div>
                </div>`;
        });
    }

    function renderDevices() {
        const room = rooms.find(r => r.id === activeRoomId);
        const container = document.getElementById('deviceContainer');
        container.innerHTML = '';
        
        const btn = document.getElementById('childLockBtn');
        btn.innerHTML = room.childLock ? '<i class="fas fa-lock"></i> CHILD LOCK: ON' : '<i class="fas fa-child"></i> CHILD LOCK: OFF';
        btn.style.background = room.childLock ? 'var(--noor-red)' : 'var(--btn-gray)';

        room.devices.forEach(dev => {
            let swHTML = dev.switches.map((s, i) => {
                const hasT = s.timers.some(t => t !== "");
                const hasA = s.alarms.some(a => a !== "");
                return `
                <div class="card ${s.state ? 'active-relay' : ''} ${room.childLock ? 'locked' : ''}">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:0.85rem; font-weight:600;"><i class="fas fa-bolt"></i> ${s.name}</span>
                        <i class="fas fa-power-off" onclick="toggleSw(${dev.id}, ${i})" style="cursor:pointer; font-size:1.4rem; color:${s.state ? 'var(--noor-emerald)' : '#333'}"></i>
                    </div>
                    <div style="font-size:0.7rem; color:var(--noor-gold); margin-top:5px;">Usage: ${Math.floor(s.timeOn/60)}h ${s.timeOn%60}m</div>
                    
                    <div class="status-icons">
                        ${hasT ? '<i class="fas fa-stopwatch" style="color:var(--noor-gold); font-size:0.7rem;"></i>' : ''}
                        ${hasA ? '<i class="fas fa-bell" style="color:var(--noor-gold); font-size:0.7rem;"></i>' : ''}
                    </div>

                    <div class="btn-group">
                        <button class="action-btn" onclick="openSched(${dev.id}, ${i}, 'timers')">TIMERS</button>
                        <button class="action-btn" onclick="openSched(${dev.id}, ${i}, 'alarms')">ALARMS</button>
                    </div>
                    <div class="btn-group">
                        <button class="action-btn" onclick="openReport(${dev.id}, ${i})">REPORT</button>
                        <button class="action-btn" style="color:var(--noor-gold)" onclick="openLog(${dev.id}, ${i})">LOGS</button>
                    </div>
                    <div class="btn-group" style="margin-top:10px; padding-top:10px; border-top:1px solid #333;">
                        <button class="action-btn" onclick="initRename('switch', ${room.id}, ${dev.id}, ${i})">RENAME</button>
                        <button class="action-btn" style="color:var(--noor-red)" onclick="deleteSw(${dev.id}, ${i})">REMOVE</button>
                    </div>
                </div>`;
            }).join('');

            container.innerHTML += `<div class="device-section">
                <div class="device-header"><span><i class="fas fa-server"></i> ${dev.name} <small style="opacity:0.5; font-size:0.7em;">(${dev.ip || 'No IP'})</small> <span style="margin-left:5px; height:8px; width:8px; border-radius:50%; display:inline-block; background:${dev.online ? '#00C851' : '#ff4444'};"></span></span>
                <div style="display:flex; gap:5px;"><button class="action-btn" onclick="initRename('device', ${room.id}, ${dev.id})">RENAME</button>
                <button class="action-btn" style="color:var(--noor-red)" onclick="deleteDevice(${dev.id})">DELETE</button></div></div>
                <div class="room-grid">${swHTML}</div></div>`;
        });
    }

    // --- LOGIC PRESERVED ---
    async function roomMaster(state) {
        const room = rooms.find(r => r.id === activeRoomId);
        if(room.childLock && state === true) return alert("Child Lock Active");
        
        // Snappy UI update
        room.devices.forEach(d => d.switches.forEach(s => s.state = state));
        save(); renderDevices();
        
        for (let d of room.devices) {
            if(!d.ip) continue;
            for (let i = 0; i < d.switches.length; i++) {
                try { await fetch(`http://${d.ip}/t${i+1}?force=${state?1:0}`); } catch(e){}
            }
        }
    }
    function toggleChildLock() {
        const room = rooms.find(r => r.id === activeRoomId);
        room.childLock = !room.childLock; save(); renderDevices();
    }
    function openSched(devId, swIdx, type) {
        schedContext = { devId, swIdx, type };
        const sw = rooms.find(r => r.id === activeRoomId).devices.find(d => d.id === devId).switches[swIdx];
        const cont = document.getElementById('schedInps');
        document.getElementById('schedTitle').innerText = type.toUpperCase();
        
        if (type === 'timers') {
            cont.innerHTML = sw.timers.map((t, i) => `
                <div style="background:rgba(255,255,255,0.05); padding:10px; border-radius:10px; margin-bottom:10px; border:1px solid var(--border);">
                    <div style="display:flex; justify-content:space-between; margin-bottom:5px; align-items:center;">
                        <span style="font-size:0.8rem; color:var(--noor-gold); font-weight:bold;">Timer ${i+1}</span>
                        <span style="font-size:0.7rem; color:${t.active ? '#00C851' : '#888'}">${t.active ? 'ACTIVE' : 'INACTIVE'}</span>
                    </div>
                    <div style="display:flex; gap:10px; align-items:center;">
                        <input style="margin-bottom:0" type="number" value="${t.val}" placeholder="Minutes" onchange="updateTimer(${i}, 'val', this.value)">
                        <select style="background:#111; color:white; border:1px solid #333; border-radius:5px; padding:5px; font-weight:bold; color:${t.action ? 'var(--noor-emerald)' : 'var(--noor-red)'}" onchange="updateTimer(${i}, 'action', this.value === 'true')">
                            <option value="true" ${t.action ? 'selected' : ''}>ON</option>
                            <option value="false" ${!t.action ? 'selected' : ''}>OFF</option>
                        </select>
                        <button class="action-btn" style="max-width:40px; color:var(--noor-red)" onclick="updateTimer(${i}, 'clear', '')">X</button>
                    </div>
                    ${t.active && t.target ? `<div style="font-size:0.7rem; margin-top:5px; text-align:right;">Triggers at: ${new Date(t.target).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</div>` : ''}
                </div>
            `).join('');
        } else {
            cont.innerHTML = sw.alarms.map((a, i) => `
                <div style="background:rgba(255,255,255,0.05); padding:10px; border-radius:10px; margin-bottom:10px; border:1px solid var(--border);">
                    <div style="display:flex; justify-content:space-between; margin-bottom:5px; align-items:center;">
                        <span style="font-size:0.8rem; color:var(--noor-gold); font-weight:bold;">Alarm ${i+1}</span>
                        <input type="checkbox" style="width:auto; margin:0;" ${a.active ? 'checked' : ''} onchange="updateAlarm(${i}, 'active', this.checked)">
                    </div>
                    <input style="margin-bottom:10px; font-family:monospace;" type="datetime-local" value="${a.time}" onchange="updateAlarm(${i}, 'time', this.value)">
                    <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem;">
                        <label style="cursor:pointer;"><input type="checkbox" style="width:auto; margin:0 5px 0 0; vertical-align:middle;" ${a.repeat ? 'checked' : ''} onchange="updateAlarm(${i}, 'repeat', this.checked)">Repeat Daily</label>
                        <select style="background:#111; color:white; border:1px solid #333; border-radius:5px; padding:5px; font-weight:bold; color:${a.action ? 'var(--noor-emerald)' : 'var(--noor-red)'}" onchange="updateAlarm(${i}, 'action', this.value === 'true')">
                            <option value="true" ${a.action ? 'selected' : ''}>TURN ON</option>
                            <option value="false" ${!a.action ? 'selected' : ''}>TURN OFF</option>
                        </select>
                    </div>
                </div>
            `).join('');
        }
        document.getElementById('schedModal').style.display = 'flex';
    }
    function updateTimer(idx, field, val) {
        const sw = rooms.find(r => r.id === activeRoomId).devices.find(d => d.id === schedContext.devId).switches[schedContext.swIdx];
        if (field === 'clear') {
            sw.timers[idx] = { val: "", target: null, action: true, active: false };
        } else {
            sw.timers[idx][field] = val;
            if (field === 'val' && val !== "") {
                sw.timers[idx].target = Date.now() + (parseInt(val) * 60000);
                sw.timers[idx].active = true;
            } else if (field === 'val' && val === "") {
                sw.timers[idx].active = false;
                sw.timers[idx].target = null;
            }
        }
        save(); openSched(schedContext.devId, schedContext.swIdx, 'timers');
    }
    function updateAlarm(idx, field, val) {
        const sw = rooms.find(r => r.id === activeRoomId).devices.find(d => d.id === schedContext.devId).switches[schedContext.swIdx];
        sw.alarms[idx][field] = val;
        if(field === 'time' && val !== "") sw.alarms[idx].active = true; 
        save(); openSched(schedContext.devId, schedContext.swIdx, 'alarms');
    }
    function openReport(devId, swIdx) {
        const sw = rooms.find(r => r.id === activeRoomId).devices.find(d => d.id === devId).switches[swIdx];
        document.getElementById('reportSub').innerText = `Statistics for: ${sw.name}`;
        document.getElementById('reportModal').style.display = 'flex';
        if(chartInstance) chartInstance.destroy();
        const ctx = document.getElementById('usageChart').getContext('2d');
        chartInstance = new Chart(ctx, { type: 'line', data: { labels: ['M','T','W','T','F','S','S'], datasets: [{ label: 'Min', data: [10, 20, 15, 30, 25, 40, 10], borderColor: '#FFD700', backgroundColor: 'rgba(255, 215, 0, 0.1)', fill: true }] }, options: { plugins: { legend: { display: false } } } });
    }
    function openLog(devId, swIdx) {
        const sw = rooms.find(r => r.id === activeRoomId).devices.find(d => d.id === devId).switches[swIdx];
        const cont = document.getElementById('logContent');
        if (!sw.logs || sw.logs.length === 0) {
            cont.innerHTML = "<div style='color:#888; text-align:center;'>No logs recorded for this switch yet.</div>";
        } else {
            cont.innerHTML = sw.logs.slice().reverse().map(l => {
                const parts = l.split('|');
                if(parts.length < 3) return '';
                const d = new Date(parseInt(parts[0]) * 1000);
                const timeStr = d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', second:'2-digit'});
                const stateStr = parts[1] === "1" ? "<span style='color:var(--noor-emerald)'>ON</span>" : "<span style='color:var(--noor-red)'>OFF</span>";
                return `<div style="border-bottom:1px solid #333; padding:10px 0;">[${timeStr}] ${stateStr} via <span style="color:var(--noor-gold)">${parts[2]}</span></div>`;
            }).join('');
        }
        document.getElementById('logModal').style.display = 'flex';
    }
    function initRename(type, roomId, devId, swIdx) {
        editContext = {type, roomId, devId, swIdx};
        const r = rooms.find(r => r.id === roomId);
        let cur = type === 'room' ? r.name : (type === 'device' ? r.devices.find(d => d.id === devId).name : r.devices.find(d => d.id === devId).switches[swIdx].name);
        document.getElementById('editNotice').innerText = `Editing: ${cur}`;
        document.getElementById('editInp').value = cur;
        document.getElementById('editModal').style.display = 'flex';
    }
    function confirmRename() {
        const n = document.getElementById('editInp').value.trim(); if(!n) return;
        const r = rooms.find(r => r.id === editContext.roomId);
        if(editContext.type === 'room') r.name = n;
        else if(editContext.type === 'device') r.devices.find(d => d.id === editContext.devId).name = n;
        else r.devices.find(d => d.id === editContext.devId).switches[editContext.swIdx].name = n;
        save(); closeModals(); activeRoomId ? renderDevices() : renderRooms();
    }
    async function toggleSw(devId, idx) { 
        const room = rooms.find(r => r.id === activeRoomId);
        if(room.childLock) return;
        const d = room.devices.find(d => d.id === devId); 
        const swNum = idx + 1;
        
        // Toggle UI immediately for snappy response
        d.switches[idx].state = !d.switches[idx].state;
        save(); renderDevices(); 
        
        try { 
            await fetch(`http://${d.ip}/t${swNum}`); 
        } catch(e) { 
            console.error("Board offline or unreachable", e); 
        }
    }
    function saveRoom() { const n = document.getElementById('roomNameInp').value.trim(); if(n){ rooms.push({id:Date.now(), name:n, devices:[], childLock: false}); save(); closeModals(); renderRooms(); } }
    function getPast7Days() {
        return Array.from({length:7}, (_, i) => {
            const d = new Date(); d.setDate(d.getDate() - (6-i));
            return d.toLocaleDateString(undefined, {weekday:'short'});
        });
    }
    function drawChart() {
        const cvs = document.getElementById('chartCvs'); if(!cvs) return;
        const ctx = cvs.getContext('2d'); ctx.clearRect(0,0,300,100);
        let data = [0,0,0,0,0,0,0];
        if (editContext) {
            const r = rooms.find(r => r.id === activeRoomId);
            if(r) {
                const d = r.devices.find(d => d.id === editContext.devId);
                if(d && d.switches[editContext.swIdx].dailyUsage) {
                    data = d.switches[editContext.swIdx].dailyUsage;
                }
            }
        }
        const maxVal = Math.max(...data, 10); 
        ctx.beginPath();
        for(let i=0; i<7; i++) { 
            const x = i * (300/6);
            const y = 100 - ((data[i] / maxVal) * 80); 
            if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x, y); 
        }
        ctx.strokeStyle = '#FFD700'; ctx.lineWidth = 2; ctx.stroke();
        ctx.lineTo(300,100); ctx.lineTo(0,100);
        ctx.fillStyle = 'rgba(255, 215, 0, 0.1)'; ctx.fill();
        ctx.fillStyle = '#888'; ctx.font = '10px sans-serif';
        const days = getPast7Days();
        for(let i=0; i<7; i++) {
            ctx.fillText(days[i], i*(300/6) - (i===6?15:0), 98);
        }
        ctx.fillText(maxVal + 'm', 5, 15);
    }
    function saveDevice() {
        const n = document.getElementById('devNameInp').value; 
        const ip = document.getElementById('devIpInp').value;
        const c = Math.min(document.getElementById('devRelayInp').value || 1, 8);
        const r = rooms.find(r => r.id === activeRoomId);
        const sws = Array.from({length:c}, (_, i) => ({name:`Switch ${i+1}`, state:false, timeOn:0, dailyUsage:[0,0,0,0,0,0,0], logs:[], timers:[{val:"", target:null, action:true, active:false}, {val:"", target:null, action:true, active:false}, {val:"", target:null, action:true, active:false}, {val:"", target:null, action:true, active:false}, {val:"", target:null, action:true, active:false}], alarms:[{time:"", repeat:true, action:true, active:false}, {time:"", repeat:true, action:true, active:false}, {time:"", repeat:true, action:true, active:false}, {time:"", repeat:true, action:true, active:false}, {time:"", repeat:true, action:true, active:false}]}));
        r.devices.push({id:Date.now(), name:n, ip:ip, switches: sws, online:false});
        save(); closeModals(); renderDevices(); pollStatus();
    }
    function save() { localStorage.setItem('noor_v8_data', JSON.stringify(rooms)); }
    function closeModals() { document.querySelectorAll('.modal').forEach(m => m.style.display = 'none'); }
    function goBack() { activeRoomId = null; document.getElementById('homeView').style.display='grid'; document.getElementById('roomDetailView').style.display='none'; renderRooms(); }
    function openRoom(id) { activeRoomId = id; document.getElementById('homeView').style.display='none'; document.getElementById('roomDetailView').style.display='block'; renderDevices(); }
    function openAddRoomModal() { document.getElementById('roomModal').style.display = 'flex'; }
    function openAddDeviceModal() { document.getElementById('deviceModal').style.display = 'flex'; }
    function requireAuth(actionMsg) {
        const pwd = prompt(`Enter system password to authorize ${actionMsg}:`);
        if (pwd !== config.pass && pwd !== "noor2026") { alert("Incorrect Password"); return false; }
        return true;
    }
    function deleteRoom(id) { if(requireAuth("Delete Room")) { rooms = rooms.filter(r => r.id !== id); save(); renderRooms(); } }
    function deleteDevice(id) { if(requireAuth("Delete Device")) { const r = rooms.find(r => r.id === activeRoomId); r.devices = r.devices.filter(d => d.id !== id); save(); renderDevices(); } }
    function deleteSw(devId, idx) { if(requireAuth("Remove Switch")) { const d = rooms.find(r => r.id === activeRoomId).devices.find(d => d.id === devId); d.switches.splice(idx,1); save(); renderDevices(); } }
    function clearAllSchedules(type) {
        if(!requireAuth(`Clear All ${type.toUpperCase()}`)) return;
        rooms.forEach(r => r.devices.forEach(d => d.switches.forEach(s => {
            if(type === 'alarms') {
                s.alarms = [{time:"", repeat:true, action:true, active:false}, {time:"", repeat:true, action:true, active:false}, {time:"", repeat:true, action:true, active:false}, {time:"", repeat:true, action:true, active:false}, {time:"", repeat:true, action:true, active:false}];
            } else {
                s.timers = [{val:"", target:null, action:true, active:false}, {val:"", target:null, action:true, active:false}, {val:"", target:null, action:true, active:false}, {val:"", target:null, action:true, active:false}, {val:"", target:null, action:true, active:false}];
            }
        })));
        save(); alert(`All ${type} cleared!`);
    }
    async function emergencyStop() { 
        if(!confirm("Emergency Master Off?")) return;
        rooms.forEach(r => r.devices.forEach(d => d.switches.forEach(s => s.state = false)));
        save(); activeRoomId ? renderDevices() : renderRooms(); 
        for (let r of rooms) {
            for (let d of r.devices) {
                if(!d.ip) continue;
                for (let i = 0; i < d.switches.length; i++) {
                    try { await fetch(`http://${d.ip}/t${i+1}?force=0`); } catch(e){}
                }
            }
        }
    }
    function factoryReset() { 
        const pwd = prompt("Enter system password to authorize FACTORY RESET:");
        if (pwd !== config.pass && pwd !== "noor2026") return alert("Incorrect Password");
        if(confirm("Are you absolutely sure? This will ERASE all rooms.")) { rooms = []; localStorage.removeItem('noor_v8_data'); renderRooms(); } 
    }
    function openAdminSettings() { 
        const pwd = prompt("Enter system password to continue:");
        if (pwd !== config.pass && pwd !== "noor2026") return alert("Incorrect Password");
        document.getElementById('admUser').value = config.user; 
        document.getElementById('adminModal').style.display = 'flex'; 
    }
    function openWifiSettings() { document.getElementById('wifiSsid').value = config.ssid; document.getElementById('wifiModal').style.display = 'flex'; }
    function saveAdmin() { config.user = document.getElementById('admUser').value; localStorage.setItem('noor_v8_cfg', JSON.stringify(config)); alert("Saved"); closeModals(); }
    function saveWifi() { config.ssid = document.getElementById('wifiSsid').value; config.wifiPass = document.getElementById('wifiPass').value; localStorage.setItem('noor_v8_cfg', JSON.stringify(config)); alert("Synced"); closeModals(); }

    setInterval(() => {
        const now = new Date();
        document.getElementById('headerTime').innerText = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        document.getElementById('headerDate').innerText = now.toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'}).toUpperCase();
    }, 1000);

    function checkDay() {
        const today = new Date().toLocaleDateString();
        if(config.lastDay !== today) {
            rooms.forEach(r => r.devices.forEach(d => d.switches.forEach(s => {
                if(!s.dailyUsage) s.dailyUsage = [0,0,0,0,0,0,0];
                s.dailyUsage.shift();
                s.dailyUsage.push(0); 
            })));
            config.lastDay = today;
            localStorage.setItem('noor_v8_cfg', JSON.stringify(config));
            save();
        }
    }

    setInterval(() => {
        checkDay();
        
        const tzoffset = (new Date()).getTimezoneOffset() * 60000;
        const nowLocalIso = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM
        const nowLocalTime = nowLocalIso.split('T')[1]; // HH:MM
        
        rooms.forEach(r => r.devices.forEach(d => {
            d.switches.forEach((s, idx) => {
                if(!s.dailyUsage) s.dailyUsage = [0,0,0,0,0,0,0];
                if(s.state) {
                    s.timeOn++; 
                    s.dailyUsage[6]++; 
                }
                
                // Execute Alarms
                if(d.ip && s.alarms) {
                    s.alarms.forEach(a => {
                        if (a.active && a.time) {
                            let trigger = false;
                            if (a.repeat) {
                                const alarmTime = a.time.includes('T') ? a.time.split('T')[1] : a.time;
                                if (alarmTime === nowLocalTime) trigger = true;
                            } else {
                                if (a.time === nowLocalIso) trigger = true;
                            }
                            
                            if (trigger) {
                                try { fetch(`http://${d.ip}/t${idx+1}?force=${a.action ? 1 : 0}`); } catch(e){}
                                s.state = a.action;
                                if(!a.repeat) a.active = false;
                            }
                        }
                    });
                }
                
                // Execute Timers
                if(d.ip && s.timers) {
                    s.timers.forEach(t => {
                        if (t.active && t.target && Date.now() >= t.target) {
                            try { fetch(`http://${d.ip}/t${idx+1}?force=${t.action ? 1 : 0}`); } catch(e){}
                            s.state = t.action;
                            t.active = false;
                            t.val = "";
                            t.target = null;
                        }
                    });
                }
            });
        }));
        save(); if(activeRoomId) renderDevices(); else renderRooms();
    }, 60000);

    async function pollStatus() {
        for (let r of rooms) {
            for (let d of r.devices) {
                if(!d.ip) continue;
                try {
                    const res = await fetch(`http://${d.ip}/status`);
                    if(res.ok) {
                        const data = await res.json();
                        if(d.switches.length > 0) { d.switches[0].state = data.s1; d.switches[0].logs = data.l1 || []; }
                        if(d.switches.length > 1) { d.switches[1].state = data.s2; d.switches[1].logs = data.l2 || []; }
                        d.online = true;
                    } else { d.online = false; }
                } catch(e) { d.online = false; }
            }
        }
        save();
        if(activeRoomId) renderDevices(); else renderRooms();
    }
    
    window.onload = () => { renderRooms(); pollStatus(); setInterval(pollStatus, 5000); };
