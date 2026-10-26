/**
 * Collabrix - Core UI, Navigation, Particle Canvas, Filters, and Handlers
 */

let appData = getCollabrixData();

// Particle Background Animation
function initBackgroundCanvas() {
  const canvas = document.getElementById('canvas-cyber-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 45;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      color: ['#00f0ff', '#ff007f', '#8a2be2'][Math.floor(Math.random() * 3)],
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist / 140)})`;
          ctx.lineWidth = 0.75;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particle points
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
    });

    requestAnimationFrame(render);
  }

  render();
}

// Navigation View Controller
function navigateTo(viewId) {
  const views = document.querySelectorAll('.page-view');
  views.forEach(v => v.classList.remove('active-view'));

  const targetView = document.getElementById(`view-${viewId}`);
  if (targetView) {
    targetView.classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update Nav items
  const navBtns = document.querySelectorAll('.nav-item-btn');
  navBtns.forEach(btn => {
    if (btn.getAttribute('data-view') === viewId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Mobile menu close if open
  const navLinks = document.querySelector('.nav-links');
  if (navLinks && navLinks.classList.contains('mobile-open')) {
    navLinks.classList.remove('mobile-open');
  }

  // Refresh view specific data
  if (viewId === 'discover') renderDiscover();
  if (viewId === 'projects') renderProjects();
  if (viewId === 'events') renderEvents();
  if (viewId === 'teams') renderTeams();
  if (viewId === 'dashboard') renderDashboard();
  if (viewId === 'profile') renderProfile();
}

// Toast Notification
function showToast(message, type = 'cyan') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  let iconName = 'sparkles';
  if (type === 'pink') iconName = 'heart';
  if (type === 'green') iconName = 'check-circle';

  toast.innerHTML = `
    <i data-lucide="${iconName}"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Modals
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('show');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('show');
  }
}

// ----------------- RENDERERS ----------------- //

