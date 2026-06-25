# Проєкт автоматизації тестування інтерфейсу Rozetka (Playwright & Selectors)

Цей проєкт реалізує автоматизовані автотести для перевірки ключових навігаційних шляхів та елементів інтерфейсу веб-сайту **[Rozetka](https://rozetka.com.ua/)** за допомогою бібліотеки **Playwright** та **TypeScript**.

Для забезпечення стабільності та уникнення блокування запитів системами захисту Cloudflare WAF, тести орієнтовані на взаємодію з інформаційними та навігаційними розділами сайту (каталог категорій, сторінки точок видачі та відомості про компанію).

---

## Структура та опис файлів проєкту

* **[package.json](file:///c:/Lesia/HW_Automation_QA_Course/Project/my-first-repo/HW15/package.json)** — визначає залежності (Playwright, TypeScript, ESLint), тип модулів ES, та скрипти для запуску тестів і перевірки лінтером.
* **[tsconfig.json](file:///c:/Lesia/HW_Automation_QA_Course/Project/my-first-repo/HW15/tsconfig.json)** — налаштовує сувору перевірку типів та компіляцію для TypeScript.
* **[.prettierrc](file:///c:/Lesia/HW_Automation_QA_Course/Project/my-first-repo/HW15/.prettierrc)** — конфігурація стилю форматування коду.
* **[eslint.config.mjs](file:///c:/Lesia/HW_Automation_QA_Course/Project/my-first-repo/HW15/eslint.config.mjs)** — правила статичного аналізу ESLint для дотримання єдиних стандартів коду.
* **[playwright.config.ts](file:///c:/Lesia/HW_Automation_QA_Course/Project/my-first-repo/HW15/playwright.config.ts)** — конфігураційний файл Playwright (базова адреса, запуск у headed-режимі та параметри обходу детектування автоматизації).
* **[tests/rozetka.spec.ts](file:///c:/Lesia/HW_Automation_QA_Course/Project/my-first-repo/HW15/tests/rozetka.spec.ts)** — містить тестові сценарії з використанням CSS та XPath локаторів.

---

## Опис тест-кейсів та селекторів

1. **Перехід на сторінку точок видачі магазинів**:
   * Знаходить та клікає посилання «Магазини Rozetka» за допомогою XPath-локатора `//a[contains(@class, "main-links-link") and contains(text(), "Магазини Rozetka")]`.
   * Перевіряє URL сторінки на відповідність шаблону `/retail/`.
   * Знаходить головний заголовок сторінки за допомогою CSS-селектора `h1` та перевіряє наявність тексту "Магазини ROZETKA".

2. **Навігація по категоріях через каталог**:
   * Клікає кнопку відкриття каталогу за допомогою CSS-селектора `button[data-testid="fat_menu_btn"]`.
   * Обирає категорію за допомогою XPath-селектора `//a[@data-testid="fat_menu_category_link" and contains(., "Ноутбуки та комп’ютери")]`.
   * Перевіряє заголовок сторінки категорії `h1.portal__heading` на точний текстовий збіг із `"Комп'ютери та ноутбуки"`.

3. **Перехід на сторінку опису компанії з футера**:
   * Скролить екран до підвалу та знаходить лінк за допомогою CSS-селектора `a[href*="/pages/about/"]`.
   * Переходить за посиланням за допомогою XPath-селектора `//a[contains(@href, "/pages/about/") and contains(text(), "Про нас")]`.
   * Перевіряє відповідність URL та наявність заголовка `h1` з текстом "Про нас".

---

## Запуск тестів та перевірка коду

1. Встановлення залежностей:
   ```bash
   npm install
   ```
2. Перевірка коду лінтером ESLint:
   ```bash
   npm run lint
   ```
3. Запуск автотестів Playwright:
   ```bash
   npm run test
   ```
