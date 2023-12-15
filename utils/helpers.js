import SQUARES_ID_VS_INDEX_MAP, {
  SQUARES_INDEX_VS_ID_MAP,
} from "../utils/constants.js";

const checkObstacle = (peiceType, index) => {
  const squareChildEl = document.querySelector(
    `#${SQUARES_INDEX_VS_ID_MAP[index]}`
  ).lastElementChild;
  console.log("checkObstacle1", peiceType, squareChildEl?.classList[1]);
  return [
    squareChildEl?.tagName === "IMG",
    squareChildEl?.classList[1]?.at(0) === peiceType.at(0),
  ];
};

const getAttackingPath = (
  attackingSquareId,
  ownKingSquareId,
  opponentPeiceType
) => {
  const attackingSquareIndex = SQUARES_ID_VS_INDEX_MAP[attackingSquareId];
  const ownKingSquareIndex = SQUARES_ID_VS_INDEX_MAP[ownKingSquareId];
  const diff = ownKingSquareIndex - attackingSquareIndex;
  const attackingPath = [];
  let index = attackingSquareIndex;
  if (opponentPeiceType.at(1) === "n") {
    attackingPath.push(attackingSquareIndex);
    return attackingPath;
  } else {
    if (diff % 8 === 0) {
      while (index !== ownKingSquareIndex) {
        attackingPath.push(index);
        index = diff < 0 ? index - 8 : index + 8;
      }
    } else if (diff % 9 === 0) {
      while (index !== ownKingSquareIndex) {
        attackingPath.push(index);
        index = diff < 0 ? index - 9 : index + 9;
      }
    } else if (diff % 7 === 0) {
      while (index !== ownKingSquareIndex) {
        attackingPath.push(index);
        index = diff < 0 ? index - 7 : index + 7;
      }
    } else {
      while (index !== ownKingSquareIndex) {
        attackingPath.push(index);
        index = diff < 0 ? index - 1 : index + 1;
      }
    }
  }
  return attackingPath;
};

