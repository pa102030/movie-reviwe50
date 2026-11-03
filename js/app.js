// --- MOVIES WORLD: Download & Streaming Module ---

function initDownloadModal() {
  if (document.getElementById('download-modal')) return;

  const modalHtml = `
    <div id="download-modal" class="mw-modal" style="display:none;">
      <div class="mw-modal-content">
        <button class="mw-close-btn" onclick="closeDownloadModal()">&times;</button>
        <div class="mw-modal-header">
          <h3 id="mw-movie-title">Movie Title</h3>
          <p id="mw-movie-meta">2026 • Action, Sci-Fi • සිංහල උපසිරැසි සමඟ</p>
        </div>
        
        <div class="mw-tabs">
          <button class="mw-tab-btn active" onclick="switchMwTab(event, 'download-section')"><i class="fa-solid fa-download"></i> ඩවුන්ලෝඩ් ලින්ක් (Download)</button>
          <button class="mw-tab-btn" onclick="switchMwTab(event, 'stream-section')"><i class="fa-solid fa-play"></i> නරඹන්න (Watch Online)</button>
        </div>

        <div id="download-section" class="mw-tab-content active">
          <p class="mw-instruction">ඔබට අවශ්‍ය ෂෝට්කට් එක සහ කොලිටිය තෝරන්න:</p>
          <div class="mw-links-list" id="mw-download-links">
            <!-- ලින්ක්ස් මෙතැනට ඩයිනමික් ලෙස වැටේ -->
          </div>
        </div>

        <div id="stream-section" class="mw-tab-content">
          <div class="mw-video-container" id="mw-video-player-wrap">
            <iframe id="mw-iframe-player" src="" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </div>
  `;
  
  const div = document.createElement('div');
  div.innerHTML = modalHtml;
  document.body.appendChild(div);

  // Modal එක සඳහා CSS ස්ටයිල්ස්
  const style = document.createElement('style');
  style.innerHTML = `
    .mw-modal {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center; z-index: 9999;
    }
    .mw-modal-content {
      background: #0f1419; border: 1px solid rgba(255,255,255,0.1);
      width: 90%; max-width: 600px; border-radius: 16px; padding: 24px;
      color: #fff; position: relative; box-shadow: 0 20px 40px rgba(0,0,0,0.5);
      font-family: 'Inter', sans-serif;
    }
    .mw-close-btn {
      position: absolute; top: 16px; right: 20px; background: none; border: none;
      color: #aaa; font-size: 28px; cursor: pointer; transition: color 0.2s;
    }
    .mw-close-btn:hover { color: #fff; }
    .mw-modal-header h3 { margin: 0 0 6px 0; font-size: 22px; color: #fff; }
    .mw-modal-header p { margin: 0 0 20px 0; font-size: 13px; color: #888; }
    .mw-tabs { display: flex; gap: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 20px; padding-bottom: 10px; }
    .mw-tab-btn {
      background: none; border: none; color: #888; padding: 8px 16px; font-weight: 600;
      cursor: pointer; border-radius: 8px; transition: all 0.2s; font-size: 14px;
    }
    .mw-tab-btn.active { background: #e50914; color: #fff; }
    .mw-tab-content { display: none; }
    .mw-tab-content.active { display: block; }
    .mw-instruction { font-size: 14px; color: #ccc; margin-bottom: 12px; }
    .mw-link-row {
      display: flex; align-items: center; justify-content: space-between;
      background: rgba(255,255,255,0.05); padding: 12px 16px; border-radius: 8px;
      margin-bottom: 10px; border: 1px solid rgba(255,255,255,0.05); transition: border-color 0.2s;
    }
    .mw-link-row:hover { border-color: rgba(229, 9, 20, 0.5); }
    .mw-quality-badge { background: #e50914; color: #fff; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; }
    .mw-btn-dl {
      background: #222; color: #fff; text-decoration: none; padding: 6px 14px;
      border-radius: 6px; font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 6px;
      transition: background 0.2s;
    }
    .mw-btn-dl:hover { background: #e50914; }
    .mw-video-container { position: relative; width: 100%; padding-bottom: 56.25%; height: 0; }
    .mw-video-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 8px; }
  `;
  document.head.appendChild(style);
}

// චිත්‍රපටයේ විස්තර සහ ලින්ක්ස් පෙන්වීම
function openDownloadModal(movieTitle, movieYear, genres, trailerKey) {
  initDownloadModal();
  
  document.getElementById('mw-movie-title').innerText = movieTitle;
  document.getElementById('mw-movie-meta').innerText = `${movieYear} • ${genres || 'Movie'} • සිංහල උපසිරැසි සමඟයි`;
  
  const linksContainer = document.getElementById('mw-download-links');
  linksContainer.innerHTML = `
    <div class="mw-link-row">
      <div>
        <span class="mw-quality-badge">1080p FHD</span> 
        <span style="margin-left: 10px; font-size: 14px;">සර්වර් 01 (Direct Download / GDrive)</span>
        <div style="font-size: 11px; color: #777; margin-top: 2px;">ප්‍රමාණය: 2.1 GB • සිංහල සබ්</div>
      </div>
      <a href="#" onclick="alert('${movieTitle} (1080p) ඩවුන්ලෝඩ් වීම ආරම්භ වේ...'); return false;" class="mw-btn-dl"><i class="fa-solid fa-download"></i> Download</a>
    </div>
    <div class="mw-link-row">
      <div>
        <span class="mw-quality-badge" style="background:#2b6cb0;">720p HD</span> 
        <span style="margin-left: 10px; font-size: 14px;">සර්වර් 02 (Fast Mirror)</span>
        <div style="font-size: 11px; color: #777; margin-top: 2px;">ප්‍රමාණය: 950 MB • සිංහල සබ්</div>
      </div>
      <a href="#" onclick="alert('${movieTitle} (720p) ඩවුන්ලෝඩ් වීම ආරම්භ වේ...'); return false;" class="mw-btn-dl"><i class="fa-solid fa-download"></i> Download</a>
    </div>
    <div class="mw-link-row">
      <div>
        <span class="mw-quality-badge" style="background:#718096;">480p SD</span> 
        <span style="margin-left: 10px; font-size: 14px;">සර්වර් 03 (Mobile Friendly)</span>
        <div style="font-size: 11px; color: #777; margin-top: 2px;">ප්‍රමාණය: 450 MB • සිංහල සබ්</div>
      </div>
      <a href="#" onclick="alert('${movieTitle} (480p) ඩවුන්ලෝඩ් වීම ආරම්භ වේ...'); return false;" class="mw-btn-dl"><i class="fa-solid fa-download"></i> Download</a>
    </div>
  `;

  const iframe = document.getElementById('mw-iframe-player');
  if (trailerKey) {
    iframe.src = `https://www.youtube.com/embed/${trailerKey}`;
  } else {
    iframe.src = `https://www.youtube.com/embed/dQw4w9WgXcQ`;
  }

  document.getElementById('download-modal').style.display = 'flex';
}

function closeDownloadModal() {
  const modal = document.getElementById('download-modal');
  if (modal) {
    modal.style.display = 'none';
    document.getElementById('mw-iframe-player').src = ''; 
  }
}

function switchMwTab(evt, tabId) {
  const contents = document.querySelectorAll('.mw-tab-content');
  contents.forEach(c => c.classList.remove('active'));

  const btns = document.querySelectorAll('.mw-tab-btn');
  btns.forEach(b => b.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  evt.currentTarget.classList.add('active');
}

window.addEventListener('click', (e) => {
  const modal = document.getElementById('download-modal');
  if (e.target === modal) {
    closeDownloadModal();
  }
});
