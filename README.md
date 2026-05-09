# Sheikh Translator

A single-file web app for live Arabic → English translation, built for Quran and Tajweed learning. Designed to be used alongside a sheikh or teacher — speak or type Arabic and get an instant English translation.

## Features

- **Voice input** — tap Speak, say something in Arabic, get instant English translation
- **Type & translate** — type Arabic text and press the Translate button (or Enter on desktop)
- **Tajweed-aware** — 150+ Tajweed and Islamic terms are recognized correctly instead of being literally translated by Google:
  - `إدغام` → Idgham (not "merging")
  - `إخفاء` → Ikhfa, `قلقلة` → Qalqalah, `غنة` → Ghunnah, etc.
  - All Noon Sakinah, Meem Sakinah, Madd, Sifaat, Makhaarij, Waqf terms
  - All 29 Arabic letter names (Alif, Ba, Ta ... Ya)
- **Read aloud** — TTS button reads Arabic or English text back
- **Copy** — one tap to copy either panel
- **Offline-capable** — only the translation call needs internet; the UI works offline

## How to use

1. Download or clone this repo
2. Open `index.html` in **Chrome or Edge** (required for voice input)
3. Tap **Speak** and speak in Arabic — translation appears automatically
4. Or type Arabic in the top box and press **Translate to English**

> Voice input uses the Web Speech API which requires Chrome or Edge. Firefox does not support it.

## No API key needed

Translation uses the free, unofficial Google Translate endpoint (`translate.googleapis.com`). No account, no key, no rate limit for normal use.

## Tajweed terms covered

From Al-Jazariyya, Warsh, and Tuhfat al-Atfal:

| Category | Examples |
|---|---|
| Noon Sakinah / Tanwin | Idgham bil Ghunnah, Idgham bila Ghunnah, Ikhfa Haqiqi, Izhar Halqi, Iqlab |
| Meem Sakinah | Ikhfa Shafawi, Idgham Shafawi, Izhar Shafawi |
| Madd | Madd Wajib Muttasil, Madd Jaiz Munfasil, Madd Lazim, Madd Tabii, Madd Lin, + more |
| Sifaat | Jahr, Hams, Shiddah, Rakhawah, Tawassut, Isti'la, Itbaq, Infitah, Qalqalah, Lin |
| Waqf | Waqf Lazim, Waqf Jaiz, Rawm, Ishmam, Wasl, Qat' |
| Ra & Lam | Ra Mufakhkhamah, Ra Muraqqaqah, Lam Shamsiyya, Lam Qamariyya |
| Hamzah | Hamzat al-Wasl, Hamzat al-Qat' |
| Letter names | Alif, Ba, Ta, Tha, Jim ... Ya (all 29) |
| General | Tajweed, Tarteel, Surah, Ayah, Quran, Basmala, Hafs, Warsh, + more |

## Tech

- Pure HTML + CSS + JavaScript — zero dependencies, zero build step
- Web Speech API (`SpeechRecognition`) for voice input
- Google Translate free endpoint for translation
- Amiri font (Google Fonts) for Arabic display

## Browser support

| Browser | Voice input | Translation | TTS |
|---|---|---|---|
| Chrome | Yes | Yes | Yes |
| Edge | Yes | Yes | Yes |
| Firefox | No | Yes | Yes |
| Safari (iOS) | Yes | Yes | Yes |

## License

MIT — free to use, modify, and share.
