# HW23 — Docker: Expense Tracker + Cypress + ReportPortal

Локальна робота (без commit/push). Docker і WSL 2 уже мають бути встановлені.

## Структура

```
HW23/
  expense-tracker/   # React app + Dockerfile + Cypress
  reportportal/      # офіційний docker-compose ReportPortal
  README.md
```

## 1. Expense Tracker у Docker

```powershell
cd HW23\expense-tracker
docker compose up -d --build
```

Додаток: http://localhost:3000

Зупинити:

```powershell
docker compose down
```

## 2. Cypress UI-тести

Тести в `expense-tracker/cypress/e2e/expense-tracker.cy.js`.

Запуск у Docker (піднімає app, чекає healthcheck, ганяє Cypress headless):

```powershell
cd HW23\expense-tracker
docker compose --profile test run --rm cypress
```

Або якщо app уже запущений:

```powershell
docker compose up -d --build expense-tracker
docker compose --profile test run --rm cypress
```

## 3. ReportPortal (офіційна інструкція)

Джерело: https://reportportal.io/docs/installation-steps/DeployWithDocker

Потрібно ≈ 2 CPU, ≥ 6 GB RAM для Docker, ≥ 20 GB вільного місця.

```powershell
cd HW23\reportportal
# пароль адміна вже в .env (RP_INITIAL_ADMIN_PASSWORD)
docker compose -p reportportal up -d --force-recreate
```

UI: http://localhost:8080  
Логін: `superadmin`  
Пароль: значення з `.env` (`Hw23ReportPortal!`)

Перевірка логів:

```powershell
docker compose -p reportportal logs -f
```

Зупинити і прибрати volumes:

```powershell
docker compose -p reportportal down --volumes --remove-orphans
```

## WSL 2 / Docker (коротко для звіту)

На Windows 10/11 Docker Desktop використовує WSL 2 backend. Перевірка:

```powershell
wsl --status
docker --version
docker compose version
```