export const getOwnKingInCheckMap = (peiceType, sourceSquareId) => {
  console.log("getOwnKingInCheckMap called", peiceType, sourceSquareId);
  const sourceSquareIndex =
    peiceType.at(1) !== "k" ? SQUARES_ID_VS_INDEX_MAP[sourceSquareId] : null;
  const opponentColor = peiceType.at(0) === "b" ? "white" : "black";
  const ownKingSquareEl = document.querySelector(
    `.${peiceType.at(0)}k`
  ).parentNode;
  const ownKingSquareIndex = SQUARES_ID_VS_INDEX_MAP[ownKingSquareEl.id];
  const opponentPeiceEls = Array.from(
    document.querySelectorAll(`.${opponentColor}`)
  );
  const allAttackingPeicesMap = new Map();
  opponentPeiceEls.forEach((opponentPeiceEl) => {
    let isOpponentPeiceAttackingOwnKing;
    const opponentPeiceType = opponentPeiceEl.classList[1];
    switch (opponentPeiceEl.classList[1]) {
      case "wp":
      case "bp":
        const arrPawn = Array.from(
          getAllPossiblePawnTargetIndeces(
            opponentPeiceEl.classList[1],
            opponentPeiceEl.parentNode.id
          )
        );
        isOpponentPeiceAttackingOwnKing = arrPawn.some(
          (index) => index === ownKingSquareIndex
        );
        if (isOpponentPeiceAttackingOwnKing) {
          const attackingPath = getAttackingPath(
            opponentPeiceEl.parentNode.id,
            ownKingSquareEl.id,
            opponentPeiceType
          );
          allAttackingPeicesMap.set(
            SQUARES_ID_VS_INDEX_MAP[opponentPeiceEl.parentNode.id],
            attackingPath
          );
        }
        break;
      case "wr":
      case "br":
        const arrRook = Array.from(
          getAllPossibleRookTargetIndeces(
            opponentPeiceEl.classList[1],
            opponentPeiceEl.parentNode.id,
            sourceSquareIndex
          )
        );
        isOpponentPeiceAttackingOwnKing = arrRook.some(
          (index) => index === ownKingSquareIndex
        );
        if (isOpponentPeiceAttackingOwnKing) {
          const attackingPath = getAttackingPath(
            opponentPeiceEl.parentNode.id,
            ownKingSquareEl.id,
            opponentPeiceType
          );
          allAttackingPeicesMap.set(
            SQUARES_ID_VS_INDEX_MAP[opponentPeiceEl.parentNode.id],
            attackingPath
          );
        }
        break;
      case "wn":
      case "bn":
        const arrKnight = Array.from(
          getAllPossibleKnightTargetIndeces(
            opponentPeiceEl.classList[1],
            opponentPeiceEl.parentNode.id
          )
        );
        isOpponentPeiceAttackingOwnKing = arrKnight.some(
          (index) => index === ownKingSquareIndex
        );
        if (isOpponentPeiceAttackingOwnKing) {
          const attackingPath = getAttackingPath(
            opponentPeiceEl.parentNode.id,
            ownKingSquareEl.id,
            opponentPeiceType
          );
          allAttackingPeicesMap.set(
            SQUARES_ID_VS_INDEX_MAP[opponentPeiceEl.parentNode.id],
            attackingPath
          );
        }
        break;
      case "wb":
      case "bb":
        const arrBishop = Array.from(
          getAllPossibleBishopTargetIndeces(
            opponentPeiceEl.classList[1],
            opponentPeiceEl.parentNode.id,
            sourceSquareIndex
          )
        );
        isOpponentPeiceAttackingOwnKing = arrBishop.some(
          (index) => index === ownKingSquareIndex
        );
        if (isOpponentPeiceAttackingOwnKing) {
          const attackingPath = getAttackingPath(
            opponentPeiceEl.parentNode.id,
            ownKingSquareEl.id,
            opponentPeiceType
          );
          allAttackingPeicesMap.set(
            SQUARES_ID_VS_INDEX_MAP[opponentPeiceEl.parentNode.id],
            attackingPath
          );
        }
        break;
      case "wq":
      case "bq":
        const arrQueen = [
          ...Array.from(
            getAllPossibleBishopTargetIndeces(
              opponentPeiceEl.classList[1],
              opponentPeiceEl.parentNode.id,
              sourceSquareIndex
            )
          ),
          ...Array.from(
            getAllPossibleRookTargetIndeces(
              opponentPeiceEl.classList[1],
              opponentPeiceEl.parentNode.id,
              sourceSquareIndex
            )
          ),
        ];
        isOpponentPeiceAttackingOwnKing = arrQueen.some(
          (index) => index === ownKingSquareIndex
        );
        if (isOpponentPeiceAttackingOwnKing) {
          const attackingPath = getAttackingPath(
            opponentPeiceEl.parentNode.id,
            ownKingSquareEl.id,
            opponentPeiceType
          );
          allAttackingPeicesMap.set(
            SQUARES_ID_VS_INDEX_MAP[opponentPeiceEl.parentNode.id],
            attackingPath
          );
        }
        break;
      case "wk":
      case "bk":
        const arrKing = Array.from(
          getAllPossibleKingTargetIndeces(
            opponentPeiceEl.classList[1],
            opponentPeiceEl.parentNode.id
          )
        );
        isOpponentPeiceAttackingOwnKing = arrKing.some(
          (index) => index === ownKingSquareIndex
        );
        if (isOpponentPeiceAttackingOwnKing) {
          const attackingPath = getAttackingPath(
            opponentPeiceEl.parentNode.id,
            ownKingSquareEl.id,
            opponentPeiceType
          );
          allAttackingPeicesMap.set(
            SQUARES_ID_VS_INDEX_MAP[opponentPeiceEl.parentNode.id],
            attackingPath
          );
        }
    }
  });

  return allAttackingPeicesMap;
};

