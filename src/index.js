// lists of colors using css color names
const listEasy = ["grey", "red", "blue", "green", "yellow", "purple", "orange", "pink"];
const listMedium = [...listEasy, "indigo", "cyan", "brown", "darkblue"];
const listHard = [...listMedium, "lightblue", "lightgrey", "lightyellow", "lightpink"];

function shuffle(list) {
  const duplicate = [...list, ...list];
  var currentIndex = list.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = list[currentIndex];
    list[currentIndex] = list[randomIndex];
    list[randomIndex] = temporaryValue;
  }

  return duplicate;
}

const board = document.querySelector(".board");

function createGame(list) {
  const shuffledList = shuffle(list);
  shuffledList.forEach((color) => {
    const card = document.createElement("div");
    const front = document.createElement("div");
    front.style.backgroundColor = "lightgrey";
    front.classList.add("front");
    const back = document.createElement("div");
    back.classList.add("back");
    card.classList.add("card");
    card.dataset.color = color;
    back.style.backgroundColor = color;
    card.addEventListener("click", () => {
      let flippedCards = document.querySelectorAll(".flipped");
      if (flippedCards.length > 2) {
        flippedCards.forEach((card) => {
          card.classList.remove("flipped");
        });
      }
      card.classList.add("flipped");
      flippedCards = document.querySelectorAll(".flipped");
      let matchedCards = document.querySelectorAll(".matched");

      if (matchedCards.length === shuffledList.length) {
        board.innerHTML = "";
        createGame(list);
        alert("You win!");
      }

      if (flippedCards.length === 2) {
        const [firstCard, secondCard] = flippedCards;

        if (firstCard.dataset.color === secondCard.dataset.color) {
          firstCard.classList.add("matched");
          firstCard.classList.remove("flipped");
          secondCard.classList.add("matched");
          secondCard.classList.remove("flipped");
        } else {
          setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
          }, 1000);
        }
      }

      matchedCards = document.querySelectorAll(".matched");

      if (matchedCards.length === shuffledList.length) {
        alert("You win!");
        board.innerHTML = "";
        createGame(list);
      }
    });
    card.append(front);
    card.append(back);
    board.append(card);
  });
}

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    board.innerHTML = "";

    if (button.innerText === "Easy") {
      board.classList = "board easy";
      createGame(listEasy);
    } else if (button.innerText === "Medium") {
      board.classList = "board medium";
      createGame(listMedium);
    } else {
      board.classList = "board hard";
      createGame(listHard);
    }
  });
});

createGame(listEasy);
