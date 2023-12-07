import {
  isInvalidPawnMove,
  isInvalidRookMove,
  isInvalidKnightMove,
  isInvalidBishopMove,
  isInvalidQueenMove,
  isInvalidKingMove,
} from "../utils/helpers.js";

const BOARD_COLOR_THEMES = {
  GRAY: "GRAY",
  GREEN: "GREEN",
  WOOD: "WOOD",
};

const SQUARE_COLOR = {
  LIGHT: "light",
  DARK: "dark",
};

const boardEl = document.querySelector(".board");
const themeSelectorEl = document.querySelector("#boardThemeSelect");
const squareEls = Array.from(document.querySelectorAll(".square"));

const checkEvenCell = (id) => {
  const res1 = id.charCodeAt(0) - 96;
  const res2 = Number(id.at(1));
  return !((res1 + res2) % 2);
};

const flipBoard = () => {
  boardEl.classList.toggle("flipped");
  squareEls.forEach((squareEl) => {
    squareEl.classList.toggle("flipped");
    squareEl.querySelector(".row-marking")?.classList.toggle("flipped");
    squareEl.querySelector(".col-marking")?.classList.toggle("flipped");
    squareEl.querySelector(".peice")?.classList.toggle("flipped");
    if (squareEl.classList.contains("flipped")) {
      if (squareEl.id.at(0) === "h") {
        const markingDiv = squareEl.querySelector(".row-marking");
        squareEl.querySelector(".row-marking").style.display = "block";
      }
      if (squareEl.id.at(1) === "8") {
        const markingDiv = squareEl.querySelector(".col-marking");
        markingDiv.style.display = "block";
      }
      if (squareEl.id.at(0) === "a") {
        const markingDiv = squareEl.querySelector(".row-marking");
        squareEl.querySelector(".row-marking").style.display = "none";
      }
      if (squareEl.id.at(1) === "1") {
        const markingDiv = squareEl.querySelector(".col-marking");
        markingDiv.style.display = "none";
      }
    } else {
      if (squareEl.id.at(0) === "h") {
        const markingDiv = squareEl.querySelector(".row-marking");
        squareEl.querySelector(".row-marking").style.display = "none";
      }
      if (squareEl.id.at(1) === "8") {
        const markingDiv = squareEl.querySelector(".col-marking");
        markingDiv.style.display = "none";
      }
      if (squareEl.id.at(0) === "a") {
        const markingDiv = squareEl.querySelector(".row-marking");
        squareEl.querySelector(".row-marking").style.display = "block";
      }
      if (squareEl.id.at(1) === "1") {
        const markingDiv = squareEl.querySelector(".col-marking");
        markingDiv.style.display = "block";
      }
    }
  });
};

const boardTheme = () => {
  boardEl.setAttribute("theme", themeSelectorEl.value);
};

const boardMarking = () => {
  squareEls.forEach((squareEl) => {
    squareEl.classList.add(
      checkEvenCell(squareEl.id) ? SQUARE_COLOR.LIGHT : SQUARE_COLOR.DARK
    );

    if (squareEl.id.at(0) === "h") {
      const markingDiv = document.createElement("div");
      markingDiv.classList.add("row-marking");
      markingDiv.innerText = squareEl.id.at(1);
      squareEl.appendChild(markingDiv);
      if (!boardEl.classList.contains("flipped"))
        markingDiv.style.display = "none";
    }
    if (squareEl.id.at(1) === "8") {
      const markingDiv = document.createElement("div");
      markingDiv.classList.add("col-marking");
      markingDiv.innerText = squareEl.id.at(0);
      squareEl.appendChild(markingDiv);
      if (!boardEl.classList.contains("flipped"))
        markingDiv.style.display = "none";
    }

    if (squareEl.id.at(0) === "a") {
      const markingDiv = document.createElement("div");
      markingDiv.classList.add("row-marking");
      markingDiv.innerText = squareEl.id.at(1);
      squareEl.appendChild(markingDiv);
    }
    if (squareEl.id.at(1) === "1") {
      const markingDiv = document.createElement("div");
      markingDiv.classList.add("col-marking");
      markingDiv.innerText = squareEl.id.at(0);
      squareEl.appendChild(markingDiv);
    }
  });
};