export const getAllPossiblePawnTargetIndeces = (peiceType, sourceSquareId) => {
  const allPossiblePawnTargetIndeces = new Set();
  const sourceSquareIndex = SQUARES_ID_VS_INDEX_MAP[sourceSquareId];
  if (sourceSquareIndex > 55) return allPossiblePawnTargetIndeces;
  const whitePeiceCheck = peiceType === "wp";
  const thirdRowCheck = sourceSquareIndex >= 48 && sourceSquareIndex <= 55;
  const sixthRowCheck = sourceSquareIndex >= 8 && sourceSquareIndex <= 15;

  let checkObstacleRes;
  let index;
  if (whitePeiceCheck ? thirdRowCheck : sixthRowCheck) {
    for (let i = 1; i < 3; i++) {
      index = whitePeiceCheck
        ? sourceSquareIndex - i * 8
        : sourceSquareIndex + i * 8;
      checkObstacleRes = checkObstacle(peiceType, index);
      if (!checkObstacleRes[0]) {
        allPossiblePawnTargetIndeces.add(index);
      } else break;
    }
  } else {
    index = whitePeiceCheck ? sourceSquareIndex - 8 : sourceSquareIndex + 8;

    checkObstacleRes = checkObstacle(peiceType, index);
    if (!checkObstacleRes[0]) {
      allPossiblePawnTargetIndeces.add(index);
    }
  }
  index = whitePeiceCheck ? sourceSquareIndex - 9 : sourceSquareIndex + 9;
  checkObstacleRes = checkObstacle(peiceType, index);
  if (checkObstacleRes[0] && !checkObstacleRes[1])
    allPossiblePawnTargetIndeces.add(index);
  index = whitePeiceCheck ? sourceSquareIndex - 7 : sourceSquareIndex + 7;
  checkObstacleRes = checkObstacle(peiceType, index);
  if (checkObstacleRes[0] && !checkObstacleRes[1])
    allPossiblePawnTargetIndeces.add(index);
  Array.from(allPossiblePawnTargetIndeces).forEach((index) =>
    console.log("pawn indeces", SQUARES_INDEX_VS_ID_MAP[index])
  );
  return allPossiblePawnTargetIndeces;
};

export const getFilteredPossiblePawnTargetIndeces = (
  peiceType,
  sourceSquareId
) => {
  const ownKingInCheckMap = getOwnKingInCheckMap(peiceType, sourceSquareId);
  if (ownKingInCheckMap.size > 1) return new Set();
  const allPossiblePawnTargetIndeces = getAllPossiblePawnTargetIndeces(
    peiceType,
    sourceSquareId
  );
  if (ownKingInCheckMap.size > 0) {
    console.log(Array.from(ownKingInCheckMap.values())[0]);
    const attackSquareIndeces = new Set(
      Array.from(ownKingInCheckMap.values())[0]
    );
    const filteredPossiblePawnTargetIndecesArr = Array.from(
      allPossiblePawnTargetIndeces
    ).filter((possiblePawnTargetIndex) =>
      attackSquareIndeces.has(possiblePawnTargetIndex)
    );
    return new Set(filteredPossiblePawnTargetIndecesArr);
  } else return allPossiblePawnTargetIndeces;
};

export const isInvalidPawnMove = (
  peiceType,
  sourceSquareId,
  targetSquareId
) => {
  const targetSquareIndex = SQUARES_ID_VS_INDEX_MAP[targetSquareId];
  return !getFilteredPossiblePawnTargetIndeces(peiceType, sourceSquareId).has(
    targetSquareIndex
  );
};

