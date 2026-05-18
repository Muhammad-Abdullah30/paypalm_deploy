# PayPalm ✋💳

> **Card-less. Device-free. Biometrically Secure Contactless Payments.**
>
> Developed by Air University's Department of Creative Technologies, Faculty of Computing.

---

## 📌 Executive Summary

Traditional card-based and smartphone-based payment systems face severe real-world limitations, including **high fraud risks**, the **loss or theft of physical devices**, and **hygiene concerns** related to contact-based biometrics (such as shared PIN pads or fingerprint readers). 

**PayPalm** is an academic research initiative and commercial prototype proposing a card-less, device-free payment solution that utilizes near-infrared **palm vein recognition** for secure, contactless transactions. By integrating unique, internal vein pattern biometrics with a cloud-connected digital wallet, the project addresses the core security, privacy, and usability challenges of modern payment networks.

---

## 🚀 Key Features of the Portal

The PayPalm Deployment & Showcase Portal is engineered as a high-fidelity landing page designed to impress academic mentors and commercial stakeholders.

*   **⚡ Ambient Futuristic UI/UX**: Built with deep space dark mode tones, glassmorphism card layouts (`backdrop-filter`), vibrant color palettes, and multiple glowing ambient backing layers for a premium, high-tech look.
*   **✋ Interactive Biometric Scanner Simulation**: 
    *   **Hero Unit**: Instantly triggers high-frequency laser sweep animations and vein path highlights when hovered or touched.
    *   **Advanced Scan Demo**: An interactive timeline showcasing the complete near-infrared handshake process—*Positioning hand $\rightarrow$ Near-IR Vein Mapping $\rightarrow$ Cryptographic Cloud Enclave Validation $\rightarrow$ Transaction Authorization Success*.
*   **📲 Lead Capture & Secure APK Delivery**: Go-to-market data capture form collecting *Name, Email, Mobile No, Organization, and Reason for Download* with real-time inputs validation. 
*   **⏳ Automated Countdown Download**: Validated submissions write to a local database, reveal a unique secure download key, and trigger a $3$-second countdown which automates the direct download of the genuine **117MB Mobile APK** (`paypalm.apk`).
*   **🔒 Secure Leads Administration Dashboard**: 
    *   Protected by a glassmorphic authentication modal with validation feedback (shakes on login failures).
    *   Authenticates securely using session state rules.
    *   Provides full leads overview, live search filters (filtering records instantly by name, university, or email), and a one-click **CSV/Excel export utility**.
*   **🎓 Academic Affiliation Integrations**: Features custom vector SVGs of the institutional crests of **Air University** and the **Department of Creative Technologies**, complete with responsive placement.

---

## 🔑 Administrative Access

To view, filter, and export the logs of users who registered and downloaded the APK:
1.  Click the padlock button icon in the sticky header navigation bar (or navigate to the bottom section).
2.  Input the following pre-configured credentials in the glassmorphic modal overlay:
    *   **Admin Email:** `admin@paypalm.com`
    *   **Password:** `admin_paypalm`
3.  Click **Unlock Dashboard** to open the Leads Administration Console.

---

## 📂 Project Directory Structure

The project is structured cleanly as a self-contained Single Page Application (SPA), allowing for instant offline-capable presentations:

```text
paypalm_deploy/
├── index.html       # Semantic HTML5 layout, custom SVG branding, forms, & modals
├── style.css        # Visual identity, CSS variables, glassmorphic filters, and @keyframes sweeps
├── app.js           # Biometric simulator timeline, lead serialization, & dashboard authentication
├── paypalm.apk      # Authentic compiled Android Application package (~117MB)
└── README.md        # Portal documentation & presentation guidelines
```

---

## 🛠️ Technology Stack

*   **Markup:** Semantic HTML5 utilizing modern structural tags and high-fidelity embedded SVG vector artwork (negating image load delays).
*   **Styling:** Custom CSS3 styling system leveraging CSS custom variables, Flexbox and Grid layouts, glassmorphic backdrops, and hardware-accelerated animations.
*   **Logic & Interactions:** Clean ES6 JavaScript managing mobile navigation, timeline simulators, form validations, browser `localStorage` lead persistence, and CSV compile routines.
*   **Application Build:** Complied through Expo framework enclaves.

---

## 👥 Development Team & Mentorship

### 🎓 Project Mentor
*   **Dr. Adnan Aslam** — *Senior Professor & Biometrics Director*

### 👨‍💻 Research & Engineering Team
*   **Muhammad Abdullah** — *Biometric Hardware Lead & AI Researcher*
*   **Muhammad Sohaib** — *Lead Blockchain & Digital Wallet Architect*
*   **Eman Ehsan** — *Full-Stack Cloud Developer & Android Lead*

---

## 🎬 Presentation Showcase Guide

Use this flow to present PayPalm to evaluators:

1.  **Introduce the Solution:** Explain the vulnerabilities of card/smartphone systems (theft, hygiene, cloning) and showcase the PayPalm breakthrough.
2.  **Run the Scanner:** Hover over the scanner element in the hero block or tap the plate in the **Scan Demo** section. Watch the $4$-second timeline proceed until the green `SUCCESS: AUTH PAID!` state is reached.
3.  **Demonstrate Capture Form:** Go to the download portal, attempt an empty submit to show validation prompts, and then fill in mock details.
4.  **Show the APK Download:** Observe the verified payload generation, the unique licensing key, and the automatic download prompt for the authentic `paypalm.apk`.
5.  **Access the Admin Dashboard:** Click the padlock button in the header, input `admin@paypalm.com` / `admin_paypalm`, inspect the newly logged details, filter the rows in real-time, and hit **Export CSV** to demonstrate the Excel-ready spreadsheet export.

---

## ☁️ Deployment Guide (Vercel & GitHub)

The portal is set up for hosting on **Vercel** and integrated with **GitHub**. Choose one of the following methods to redeploy changes:

### Method A: Automated Continuous Deployment (Recommended) ⚡
1.  Go to your **[Vercel Project Git Settings Dashboard](https://vercel.com/muhammad-abdullahs-projects-4135869a/paypalm_deploy/settings/git)**.
2.  Click **Connect** under Git Integration, and choose your repository: **`Muhammad-Abdullah30/paypalm_deploy`**.
3.  Once connected, any changes you push to GitHub will automatically trigger Vercel to redeploy the live website in seconds:
    ```bash
    git add .
    git commit -m "feat: your update message"
    git push
    ```

### Method B: Manual Command-Line Deployment 💻
If you prefer not to link your GitHub or want to push local changes directly from your terminal:
1.  Open your terminal in this directory and run:
    ```bash
    npx vercel --prod --yes
    ```
2.  This command will bypass the heavy 117MB APK (using [.vercelignore](file:///c:/Users/PMLS/Documents/paypalm_deploy/.vercelignore)), upload your source code, and update your live URL **[paypalmdeploy.vercel.app](https://paypalmdeploy.vercel.app)** instantly!

---
*Developed under academic supervision for the Air University Creative Technologies Initiative.*
