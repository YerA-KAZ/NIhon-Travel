# Nihon Travel

`Nihon Travel` — это full-stack веб-проект о путешествиях по Японии с собственным backend API, PostgreSQL, авторизацией, профилем пользователя, избранным, историей просмотров, формой сообщений и админ-панелью.

Проект использует:
- `Node.js + Express` для backend
- `PostgreSQL` для базы данных
- `HTML + CSS + Vanilla JS` для frontend
- `JWT` для авторизации
- `Resend` для писем сброса пароля

## Что уже есть в проекте

- главная страница с hero-блоком, фильтрацией направлений и секцией контактов
- отдельные страницы с гайдами: `destination`, `jr-pass`, `when-to-visit`, `etiquette`, `anime` и др.
- мультиязычность через `frontend/js/i18n.js`
- регистрация, вход, восстановление пароля
- профиль пользователя
- избранное и история просмотров
- отправка сообщений
- админ-панель для управления данными

## Стек

| Слой | Технологии |
|---|---|
| Frontend | `HTML5`, `CSS3`, `Vanilla JS` |
| Backend | `Node.js`, `Express` |
| Database | `PostgreSQL` |
| Auth | `JWT`, `bcrypt` |
| Email | `Resend` |
| UI/Effects | `AOS`, `Font Awesome`, `Leaflet` |

## Структура проекта

```text
japan-travel/
├─ backend/
│  ├─ db/
│  │  ├─ pool.js
│  │  └─ schema.sql
│  ├─ middleware/
│  │  └─ auth.js
│  ├─ routes/
│  │  ├─ admin.js
│  │  ├─ auth.js
│  │  ├─ destinations.js
│  │  ├─ favorites.js
│  │  ├─ history.js
│  │  ├─ messages.js
│  │  └─ users.js
│  ├─ utils/
│  │  └─ sendEmail.js
│  ├─ .env.example
│  ├─ package.json
│  └─ server.js
├─ frontend/
│  ├─ css/
│  │  ├─ style.css
│  │  ├─ profile.css
│  │  └─ guides.css
│  ├─ js/
│  │  ├─ i18n.js
│  │  └─ main.js
│  ├─ pages/
│  │  ├─ admin.html
│  │  ├─ anime.html
│  │  ├─ destination.html
│  │  ├─ etiquette.html
│  │  ├─ forgot-password.html
│  │  ├─ jr-pass.html
│  │  ├─ profile.html
│  │  ├─ reset-password.html
│  │  ├─ travel-tips.html
│  │  ├─ visa-guide.html
│  │  └─ when-to-visit.html
│  └─ index.html
├─ package.json
└─ README.md
```

## Быстрый запуск

### 1. Требования

- `Node.js 18+`
- `PostgreSQL 14+`

### 2. Установка зависимостей backend

```bash
cd backend
npm install
```

### 3. Создание базы данных

```sql
CREATE DATABASE japan_travel;
```

После этого импортируйте схему:

```bash
psql -U postgres -d japan_travel -f backend/db/schema.sql
```

Если вы уже находитесь в папке `backend`, используйте:

```bash
psql -U postgres -d japan_travel -f db/schema.sql
```

### 4. Настройка `.env`

Скопируйте пример:

```bash
cd backend
copy .env.example .env
```

Или создайте файл вручную по примеру из [backend/.env.example](/C:/Users/toph8/OneDrive/Desktop/japan-travel%20(4)%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F/japan-travel/backend/.env.example).

### 5. Запуск сервера

Режим разработки:

```bash
cd backend
npm run dev
```

Продакшн-запуск:

```bash
cd backend
npm start
```

### 6. Открыть сайт

После запуска сайт будет доступен по адресу:

```text
http://localhost:5000
```

Frontend в этом проекте отдается напрямую через Express, отдельный build-step не нужен.

## Переменные окружения

Основные переменные:

| Переменная | Описание |
|---|---|
| `PORT` | Порт backend-сервера |
| `NODE_ENV` | Режим запуска |
| `DB_HOST` | Хост PostgreSQL |
| `DB_PORT` | Порт PostgreSQL |
| `DB_NAME` | Имя базы |
| `DB_USER` | Пользователь БД |
| `DB_PASSWORD` | Пароль БД |
| `JWT_SECRET` | Секрет для JWT |
| `JWT_EXPIRES_IN` | Время жизни токена |
| `FRONTEND_URL` | URL фронтенда для CORS и email-ссылок |
| `RESEND_API_KEY` | API-ключ Resend |
| `EMAIL_FROM` | Email отправителя |

Пример файла уже есть в [backend/.env.example](/C:/Users/toph8/OneDrive/Desktop/japan-travel%20(4)%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F/japan-travel/backend/.env.example).

## Основные скрипты

