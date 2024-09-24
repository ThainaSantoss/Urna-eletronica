let yourVoteFor = document.querySelector(".d-1-1 span");
let position = document.querySelector(".d-1-2 span");
let description = document.querySelector(".d-1-4");
let notice = document.querySelector(".d-2");
let side = document.querySelector(".d-1-right");
let numbers = document.querySelector(".d-1-3");

let CurrentStage = 0;
let number = "";
let WhiteVote = false;
let votes = [];
let end = false;

function startStep() {
  let stage = steps[CurrentStage];

  let numberHtml = "";
  number = "";
  WhiteVote = false;

  for (let i = 0; i < stage.numbers; i++) {
    if (i === 0) {
      numberHtml += '<div class="number blinks"></div>';
    } else {
      numberHtml += '<div class="number"></div>';
    }
  }

  yourVoteFor.style.display = "none";
  position.innerHTML = stage.title;
  description.innerHTML = "";
  notice.style.display = "none";
  side.innerHTML = "";
  numbers.innerHTML = numberHtml;
}

function updateInterface() {
  let stage = steps[CurrentStage];

  let candidate = stage.candidates.filter((item) => {
    if (item.number === number) {
      return true;
    } else {
      return false;
    }
  });
  if (candidate.length > 0) {
    candidate = candidate[0];

    yourVoteFor.style.display = "block";
    notice.style.display = "block";
    description.innerHTML = `Nome: ${candidate.number}<br/>Partido: ${candidate.party}`;

    let imgHtml = "";
    for (let i in candidate.photos) {
      if (candidate.photos[i].small) {
        imgHtml += `<div class="d-1-image small"> <img src="images/${candidate.photos[i].url}" alt=""/>${candidate.photos[i].legenda}</div>`;
      } else {
        imgHtml += `<div class="d-1-image"> <img src="images/${candidate.photos[i].url}" alt=""/>${candidate.photos[i].legenda}</div>`;
      }
    }

    side.innerHTML = imgHtml;
  } else {
    yourVoteFor.style.display = "block";
    notice.style.display = "block";
    description.innerHTML = '<div class="notice--large blinks">VOTO NULO</div>';
  }
}

function clicked(n) {
  let elNumer = document.querySelector(".number.blinks");
  if (elNumer !== null) {
    elNumer.innerHTML = n;
    number = `${number}${n}`;

    elNumer.classList.remove("blinks");

    if (elNumer.nextElementSibling !== null) {
      elNumer.nextElementSibling.classList.add("blinks"); // acha o elemento do lado
    } else {
      updateInterface();
    }
  }
}

function white() {
  number = "";
  WhiteVote = true;
  yourVoteFor.style.display = "block";
  notice.style.display = "block";
  numbers.innerHTML = "";
  description.innerHTML =
    '<div class="notice--large blinks">VOTO EM BRANCO</div>';
  side.innerHTML = "";
}

function corrects() {
  startStep();
}

let finalStage = false;
function corrects() {
  if (!finalStage) {
    startStep();
  }
}
function confirm() {
  if (!finalStage) {
    // verifica se já chegou no final
    let stage = steps[CurrentStage];

    let voteConfirmed = false;
    if (WhiteVote === true) {
      voteConfirmed = true;
      votes.push({
        stage: steps[CurrentStage].title,
        vote: "white",
      });
    } else if (number.length === stage.numbers) {
      voteConfirmed = true;
      votes.push({
        stage: steps[CurrentStage].title,
        vote: number,
      });
    }

    if (voteConfirmed) {
      CurrentStage++;

      if (steps[CurrentStage] !== undefined) {
        startStep();
      } else {
        document.querySelector(".screen").innerHTML =
          '<div class="warning--giant blinks">FIM</div>';
        console.log(votes);
        finalStage = true;
      }
    }
  }
}

function corrects() {
  if (!finalStage) {
    startStep();
  }
}

startStep();
