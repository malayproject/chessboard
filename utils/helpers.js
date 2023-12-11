import SQUARES_ID_VS_INDEX_MAP, {
  SQUARES_INDEX_VS_ID_MAP,
} from "../utils/constants.js";

const checkObstacle = (peiceType, index) => {
  // console.log(
  //   "checkObstacle0",
  //   peiceType,
  //   document.querySelector(`#${SQUARES_INDEX_VS_ID_MAP[index]}`)
  // );
  const squareChildEl = document.querySelector(
    `#${SQUARES_INDEX_VS_ID_MAP[index]}`
  ).lastElementChild;
  console.log("checkObstacle1", peiceType, squareChildEl?.classList[1]);
  return [
    squareChildEl?.tagName === "IMG",
    squareChildEl?.classList[1]?.at(0) === peiceType.at(0),
  ];
};

export const getPossiblePawnTargetIndeces = (peiceType, sourceSquareId) => {
  const sourceSquareIndex = SQUARES_ID_VS_INDEX_MAP[sourceSquareId];
  const whitePeiceCheck = peiceType === "wp";
  const thirdRowCheck = sourceSquareIndex >= 48 && sourceSquareIndex <= 55;
  const sixthRowCheck = sourceSquareIndex >= 8 && sourceSquareIndex <= 15;
  const possiblePawnTargetIndeces = new Set();
  let checkObstacleRes;
  let index;
  if (whitePeiceCheck ? thirdRowCheck : sixthRowCheck) {
    for (let i = 1; i < 3; i++) {
      index = whitePeiceCheck
        ? sourceSquareIndex - i * 8
        : sourceSquareIndex + i * 8;
      checkObstacleRes = checkObstacle(peiceType, index);
      if (!checkObstacleRes[0]) {
        possiblePawnTargetIndeces.add(index);
      }
    }
  } else {
    index = whitePeiceCheck ? sourceSquareIndex - 8 : sourceSquareIndex + 8;
    checkObstacleRes = checkObstacle(peiceType, index);
    if (!checkObstacleRes[0]) {
      possiblePawnTargetIndeces.add(index);
    }
  }
  index = whitePeiceCheck ? sourceSquareIndex - 9 : sourceSquareIndex + 9;
  checkObstacleRes = checkObstacle(peiceType, index);
  if (checkObstacleRes[0] && !checkObstacleRes[1])
    possiblePawnTargetIndeces.add(index);
  index = whitePeiceCheck ? sourceSquareIndex - 7 : sourceSquareIndex + 7;
  checkObstacleRes = checkObstacle(peiceType, index);
  if (checkObstacleRes[0] && !checkObstacleRes[1])
    possiblePawnTargetIndeces.add(index);
  Array.from(possiblePawnTargetIndeces).forEach((index) =>
    console.log("pawn indeces", SQUARES_INDEX_VS_ID_MAP[index])
  );
  return possiblePawnTargetIndeces;
};

export const isInvalidPawnMove = (
  peiceType,
  sourceSquareId,
  targetSquareId
) => {
  const targetSquareIndex = SQUARES_ID_VS_INDEX_MAP[targetSquareId];
  return !getPossiblePawnTargetIndeces(peiceType, sourceSquareId).has(
    targetSquareIndex
  );
};

