document.addEventListener("DOMContentLoaded", () => {
  const magicBtns = [
    'Воспоминмание 1',
    'Воспоминмание 2',
    'Воспоминмание 3',
    'Воспоминмание 4',
    'Воспоминмание 5',
    'Воспоминмание 6',
    'Воспоминмание 7',
    'Воспоминмание 8',
    'Воспоминмание 9',
    'Воспоминмание 10'
  ];

  const shareButton = document.querySelector(".form .btn");
  const btnDefault = document.querySelector("#btn-default"); // Кнопка с классом btn-default
  const popup = document.querySelector(".magic-pade-popup");
  const map = document.getElementById('map');
  const buttonsWrap = document.querySelector('.magic-btns');
  const mapWrap = document.querySelector(".section-form__map-wrap");
  const input = document.querySelector(".input-item__input");

  // Функция для отображения карты и создания кнопок
  function showMapAndCreateButtons() {
    map.style.display = "block"; // показываем карту

    buttonsWrap.innerHTML = ''; // Очищаем контейнер кнопок

    let lastBtns
    if (window.innerWidth > 700) {
      lastBtns = magicBtns.slice(-11); // Последние 10 кнопок
    } else {
      lastBtns = magicBtns.slice(-4); // Последние 4 кнопки
    }

    const usedPositions = [];

    lastBtns.forEach((memory, index) => {
      const btn = document.createElement('div');
      btn.className = 'magic-btn';
      btn.textContent = memory;
      btn.style.position = 'absolute';
      buttonsWrap.appendChild(btn);

      const mapWrapWidth = mapWrap.clientWidth;
      const mapWrapHeight = mapWrap.clientHeight;

      let randomX, randomY;
      let positionFound = false;

      while (!positionFound) {
        randomX = Math.random() * (mapWrapWidth - btn.offsetWidth);
        randomY = Math.random() * (mapWrapHeight - btn.offsetHeight);

        const isOverlapping = usedPositions.some(pos => {
          return (
            randomX < pos.x + btn.offsetWidth &&
            randomX + btn.offsetWidth > pos.x &&
            randomY < pos.y + btn.offsetHeight &&
            randomY + btn.offsetHeight > pos.y
          );
        });

        if (!isOverlapping) {
          positionFound = true;
          usedPositions.push({ x: randomX, y: randomY });
        }
      }

      btn.style.left = `${randomX}px`;
      btn.style.top = `${randomY}px`;

      // Начинаем анимацию
      animateButton(btn, index);
    });
  }



  shareButton.addEventListener("click", () => {
    const inputValue = input.value.trim();

    if (inputValue) {
      magicBtns.push(inputValue);
      input.value = "";
      input.classList.remove("error");

      // Показать попап
      popup.classList.add("opened");

      setTimeout(() => {
        popup.classList.remove("opened"); // Скрываем попап
      }, 2000);

      setTimeout(() => {
        showMapAndCreateButtons(); // Показываем карту и создаем кнопки
      }, 1000);
    } else {
      input.classList.add("error");
    }
  });


  btnDefault.addEventListener("click", () => {
    showMapAndCreateButtons(); // Показываем карту и создаем кнопки
  });


  function animateButton(btn, index) {
    const showDuration = 3000; // Длительность видимости кнопки
    const intervalDuration = 3000; // Интервал между миганиями (показать и скрыть)

    // Запускаем анимацию
    setInterval(() => {
      btn.classList.add('show');

      setTimeout(() => {
        btn.classList.remove('show'); 
      }, showDuration); // Длительность видимости кнопки

    }, intervalDuration + (200 * index)); // Задержка перед началом анимации
  }
});
// document.addEventListener("DOMContentLoaded", () => {

//   const magicBtns = [
//     'Воспоминмание 1',
//     'Воспоминмание 2',
//     'Воспоминмание 3',
//     'Воспоминмание 4',
//     'Воспоминмание 5',
//     'Воспоминмание 6',
//     'Воспоминмание 7',
//     'Воспоминмание 8',
//     'Воспоминмание 9',
//     'Воспоминмание 10'
//   ];

//   // Обрабатываем клик по кнопке
//   const shareButton = document.querySelector(".form .btn");
//   const popup = document.querySelector(".magic-pade-popup");
//   const map = document.getElementById('map');
//   const buttonsWrap = document.querySelector('.magic-btns');
//   const mapWrap = document.querySelector(".section-form__map-wrap");
//   const input = document.querySelector(".input-item__input");

//   shareButton.addEventListener("click", () => {
//     const inputValue = input.value.trim();

//     if (inputValue) {
//       // Если инпут не пустой
//       magicBtns.push(inputValue);
//       input.value = "";
//       input.classList.remove("error");

//       // Показать попап
//       popup.classList.add("opened");

//       setTimeout(() => {
//         popup.classList.remove("opened"); // Скрываем попап
//         map.style.display = "block"; // Показываем карту

//         buttonsWrap.innerHTML = '';

//         let lastBtns;
//         if (window.innerWidth > 700) {
//           lastBtns = magicBtns.slice(-10); // Последние 10 кнопок
//         } else {
//           lastBtns = magicBtns.slice(-4); // Последние 3 кнопки
//         }

//         // Добавляем кнопки из массива lastBtns
//         lastBtns.forEach((memory, index) => {
//           const btn = document.createElement('div');
//           btn.className = 'magic-btn';
//           btn.textContent = memory;
//           btn.style.position = 'absolute';
//           buttonsWrap.appendChild(btn);

//           // Получаем размеры родительского элемента
//           const mapWrapWidth = mapWrap.clientWidth;
//           const mapWrapHeight = mapWrap.clientHeight;

//           // Генерируем случайные координаты
//           const randomX = Math.random() * (mapWrapWidth - btn.offsetWidth);
//           const randomY = Math.random() * (mapWrapHeight - btn.offsetHeight);

//           btn.style.left = `${randomX}px`;
//           btn.style.top = `${randomY}px`;

//           // Начинаем анимацию
//           animateButton(btn, index);
//         });

//       }, 2000);
//     } else {
//       input.classList.add("error");
//       // console.log("Инпут пустой!");
//     }
//   });

//   function animateButton(btn, index) {
//     const showDuration = 3000; // Длительность видимости кнопки
//     const intervalDuration = 3000; // Интервал между миганиями (показать и скрыть)

//     setInterval(() => {
//       btn.classList.add('show');

//       setTimeout(() => {
//         btn.classList.remove('show'); 
//       }, showDuration); // Длительность видимости кнопки

//     }, intervalDuration + (200 * index)); // Задержка перед началом анимации
//   }
// });