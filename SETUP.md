# NIPO Digital Workspace — Public portal with private officer tasks

## What is public
- `index.html` is a **public homepage without any signup or login links in the navigation, banner or quick-lookup panel**. The one account gateway is the **Tasks & Schedules** service tile. Class Checker, GI Register, Information Roster, Visitor Portal, Registration Portal and the scanned-file lookup open without a site-wide login.
- The Information Desk Portal is a placeholder until its HTML file is supplied.
- `TM.csv` is read from the GitHub URL configured in `firebase-config.js`. The site does not upload or save spreadsheets. The CSV must be publicly accessible and the browser must be able to fetch it (CORS).

## What requires an account
- `officer-login.html` opens **only by clicking Tasks & Schedules** and offers officer sign-up, email verification, login, and access to private Tasks & Schedules.
- Newly registered accounts require administrator approval before private tasks open.
- The Firebase project is **not configured** in this package. Set up Email/Password Authentication and Cloud Firestore, copy the Firebase web configuration into `firebase-config.js`, and deploy `firestore.rules`.
- Approve officers and assign roles via a trusted administrator (Firebase Console / Admin SDK). Never approve accounts from untrusted client code.

## Shared GI and roster
- Firestore `shared/giRegister` and `shared/roster` can be read publicly with the supplied rules; only approved officers with `gi_manager`, `roster_manager` or `admin` roles can write. These records must contain **only information authorized for public disclosure**.
- Existing GI and roster apps remain separate supplied HTML applications, with Firestore synchronization adapters. Review their internal editing controls and workflows before production.
- Any GI or roster record intended to be confidential MUST NOT be stored in the publicly readable collections. Instead, change the Firestore read rules and require login for those sections.
- No server credentials, private keys or secret API tokens should ever be committed to GitHub.

## Publish / preview
- Keep the directory structure intact and publish the repository root via GitHub Pages (Settings > Pages).
- Preview locally with `python -m http.server 8000` from the website folder and open `http://localhost:8000/`.
- GitHub Pages is public static hosting, not an internal network or backend.
- The portal uses public Firebase browser SDK modules and some original tools depend on third-party scripts, internet access and their own services.
- This is a prototype: test each workflow, confirm NIPO authorization, review data retention and security, and test on multiple officer accounts before live deployment.

## Limitations
- No live Firebase project is configured; real-time database features cannot operate until setup.
- The live CSV URL may need to be changed to match your GitHub repository.
- The public GI Register and roster are read-only for unauthenticated visitors. Authorized editors must sign in through `officer-login.html` in the same browser.
- The original certificate generator and other supplied apps are retained; they have not been rewritten into a single unified application.

## Public homepage correction (November 2026)
- No general officer login on the public homepage.
- All tools other than Tasks & Schedules are accessible directly from the public cards (some write operations are role-protected).
- Signup/login appears inside the private Tasks & Schedules pathway only.
- The common Firebase backend still requires deployment.
