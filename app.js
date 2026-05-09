(function () {
  var enText       = document.getElementById('en-text');
  var arText       = document.getElementById('ar-text');
  var arMicBtn     = document.getElementById('ar-mic-btn');
  var enTtsBtn     = document.getElementById('en-tts-btn');
  var arTtsBtn     = document.getElementById('ar-tts-btn');
  var enCopyBtn    = document.getElementById('en-copy-btn');
  var arCopyBtn    = document.getElementById('ar-copy-btn');
  var enStatus     = document.getElementById('en-status');
  var arStatus     = document.getElementById('ar-status');
  var enStatusText = document.getElementById('en-status-text');
  var arStatusText = document.getElementById('ar-status-text');
  var enCharCount  = document.getElementById('en-char-count');
  var arCharCount  = document.getElementById('ar-char-count');
  var translateBtn     = document.getElementById('translate-btn');
  var translateToArBtn = document.getElementById('translate-to-ar-btn');
  var clearBtn         = document.getElementById('clear-btn');

  arText.addEventListener('input', function () {
    arCharCount.textContent = arText.value.length;
  });

  enText.addEventListener('input', function () {
    enCharCount.textContent = enText.value.length;
  });

  function setStatus(statusEl, statusTextEl, msg, type) {
    statusTextEl.textContent = msg;
    statusEl.className = 'status-bar' + (type ? ' ' + type : '');
  }

  clearBtn.addEventListener('click', function () {
    arText.value = '';
    enText.value = '';
    arCharCount.textContent = '0';
    enCharCount.textContent = '0';
    setStatus(arStatus, arStatusText, '', '');
    setStatus(enStatus, enStatusText, '', '');
  });

  // ── Tajweed dictionary ──────────────────────────────────────────────────────

  var TAJWEED_MAP = [
    // Chapter-level headings (longest compound first)
    ['أحكام النون الساكنة والتنوين', 'Ahkam al-Noon al-Sakinah wal-Tanwin'],
    ['أحكام الميم الساكنة', 'Ahkam al-Meem al-Sakinah'],
    ['أحكام المدود', 'Ahkam al-Mudood'],
    ['التفخيم والترقيق', 'Tafkhim wal-Tarqiq'],
    ['التقاء الساكنين', "Iltiqaa' al-Sakinayn"],

    // Huroof groupings
    ['الحروف الشمسية', 'Al-Huroof al-Shamsiyya'],
    ['الحروف القمرية', 'Al-Huroof al-Qamariyya'],
    ['الحروف المرققة', 'Al-Huroof al-Muraqqaqa'],
    ['حروف الاستعلاء', "Huroof al-Isti'la"],
    ['حروف الإطباق', 'Huroof al-Itbaq'],
    ['حروف الحلق', 'Huroof al-Halq'],
    ['حروف مقطعة', "Huroof Muqatta'ah"],
    ['فواتح السور', 'Fawatih al-Suwar'],

    // Noon Sakinah / Tanwin rules
    ['إدغام بغنة', 'Idgham bil Ghunnah'],
    ['إدغام بلا غنة', 'Idgham bila Ghunnah'],
    ['إخفاء حقيقي', 'Ikhfa Haqiqi'],
    ['إظهار حلقي', 'Izhar Halqi'],

    // Meem Sakinah rules
    ['إخفاء شفوي', 'Ikhfa Shafawi'],
    ['إدغام شفوي', 'Idgham Shafawi'],
    ['إدغام مثلين صغير', 'Idgham Mithlain Saghir'],
    ['إظهار شفوي', 'Izhar Shafawi'],

    // Idgham sub-types
    ['إدغام متماثلين صغير', 'Idgham Mutamathalain Saghir'],

    // Hamzah types
    ['همزة الوصل', 'Hamzat al-Wasl'],
    ['همزة القطع', "Hamzat al-Qat'"],

    // Ra rules
    ['راء مفخمة', 'Ra Mufakhkhamah'],
    ['راء مرققة', 'Ra Muraqqaqah'],

    // Sifaat compound
    ['صفة الجهر', 'Sifat al-Jahr'],
    ['صفة الهمس', 'Sifat al-Hams'],
    ['صفة الشدة', 'Sifat al-Shiddah'],
    ['صفة الرخاوة', 'Sifat al-Rakhawah'],
    ['صفة التوسط', 'Sifat al-Tawassut'],
    ['صفة الاستعلاء', "Sifat al-Isti'la"],
    ['صفة الاستفال', 'Sifat al-Istifal'],
    ['صفة الإطباق', 'Sifat al-Itbaq'],
    ['صفة الانفتاح', 'Sifat al-Infitah'],

    // Madd compound (longest first)
    ['مد صلة كبرى', 'Madd Silah Kubra'],
    ['مد صلة صغرى', 'Madd Silah Sughra'],
    ['مد واجب متصل', 'Madd Wajib Muttasil'],
    ['مد جائز منفصل', 'Madd Jaiz Munfasil'],
    ['مد طبيعي', 'Madd Tabii'],
    ['مد متصل', 'Madd Muttasil'],
    ['مد منفصل', 'Madd Munfasil'],
    ['مد لازم', 'Madd Lazim'],
    ['مد عارض', 'Madd Arid lil Sukoon'],
    ['مد بدل', 'Madd Badal'],
    ['مد لين', 'Madd Lin'],
    ['مد عوض', 'Madd Iwad'],
    ['مد فرق', 'Madd Farq'],
    ['مد تمكين', 'Madd Tamkeen'],
    ['مد صلة', 'Madd Silah'],

    // Noon/Meem Sakinah terms
    ['نون ساكنة', 'Noon Sakinah'],
    ['ميم ساكنة', 'Meem Sakinah'],
    ['لام شمسية', 'Lam Shamsiyya'],
    ['لام قمرية', 'Lam Qamariyya'],

    // Qalqalah
    ['قلقلة كبرى', 'Qalqalah Kubra'],
    ['قلقلة صغرى', 'Qalqalah Sughra'],

    // Waqf
    ['وقف لازم', 'Waqf Lazim'],
    ['وقف جائز', 'Waqf Jaiz'],
    ['وقف ممنوع', "Waqf Mamnu'"],

    // Stopping signs
    ['روم', 'Rawm'],
    ['إشمام', 'Ishmam'],
    ['وصل', 'Wasl'],
    ['قطع', "Qat'"],

    // Single-word Tajweed terms
    ['إدغام', 'Idgham'],
    ['إخفاء', 'Ikhfa'],
    ['إقلاب', 'Iqlab'],
    ['إظهار', 'Izhar'],
    ['قلقلة', 'Qalqalah'],
    ['تفخيم', 'Tafkhim'],
    ['ترقيق', 'Tarqiq'],
    ['تنوين', 'Tanwin'],
    ['تشديد', 'Tashdeed'],
    ['تجويد', 'Tajweed'],
    ['غنة', 'Ghunnah'],
    ['مخارج', 'Makhaarij'],
    ['مخرج', 'Makhraj'],
    ['وقف', 'Waqf'],
    ['مد', 'Madd'],
    ['صفات', 'Sifaat'],
    ['سكون', 'Sukoon'],
    ['حركة', 'Harakah'],
    ['فتحة', 'Fathah'],
    ['ضمة', 'Dammah'],
    ['كسرة', 'Kasrah'],
    ['شدة', 'Shaddah'],
    ['همزة', 'Hamzah'],
    ['سورة', 'Surah'],
    ['آية', 'Ayah'],
    ['جزء', 'Juz'],
    ['حزب', 'Hizb'],
    ['استعاذة', "Isti'adha"],
    ['بسملة', 'Basmala'],
    ['تعوذ', "Ta'awwudh"],
    ['ترتيل', 'Tarteel'],
    ['حفص', 'Hafs'],
    ['ورش', 'Warsh'],
    ['رواية', 'Riwayah'],
    ['قرآن', 'Quran'],
    ['مصحف', 'Mushaf'],
    ['إبدال', 'Ibdal'],

    // Sifaat adjective forms
    ['مجهور', 'Majhur'],
    ['مهموس', 'Mahmus'],
    ['شديد', 'Shadid'],
    ['رخو', 'Rakhw'],
    ['متوسط', 'Mutawassit'],
    ['مستعلي', "Musta'li"],
    ['مستفل', 'Mustafil'],
    ['منطبق', 'Muntabiq'],
    ['منفتح', 'Munfatih'],
    ['مذلق', 'Mudhlaq'],
    ['مصمت', 'Musmit'],
    ['مفخم', 'Mufakhkham'],
    ['مرقق', 'Muraqqaq'],
    ['لين', 'Lin'],

    // Single Sifaat nouns
    ['جهر', 'Jahr'],
    ['همس', 'Hams'],
    ['رخاوة', 'Rakhawah'],
    ['توسط', 'Tawassut'],
    ['استعلاء', "Isti'la"],
    ['استفال', 'Istifal'],
    ['إطباق', 'Itbaq'],
    ['انفتاح', 'Infitah'],
    ['إذلاق', 'Idhlaq'],
    ['إصمات', 'Ismat'],

    // 29 Letter names
    ['ألف', 'Alif'],
    ['باء', 'Ba'],
    ['تاء', 'Ta'],
    ['ثاء', 'Tha'],
    ['جيم', 'Jim'],
    ['حاء', 'Ha'],
    ['خاء', 'Kha'],
    ['دال', 'Dal'],
    ['ذال', 'Dhal'],
    ['راء', 'Ra'],
    ['زاي', 'Zayn'],
    ['سين', 'Sin'],
    ['شين', 'Shin'],
    ['صاد', 'Sad'],
    ['ضاد', 'Dad'],
    ['طاء', 'Ta (Emphatic)'],
    ['ظاء', 'Dha'],
    ['عين', 'Ain'],
    ['غين', 'Ghain'],
    ['فاء', 'Fa'],
    ['قاف', 'Qaf'],
    ['كاف', 'Kaf'],
    ['لام', 'Lam'],
    ['ميم', 'Meem'],
    ['نون', 'Noon'],
    ['هاء', 'Ha (Light)'],
    ['واو', 'Waw'],
    ['ياء', 'Ya']
  ];

  // ── Translation ─────────────────────────────────────────────────────────────

  function preprocessArabic(text) {
    // Strip diacritics and normalise alef variants
    var clean = text.replace(/[ؐ-ًؚ-ٟۖ-ۜ۟-ۭ]/g, '');
    clean = clean.replace(/[آأإ]/g, 'ا');
    for (var i = 0; i < TAJWEED_MAP.length; i++) {
      var arabic  = TAJWEED_MAP[i][0].replace(/[آأإ]/g, 'ا');
      var english = TAJWEED_MAP[i][1];
      var pat = arabic.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Optional prefix: ال only — single-char proclitics (ب و ف etc.) cause
      // false positives on common words like بلا (without) → La, براء → Ra
      pat = '(?:ال)?' + pat;
      // Word boundaries: prevent matching inside a larger Arabic word
      pat = '(?<![؀-ۿﭐ-﷿ﹰ-﻿])' + pat + '(?![؀-ۿﭐ-﷿ﹰ-﻿])';
      clean = clean.replace(new RegExp(pat, 'g'), english);
    }
    return clean;
  }

  function postprocessArabic(text) {
    var result = text;
    for (var i = 0; i < TAJWEED_MAP.length; i++) {
      var escaped = TAJWEED_MAP[i][1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      result = result.replace(new RegExp(escaped, 'gi'), TAJWEED_MAP[i][0]);
    }
    return result;
  }

  async function translateWithGoogle(text, from, to) {
    var query = (from === 'ar') ? preprocessArabic(text) : text;
    var url = 'https://translate.googleapis.com/translate_a/single'
      + '?client=gtx&sl=' + from + '&tl=' + to
      + '&dt=t&q=' + encodeURIComponent(query);
    var res  = await fetch(url);
    var data = await res.json();
    var result = data[0].map(function (item) { return item[0]; }).filter(Boolean).join('');
    return (to === 'ar') ? postprocessArabic(result) : result;
  }

  async function doTranslate(text, from, to, statusEl, statusTextEl, outputEl, outputCharEl) {
    statusTextEl.innerHTML = '<span class="spinner"></span> Translating...';
    statusEl.className = 'status-bar loading';
    try {
      var result = await translateWithGoogle(text, from, to);
      outputEl.value = result;
      outputCharEl.textContent = result.length;
      setStatus(statusEl, statusTextEl, 'Translated', 'success');
    } catch (e) {
      setStatus(statusEl, statusTextEl, 'Translation failed — check connection', 'error');
    }
  }

  function triggerTranslate() {
    var text = arText.value.trim();
    if (!text) return;
    doTranslate(text, 'ar', 'en', enStatus, enStatusText, enText, enCharCount);
  }

  function triggerTranslateToAr() {
    var text = enText.value.trim();
    if (!text) return;
    doTranslate(text, 'en', 'ar', arStatus, arStatusText, arText, arCharCount);
  }

  translateBtn.addEventListener('click', triggerTranslate);
  translateToArBtn.addEventListener('click', triggerTranslateToAr);

  arText.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 768) {
      e.preventDefault();
      triggerTranslate();
    }
  });

  enText.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      triggerTranslateToAr();
    }
  });

  // ── Speech recognition ──────────────────────────────────────────────────────

  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition    = null;
  var isRecording    = false;
  var fullTranscript = '';

  function startSession() {
    recognition = new SpeechRecognition();
    recognition.lang           = 'ar-SA';
    recognition.continuous     = false;
    recognition.interimResults = true;

    recognition.onresult = function (e) {
      var text = '';
      for (var i = 0; i < e.results.length; i++) {
        text += e.results[i][0].transcript;
      }
      arText.value = fullTranscript + text;
      arCharCount.textContent = arText.value.length;
    };

    recognition.onend = function () {
      if (isRecording) {
        // Browser auto-stopped (utterance done, silence) — save and restart
        fullTranscript = arText.value;
        startSession();
      } else {
        // User pressed Stop — lock English back to readonly
        enText.readOnly = true;
        arMicBtn.classList.remove('recording');
        arMicBtn.textContent = 'Speak';
        setStatus(arStatus, arStatusText, '', '');
        var spoken = arText.value.trim();
        if (spoken) doTranslate(spoken, 'ar', 'en', enStatus, enStatusText, enText, enCharCount);
      }
    };

    recognition.onerror = function (e) {
      if (e.error === 'not-allowed') {
        isRecording = false;
        arMicBtn.classList.remove('recording');
        arMicBtn.textContent = 'Speak';
        setStatus(arStatus, arStatusText, 'Microphone access denied', 'error');
      }
      // no-speech / network / aborted — onend fires and restarts automatically
    };

    recognition.start();
  }

  if (SpeechRecognition) {
    arMicBtn.addEventListener('click', function () {
      if (isRecording) {
        // User wants to stop — onend will handle UI reset and translation
        isRecording = false;
        recognition.stop();
      } else {
        // Start fresh session — unlock English for typing
        isRecording    = true;
        fullTranscript = '';
        arText.value   = '';
        arCharCount.textContent = '0';
        enText.readOnly = false;
        arMicBtn.classList.add('recording');
        arMicBtn.textContent = 'Stop';
        setStatus(arStatus, arStatusText, 'Listening...', 'loading');
        startSession();
      }
    });
  } else {
    arMicBtn.textContent = 'Not supported';
    arMicBtn.disabled = true;
    setStatus(arStatus, arStatusText, 'Use Chrome or Edge for voice input', 'error');
  }

  // ── Text-to-speech ──────────────────────────────────────────────────────────

  function speakText(text, lang) {
    if (!window.speechSynthesis || !text) return null;
    window.speechSynthesis.cancel();
    var utt  = new SpeechSynthesisUtterance(text);
    utt.lang = lang === 'en' ? 'en-US' : 'ar-SA';
    utt.rate = 0.9;
    var voices = window.speechSynthesis.getVoices();
    var prefix = lang === 'en' ? 'en' : 'ar';
    var match  = voices.find(function (v) { return v.lang.startsWith(prefix); });
    if (match) utt.voice = match;
    return utt;
  }

  function setupTts(btn, textEl, lang) {
    btn.addEventListener('click', function () {
      var utt = speakText(textEl.value.trim(), lang);
      if (!utt) return;
      utt.onstart = function () { btn.textContent = 'Speaking...'; btn.disabled = true; };
      utt.onend   = function () { btn.textContent = 'Read'; btn.disabled = false; };
      utt.onerror = function () { btn.textContent = 'Read'; btn.disabled = false; };
      window.speechSynthesis.speak(utt);
    });
  }

  setupTts(arTtsBtn, arText, 'ar');
  setupTts(enTtsBtn, enText, 'en');

  // ── Copy ────────────────────────────────────────────────────────────────────

  function setupCopy(btn, textEl) {
    btn.addEventListener('click', async function () {
      var text = textEl.value.trim();
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Copied!';
        setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
      } catch (e) {
        btn.textContent = 'Failed';
        setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
      }
    });
  }

  setupCopy(arCopyBtn, arText);
  setupCopy(enCopyBtn, enText);
})();
