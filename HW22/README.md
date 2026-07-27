# Домашка HW22: GitHub Actions Пайплайни для Playwright та WebdriverIO (WDIO)

У цій папці реалізовано автоматичне виконання E2E-тестів за допомогою GitHub Actions у CI-середовищі для проєктів WebdriverIO та Playwright.

---

## 📁 Структура папки

- **`HW17/`** — скопійований проєкт на **WebdriverIO** (із домашньої роботи HW17).
  - Скрипт запуску: `npm test` (`wdio run ./wdio.conf.ts`).
  - Використовує протокол DevTools та Chrome.
  - У `wdio.conf.ts` додано підтримку headless-режиму під час виконання у CI (`CI=true`).
- **`HW18/`** — скопійований проєкт на **Playwright** (із домашньої роботи HW18).
  - Скрипт запуску: `npm test` (`npx playwright test`).
  - Конфігурація `playwright.config.ts` налаштована на автоматичне врахування `CI` (retries, forbidOnly, chromium browser).

---

## 🚀 Локальний запуск тестів

### 1. WebdriverIO (`HW22/HW17`)

```bash
cd HW22/HW17
npm ci
npm test
```

### 2. Playwright (`HW22/HW18`)

```bash
cd HW22/HW18
npm ci
npx playwright install chromium
npm test
```

---

## ⚙️ GitHub Actions Workflows

У корені репозиторію в папці `.github/workflows/` створено 2 workflow-файли:

1. **`.github/workflows/hw22-wdio.yml`** (`HW22 WDIO Tests`)
   - **Тригери**: `push` та `pull_request` на зміни в `HW22/HW17/**` або `.github/workflows/hw22-wdio.yml`, а також manual launch через `workflow_dispatch`.
   - **Runner**: `ubuntu-latest`.
   - **Основні кроки**:
     - Checkout коду (`actions/checkout@v4`).
     - Налаштування Node 20 з кешуванням `npm` (`actions/setup-node@v4`).
     - Встановлення Google Chrome у runner-середовищі (`apt-get install -y google-chrome-stable`).
     - Встановлення залежностей (`npm ci`).
     - Запуск тестів (`npm test`) зі встановленою змінною `CI=true`.

2. **`.github/workflows/hw22-playwright.yml`** (`HW22 Playwright Tests`)
   - **Тригери**: `push` та `pull_request` на зміни в `HW22/HW18/**` або `.github/workflows/hw22-playwright.yml`, а також `workflow_dispatch`.
   - **Runner**: `ubuntu-latest`.
   - **Основні кроки**:
     - Checkout коду (`actions/checkout@v4`).
     - Налаштування Node 20 з кешуванням `npm` (`actions/setup-node@v4`).
     - Встановлення залежностей (`npm ci`).
     - Встановлення браузерів Playwright та системних залежностей (`npx playwright install --with-deps chromium`).
     - Запуск тестів (`npm test`) зі встановленою змінною `CI=true`.
     - Збереження HTML-звіту у виглядi артефакту (`actions/upload-artifact@v4`) із retention 7 днів.

---

## 🔍 Як перевірити роботу в GitHub Actions після push

> ⚠️ **Зверніть увагу:** Локально комміт та пуш не виконувалися.

Після того, як ви закомітите та запушите зміни у свій GitHub-репозиторій:

1. Перейдіть на сторінку вашого репозиторію на GitHub.
2. Відкрийте вкладку **Actions** у верхньому меню.
3. У лівому боковому меню ви побачите два workflows:
   - **HW22 WDIO Tests**
   - **HW22 Playwright Tests**
4. При внесенні змін у папку `HW22/HW17` або `HW22/HW18` відповідний workflow запуститься автоматично.
5. Для ручного запуску оберіть потрібний workflow зі списку, натисніть кнопку **Run workflow** -> **Run workflow**.
6. Після завершення прогону Playwright у нижній частині сторінки запуску буде доступний завантажувальний артефакт **`playwright-report`**.