const placePeices = () => {
  squareEls.forEach((squareEl) => {
    const id = squareEl.id;
    switch (id) {
      case "a1":
      case "h1":
        const wrookImgEl = document.createElement("img");
        wrookImgEl.setAttribute("src", "../resources/images/wr.png");
        wrookImgEl.classList.add("peice", "wr");
        squareEl.appendChild(wrookImgEl);
        break;
      case "b1":
      case "g1":
        const wknightImgEl = document.createElement("img");
        wknightImgEl.setAttribute("src", "../resources/images/wn.png");
        wknightImgEl.classList.add("peice", "wn");
        squareEl.appendChild(wknightImgEl);
        break;
      case "c1":
      case "f1":
        const wbishopImgEl = document.createElement("img");
        wbishopImgEl.setAttribute("src", "../resources/images/wb.png");
        wbishopImgEl.classList.add("peice", "wb");
        squareEl.appendChild(wbishopImgEl);
        break;
      case "d1":
        const wqueenImgEl = document.createElement("img");
        wqueenImgEl.setAttribute("src", "../resources/images/wq.png");
        wqueenImgEl.classList.add("peice", "wq");
        squareEl.appendChild(wqueenImgEl);
        break;
      case "e1":
        const wkingImgEl = document.createElement("img");
        wkingImgEl.setAttribute("src", "../resources/images/wk.png");
        wkingImgEl.classList.add("peice", "wk");
        squareEl.appendChild(wkingImgEl);
        break;
      case "a2":
      case "b2":
      case "c2":
      case "d2":
      case "e2":
      case "f2":
      case "g2":
      case "h2":
        const wpawnImgEl = document.createElement("img");
        wpawnImgEl.setAttribute("src", "../resources/images/wp.png");
        wpawnImgEl.classList.add("peice", "wp");
        squareEl.appendChild(wpawnImgEl);
        break;
      case "a8":
      case "h8":
        const brookImgEl = document.createElement("img");
        brookImgEl.setAttribute("src", "../resources/images/br.png");
        brookImgEl.classList.add("peice", "br");
        squareEl.appendChild(brookImgEl);
        break;
      case "b8":
      case "g8":
        const bknightImgEl = document.createElement("img");
        bknightImgEl.setAttribute("src", "../resources/images/bn.png");
        bknightImgEl.classList.add("peice", "bn");
        squareEl.appendChild(bknightImgEl);
        break;
      case "c8":
      case "f8":
        const bbishopImgEl = document.createElement("img");
        bbishopImgEl.setAttribute("src", "../resources/images/bb.png");
        bbishopImgEl.classList.add("peice", "bb");
        squareEl.appendChild(bbishopImgEl);
        break;
      case "d8":
        const bqueenImgEl = document.createElement("img");
        bqueenImgEl.setAttribute("src", "../resources/images/bq.png");
        bqueenImgEl.classList.add("peice", "bq");
        squareEl.appendChild(bqueenImgEl);
        break;
      case "e8":
        const bkingImgEl = document.createElement("img");
        bkingImgEl.setAttribute("src", "../resources/images/bk.png");
        bkingImgEl.classList.add("peice", "bk");
        squareEl.appendChild(bkingImgEl);
        break;
      case "a7":
      case "b7":
      case "c7":
      case "d7":
      case "e7":
      case "f7":
      case "g7":
      case "h7":
        const bpawnImgEl = document.createElement("img");
        bpawnImgEl.setAttribute("src", "../resources/images/bp.png");
        bpawnImgEl.classList.add("peice", "bp");
        squareEl.appendChild(bpawnImgEl);
        break;
      default:
        return;
    }
  });
};

