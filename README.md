# Mesto — сайт для публикации фотографий

«Mesto» — это учебный проект, созданный в рамках курса «Фронтенд-разработчик» от «Яндекс Практикума». Здесь пользователи могут публиковать фотографии из посещенных мест, а также просматривать и лайкать фотографии других пользователей.

 <p align="center">
 <img src=".github/assets/screenshots/main-screen.jpg" width="100%" />
 </p>

## Технологии

<table align="center">
  <tr>
    <td align="center">
      <img src="https://skillicons.dev/icons?i=html" width="50"/><br/>
      <sub>HTML5</sub>
    </td>
    <td align="center">
      <img src="https://skillicons.dev/icons?i=css" width="50"/><br/>
      <sub>CSS3</sub>
    </td>
    <td align="center">
      <img src="https://skillicons.dev/icons?i=javascript" width="50"/><br/>
      <sub>JavaScript</sub>
    </td>
   <td align="center">
      <img src="https://skillicons.dev/icons?i=webpack" width="50"/><br/>
      <sub>Webpack</sub>
    </td>
  </tr>
</table>

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
  
## Задачи

В рамках этого проекта я выполнил следующие задачи.

- Настроил среду разработки в Webpack.

- Реализовал механизм открытия и закрытия модальных окон с помощью обработчиков событий, создал кастомные события открытия и закрытия модального окна для более гибкого управления.

- Реализовал механизм заполнения и валидации форм при изменении данных пользователя и добавлении карточки.

- Добавил возможность ставить лайки карточкам.

- Настроил интеграцию клиентской части приложения с API.