export const getPossibleBishopTargetIndeces = (peiceType, sourceSquareId) => {
  const possibleBishopTargetIndeces = new Set();
  const sourceSquareIndex = SQUARES_ID_VS_INDEX_MAP[sourceSquareId];

  let index = sourceSquareIndex;
  // while (index > 7 && sourceSquareId.at(0) !== "a") {
  while (index > 7 && index % 8 > 0) {
    index -= 9;
    const checkObstacleRes = checkObstacle(peiceType, index);
    if (!checkObstacleRes[0]) {
      possibleBishopTargetIndeces.add(index);
      continue;
    } else if (checkObstacleRes[1]) break;
    else {
      possibleBishopTargetIndeces.add(index);
      break;
    }
  }
  index = sourceSquareIndex;
  while (index < 56 && index % 8 < 7) {
    index += 9;
    const checkObstacleRes = checkObstacle(peiceType, index);
    if (!checkObstacleRes[0]) {
      possibleBishopTargetIndeces.add(index);
      continue;
    } else if (checkObstacleRes[1]) break;
    else {
      possibleBishopTargetIndeces.add(index);
      break;
    }
  }
  index = sourceSquareIndex;
  while (index > 7 && index % 8 < 7) {
    index -= 7;
    const checkObstacleRes = checkObstacle(peiceType, index);
    if (!checkObstacleRes[0]) {
      possibleBishopTargetIndeces.add(index);
      continue;
    } else if (checkObstacleRes[1]) break;
    else {
      possibleBishopTargetIndeces.add(index);
      break;
    }
  }
  index = sourceSquareIndex;
  while (index < 56 && index % 8 > 0) {
    index += 7;
    const checkObstacleRes = checkObstacle(peiceType, index);
    if (!checkObstacleRes[0]) {
      possibleBishopTargetIndeces.add(index);
      continue;
    } else if (checkObstacleRes[1]) break;
    else {
      possibleBishopTargetIndeces.add(index);
      break;
    }
  }
  return possibleBishopTargetIndeces;
};

export const isInvalidBishopMove = (
  peiceType,
  sourceSquareId,
  targetSquareId
) => {
  const targetSquareIndex = SQUARES_ID_VS_INDEX_MAP[targetSquareId];
  return !getPossibleBishopTargetIndeces(peiceType, sourceSquareId).has(
    targetSquareIndex
  );
};

export const getPossibleKnightTargetIndeces = (peiceType, sourceSquareId) => {
  const possibleKnightTargetIndeces = new Set();
  const sourceSquareIndex = SQUARES_ID_VS_INDEX_MAP[sourceSquareId];
  if (sourceSquareIndex > 15 && sourceSquareIndex % 8 < 7) {
    const checkObstacleRes = checkObstacle(peiceType, sourceSquareIndex - 15);
    if (!checkObstacleRes[1])
      possibleKnightTargetIndeces.add(sourceSquareIndex - 15);
  }
  if (sourceSquareIndex > 7 && sourceSquareIndex % 8 < 6) {
    const checkObstacleRes = checkObstacle(peiceType, sourceSquareIndex - 6);
    if (!checkObstacleRes[1])
      possibleKnightTargetIndeces.add(sourceSquareIndex - 6);
  }
  if (sourceSquareIndex < 56 && sourceSquareIndex % 8 < 6) {
    const checkObstacleRes = checkObstacle(peiceType, sourceSquareIndex + 10);
    if (!checkObstacleRes[1])
      possibleKnightTargetIndeces.add(sourceSquareIndex + 10);
  }
  if (sourceSquareIndex < 48 && sourceSquareIndex % 8 < 7) {
    const checkObstacleRes = checkObstacle(peiceType, sourceSquareIndex + 17);
    if (!checkObstacleRes[1])
      possibleKnightTargetIndeces.add(sourceSquareIndex + 17);
  }
  if (sourceSquareIndex < 48 && sourceSquareIndex % 8 > 0) {
    const checkObstacleRes = checkObstacle(peiceType, sourceSquareIndex + 15);
    if (!checkObstacleRes[1])
      possibleKnightTargetIndeces.add(sourceSquareIndex + 15);
  }
  if (sourceSquareIndex < 56 && sourceSquareIndex % 8 > 1) {
    const checkObstacleRes = checkObstacle(peiceType, sourceSquareIndex + 6);
    if (!checkObstacleRes[1])
      possibleKnightTargetIndeces.add(sourceSquareIndex + 6);
  }
  if (sourceSquareIndex > 7 && sourceSquareIndex % 8 > 1) {
    const checkObstacleRes = checkObstacle(peiceType, sourceSquareIndex - 10);
    if (!checkObstacleRes[1])
      possibleKnightTargetIndeces.add(sourceSquareIndex - 10);
  }
  if (sourceSquareIndex > 15 && sourceSquareIndex % 8 > 0) {
    const checkObstacleRes = checkObstacle(peiceType, sourceSquareIndex - 17);
    if (!checkObstacleRes[1])
      possibleKnightTargetIndeces.add(sourceSquareIndex - 17);
  }
  return possibleKnightTargetIndeces;
};