export const getAllPossibleBishopTargetIndeces = (
  peiceType,
  sourceSquareId,
  squareIndexToIgnore
) => {
  // const ownKingInCheckMap = getOwnKingInCheckMap(peiceType, sourceSquareId);
  const allPossibleBishopTargetIndeces = new Set();
  // if (ownKingInCheckMap.size > 1) return allPossibleBishopTargetIndeces;
  const sourceSquareIndex = SQUARES_ID_VS_INDEX_MAP[sourceSquareId];

  let index = sourceSquareIndex;
  // while (index > 7 && sourceSquareId.at(0) !== "a") {
  while (index > 7 && index % 8 > 0) {
    index -= 9;
    const checkObstacleRes = checkObstacle(peiceType, index);
    if (
      (squareIndexToIgnore && index === squareIndexToIgnore) ||
      !checkObstacleRes[0]
    ) {
      allPossibleBishopTargetIndeces.add(index);
      continue;
    } else if (checkObstacleRes[1]) break;
    else {
      allPossibleBishopTargetIndeces.add(index);
      break;
    }
  }
  index = sourceSquareIndex;
  while (index < 56 && index % 8 < 7) {
    index += 9;
    const checkObstacleRes = checkObstacle(peiceType, index);
    if (
      (squareIndexToIgnore && index === squareIndexToIgnore) ||
      !checkObstacleRes[0]
    ) {
      allPossibleBishopTargetIndeces.add(index);
      continue;
    } else if (checkObstacleRes[1]) break;
    else {
      allPossibleBishopTargetIndeces.add(index);
      break;
    }
  }
  index = sourceSquareIndex;
  while (index > 7 && index % 8 < 7) {
    index -= 7;
    const checkObstacleRes = checkObstacle(peiceType, index);
    if (
      (squareIndexToIgnore && index === squareIndexToIgnore) ||
      !checkObstacleRes[0]
    ) {
      allPossibleBishopTargetIndeces.add(index);
      continue;
    } else if (checkObstacleRes[1]) break;
    else {
      allPossibleBishopTargetIndeces.add(index);
      break;
    }
  }
  index = sourceSquareIndex;
  while (index < 56 && index % 8 > 0) {
    index += 7;
    const checkObstacleRes = checkObstacle(peiceType, index);
    if (
      (squareIndexToIgnore && index === squareIndexToIgnore) ||
      !checkObstacleRes[0]
    ) {
      allPossibleBishopTargetIndeces.add(index);
      continue;
    } else if (checkObstacleRes[1]) break;
    else {
      allPossibleBishopTargetIndeces.add(index);
      break;
    }
  }
  return allPossibleBishopTargetIndeces;
};

export const getFilteredPossibleBishopTargetIndeces = (
  peiceType,
  sourceSquareId
) => {
  const ownKingInCheckMap = getOwnKingInCheckMap(peiceType, sourceSquareId);

  if (ownKingInCheckMap.size > 1) return new Set();
  const allPossibleBishopTargetIndeces = getAllPossibleBishopTargetIndeces(
    peiceType,
    sourceSquareId
  );
  if (ownKingInCheckMap.size > 0) {
    // const noMovePossible = Array.from(ownKingInCheckMap.values()).some(
    //   (attackingPath) =>
    //     new Set(attackingPath).has(SQUARES_ID_VS_INDEX_MAP[sourceSquareId])
    // );
    console.log(Array.from(ownKingInCheckMap.values())[0]);
    const attackSquareIndeces = new Set(
      Array.from(ownKingInCheckMap.values())[0]
    );
    const filteredPossibleBishopTargetIndecesArr = Array.from(
      allPossibleBishopTargetIndeces
    ).filter((possibleBishopTargetIndex) =>
      attackSquareIndeces.has(possibleBishopTargetIndex)
    );
    return new Set(filteredPossibleBishopTargetIndecesArr);
  } else return allPossibleBishopTargetIndeces;
};

export const isInvalidBishopMove = (
  peiceType,
  sourceSquareId,
  targetSquareId
) => {
  const targetSquareIndex = SQUARES_ID_VS_INDEX_MAP[targetSquareId];
  // return !getPossibleBishopTargetIndeces(peiceType, sourceSquareId).has(
  //   targetSquareIndex
  // );
  return !getFilteredPossibleBishopTargetIndeces(peiceType, sourceSquareId).has(
    targetSquareIndex
  );
};

