// lists of colors using css color names
const listEasy = ["grey", "red", "blue", "green", "yellow", "purple", "orange", "pink"];
const listMedium = [...listEasy, "black", "indigo", "cyan", "brown", "darkblue"];
const listHard = [...listMedium, "lightgreen", "lightblue", "lightgrey", "lightyellow", "lightpink", "darkgreen"];

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
    card.classList.add("card");
    card.dataset.color = color;
    card.style.backgroundColor = color;
    card.addEventListener("click", () => {
      card.classList.add("flipped");
      const flippedCards = document.querySelectorAll(".flipped");
      const matchedCards = document.querySelectorAll(".matched");

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
    });
    board.append(card);
  });
}

console.log(listEasy[23]);
createGame(listEasy);
