# Mesto — сайт для публикации фотографий

«Mesto» — это учебный проект, созданный в рамках курса «Фронтенд-разработчик» от «Яндекс Практикума». Здесь пользователи могут публиковать фотографии из посещенных мест, а также просматривать и лайкать фотографии других пользователей.

 <p align="center">
 <img src=".github/assets/screenshots/main-screen.jpg" width="100%" />
 </p>

## Технологии

[![HTML5](https://skillicons.dev/icons?i=html)](https://skillicons.dev)&nbsp;&nbsp;&nbsp;HTML5

[![CSS3](https://skillicons.dev/icons?i=css)](https://skillicons.dev)&nbsp;&nbsp;&nbsp;CSS3

[![JavaScript](https://skillicons.dev/icons?i=javascript)](https://skillicons.dev)&nbsp;&nbsp;&nbsp;JavaScript

## Особенности

- Возможность изменять фотографию, имя и род деятельности пользователя

 <p align="center">
 <img src=".github/assets/screenshots/userpic-change.gif" width="50%" />
 </p>

 - Добавление своих изображений в общую ленту

 <p align="center">
 <img src=".github/assets/screenshots/add-pic.gif" width="50%" />
 </p>

  - Просмотр полноразмерных изображений

 <p align="center">
 <img src=".github/assets/screenshots/preview.gif" width="50%" />
 </p>

- Возможность ставить и удалять лайки у фотографий с отправкой данных на сервер

 <p align="center">
 <img src=".github/assets/screenshots/like.gif" width="30%" />
 </p>

- Валидация форм, включая проверку валидности ссылок на изображения

 <p align="center">
 <img src=".github/assets/screenshots/validation.gif" width="30%" />
 </p>

 ## Запуск проекта

1. Установка зависимостей: npm install

2. Запуск dev-сервера: npm run dev

## Архитектура

В проекте используется модульный интерфейс.

Для каждого элемента приложения созданы специальные переиспользуемые компоненты, включая карточку изображения, ленту изображений и модальные окна. Логика валидации форм также прописана в отдельном компоненте.
  
## Цели проекта

В рамках этого проекта я освоил и успешно применил следующие навыки:

- создание модульных компонентов интерфейса

- работа со слушателями событий, в том числе использование кастомных слушателей CustomEvent

- реализация модальных окон с помощью JavaScript

- реализация валидации форм

- интеграция с API
