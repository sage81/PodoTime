PodoTime

Система управління клієнтами для подологічного кабінету.

Функціональність

Клієнти
- Створення нових клієнтів
- Редагування інформації про клієнтів
- Видалення клієнтів
- Перегляд детальної інформації
- Фільтрація та пошук
- Сортування за ім'ям та датою
- Експорт даних у CSV

Технічний стек

Frontend
- Vue 3
- TypeScript
- Pinia (управління станом)
- Vite (збірка проекту)

Backend
- NestJS
- TypeScript
- PostgreSQL
- TypeORM

Запуск проекту

Frontend
cd frontend
npm install
npm run dev

Backend
cd backend
npm install
npm run start:dev

API Endpoints

Клієнти
GET /clients - отримати список клієнтів
POST /clients - створити нового клієнта
PUT /clients/:id - оновити інформацію про клієнта
DELETE /clients/:id - видалити клієнта

Наступні кроки
Додати аутентифікацію
Додати записи на прийом
Додати історію відвідувань
Додати нагадування 