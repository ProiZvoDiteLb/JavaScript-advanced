// "use strict";

// const nameInput = document.querySelector(".add-form-name"); //Создаем переменную и ищем элемент с классом .add-form-name
// const commentInput = document.querySelector(".add-form-text"); //Создаем переменную и ищем элемент с классом .add-form-text
// const submitButton = document.querySelector(".add-form-button"); //Создаем переменную и ищем элемент с классом .add-form-button
// const commentsList = document.getElementById("comments-list"); //Создаем переменную и ищем элемент с id comments-list

// // Массив для хранения комментариев
// const comments = [
//   {
//     name: "Глеб Фокин",
//     date: "12.02.22 12:18",
//     text: "Это будет первый комментарий на этой странице",
//     likes: 3,
//     isLiked: false,
//   },
//   {
//     name: "Варвара Н.",
//     date: "13.02.22 19:22",
//     text: "Мне нравится как оформлена эта страница! ❤",
//     likes: 75,
//     isLiked: true,
//   },
// ];

// // Функция для рендеринга комментариев
// const renderComments = () => {
//   commentsList.innerHTML = comments
//     .map((comment, index) => {
//       return `
//         <li class="comment" data-index="${index}">
//           <div class="comment-header">
//             <div>${comment.name}</div>
//             <div>${comment.date}</div>
//           </div>
//           <div class="comment-body">
//             <div class="comment-text">${comment.text}</div>
//           </div>
//           <div class="comment-footer">
//             <div class="likes">
//               <span class="likes-counter">${comment.likes}</span>
//               <button class="like-button ${
//                 comment.isLiked ? "-active-like" : ""
//               }" data-index="${index}"></button>
//             </div>
//           </div>
//         </li>
//       `;
//     })
//     .join("");

//   initLikeButtons(); // Инициализируем обработчики кликов для кнопок лайков
//   initCommentClick(); // Инициализация обработчика клика по комментариям
// };

// // Обработчик клика для кнопок лайков
// const initLikeButtons = () => {
//   const likeButtons = document.querySelectorAll(".like-button");
//   likeButtons.forEach((button) => {
//     button.addEventListener("click", (event) => {
//       event.stopPropagation(); // Останавливаем распространение события
//       const index = event.target.dataset.index; // Получаем индекс комментария
//       // Изменяем состояние лайка
//       comments[index].isLiked = !comments[index].isLiked;
//       // Обновляем количество лайков
//       comments[index].likes += comments[index].isLiked ? 1 : -1;
//       // Рендерим комментарии заново
//       renderComments();
//     });
//   });
// };

// //Ответ на комментарий: При клике на существующий комментарий имя автора и текст комментария подставляются в форму

// const initCommentClick = () => {
//   const commentItems = document.querySelectorAll(".comment");
//   commentItems.forEach((item) => {
//     item.addEventListener("click", () => {
//       const index = item.dataset.index;
//       const comment = comments[index];
//       nameInput.value = comment.name;
//       commentInput.value = comment.text + " ";
//     });
//   });
// };

// // Обработчик события для кнопки "Написать"
// submitButton.addEventListener("click", () => {
//   const name = nameInput.value
//     .trim()
//     .replaceAll("<", "&lt;")
//     .replaceAll(">", "&gt;"); //используем replaceAll() для замены символов < и > на их HTML-сущности &lt; и &gt;
//   const comment = commentInput.value
//     .trim()
//     .replaceAll("<", "&lt;")
//     .replaceAll(">", "&gt;"); //используем replaceAll() для замены символов < и > на их HTML-сущности &lt; и &gt;

//   // Проверка на наличие имени и комментария
//   if (name === "" || comment === "") {
//     alert("Пожалуйста, заполните все поля.");
//     return;
//   }

//   // Создаем новый комментарий
//   const newComment = {
//     name: name,
//     date: new Date().toLocaleString(),
//     text: comment,
//     likes: 0,
//     isLiked: false,
//   };

//   // Добавляем новый комментарий в массив
//   comments.push(newComment);

//   // Очищаем поля ввода
//   nameInput.value = "";
//   commentInput.value = "";

//   // Рендерим комментарии заново
//   renderComments();
// });

// // Инициализация рендеринга комментариев
// renderComments();
