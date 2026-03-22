# 🔊 Error Sound Alert

**Error Sound Alert** is a lightweight Visual Studio Code extension that plays a sound whenever a terminal command fails (non-zero exit code). It helps you instantly notice errors without constantly watching the terminal.

---

## 🚀 Features

- 🔔 **Automatic Error Detection**
  - Plays a sound when a terminal command exits with an error.

- 🎯 **Accurate Detection**
  - Uses exit codes instead of unreliable keyword matching.

- 🎵 **Custom Sound მხარდაჭერა**
  - Easily change the alert sound to your preference.

---

## ⚙️ How It Works

- The extension listens to terminal command executions.
- If a command exits with a **non-zero exit code**, a sound is played.
- No false positives from `console.log` or `print` statements.

---

## 🎧 Change Error Sound

You can customize the alert sound:

1. Open Command Palette:
Ctrl + Shift + P

2. Type:
Change Error Sound

3. Select a `.wav` file from your system

⚠️ **Important:**
- Only `.wav` files are supported
- `.mp3` or other formats will not work

---

## 📦 Requirements

- Visual Studio Code (version compatible with your extension)
- OS with audio playback support:
- Windows (PowerShell)
- macOS (`afplay`)
- Linux (`aplay`)

---

## ⚙️ Extension Settings

Currently, this extension does not add configurable settings via `settings.json`.

---

## ⚠️ Known Limitations

- If a program exits with code `0` despite having logical errors, no sound will be played
- Some custom shells/tools may not report exit codes reliably
- Only terminal-based errors are detected (not editor diagnostics)

---

## 📝 Release Notes

### 1.0.2
- Initial release
- Error detection using terminal exit codes
- Custom sound support via command palette

---

## 🤝 Contributing

Contributions are welcome!

GitHub Repository:  
👉 https://github.com/M-Pushkar-Varshney-K/VScodeExtensionSoundError.git

You can:
- Report bugs
- Suggest features
- Submit pull requests

---

## 📄 License

This project is licensed under the MIT License.

## 💡 Future Improvements

- Support for more audio formats
- Volume control
- Integration with VS Code diagnostics

---

**Enjoy coding with instant error feedback! 🚀**