# mangaLunar 📖

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS%20%7C%20Web-lightgrey.svg)

A cross-platform mobile application for reading manga, built with [Your Framework, e.g., React/Ionic] and Capacitor. This app allows users to seamlessly browse, download, and read their favorite manga chapters on the go, utilizing native file system performance.

## ✨ Features

* **Cross-Platform Support:** Runs on Android, iOS, and Web.
* **Native Performance:** Utilizes `Capacitor.convertFileSrc()` to bypass the WebView and render images directly from the native file system, ensuring zero Base64 RAM overhead.
* **Local Storage & ZIP Support:** Read manga directly from downloaded ZIP/CBZ files using custom `zipUtils`.
* **[Add Feature Here]:** e.g., Dark mode support.
* **[Add Feature Here]:** e.g., Offline reading capabilities.

## 🚀 Tech Stack

* **Frontend:** [React / Vue / Angular / Ionic]
* **Language:** TypeScript (`.ts`, `.tsx`)
* **Native Runtime:** Capacitor
* **Build Tool:** [Vite / Webpack]

## 📸 Screenshots

| Home Screen | Reading View | Settings |
| :---: | :---: | :---: |
| <img src="[link-to-image]" width="200"/> | <img src="[link-to-image]" width="200"/> | <img src="[link-to-image]" width="200"/> |

## 🛠️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* [Node.js](https://nodejs.org/) (v16 or higher recommended)
* npm or yarn
* [Android Studio](https://developer.android.com/studio) (for Android development)
* [Xcode](https://developer.apple.com/xcode/) (for iOS development - Mac only)
### 📂 Project Structure

```text
manga-v3/
├── android/            # Native Android source code
├── src/                # Frontend UI code (React/Vue/etc.)
│   ├── assets/         # Static assets (images, icons)
│   ├── components/     # Reusable UI components
│   ├── pages/          # App screens/views
│   └── utils/          # Utility functions (e.g., zipUtils.ts)
├── capacitor.config.ts # Capacitor configuration
└── package.json        # Dependencies and scripts
```

## 🤝 Contributing
* Contributions are always welcome!
* Fork the Project
* Create your Feature Branch (git checkout -b feature/AmazingFeature)
* Commit your Changes (git commit -m 'Add some AmazingFeature')
*Push to the Branch (git push origin feature/AmazingFeature)
* Open a Pull Request

## 📄 License
*Distributed under the MIT License. See LICENSE for more information.
## ✉️ Contact
* Krissh sharma - ks2265988@gmail.com
* Project Link: https://github.com/Kri14h/mangaLunar-Android.git
* link: https://drive.google.com/drive/folders/1tsmxtZPr2VBuy9tQy4HQNq2Zu-B76y_j?usp=sharing