export const getAllPossibleKnightTargetIndeces = (
  peiceType,
  sourceSquareId
) => {
  // const ownKingInCheckMap = getOwnKingInCheckMap(peiceType, sourceSquareId);
  const allPossibleKnightTargetIndeces = new Set();
  // if (ownKingInCheckMap.size > 1) return allPossibleKnightTargetIndeces;
  const sourceSquareIndex = SQUARES_ID_VS_INDEX_MAP[sourceSquareId];
  if (sourceSquareIndex > 15 && sourceSquareIndex % 8 < 7) {
    const checkObstacleRes = checkObstacle(peiceType, sourceSquareIndex - 15);
    if (!checkObstacleRes[1])
      allPossibleKnightTargetIndeces.add(sourceSquareIndex - 15);
  }
  if (sourceSquareIndex > 7 && sourceSquareIndex % 8 < 6) {
    const checkObstacleRes = checkObstacle(peiceType, sourceSquareIndex - 6);
    if (!checkObstacleRes[1])
      allPossibleKnightTargetIndeces.add(sourceSquareIndex - 6);
  }
  if (sourceSquareIndex < 56 && sourceSquareIndex % 8 < 6) {
    const checkObstacleRes = checkObstacle(peiceType, sourceSquareIndex + 10);
    if (!checkObstacleRes[1])
      allPossibleKnightTargetIndeces.add(sourceSquareIndex + 10);
  }
  if (sourceSquareIndex < 48 && sourceSquareIndex % 8 < 7) {
    const checkObstacleRes = checkObstacle(peiceType, sourceSquareIndex + 17);
    if (!checkObstacleRes[1])
      allPossibleKnightTargetIndeces.add(sourceSquareIndex + 17);
  }
  if (sourceSquareIndex < 48 && sourceSquareIndex % 8 > 0) {
    const checkObstacleRes = checkObstacle(peiceType, sourceSquareIndex + 15);
    if (!checkObstacleRes[1])
      allPossibleKnightTargetIndeces.add(sourceSquareIndex + 15);
  }
  if (sourceSquareIndex < 56 && sourceSquareIndex % 8 > 1) {
    const checkObstacleRes = checkObstacle(peiceType, sourceSquareIndex + 6);
    if (!checkObstacleRes[1])
      allPossibleKnightTargetIndeces.add(sourceSquareIndex + 6);
  }
  if (sourceSquareIndex > 7 && sourceSquareIndex % 8 > 1) {
    const checkObstacleRes = checkObstacle(peiceType, sourceSquareIndex - 10);
    if (!checkObstacleRes[1])
      allPossibleKnightTargetIndeces.add(sourceSquareIndex - 10);
  }
  if (sourceSquareIndex > 15 && sourceSquareIndex % 8 > 0) {
    const checkObstacleRes = checkObstacle(peiceType, sourceSquareIndex - 17);
    if (!checkObstacleRes[1])
      allPossibleKnightTargetIndeces.add(sourceSquareIndex - 17);
  }
  return allPossibleKnightTargetIndeces;
};

export const getFilteredPossibleKnightTargetIndeces = (
  peiceType,
  sourceSquareId
) => {
  const ownKingInCheckMap = getOwnKingInCheckMap(peiceType, sourceSquareId);
  if (ownKingInCheckMap.size > 1) return new Set();
  const allPossibleKnightTargetIndeces = getAllPossibleKnightTargetIndeces(
    peiceType,
    sourceSquareId
  );
  if (ownKingInCheckMap.size > 0) {
    console.log(Array.from(ownKingInCheckMap.values())[0]);
    const attackSquareIndeces = new Set(
      Array.from(ownKingInCheckMap.values())[0]
    );
    const filteredPossibleKnightTargetIndecesArr = Array.from(
      allPossibleKnightTargetIndeces
    ).filter((possibleKnightTargetIndex) =>
      attackSquareIndeces.has(possibleKnightTargetIndex)
    );
    return new Set(filteredPossibleKnightTargetIndecesArr);
  } else return allPossibleKnightTargetIndeces;
};

export const isInvalidKnightMove = (
  peiceType,
  sourceSquareId,
  targetSquareId
) => {
  const targetSquareIndex = SQUARES_ID_VS_INDEX_MAP[targetSquareId];
  // return !getPossibleKnightTargetIndeces(peiceType, sourceSquareId).has(
  //   targetSquareIndex
  // );
  return !getFilteredPossibleKnightTargetIndeces(peiceType, sourceSquareId).has(
    targetSquareIndex
  );
};