const ifOwnPeice = (targetSquareEl, transferedData) => {
  if (
    targetSquareEl.querySelector(".peice") &&
    targetSquareEl.querySelector(".peice").classList[1].at(0) ===
      transferedData.imagePeiceClass.at(0)
  ) {
    return true;
  }
  return false;
};
const invalidMove = (targetSquareEl, transferedData) => {
  const peiceType = transferedData.imagePeiceClass;
  const targetSquareId = targetSquareEl.id;
  const sourceSquareId = transferedData.sourceSquareId;
  console.log(peiceType);
  switch (peiceType) {
    case "bp":
    case "wp":
      return isInvalidPawnMove(peiceType, sourceSquareId, targetSquareId);
    case "br":
    case "wr":
      return isInvalidRookMove(peiceType, sourceSquareId, targetSquareId);
    case "bn":
    case "wn":
      return isInvalidKnightMove(peiceType, sourceSquareId, targetSquareId);
    case "bb":
    case "wb":
      return isInvalidBishopMove(peiceType, sourceSquareId, targetSquareId);
    case "bq":
    case "wq":
      return isInvalidQueenMove(peiceType, sourceSquareId, targetSquareId);
    case "bk":
    case "wk":
      return isInvalidKingMove(peiceType, sourceSquareId, targetSquareId);
    default:
      return false;
  }
  return false;
};

const checkInvalidDrop = (e) => {
  let targetSquareEl = e.target;
  const transferedData = JSON.parse(e.dataTransfer.getData("application/json"));
  while (!targetSquareEl.classList.contains("square")) {
    targetSquareEl = targetSquareEl.parentNode;
  }
  return (
    ifOwnPeice(targetSquareEl, transferedData) ||
    invalidMove(targetSquareEl, transferedData)
  );
};

const handleDragStart = (e) => {
  console.log("drag start", e);
  const sourceSquareEl = e.srcElement.parentNode;

  e.dataTransfer.setData(
    "application/json",
    JSON.stringify({
      sourceSquareId: sourceSquareEl.id,
      imageSrc: e.srcElement.src,
      imagePeiceClass: e.srcElement.classList[1],
    })
  );
  //   sourceSquareEl.removeChild(sourceSquareEl.lastChild);
};

const allowDrag = (e) => {
  e.preventDefault();
};

const handleDrop = (e) => {
  e.preventDefault();
  if (checkInvalidDrop(e)) return;
  let targetSquareEl = e.target;
  while (!targetSquareEl.classList.contains("square")) {
    targetSquareEl = targetSquareEl.parentNode;
  }
  console.log(e.target.tagName);
  console.log(e.target.querySelector(".peice"));
  const transferedData = JSON.parse(e.dataTransfer.getData("application/json"));
  console.log("drop event", e.target.id);
  console.log(
    "drop event",
    JSON.parse(e.dataTransfer.getData("application/json"))
  );
  const imgEl = document.createElement("img");
  imgEl.setAttribute("src", transferedData.imageSrc);
  imgEl.classList.add("peice", transferedData.imagePeiceClass);
  if (e.target.classList.contains("flipped")) imgEl.classList.add("flipped");
  const sourceSquareEl = document.querySelector(
    `#${transferedData.sourceSquareId}`
  );
  sourceSquareEl.removeChild(sourceSquareEl.lastChild);
  targetSquareEl.appendChild(imgEl);
};

const makeSquaresTargettable = () => {
  squareEls.forEach((squareEl) => {
    squareEl.addEventListener("dragstart", handleDragStart);
    squareEl.addEventListener("dragover", allowDrag);
    squareEl.addEventListener("drop", handleDrop);
  });
};

const boardSetup = () => {
  boardTheme();
  boardMarking();
  placePeices();
  makeSquaresTargettable();
};

function init() {
  boardSetup();
  themeSelectorEl.addEventListener("change", boardTheme);
  boardEl.addEventListener("click", () => {
    flipBoard();
  });
}

init();
