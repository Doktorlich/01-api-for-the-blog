# **📝 Blog API (REST + MongoDB)**

Простое RESTful API для блога, написанное на **Node.js** с использованием **Express** и **MongoDB**.

## **🚀 Возможности**

-   Создание, чтение, обновление и удаление постов (CRUD).
-   Хранение данных в MongoDB.
-   Валидация входных данных.
-   Гибкая структура для расширения (аутентификация, комментарии).

## **🛠 Технологии**

-   **Node.js** (серверная платформа)
-   **Express** (фреймворк для роутинга)
-   **MongoDB** (база данных)
-   **Mongoose** (ODM для работы с MongoDB)
-   **Dotenv** (управление переменными окружения)

## **⚙️ Установка и запуск**

### **1. Клонирование репозитория**

```bash
git clone https://github.com/Doktorlich/01-api-for-the-blog.git
cd 01-api-for-the-blog
```

### **2. Установка зависимостей**

```bash
npm install
```

### **3. Настройка переменных окружения**

Создай файл `.env` в корне проекта и добавь:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000  # (опционально)
NODE_ENV=development
REFRESH_TOKEN_SECRET=refreshtoken
ACCESS_TOKEN_SECRET=accesstoken
```

### **4. Запуск сервера**

```bash
npm start
```

Сервер будет доступен по адресу: `http://localhost:3000`

## **📚 API Endpoints**

| Метод  | Эндпоинт             | Описание               |
| ------ | -------------------- | ---------------------- |
| GET    | `/posts`             | Получить все посты     |
| GET    | `/posts/:id`         | Получить пост по ID    |
| GET    | `/posts/create-post` | Открыть форму создание поста |
| POST   | `/posts/create-post` | Создать новый пост     |
| GET    | `/posts/:id`         | Открыть форму редактирования поста по id  |
| PUT    | `/posts/:id/update`         | Обновить пост по ID    |
| DELETE | `/posts/:id/delete`         | Удалить пост по ID     |

## **🔧 Тестирование**

Для тестирования API можно использовать:

-   [Postman](https://www.postman.com/)
-   [Thunder Client (VS Code)](https://www.thunderclient.com/)

## **📌 Планы по развитию**

-   [x] Добавить аутентификацию (JWT)
- 	[x] Реализовать пагинацию для GET-запросов
-   [x] Добавить систему комментариев
-   [ ] Добавить расылку писем через почтовый сервис
-   [ ] Добавить функцию восстановления пароля

## **📜 Лицензия**

MIT