export const getAllPossibleRookTargetIndeces = (
  peiceType,
  sourceSquareId,
  squareIndexToIgnore
) => {
  // const ownKingInCheckMap = getOwnKingInCheckMap(peiceType, sourceSquareId);
  const allPossibleRookTargetIndeces = new Set();
  // if (ownKingInCheckMap.size > 1) return allPossibleRookTargetIndeces;
  const sourceSquareIndex = SQUARES_ID_VS_INDEX_MAP[sourceSquareId];
  let index = sourceSquareIndex;
  while (index > 7) {
    index -= 8;
    const checkObstacleRes = checkObstacle(peiceType, index);
    if (
      (squareIndexToIgnore && index === squareIndexToIgnore) ||
      !checkObstacleRes[0]
    ) {
      allPossibleRookTargetIndeces.add(index);
      continue;
    } else if (checkObstacleRes[1]) break;
    else {
      allPossibleRookTargetIndeces.add(index);
      break;
    }
  }
  index = sourceSquareIndex;
  while (index < 56) {
    index += 8;
    const checkObstacleRes = checkObstacle(peiceType, index);
    if (
      (squareIndexToIgnore && index === squareIndexToIgnore) ||
      !checkObstacleRes[0]
    ) {
      allPossibleRookTargetIndeces.add(index);
      continue;
    } else if (checkObstacleRes[1]) break;
    else {
      allPossibleRookTargetIndeces.add(index);
      break;
    }
  }
  index = sourceSquareIndex;
  while (index % 8 > 0) {
    index -= 1;
    const checkObstacleRes = checkObstacle(peiceType, index);
    if (
      (squareIndexToIgnore && index === squareIndexToIgnore) ||
      !checkObstacleRes[0]
    ) {
      allPossibleRookTargetIndeces.add(index);
      continue;
    } else if (checkObstacleRes[1]) break;
    else {
      allPossibleRookTargetIndeces.add(index);
      break;
    }
  }
  index = sourceSquareIndex;
  while (index % 8 < 7) {
    index += 1;
    const checkObstacleRes = checkObstacle(peiceType, index);
    if (
      (squareIndexToIgnore && index === squareIndexToIgnore) ||
      !checkObstacleRes[0]
    ) {
      allPossibleRookTargetIndeces.add(index);
      continue;
    } else if (checkObstacleRes[1]) break;
    else {
      allPossibleRookTargetIndeces.add(index);
      break;
    }
  }
  console.log(allPossibleRookTargetIndeces);
  return allPossibleRookTargetIndeces;
};

export const getFilteredPossibleRookTargetIndeces = (
  peiceType,
  sourceSquareId
) => {
  const ownKingInCheckMap = getOwnKingInCheckMap(peiceType, sourceSquareId);

  if (ownKingInCheckMap.size > 1) return new Set();

  const allPossibleRookTargetIndeces = getAllPossibleRookTargetIndeces(
    peiceType,
    sourceSquareId
  );
  if (ownKingInCheckMap.size > 0) {
    // const isMoveRestricted = Array.from(ownKingInCheckMap.values()).some(
    //   (attackingPath) =>
    //     new Set(attackingPath).has(SQUARES_ID_VS_INDEX_MAP[sourceSquareId])
    // );
    console.log(Array.from(ownKingInCheckMap.values())[0]);
    const attackSquareIndeces = new Set(
      Array.from(ownKingInCheckMap.values())[0]
    );
    const filteredPossibleRookTargetIndecesArr = Array.from(
      allPossibleRookTargetIndeces
    ).filter((possibleRookTargetIndex) =>
      attackSquareIndeces.has(possibleRookTargetIndex)
    );
    return new Set(filteredPossibleRookTargetIndecesArr);
  } else return allPossibleRookTargetIndeces;
};

