import SQUARES_ID_VS_INDEX_MAP, {
  SQUARES_INDEX_VS_ID_MAP,
} from "../utils/constants.js";

export const isInvalidPawnMove = (
  peiceType,
  sourceSquareId,
  targetSquareId
) => {
  const sourceSquareIndex = SQUARES_ID_VS_INDEX_MAP[sourceSquareId];
  const targetSquareIndex = SQUARES_ID_VS_INDEX_MAP[targetSquareId];
  const whitePeiceCheck = peiceType === "wp";
  const thirdRowCheck = sourceSquareIndex >= 48 && sourceSquareIndex <= 55;
  const sixthRowCheck = sourceSquareIndex >= 8 && sourceSquareIndex <= 15;
  const possiblePawnTargetIndeces = new Set([
    whitePeiceCheck ? sourceSquareIndex - 8 : sourceSquareIndex + 8,
  ]);
  if (whitePeiceCheck ? thirdRowCheck : sixthRowCheck) {
    possiblePawnTargetIndeces.add(
      whitePeiceCheck ? sourceSquareIndex - 16 : sourceSquareIndex + 16
    );
  }
  if (
    document.querySelector(
      `#${
        SQUARES_INDEX_VS_ID_MAP[
          whitePeiceCheck ? sourceSquareIndex - 9 : sourceSquareIndex + 9
        ]
      } > .peice`
    )
  )
    possiblePawnTargetIndeces.add(
      whitePeiceCheck ? sourceSquareIndex - 9 : sourceSquareIndex + 9
    );
  if (
    document.querySelector(
      `#${
        SQUARES_INDEX_VS_ID_MAP[
          whitePeiceCheck ? sourceSquareIndex - 7 : sourceSquareIndex + 7
        ]
      } > .peice`
    )
  )
    possiblePawnTargetIndeces.add(
      whitePeiceCheck ? sourceSquareIndex - 7 : sourceSquareIndex + 7
    );
  if (
    document.querySelector(
      `#${
        SQUARES_INDEX_VS_ID_MAP[
          whitePeiceCheck ? sourceSquareIndex - 8 : sourceSquareIndex + 8
        ]
      } > .peice`
    )
  )
    possiblePawnTargetIndeces.delete(
      whitePeiceCheck ? sourceSquareIndex - 8 : sourceSquareIndex + 8
    );
  return !possiblePawnTargetIndeces.has(targetSquareIndex);
};

export const isInvalidBishopMove = (
  peiceType,
  sourceSquareId,
  targetSquareId
) => {
  const possibleBishopTargetIndeces = new Set();
  const sourceSquareIndex = SQUARES_ID_VS_INDEX_MAP[sourceSquareId];
  const targetSquareIndex = SQUARES_ID_VS_INDEX_MAP[targetSquareId];
  let index = sourceSquareIndex;
  while (index > 7 && sourceSquareId.at(0) !== "a") {
    index -= 9;
    possibleBishopTargetIndeces.add(index);
  }
  index = sourceSquareIndex;
  while (index < 56 && sourceSquareId.at(0) !== "h") {
    index += 9;
    possibleBishopTargetIndeces.add(index);
  }
  index = sourceSquareIndex;
  while (index > 7 && sourceSquareId.at(0) !== "h") {
    index -= 7;
    possibleBishopTargetIndeces.add(index);
  }
  index = sourceSquareIndex;
  while (index < 56 && sourceSquareId.at(0) !== "a") {
    index += 7;
    possibleBishopTargetIndeces.add(index);
  }
  return !possibleBishopTargetIndeces.has(targetSquareIndex);
};

export const isInvalidKnightMove = (
  peiceType,
  sourceSquareId,
  targetSquareId
) => {
  const possibleKnightTargetIndeces = new Set();
  const sourceSquareIndex = SQUARES_ID_VS_INDEX_MAP[sourceSquareId];
  const targetSquareIndex = SQUARES_ID_VS_INDEX_MAP[targetSquareId];
  if (sourceSquareIndex > 17) {
    possibleKnightTargetIndeces.add(sourceSquareIndex - 17);
    possibleKnightTargetIndeces.add(sourceSquareIndex - 10);
  }
  if (sourceSquareIndex < 46) {
    possibleKnightTargetIndeces.add(sourceSquareIndex + 17);
    possibleKnightTargetIndeces.add(sourceSquareIndex + 10);
  }
  if (sourceSquareId.at(0) !== "a" && sourceSquareId.at(0) !== "b") {
    possibleKnightTargetIndeces.add(sourceSquareIndex + 6);
    possibleKnightTargetIndeces.add(sourceSquareIndex + 15);
  }
  if (sourceSquareId.at(0) !== "g" && sourceSquareId.at(0) !== "h") {
    possibleKnightTargetIndeces.add(sourceSquareIndex - 6);
    possibleKnightTargetIndeces.add(sourceSquareIndex - 15);
  }
  return !possibleKnightTargetIndeces.has(targetSquareIndex);
};

export const isInvalidRookMove = (
  peiceType,
  sourceSquareId,
  targetSquareId
) => {
  const possibleRookTargetIndeces = new Set();
  const sourceSquareIndex = SQUARES_ID_VS_INDEX_MAP[sourceSquareId];
  const targetSquareIndex = SQUARES_ID_VS_INDEX_MAP[targetSquareId];
  let index = sourceSquareIndex;
  while (index > 7) {
    index -= 8;
    possibleRookTargetIndeces.add(index);
  }
  index = sourceSquareIndex;
  while (index < 56) {
    index += 8;
    possibleRookTargetIndeces.add(index);
  }
  index = sourceSquareIndex;
  while (index % 8 > 0) {
    index -= 1;
    possibleRookTargetIndeces.add(index);
  }
  index = sourceSquareIndex;
  while (index % 8 < 7) {
    index += 1;
    possibleRookTargetIndeces.add(index);
  }
  return !possibleRookTargetIndeces.has(targetSquareIndex);
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

export const isInvalidKingMove = (
  peiceType,
  sourceSquareId,
  targetSquareId
) => {
  const possibleRookTargetIndeces = new Set();
  const sourceSquareIndex = SQUARES_ID_VS_INDEX_MAP[sourceSquareId];
  const targetSquareIndex = SQUARES_ID_VS_INDEX_MAP[targetSquareId];
  possibleRookTargetIndeces.add(sourceSquareIndex - 9);
  possibleRookTargetIndeces.add(sourceSquareIndex + 9);
  possibleRookTargetIndeces.add(sourceSquareIndex - 7);
  possibleRookTargetIndeces.add(sourceSquareIndex + 7);
  possibleRookTargetIndeces.add(sourceSquareIndex - 8);
  possibleRookTargetIndeces.add(sourceSquareIndex + 8);
  possibleRookTargetIndeces.add(sourceSquareIndex - 1);
  possibleRookTargetIndeces.add(sourceSquareIndex + 1);
  return !possibleRookTargetIndeces.has(targetSquareIndex);
};
