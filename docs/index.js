import SQUARES_ID_VS_INDEX_MAP from "../utils/constants.js";
import {
  isInvalidPawnMove,
  isInvalidRookMove,
  isInvalidKnightMove,
  isInvalidBishopMove,
  isInvalidQueenMove,
  isInvalidKingMove,
  getFilteredPossibleRookTargetIndeces,
  getPossibleKingTargetIndeces,
  getFilteredPossiblePawnTargetIndeces,
  getFilteredPossibleKnightTargetIndeces,
  getFilteredPossibleBishopTargetIndeces,
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
const player_info_headerEl = document.querySelector("#pih");
const player_info_footerEl = document.querySelector("#pif");

const checkEvenCell = (id) => {
  const res1 = id.charCodeAt(0) - 96;
  const res2 = Number(id.at(1));
  return !((res1 + res2) % 2);
};

const flipBoard = () => {
  boardEl.classList.toggle("flipped");
  const playerInfoHeaderChildEl = player_info_headerEl.lastElementChild;
  const playerInfoFooterChildEl = player_info_footerEl.lastElementChild;
  player_info_headerEl.removeChild(player_info_headerEl.lastElementChild);
  player_info_footerEl.removeChild(player_info_footerEl.lastElementChild);
  player_info_headerEl.appendChild(playerInfoFooterChildEl);
  player_info_footerEl.appendChild(playerInfoHeaderChildEl);
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

const handleSquareClick = (e) => {
  console.log(e);
  squareEls.forEach((squareEl) => squareEl.classList.remove("highlighted"));
  let sourceSquareEl = e.target;
  while (!sourceSquareEl.classList.contains("square")) {
    sourceSquareEl = sourceSquareEl.parentNode;
  }

  if (
    !sourceSquareEl.lastElementChild ||
    sourceSquareEl.lastElementChild?.tagName !== "IMG"
  )
    return;
  console.log(e);
  const sourceSquareId = sourceSquareEl.id;
  const peiceType = document.querySelector(`#${sourceSquareId}`)
    .lastElementChild.classList[1];
  if (isWrongPlayerMove(peiceType)) return;
  let toBeHighlightedSquares;
  switch (peiceType) {
    case "wr":
    case "br":
      toBeHighlightedSquares = getFilteredPossibleRookTargetIndeces(
        peiceType,
        sourceSquareId
      );
      break;
    case "wn":
    case "bn":
      toBeHighlightedSquares = getFilteredPossibleKnightTargetIndeces(
        peiceType,
        sourceSquareId
      );
      break;
    case "wb":
    case "bb":
      toBeHighlightedSquares = getFilteredPossibleBishopTargetIndeces(
        peiceType,
        sourceSquareId
      );
      break;
    case "wq":
    case "bq":
      toBeHighlightedSquares = new Set([
        ...getFilteredPossibleBishopTargetIndeces(peiceType, sourceSquareId),
        ...getFilteredPossibleRookTargetIndeces(peiceType, sourceSquareId),
      ]);
      break;
    case "wk":
    case "bk":
      toBeHighlightedSquares = getPossibleKingTargetIndeces(
        peiceType,
        sourceSquareId
      );
      break;
    default:
      toBeHighlightedSquares = getFilteredPossiblePawnTargetIndeces(
        peiceType,
        sourceSquareId
      );
  }
  console.log(toBeHighlightedSquares);
  squareEls.forEach((squareEl) => {
    if (toBeHighlightedSquares.has(SQUARES_ID_VS_INDEX_MAP[squareEl.id]))
      squareEl.classList.add("highlighted");
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
    const legalMoveHighlighterEl = document.createElement("div");
    legalMoveHighlighterEl.classList.add("legal-move-highlighter");
    squareEl.appendChild(legalMoveHighlighterEl);
    squareEl.addEventListener("mousedown", handleSquareClick);
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
        wrookImgEl.classList.add("peice", "wr", "white");
        squareEl.appendChild(wrookImgEl);
        break;
      case "b1":
      case "g1":
        const wknightImgEl = document.createElement("img");
        wknightImgEl.setAttribute("src", "../resources/images/wn.png");
        wknightImgEl.classList.add("peice", "wn", "white");
        squareEl.appendChild(wknightImgEl);
        break;
      case "c1":
      case "f1":
        const wbishopImgEl = document.createElement("img");
        wbishopImgEl.setAttribute("src", "../resources/images/wb.png");
        wbishopImgEl.classList.add("peice", "wb", "white");
        squareEl.appendChild(wbishopImgEl);
        break;
      case "d1":
        const wqueenImgEl = document.createElement("img");
        wqueenImgEl.setAttribute("src", "../resources/images/wq.png");
        wqueenImgEl.classList.add("peice", "wq", "white");
        squareEl.appendChild(wqueenImgEl);
        break;
      case "e1":
        const wkingImgEl = document.createElement("img");
        wkingImgEl.setAttribute("src", "../resources/images/wk.png");
        wkingImgEl.classList.add("peice", "wk", "white");
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
        wpawnImgEl.classList.add("peice", "wp", "white");
        squareEl.appendChild(wpawnImgEl);
        break;
      case "a8":
      case "h8":
        const brookImgEl = document.createElement("img");
        brookImgEl.setAttribute("src", "../resources/images/br.png");
        brookImgEl.classList.add("peice", "br", "black");
        squareEl.appendChild(brookImgEl);
        break;
      case "b8":
      case "g8":
        const bknightImgEl = document.createElement("img");
        bknightImgEl.setAttribute("src", "../resources/images/bn.png");
        bknightImgEl.classList.add("peice", "bn", "black");
        squareEl.appendChild(bknightImgEl);
        break;
      case "c8":
      case "f8":
        const bbishopImgEl = document.createElement("img");
        bbishopImgEl.setAttribute("src", "../resources/images/bb.png");
        bbishopImgEl.classList.add("peice", "bb", "black");
        squareEl.appendChild(bbishopImgEl);
        break;
      case "d8":
        const bqueenImgEl = document.createElement("img");
        bqueenImgEl.setAttribute("src", "../resources/images/bq.png");
        bqueenImgEl.classList.add("peice", "bq", "black");
        squareEl.appendChild(bqueenImgEl);
        break;
      case "e8":
        const bkingImgEl = document.createElement("img");
        bkingImgEl.setAttribute("src", "../resources/images/bk.png");
        bkingImgEl.classList.add("peice", "bk", "black");
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
        bpawnImgEl.classList.add("peice", "bp", "black");
        squareEl.appendChild(bpawnImgEl);
        break;
      default:
        return;
    }
  });
};

const isWrongPlayerMove = (peiceClass) => {
  return (
    (boardEl.classList.contains("flipped") && peiceClass.at(0) === "w") ||
    (!boardEl.classList.contains("flipped") && peiceClass.at(0) === "b")
  );
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
  console.log(transferedData, "trans");
  return (
    isWrongPlayerMove(transferedData.imagePeiceClass) ||
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
      imageColorClass: e.srcElement.classList[2],
    })
  );
  // sourceSquareEl.removeChild(sourceSquareEl.lastChild);
};

