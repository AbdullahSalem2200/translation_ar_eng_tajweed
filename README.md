# Sheikh Translator

A web app for live Arabic / English translation built for Quran and Tajweed learning.
Designed to be used alongside a sheikh or teacher: speak Arabic continuously and get instant English translation, with full awareness of Tajweed terminology.

## Features

- **Continuous voice input** - press Speak, speak as long as needed, press Stop when done. The mic stays on across pauses and auto-restarts until you stop it.
- **Type and translate (Arabic to English)** - type Arabic in the top panel and press Translate or Enter (desktop).
- **Type and translate (English to Arabic)** - while the mic is recording, the English panel unlocks so you can type English and translate it back to Arabic (useful for asking questions during a lesson).
- **Tajweed-aware** - 150+ Tajweed and Islamic terms are preserved correctly instead of being literally translated:
  - `idgham` -> Idgham (not "merging")
  - `ikhfa` -> Ikhfa, `qalqalah` -> Qalqalah, `ghunnah` -> Ghunnah, etc.
  - All Noon Sakinah, Meem Sakinah, Madd, Sifaat, Makhaarij, Waqf terms
  - All 29 Arabic letter names (Alif, Ba, Ta ... Ya)
  - Smart word-boundary matching - common Arabic words are never mistaken for Tajweed terms
- **Read aloud** - TTS button reads Arabic or English text in the correct language
- **Copy** - one tap to copy either panel
- **Clear** - resets both panels from the header

## Files

| File | Purpose |
|---|---|
| `index.html` | UI - HTML structure and all CSS styling |
| `app.js` | Logic - Tajweed dictionary, translation, mic, TTS, copy |
| `server.py` | Optional Flask backend using Helsinki-NLP/opus-mt-ar-en (not used by default) |

## How to use

1. Open `index.html` in **Chrome or Edge**
2. **Voice**: press **Speak**, speak Arabic, press **Stop** - translation appears automatically
3. **Type Arabic**: type in the Arabic panel and press **Translate to English** (or Enter on desktop)
4. **Type English during lesson**: while the mic is on, the English panel unlocks - type English and press **Translate to Arabic** (or Enter) to send it to the Arabic panel

> Voice input uses the Web Speech API which requires Chrome or Edge. Firefox does not support it.

## No API key needed

Translation uses the free, unofficial Google Translate endpoint (`translate.googleapis.com`). No account, no key, no rate limit for normal use.

## Tajweed terms covered

| Category | Examples |
|---|---|
| Noon Sakinah / Tanwin | Idgham bil Ghunnah, Idgham bila Ghunnah, Ikhfa Haqiqi, Izhar Halqi, Iqlab |
| Meem Sakinah | Ikhfa Shafawi, Idgham Shafawi, Izhar Shafawi |
| Madd | Madd Wajib Muttasil, Madd Jaiz Munfasil, Madd Lazim, Madd Tabii, Madd Lin, + more |
| Sifaat | Jahr, Hams, Shiddah, Rakhawah, Tawassut, Isti'la, Itbaq, Infitah, Qalqalah, Lin |
| Waqf | Waqf Lazim, Waqf Jaiz, Rawm, Ishmam, Wasl, Qat' |
| Ra and Lam | Ra Mufakhkhamah, Ra Muraqqaqah, Lam Shamsiyya, Lam Qamariyya |
| Hamzah | Hamzat al-Wasl, Hamzat al-Qat' |
| Letter names | Alif, Ba, Ta, Tha, Jim ... Ya (all 29) |
| General | Tajweed, Tarteel, Surah, Ayah, Quran, Basmala, Hafs, Warsh, + more |

## Tech

- Pure HTML + CSS + JavaScript - zero dependencies, zero build step
- Split into `index.html` (UI) and `app.js` (logic)
- Web Speech API (`SpeechRecognition`) for voice input
- Google Translate free endpoint for translation
- Amiri font (Google Fonts) for Arabic display

## Browser support

| Browser | Voice input | Translation | TTS |
|---|---|---|---|
| Chrome | Yes | Yes | Yes |
| Edge | Yes | Yes | Yes |
| Firefox | No | Yes | Yes |
| Safari iOS | Yes | Yes | Yes |

## License

MIT - free to use, modify, and share.
