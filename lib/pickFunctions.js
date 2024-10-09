function randomPickFunction() {
  // Fisher-Yates shuffle algorithm
  const numbers = Array.from({ length: 45 }, (_, i) => i + 1);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers.slice(0, 6).sort((a, b) => a - b);
}

function probabilityPickFunction(probabilityData) {
  const numbers = [];
  const availableNumbers = Array.from(
    { length: probabilityData.length },
    (_, i) => i + 1
  );
  const totalProbability = probabilityData.reduce((sum, prob) => sum + prob, 0);

  while (numbers.length < 6) {
    const ranNum = Math.random() * totalProbability;
    let cumulativeProbability = 0;

    for (let i = 0; i < availableNumbers.length; i++) {
      cumulativeProbability += probabilityData[i];
      if (ranNum <= cumulativeProbability) {
        numbers.push(availableNumbers[i]);
        availableNumbers.splice(i, 1);
        break;
      }
    }
  }

  return numbers.sort((a, b) => a - b);
}

function underDogPickFunction(probabilityData) {
  const numbers = [];
  const probObject = probabilityData.map((prob, index) => ({
    number: index + 1,
    probability: prob,
  }));

  // 확률 데이터 오름차순 정렬
  const sortedData = probObject.sort((a, b) => a.probability - b.probability);

  // 정렬된 데이터에서 probability 값만 추출
  const probabilityArray = sortedData.map((item) => item.probability);
  const availableNumbers = sortedData.map((item) => item.number);
  const totalProbability = probabilityArray.reduce(
    (sum, prob) => sum + prob,
    0
  );

  while (numbers.length < 6) {
    const ranNum = Math.random() * totalProbability;
    let cumulativeProbability = 0;

    for (let i = 0; i < availableNumbers.length; i++) {
      cumulativeProbability += probabilityArray[i];
      if (ranNum <= cumulativeProbability) {
        numbers.push(availableNumbers[i]);
        availableNumbers.splice(i, 1);
        probabilityArray.splice(i, 1); // probabilityArray에서도 해당 확률 제거
        break;
      }
    }
  }

  return numbers.sort((a, b) => a - b);
}

export { randomPickFunction, probabilityPickFunction, underDogPickFunction };