export const isInvalidRookMove = (
  peiceType,
  sourceSquareId,
  targetSquareId
) => {
  const targetSquareIndex = SQUARES_ID_VS_INDEX_MAP[targetSquareId];
  return !getFilteredPossibleRookTargetIndeces(peiceType, sourceSquareId).has(
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

export const getAllPossibleKingTargetIndeces = (peiceType, sourceSquareId) => {
  // const ownKingInCheckMap = getOwnKingInCheckMap(peiceType, sourceSquareId);
  const possibleKingTargetIndeces = new Set();
  // if (ownKingInCheckMap.size > 1) return possibleKingTargetIndeces;
  const sourceSquareIndex = SQUARES_ID_VS_INDEX_MAP[sourceSquareId];
  if (sourceSquareIndex > 7 && sourceSquareIndex % 8 > 0) {
    const checkObstacleRes = checkObstacle(peiceType, sourceSquareIndex - 9);
    if (!checkObstacleRes[1])
      possibleKingTargetIndeces.add(sourceSquareIndex - 9);
  }
  if (sourceSquareIndex < 56 && sourceSquareIndex % 8 < 7) {
    const checkObstacleRes = checkObstacle(peiceType, sourceSquareIndex + 9);
    if (!checkObstacleRes[1])
      possibleKingTargetIndeces.add(sourceSquareIndex + 9);
  }
  if (sourceSquareIndex > 7 && sourceSquareIndex % 8 < 7) {
    const checkObstacleRes = checkObstacle(peiceType, sourceSquareIndex - 7);
    if (!checkObstacleRes[1])
      possibleKingTargetIndeces.add(sourceSquareIndex - 7);
  }
  if (sourceSquareIndex < 56 && sourceSquareIndex % 8 > 0) {
    const checkObstacleRes = checkObstacle(peiceType, sourceSquareIndex + 7);
    if (!checkObstacleRes[1])
      possibleKingTargetIndeces.add(sourceSquareIndex + 7);
  }
  if (sourceSquareIndex > 7) {
    const checkObstacleRes = checkObstacle(peiceType, sourceSquareIndex - 8);
    if (!checkObstacleRes[1])
      possibleKingTargetIndeces.add(sourceSquareIndex - 8);
  }
  if (sourceSquareIndex < 56) {
    const checkObstacleRes = checkObstacle(peiceType, sourceSquareIndex + 8);
    if (!checkObstacleRes[1])
      possibleKingTargetIndeces.add(sourceSquareIndex + 8);
  }
  if (sourceSquareIndex % 8 > 0) {
    const checkObstacleRes = checkObstacle(peiceType, sourceSquareIndex - 1);
    if (!checkObstacleRes[1])
      possibleKingTargetIndeces.add(sourceSquareIndex - 1);
  }
  if (sourceSquareIndex % 8 < 7) {
    const checkObstacleRes = checkObstacle(peiceType, sourceSquareIndex + 1);
    if (!checkObstacleRes[1])
      possibleKingTargetIndeces.add(sourceSquareIndex + 1);
  }
  return possibleKingTargetIndeces;
};

export const getFilteredPossibleKingTargetIndeces = (
  peiceType,
  sourceSquareId
) => {
  const ownKingInCheckMap = getOwnKingInCheckMap(peiceType, sourceSquareId);
  // const isOwnKingInCheck = !!ownKingInCheckMap.size;
  const allPossibleKingTargetIndeces = getAllPossibleKingTargetIndeces(
    peiceType,
    sourceSquareId
  );
  const filteredPossibleKingTargetIndeces = new Set(
    Array.from(allPossibleKingTargetIndeces)
  );

  let allOpponentAttackedIndeces = new Set();
  const sourceSquareEl = document.querySelector(`#${sourceSquareId}`);
  // let currentKingSquareEl = sourceSquareEl;
  const ownKingPeiceImgEl = document.querySelector(`.${peiceType}`);

  // console.log(ownKingPeice, "ownKingPeice");
  allPossibleKingTargetIndeces.forEach((index) => {
    // currentKingSquareEl.removeChild(ownKingPeiceImgEl);
    const currentKingSquareEl = document.querySelector(
      `#${SQUARES_INDEX_VS_ID_MAP[index]}`
    );
    const possibleTargetSquareImgEl = document.querySelector(
      `#${currentKingSquareEl.id} > img`
    );
    if (possibleTargetSquareImgEl) {
      currentKingSquareEl.replaceChild(
        ownKingPeiceImgEl,
        possibleTargetSquareImgEl
      );
    } else {
      currentKingSquareEl.appendChild(ownKingPeiceImgEl);
    }

    const opponentColor = peiceType.at(0) === "b" ? "white" : "black";
    const opponentPeiceEls = Array.from(
      document.querySelectorAll(`.square > img.${opponentColor}`)
    );

    // currentKingSquareEl.appendChild(possibleTargetSquareImgEl);
    opponentPeiceEls.forEach((opponentPeice) => {
      const opponentPeiceType = opponentPeice.classList[1];
      let attackedIndeces;
      switch (opponentPeiceType) {
        case "wp":
        case "bp":
          attackedIndeces = getAllPossiblePawnTargetIndeces(
            opponentPeiceType,
            opponentPeice.parentNode.id
          );
          allOpponentAttackedIndeces = new Set([
            ...allOpponentAttackedIndeces,
            ...attackedIndeces,
          ]);
          break;
        case "wr":
        case "br":
          attackedIndeces = getAllPossibleRookTargetIndeces(
            opponentPeiceType,
            opponentPeice.parentNode.id
          );
          allOpponentAttackedIndeces = new Set([
            ...allOpponentAttackedIndeces,
            ...attackedIndeces,
          ]);
          break;
        case "wn":
        case "bn":
          attackedIndeces = getAllPossibleKnightTargetIndeces(
            opponentPeiceType,
            opponentPeice.parentNode.id
          );
          allOpponentAttackedIndeces = new Set([
            ...allOpponentAttackedIndeces,
            ...attackedIndeces,
          ]);
          break;
        case "wb":
        case "bb":
          attackedIndeces = getAllPossibleBishopTargetIndeces(
            opponentPeiceType,
            opponentPeice.parentNode.id
          );
          allOpponentAttackedIndeces = new Set([
            ...allOpponentAttackedIndeces,
            ...attackedIndeces,
          ]);
          break;
        case "wq":
        case "bq":
          attackedIndeces = new Set([
            ...getAllPossibleBishopTargetIndeces(
              opponentPeiceType,
              opponentPeice.parentNode.id
            ),
            ...getAllPossibleRookTargetIndeces(
              opponentPeiceType,
              opponentPeice.parentNode.id
            ),
          ]);
          allOpponentAttackedIndeces = new Set([
            ...allOpponentAttackedIndeces,
            ...attackedIndeces,
          ]);
          break;
        case "wk":
        case "bk":
          attackedIndeces = getAllPossibleKingTargetIndeces(
            opponentPeiceType,
            opponentPeice.parentNode.id
          );
          allOpponentAttackedIndeces = new Set([
            ...allOpponentAttackedIndeces,
            ...attackedIndeces,
          ]);
          break;
      }
      if (allOpponentAttackedIndeces.has(index))
        filteredPossibleKingTargetIndeces.delete(index);
    });
    // currentKingSquareEl.replaceChild(
    //   possibleTargetSquareImgEl,
    //   ownKingPeiceImgEl
    // );
    if (possibleTargetSquareImgEl) {
      currentKingSquareEl.replaceChild(
        possibleTargetSquareImgEl,
        ownKingPeiceImgEl
      );
    } else {
      currentKingSquareEl.removeChild(ownKingPeiceImgEl);
    }
  });
  sourceSquareEl.appendChild(ownKingPeiceImgEl);
  // allPossibleKingTargetIndeces.forEach((index) => {
  //   Array.from(ownKingInCheckMap.values()).forEach((attackingPath) => {
  //     if (attackingPath.includes(index))
  //       filteredPossibleKingTargetIndeces.delete(index);
  //   });
  // });
  return filteredPossibleKingTargetIndeces;
};

export const isInvalidKingMove = (
  peiceType,
  sourceSquareId,
  targetSquareId
) => {
  const targetSquareIndex = SQUARES_ID_VS_INDEX_MAP[targetSquareId];
  return !getFilteredPossibleKingTargetIndeces(peiceType, sourceSquareId).has(
    targetSquareIndex
  );
};
