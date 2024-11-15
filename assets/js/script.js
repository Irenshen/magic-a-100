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
  const btnDefault = document.querySelector("#btn-default");
  const popup = document.querySelector(".magic-pade-popup");
  const map = document.getElementById('map');
  const buttonsWrap = document.querySelector('.magic-btns');
  const mapWrap = document.querySelector(".section-form__map-wrap");
  const input = document.querySelector(".input-item__input");

  function showMapAndCreateButtons() {
    map.style.display = "block"; 
    buttonsWrap.innerHTML = '';

    let lastTenBtns;
    if (window.innerWidth > 700) {
      lastTenBtns = magicBtns.slice(-10);
    } else {
      lastTenBtns = magicBtns.slice(-5);
    }

    const usedPositions = [];

    lastTenBtns.forEach((memory, index) => {
      const btn = document.createElement('div');
      btn.className = 'magic-btn';
      btn.textContent = memory;
      buttonsWrap.appendChild(btn);

      const mapWrapWidth = mapWrap.clientWidth;
      const mapWrapHeight = mapWrap.clientHeight;

      let positionFound = false;
      let randomX, randomY;

      while (!positionFound) {
        randomX = Math.random() * (mapWrapWidth - btn.offsetWidth);
        randomY = Math.random() * (mapWrapHeight - btn.offsetHeight - 36); 

        // Проверяем, не перекрываются ли кнопки
        const isOverlapping = usedPositions.some(pos => {
          return (
            randomX < pos.x + btn.offsetWidth &&
            randomX + btn.offsetWidth > pos.x &&
            randomY < pos.y + btn.offsetHeight &&
            randomY + btn.offsetHeight > pos.y
          );
        });

        // Проверяем, не выходит ли кнопка за границы карты
        const isOutOfBounds = (
          randomX < 0 ||
          randomY < 0 ||
          randomX + btn.offsetWidth > mapWrapWidth ||
          randomY + btn.offsetHeight > mapWrapHeight
        );

        if (!isOverlapping && !isOutOfBounds) {
          positionFound = true;
          usedPositions.push({ x: randomX, y: randomY });
          btn.style.left = `${randomX}px`;
          btn.style.top = `${randomY}px`;

          // Начинаем анимацию
          animateButton(btn, index);
        }
      }
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
        popup.classList.remove("opened");
      }, 2000);

      setTimeout(() => {
        showMapAndCreateButtons();
      }, 1000);
    } else {
      input.classList.add("error");
    }
  });

  btnDefault.addEventListener("click", () => {
    showMapAndCreateButtons();
  });

  function animateButton(btn, index) {
    const showDuration = 3000; 
    const intervalDuration = 3000; 

    setInterval(() => {
      btn.classList.add('show');

      setTimeout(() => {
        btn.classList.remove('show');
      }, showDuration);

    }, intervalDuration + (200 * index));
  }
});