const allowDrag = (e) => {
  e.preventDefault();
};

const handleDrop = (e) => {
  e.preventDefault();
  if (checkInvalidDrop(e)) return;
  squareEls.forEach((squareEl) => squareEl.classList.remove("highlighted"));
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
  imgEl.classList.add(
    "peice",
    transferedData.imagePeiceClass,
    transferedData.imageColorClass
  );
  if (targetSquareEl.classList.contains("flipped"))
    imgEl.classList.add("flipped");
  const sourceSquareEl = document.querySelector(
    `#${transferedData.sourceSquareId}`
  );
  sourceSquareEl.removeChild(sourceSquareEl.lastChild);
  if (targetSquareEl.lastChild?.tagName === "IMG") {
    targetSquareEl.removeChild(targetSquareEl.lastChild);
  }

  targetSquareEl.appendChild(imgEl);
  setTimeout(flipBoard, 300);
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
const setPlayerInfo = async () => {
  const imageWhiteEl = document.querySelector(".player-avatar-white");
  const imageBlackEl = document.querySelector(".player-avatar-black");
  const usernameWhiteEl = document.querySelector(".username-white");
  const usernameBlackEl = document.querySelector(".username-black");
  imageWhiteEl.setAttribute(
    "src",
    "../resources/images/avatar-white-default.png"
  );
  imageBlackEl.setAttribute(
    "src",
    "../resources/images/avatar-black-default.png"
  );
  // try {
  //   const resWhite = await fetch("https://i.pravatar.cc/3000");
  //   const dataWhite = await resWhite.blob();
  // } catch (err) {
  //   console.log(err.message);
  // }
  try {
    // const resBlack = await fetch("https://i.pravatar.cc/310");
    // const dataBlack = await resBlack.blob();
    const data = await fetch(
      "https://random-data-api.com/api/v2/users?size=2"
    ).then((res) => res.json());
    console.log("random", data);
    imageWhiteEl.setAttribute("src", data[0].avatar);
    imageBlackEl.setAttribute("src", data[1].avatar);
    usernameWhiteEl.innerText = data[0].username;
    usernameBlackEl.innerText = data[1].username;
  } catch (err) {
    console.error(err.message);
  }
};

function init() {
  setPlayerInfo();
  boardSetup();
  themeSelectorEl.addEventListener("change", boardTheme);
}

init();