export const isInvalidKnightMove = (
  peiceType,
  sourceSquareId,
  targetSquareId
) => {
  const targetSquareIndex = SQUARES_ID_VS_INDEX_MAP[targetSquareId];
  return !getPossibleKnightTargetIndeces(peiceType, sourceSquareId).has(
    targetSquareIndex
  );
};

export const getPossibleRookTargetIndeces = (peiceType, sourceSquareId) => {
  const possibleRookTargetIndeces = new Set();
  const sourceSquareIndex = SQUARES_ID_VS_INDEX_MAP[sourceSquareId];
  let index = sourceSquareIndex;
  while (index > 7) {
    index -= 8;
    const checkObstacleRes = checkObstacle(peiceType, index);
    if (!checkObstacleRes[0]) {
      possibleRookTargetIndeces.add(index);
      continue;
    } else if (checkObstacleRes[1]) break;
    else {
      possibleRookTargetIndeces.add(index);
      break;
    }
  }
  index = sourceSquareIndex;
  while (index < 56) {
    index += 8;
    const checkObstacleRes = checkObstacle(peiceType, index);
    if (!checkObstacleRes[0]) {
      possibleRookTargetIndeces.add(index);
      continue;
    } else if (checkObstacleRes[1]) break;
    else {
      possibleRookTargetIndeces.add(index);
      break;
    }
  }
  index = sourceSquareIndex;
  while (index % 8 > 0) {
    index -= 1;
    const checkObstacleRes = checkObstacle(peiceType, index);
    if (!checkObstacleRes[0]) {
      possibleRookTargetIndeces.add(index);
      continue;
    } else if (checkObstacleRes[1]) break;
    else {
      possibleRookTargetIndeces.add(index);
      break;
    }
  }
  index = sourceSquareIndex;
  while (index % 8 < 7) {
    index += 1;
    const checkObstacleRes = checkObstacle(peiceType, index);
    if (!checkObstacleRes[0]) {
      possibleRookTargetIndeces.add(index);
      continue;
    } else if (checkObstacleRes[1]) break;
    else {
      possibleRookTargetIndeces.add(index);
      break;
    }
  }
  console.log(possibleRookTargetIndeces);
  return possibleRookTargetIndeces;
};

export const isInvalidRookMove = (
  peiceType,
  sourceSquareId,
  targetSquareId
) => {
  const targetSquareIndex = SQUARES_ID_VS_INDEX_MAP[targetSquareId];
  return !getPossibleRookTargetIndeces(peiceType, sourceSquareId).has(
    targetSquareIndex
  );
};

export const isInvalidQueenMove = (
  peiceType,
  sourceSquareId,
  targetSquareId
) => {
  return (
    isInvalidRookMove(peiceType, sourceSquareId, targetSquareId) &&
    isInvalidBishopMove(peiceType, sourceSquareId, targetSquareId)
  );
};

export const getPossibleKingTargetIndeces = (peiceType, sourceSquareId) => {
  const possibleKingTargetIndeces = new Set();
  const sourceSquareIndex = SQUARES_ID_VS_INDEX_MAP[sourceSquareId];
  possibleKingTargetIndeces.add(sourceSquareIndex - 9);
  possibleKingTargetIndeces.add(sourceSquareIndex + 9);
  possibleKingTargetIndeces.add(sourceSquareIndex - 7);
  possibleKingTargetIndeces.add(sourceSquareIndex + 7);
  possibleKingTargetIndeces.add(sourceSquareIndex - 8);
  possibleKingTargetIndeces.add(sourceSquareIndex + 8);
  possibleKingTargetIndeces.add(sourceSquareIndex - 1);
  possibleKingTargetIndeces.add(sourceSquareIndex + 1);
  return possibleKingTargetIndeces;
};

export const isInvalidKingMove = (
  peiceType,
  sourceSquareId,
  targetSquareId
) => {
  const targetSquareIndex = SQUARES_ID_VS_INDEX_MAP[targetSquareId];
  return !getPossibleKingTargetIndeces(peiceType, sourceSquareId).has(
    targetSquareIndex
  );
};
