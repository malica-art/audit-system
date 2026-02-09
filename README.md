# Audit System Preview

This repository contains a **static preview** of the audit dashboard UI. You can open it locally or in a Codespace without any build step.

## Quick start (easiest)

If you are using **GitHub Codespaces**:
1. Open the repo on GitHub.
2. Click **Code** → **Codespaces** → **Create codespace**.
3. When the editor opens, press **Terminal → New Terminal**.
4. Run:
   ```bash
   python -m http.server 4173 --directory /workspace/audit-system
   ```
5. Click the **Ports** tab and open port **4173** in your browser.

## If you have the repo on your computer

1. Open a terminal and go to the repo folder (where `index.html` lives).
2. Run:
   ```bash
   python -m http.server 4173 --directory .
   ```
3. Open:
   ```
   http://localhost:4173
   ```

## What you should see

- A sidebar with tabs (Overview, All Systems, Reminders, Schedule, Analytics, Active Audit).
- Clicking **All Systems** → **Start Audit** opens the checklist.
- Checklist sections expand/collapse and accept file attachments.