Файл: [backend/package.json](/C:/Users/toph8/OneDrive/Desktop/japan-travel%20(4)%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F/japan-travel/backend/package.json)

```json
{
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

## API

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

### Destinations

- `GET /api/destinations`
- `GET /api/destinations/:id`

Поддерживаются:
- `category`
- `search`
- `limit`
- `offset`

### Favorites

- `GET /api/favorites`
- `POST /api/favorites`
- `DELETE /api/favorites/:destination_id`

### History

- `GET /api/history`
- `POST /api/history`
- `DELETE /api/history`

### Messages

- `POST /api/messages`
- `GET /api/messages/my`

### Users

- `PUT /api/users/profile`
- `PUT /api/users/password`

### Admin

- `GET /api/admin/stats`
- `GET /api/admin/users`
- `GET /api/admin/messages`
- `GET /api/admin/destinations`
- `POST /api/admin/destinations`
- `PUT /api/admin/destinations/:id`
- `DELETE /api/admin/destinations/:id`

## Где что редактировать

### Главная страница

- разметка: [frontend/index.html](/C:/Users/toph8/OneDrive/Desktop/japan-travel%20(4)%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F/japan-travel/frontend/index.html)
- стили: [frontend/css/style.css](/C:/Users/toph8/OneDrive/Desktop/japan-travel%20(4)%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F/japan-travel/frontend/css/style.css)
- логика: [frontend/js/main.js](/C:/Users/toph8/OneDrive/Desktop/japan-travel%20(4)%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F/japan-travel/frontend/js/main.js)

### Переводы

- все строки интерфейса: [frontend/js/i18n.js](/C:/Users/toph8/OneDrive/Desktop/japan-travel%20(4)%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F/japan-travel/frontend/js/i18n.js)

### Карточки направлений

- seed-данные: [backend/db/schema.sql](/C:/Users/toph8/OneDrive/Desktop/japan-travel%20(4)%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F/japan-travel/backend/db/schema.sql)
- API-нормализация описаний: [backend/routes/destinations.js](/C:/Users/toph8/OneDrive/Desktop/japan-travel%20(4)%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F/japan-travel/backend/routes/destinations.js)

### Страница направления `destination.html`

Файл: [frontend/pages/destination.html](/C:/Users/toph8/OneDrive/Desktop/japan-travel%20(4)%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F/japan-travel/frontend/pages/destination.html)

Здесь лежат:
- `const DEST_DATA` — галерея, координаты, советы, сезонность, фразы
- `const DEST_DATA_I18N` — локализованные версии текстов
- рендер карточек и блоков страницы

Если нужно:
- поменять фото в галерее направления — меняйте `gallery`
- изменить советы — меняйте `tips`
- обновить координаты карты — меняйте `lat/lng`
- перевести контент — обновляйте `DEST_DATA_I18N`

### Профиль и админка

- [frontend/pages/profile.html](/C:/Users/toph8/OneDrive/Desktop/japan-travel%20(4)%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F/japan-travel/frontend/pages/profile.html)
- [frontend/pages/admin.html](/C:/Users/toph8/OneDrive/Desktop/japan-travel%20(4)%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F/japan-travel/frontend/pages/admin.html)
- [frontend/css/profile.css](/C:/Users/toph8/OneDrive/Desktop/japan-travel%20(4)%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F/japan-travel/frontend/css/profile.css)

## Как сделать пользователя админом

После регистрации обычного пользователя можно выдать права администратора вручную:

```sql
UPDATE users
SET role = 'admin'
WHERE email = 'your@email.com';
```

## Email и сброс пароля

Сброс пароля реализован через `Resend`.

Файлы:
- [backend/routes/auth.js](/C:/Users/toph8/OneDrive/Desktop/japan-travel%20(4)%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F/japan-travel/backend/routes/auth.js)
- [backend/utils/sendEmail.js](/C:/Users/toph8/OneDrive/Desktop/japan-travel%20(4)%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F/japan-travel/backend/utils/sendEmail.js)

Если `RESEND_API_KEY` не настроен, функциональность отправки email работать корректно не будет.

## Полезные замечания

- В корне проекта есть `package.json`, но основной сервер запускается из папки `backend`.
- Frontend не использует React/Vite-сборку — это статические страницы с Vanilla JS.
- Многие пользовательские данные подгружаются через API, а часть UI-контента хранится прямо в HTML/JS.
- Для детальной страницы направления важно различать:
  - данные карточек из БД
  - расширенные данные страницы из `DEST_DATA`

## Статус

Проект подходит для:
- учебного full-stack портфолио
- дальнейшей доработки под travel-сервис
- демонстрации CRUD, auth, profile/admin flow и мультиязычного интерфейса

Если нужно, следующим шагом можно отдельно сделать:
- README на английском
- краткий README только для запуска
- README в формате для GitHub portfolio / CV