// 1. Discover People
function renderDiscover(filter = 'all', searchQuery = '') {
  const container = document.getElementById('people-grid');
  if (!container) return;

  const query = searchQuery.toLowerCase().trim();
  const people = appData.people.filter(p => {
    const matchFilter = (filter === 'all') || (p.category === filter);
    const matchSearch = !query || 
      p.name.toLowerCase().includes(query) ||
      p.role.toLowerCase().includes(query) ||
      p.skills.some(s => s.toLowerCase().includes(query)) ||
      p.interests.some(i => i.toLowerCase().includes(query));
    return matchFilter && matchSearch;
  });

  if (people.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
        <i data-lucide="user-x" style="width: 48px; height: 48px; color: var(--text-dim); margin-bottom: 1rem;"></i>
        <h3 style="color: var(--text-muted);">No innovators found matching your criteria</h3>
        <p style="color: var(--text-dim); font-size: 0.9rem; margin-top: 0.5rem;">Try adjusting your skill keywords or active category filter.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = people.map(p => `
    <div class="glass-panel person-card" style="display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.2rem;">
          <img src="${p.avatar}" alt="${p.name}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 2px solid var(--neon-cyan); box-shadow: 0 0 12px rgba(0,240,255,0.3);">
          <div>
            <h4 style="font-size: 1.15rem; margin-bottom: 0.2rem;">${p.name}</h4>
            <span style="font-size: 0.82rem; color: var(--neon-cyan); font-family: var(--font-mono);">${p.handle}</span>
            <div style="font-size: 0.8rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.3rem; margin-top: 0.2rem;">
              <i data-lucide="map-pin" style="width: 12px; height: 12px;"></i> ${p.location}
            </div>
          </div>
        </div>

        <div style="background: rgba(0,240,255,0.06); border-left: 3px solid var(--neon-cyan); padding: 0.5rem 0.75rem; border-radius: 4px; font-size: 0.85rem; font-weight: 600; color: #fff; margin-bottom: 0.9rem;">
          ${p.role}
        </div>

        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1.25rem;">
          ${p.bio}
        </p>

        <div style="margin-bottom: 1rem;">
          <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700; letter-spacing: 0.05em; display: block; margin-bottom: 0.5rem;">Core Tech Stack</span>
          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
            ${p.skills.map(skill => `<span class="skill-chip">${skill}</span>`).join('')}
          </div>
        </div>
      </div>

      <div style="border-top: 1px solid var(--border-glass); padding-top: 1rem; margin-top: 1rem; display: flex; align-items: center; justify-content: space-between;">
        <span class="skill-chip tag-pink" style="font-size: 0.75rem;">
          <i data-lucide="activity" style="width: 12px; height: 12px;"></i> ${p.status}
        </span>
        <button class="btn btn-primary btn-sm" onclick="connectWithPerson('${p.name}')">
          <i data-lucide="user-plus" style="width: 14px; height: 14px;"></i> Connect
        </button>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

function connectWithPerson(name) {
  showToast(`Connection request sent to ${name}!`, 'cyan');
  appData.notifications.unshift({
    id: Date.now(),
    text: `You requested to collaborate with ${name}`,
    time: "Just now",
    icon: "user-plus",
    type: "cyan"
  });
  saveCollabrixData(appData);
}

// 2. Projects
function renderProjects(filter = 'all', searchQuery = '') {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  const query = searchQuery.toLowerCase().trim();
  const projects = appData.projects.filter(p => {
    const matchFilter = (filter === 'all') || (p.category === filter);
    const matchSearch = !query ||
      p.title.toLowerCase().includes(query) ||
      p.tagline.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query));
    return matchFilter && matchSearch;
  });

  if (projects.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
        <i data-lucide="folder-search" style="width: 48px; height: 48px; color: var(--text-dim); margin-bottom: 1rem;"></i>
        <h3 style="color: var(--text-muted);">No projects match this search</h3>
        <p style="color: var(--text-dim); font-size: 0.9rem; margin-top: 0.5rem;">Be the first to create this initiative!</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = projects.map(proj => `
    <div class="glass-panel project-card" style="display: flex; flex-direction: column; justify-content: space-between; border-top: 3px solid ${proj.joined ? 'var(--neon-green)' : 'var(--neon-cyan)'};">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
          <span class="skill-chip ${proj.joined ? 'tag-green' : 'tag-cyan'}" style="font-weight: 600;">
            <i data-lucide="${proj.joined ? 'check' : 'layers'}" style="width: 12px; height: 12px;"></i> ${proj.stage}
          </span>
          <div style="display: flex; align-items: center; gap: 0.4rem; color: var(--neon-amber); font-size: 0.85rem; font-weight: 600;">
            <i data-lucide="star" style="width: 14px; height: 14px; fill: currentColor;"></i> ${proj.stars}
          </div>
        </div>

        <h3 style="font-size: 1.25rem; line-height: 1.3; margin-bottom: 0.6rem;">${proj.title}</h3>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1.2rem;">
          ${proj.tagline}
        </p>

        <div style="margin-bottom: 1.2rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.4rem;">
            <span style="color: var(--text-muted);">Team Slots</span>
            <span style="color: var(--neon-cyan); font-weight: 600;">${proj.spotsFilled} / ${proj.spotsTotal} filled</span>
          </div>
          <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden;">
            <div style="width: ${(proj.spotsFilled / proj.spotsTotal) * 100}%; height: 100%; background: var(--gradient-holo);"></div>
          </div>
        </div>

        <div style="margin-bottom: 1.2rem;">
          <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700; letter-spacing: 0.05em; display: block; margin-bottom: 0.4rem;">Roles Needed</span>
          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
            ${proj.rolesNeeded.map(r => `<span class="skill-chip tag-pink">${r}</span>`).join('')}
          </div>
        </div>
      </div>

      <div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 1.2rem;">
          ${proj.tags.map(t => `<span class="skill-chip" style="font-size: 0.72rem;">#${t}</span>`).join('')}
        </div>

        <div style="border-top: 1px solid var(--border-glass); padding-top: 1rem; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <img src="${proj.lead.avatar}" alt="${proj.lead.name}" style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover;">
            <span style="font-size: 0.82rem; color: var(--text-muted);">${proj.lead.name}</span>
          </div>
          <button class="btn ${proj.joined ? 'btn-glass' : 'btn-primary'} btn-sm" onclick="toggleJoinProject('${proj.id}')">
            ${proj.joined ? '<i data-lucide="check"></i> Joined' : '<i data-lucide="send"></i> Apply to Join'}
          </button>
        </div>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

function toggleJoinProject(projId) {
  const p = appData.projects.find(item => item.id === projId);
  if (!p) return;

  if (p.joined) {
    p.joined = false;
    p.spotsFilled = Math.max(0, p.spotsFilled - 1);
    showToast(`Left application for ${p.title}`, 'pink');
  } else {
    p.joined = true;
    p.spotsFilled = Math.min(p.spotsTotal, p.spotsFilled + 1);
    showToast(`Application submitted for ${p.title}!`, 'green');
    appData.notifications.unshift({
      id: Date.now(),
      text: `You applied to join ${p.title}`,
      time: "Just now",
      icon: "file-text",
      type: "cyan"
    });
  }
  saveCollabrixData(appData);
  renderProjects();
}

// 3. Events & Hackathons
function renderEvents(filter = 'all', searchQuery = '') {
  const container = document.getElementById('events-grid');
  if (!container) return;

  const query = searchQuery.toLowerCase().trim();
  const events = appData.events.filter(ev => {
    const matchFilter = (filter === 'all') || (ev.category === filter);
    const matchSearch = !query ||
      ev.title.toLowerCase().includes(query) ||
      ev.description.toLowerCase().includes(query) ||
      ev.organizer.toLowerCase().includes(query);
    return matchFilter && matchSearch;
  });

  container.innerHTML = events.map(ev => `
    <div class="glass-panel" style="padding: 0; overflow: hidden; display: flex; flex-direction: column;">
      <div style="height: 150px; background-image: url('${ev.banner}'); background-size: cover; background-position: center; position: relative;">
        <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(7,9,14,0.1), rgba(15,20,32,0.95));"></div>
        <div style="position: absolute; top: 1rem; right: 1rem; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); border: 1px solid var(--neon-pink); border-radius: var(--radius-full); padding: 0.3rem 0.8rem; font-size: 0.75rem; color: var(--neon-pink); font-weight: 700;">
          ${ev.status}
        </div>
        <div style="position: absolute; bottom: 1rem; left: 1.25rem;">
          <span style="font-size: 0.8rem; color: var(--neon-cyan); font-weight: 600; text-transform: uppercase;">
            <i data-lucide="award" style="width: 14px; height: 14px; display: inline;"></i> ${ev.prizePool}
          </span>
          <h3 style="font-size: 1.35rem; margin-top: 0.2rem;">${ev.title}</h3>
        </div>
      </div>

      <div style="padding: 1.5rem; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; gap: 1.5rem; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
            <span><i data-lucide="calendar" style="width: 14px; height: 14px; display: inline; color: var(--neon-cyan);"></i> ${ev.date}</span>
            <span><i data-lucide="users" style="width: 14px; height: 14px; display: inline; color: var(--neon-pink);"></i> ${ev.teamsFormed} Teams</span>
          </div>

          <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1.25rem;">
            ${ev.description}
          </p>

          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem;">
            ${ev.tags.map(t => `<span class="skill-chip tag-violet">${t}</span>`).join('')}
          </div>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-glass); padding-top: 1rem;">
          <span style="font-size: 0.8rem; color: var(--text-dim);">By ${ev.organizer}</span>
          <button class="btn ${ev.registered ? 'btn-glass' : 'btn-primary'} btn-sm" onclick="toggleEventRegistration('${ev.id}')">
            ${ev.registered ? '<i data-lucide="check"></i> Registered' : '<i data-lucide="zap"></i> Register & Find Team'}
          </button>
        </div>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

function toggleEventRegistration(evId) {
  const ev = appData.events.find(item => item.id === evId);
  if (!ev) return;

  if (ev.registered) {
    ev.registered = false;
    showToast(`Deregistered from ${ev.title}`, 'pink');
  } else {
    ev.registered = true;
    showToast(`Successfully registered for ${ev.title}!`, 'green');
    appData.notifications.unshift({
      id: Date.now(),
      text: `Registered for ${ev.title}`,
      time: "Just now",
      icon: "calendar-check",
      type: "violet"
    });
  }
  saveCollabrixData(appData);
  renderEvents();
}

// 4. Teams
function renderTeams() {
  const container = document.getElementById('teams-grid');
  if (!container) return;

  container.innerHTML = appData.teams.map(team => `
    <div class="glass-panel" style="display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 44px; height: 44px; border-radius: var(--radius-sm); background: rgba(255,255,255,0.05); border: 1px solid ${team.avatarColor}; display: flex; align-items: center; justify-content: center; color: ${team.avatarColor};">
              <i data-lucide="terminal" style="width: 22px; height: 22px;"></i>
            </div>
            <div>
              <h4 style="font-size: 1.15rem;">${team.name}</h4>
              <span style="font-size: 0.78rem; color: var(--text-muted);">${team.membersCount} / ${team.maxMembers} Members</span>
            </div>
          </div>
          <span class="skill-chip tag-green" style="font-size: 0.75rem;">${team.status}</span>
        </div>

        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.2rem;">
          ${team.purpose}
        </p>

        <div style="background: rgba(255,0,127,0.06); border: 1px dashed rgba(255,0,127,0.3); border-radius: var(--radius-sm); padding: 0.6rem 0.8rem; margin-bottom: 1.2rem; font-size: 0.85rem;">
          <span style="color: var(--neon-pink); font-weight: 600;">Searching for: </span>
          <span style="color: #fff;">${team.openRole}</span>
        </div>

        <div style="margin-bottom: 1.25rem;">
          <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700; letter-spacing: 0.05em; display: block; margin-bottom: 0.5rem;">Squad Lineup</span>
          <div style="display: flex; flex-direction: column; gap: 0.4rem;">
            ${team.members.map(m => `
              <div style="display: flex; justify-content: space-between; font-size: 0.82rem; background: rgba(255,255,255,0.02); padding: 0.35rem 0.6rem; border-radius: 4px;">
                <span style="color: #fff;">${m.name} ${m.lead ? '<span style="color: var(--neon-amber); font-size: 0.7rem;">(Lead)</span>' : ''}</span>
                <span style="color: var(--text-dim);">${m.role}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div style="border-top: 1px solid var(--border-glass); padding-top: 1rem; display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; gap: 0.3rem;">
          ${team.tags.map(t => `<span class="skill-chip" style="font-size: 0.7rem;">#${t}</span>`).join('')}
        </div>
        <button class="btn ${team.userIsMember ? 'btn-glass' : 'btn-primary'} btn-sm" onclick="toggleJoinTeam('${team.id}')">
          ${team.userIsMember ? '<i data-lucide="shield-check"></i> Member' : '<i data-lucide="user-plus"></i> Request Join'}
        </button>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

function toggleJoinTeam(teamId) {
  const team = appData.teams.find(t => t.id === teamId);
  if (!team) return;

  if (team.userIsMember) {
    team.userIsMember = false;
    team.members = team.members.filter(m => m.name !== appData.currentUser.name);
    team.membersCount = team.members.length;
    showToast(`You left ${team.name}`, 'pink');
  } else {
    team.userIsMember = true;
    team.members.push({ name: appData.currentUser.name, role: appData.currentUser.role });
    team.membersCount = team.members.length;
    showToast(`Joined ${team.name}! Welcome to the squad.`, 'green');
    appData.notifications.unshift({
      id: Date.now(),
      text: `You joined ${team.name}`,
      time: "Just now",
      icon: "users",
      type: "cyan"
    });
  }
  saveCollabrixData(appData);
  renderTeams();
}

// 5. Dashboard
function renderDashboard() {
  const user = appData.currentUser;
  
  // Stats
  const statCollabs = document.getElementById('dash-stat-collabs');
  const statProjects = document.getElementById('dash-stat-projects');
  const statTeams = document.getElementById('dash-stat-teams');
  const statRep = document.getElementById('dash-stat-rep');

  const joinedProjects = appData.projects.filter(p => p.joined);
  const userTeams = appData.teams.filter(t => t.userIsMember);
  const registeredEvents = appData.events.filter(e => e.registered);

  if (statCollabs) statCollabs.textContent = user.stats.collaborations;
  if (statProjects) statProjects.textContent = joinedProjects.length;
  if (statTeams) statTeams.textContent = userTeams.length;
  if (statRep) statRep.textContent = user.stats.reputationScore;

  // Active Projects List
  const projContainer = document.getElementById('dash-active-projects');
  if (projContainer) {
    if (joinedProjects.length === 0) {
      projContainer.innerHTML = `<div style="color: var(--text-dim); font-size: 0.9rem; padding: 1rem 0;">No active projects joined yet. Explore projects to join!</div>`;
    } else {
      projContainer.innerHTML = joinedProjects.map(p => `
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: var(--radius-sm); padding: 0.85rem 1rem; margin-bottom: 0.6rem; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h5 style="font-size: 0.95rem; margin-bottom: 0.2rem;">${p.title}</h5>
            <span style="font-size: 0.8rem; color: var(--neon-cyan);">${p.stage}</span>
          </div>
          <button class="btn btn-outline-neon btn-sm" onclick="navigateTo('projects')">View Board</button>
        </div>
      `).join('');
    }
  }

  // Active Teams List
  const teamContainer = document.getElementById('dash-active-teams');
  if (teamContainer) {
    if (userTeams.length === 0) {
      teamContainer.innerHTML = `<div style="color: var(--text-dim); font-size: 0.9rem; padding: 1rem 0;">Not part of any teams yet.</div>`;
    } else {
      teamContainer.innerHTML = userTeams.map(t => `
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: var(--radius-sm); padding: 0.85rem 1rem; margin-bottom: 0.6rem; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h5 style="font-size: 0.95rem; margin-bottom: 0.2rem;">${t.name}</h5>
            <span style="font-size: 0.8rem; color: var(--neon-purple);">${t.membersCount} members</span>
          </div>
          <button class="btn btn-glass btn-sm" onclick="navigateTo('teams')">Team Hub</button>
        </div>
      `).join('');
    }
  }

  // Registered Events
  const eventsContainer = document.getElementById('dash-active-events');
  if (eventsContainer) {
    if (registeredEvents.length === 0) {
      eventsContainer.innerHTML = `<div style="color: var(--text-dim); font-size: 0.9rem; padding: 1rem 0;">No upcoming hackathons registered.</div>`;
    } else {
      eventsContainer.innerHTML = registeredEvents.map(e => `
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: var(--radius-sm); padding: 0.85rem 1rem; margin-bottom: 0.6rem; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h5 style="font-size: 0.95rem; margin-bottom: 0.2rem;">${e.title}</h5>
            <span style="font-size: 0.8rem; color: var(--neon-pink);">${e.date}</span>
          </div>
          <span class="skill-chip tag-pink">Ready</span>
        </div>
      `).join('');
    }
  }

  // Activity Feed
  const feedContainer = document.getElementById('dash-activity-feed');
  if (feedContainer) {
    feedContainer.innerHTML = appData.notifications.map(n => `
      <div style="display: flex; gap: 0.8rem; align-items: flex-start; padding: 0.75rem 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
        <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0,240,255,0.1); display: flex; align-items: center; justify-content: center; color: var(--neon-${n.type || 'cyan'}); flex-shrink: 0;">
          <i data-lucide="${n.icon || 'bell'}" style="width: 16px; height: 16px;"></i>
        </div>
        <div style="flex: 1;">
          <p style="font-size: 0.88rem; color: var(--text-main); margin-bottom: 0.2rem;">${n.text}</p>
          <span style="font-size: 0.75rem; color: var(--text-dim);">${n.time}</span>
        </div>
      </div>
    `).join('');
  }

  lucide.createIcons();
}

// 6. Profile
function renderProfile() {
  const user = appData.currentUser;
  
  const nameEl = document.getElementById('profile-name');
  const roleEl = document.getElementById('profile-role');
  const bioEl = document.getElementById('profile-bio');
  const avatarEl = document.getElementById('profile-avatar');
  const skillsContainer = document.getElementById('profile-skills');
  const interestsContainer = document.getElementById('profile-interests');

  if (nameEl) nameEl.textContent = user.name;
  if (roleEl) roleEl.textContent = user.role;
  if (bioEl) bioEl.textContent = user.bio;
  if (avatarEl) avatarEl.src = user.avatar;

  if (skillsContainer) {
    skillsContainer.innerHTML = user.skills.map(s => `
      <span class="skill-chip tag-cyan" style="font-size: 0.85rem; padding: 0.4rem 0.8rem;">
        ${s}
      </span>
    `).join('');
  }

  if (interestsContainer) {
    interestsContainer.innerHTML = user.interests.map(i => `
      <span class="skill-chip tag-pink" style="font-size: 0.85rem; padding: 0.4rem 0.8rem;">
        <i data-lucide="zap" style="width: 12px; height: 12px;"></i> ${i}
      </span>
    `).join('');
  }

  lucide.createIcons();
}

// Form Handlers
function setupForms() {
  // New Project Form
  const projForm = document.getElementById('form-create-project');
  if (projForm) {
    projForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('new-proj-title').value;
      const tagline = document.getElementById('new-proj-tagline').value;
      const category = document.getElementById('new-proj-category').value;
      const roles = document.getElementById('new-proj-roles').value.split(',').map(s => s.trim()).filter(Boolean);
      const tags = document.getElementById('new-proj-tags').value.split(',').map(s => s.trim()).filter(Boolean);

      const newProj = {
        id: 'proj_' + Date.now(),
        title,
        tagline,
        category,
        stage: "Recruiting Members",
        spotsTotal: 4,
        spotsFilled: 1,
        bannerColor: "linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(176, 38, 255, 0.4))",
        rolesNeeded: roles.length ? roles : ["Developer", "Designer"],
        tags: tags.length ? tags : ["Innovator", "NextGen"],
        lead: {
          name: appData.currentUser.name,
          handle: appData.currentUser.handle,
          avatar: appData.currentUser.avatar
        },
        stars: 1,
        joined: true
      };

      appData.projects.unshift(newProj);
      saveCollabrixData(appData);
      closeModal('modal-create-project');
      projForm.reset();
      showToast(`Initiative "${title}" published live!`, 'green');
      navigateTo('projects');
    });
  }

  // New Team Form
  const teamForm = document.getElementById('form-create-team');
  if (teamForm) {
    teamForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('new-team-name').value;
      const purpose = document.getElementById('new-team-purpose').value;
      const roleNeeded = document.getElementById('new-team-role').value;
      const tags = document.getElementById('new-team-tags').value.split(',').map(s => s.trim()).filter(Boolean);

      const newTeam = {
        id: 'team_' + Date.now(),
        name,
        purpose,
        membersCount: 1,
        maxMembers: 4,
        openRole: roleNeeded || "Full-Stack Builder",
        avatarColor: "var(--neon-cyan)",
        tags: tags.length ? tags : ["Collabrix", "Squad"],
        status: "Recruiting",
        members: [
          { name: appData.currentUser.name, role: appData.currentUser.role, lead: true }
        ],
        userIsMember: true
      };

      appData.teams.unshift(newTeam);
      saveCollabrixData(appData);
      closeModal('modal-create-team');
      teamForm.reset();
      showToast(`Squad "${name}" forged successfully!`, 'cyan');
      navigateTo('teams');
    });
  }

  // Edit Profile Form
  const editProfileForm = document.getElementById('form-edit-profile');
  if (editProfileForm) {
    editProfileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      appData.currentUser.name = document.getElementById('edit-profile-name').value;
      appData.currentUser.role = document.getElementById('edit-profile-role').value;
      appData.currentUser.bio = document.getElementById('edit-profile-bio').value;
      appData.currentUser.skills = document.getElementById('edit-profile-skills').value.split(',').map(s => s.trim()).filter(Boolean);

      saveCollabrixData(appData);
      closeModal('modal-edit-profile');
      renderProfile();
      showToast('Profile matrix updated successfully!', 'green');
    });
  }
}

// Initializer
document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  setupForms();

  // Navigation Links click events
  document.querySelectorAll('[data-nav-target]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const view = el.getAttribute('data-nav-target');
      navigateTo(view);
    });
  });

  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const navLinks = document.querySelector('.nav-links');
      navLinks.classList.toggle('mobile-open');
    });
  }

  // Search input and Filter pills logic for Discover
  const discoverSearch = document.getElementById('search-people');
  if (discoverSearch) {
    discoverSearch.addEventListener('input', (e) => {
      const activePill = document.querySelector('#discover-pills .filter-pill.active');
      const cat = activePill ? activePill.getAttribute('data-category') : 'all';
      renderDiscover(cat, e.target.value);
    });
  }

  document.querySelectorAll('#discover-pills .filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('#discover-pills .filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.getAttribute('data-category');
      const searchVal = discoverSearch ? discoverSearch.value : '';
      renderDiscover(cat, searchVal);
    });
  });

  // Search and Filter for Projects
  const projectSearch = document.getElementById('search-projects');
  if (projectSearch) {
    projectSearch.addEventListener('input', (e) => {
      const activePill = document.querySelector('#project-pills .filter-pill.active');
      const cat = activePill ? activePill.getAttribute('data-category') : 'all';
      renderProjects(cat, e.target.value);
    });
  }

  document.querySelectorAll('#project-pills .filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('#project-pills .filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.getAttribute('data-category');
      const searchVal = projectSearch ? projectSearch.value : '';
      renderProjects(cat, searchVal);
    });
  });

  // Load Initial View (Home)
  navigateTo('home');
  lucide.createIcons();
});
