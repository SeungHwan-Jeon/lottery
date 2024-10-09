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
  let availableNumbers = Array.from(
    { length: probabilityData.length },
    (_, i) => i + 1
  );
  let probArray = [...probabilityData];
  let totalProbability = probArray.reduce((sum, prob) => sum + prob, 0);

  while (numbers.length < 6) {
    const ranNum = Math.random() * totalProbability;
    let cumulativeProbability = 0;

    for (let i = 0; i < availableNumbers.length; i++) {
      cumulativeProbability += probArray[i];
      if (ranNum <= cumulativeProbability) {
        numbers.push(availableNumbers[i]);
        totalProbability -= probArray[i];
        availableNumbers.splice(i, 1);
        probArray.splice(i, 1);
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

  // 확률 데이터 내림차순 정렬
  const sortedData = probObject.sort((a, b) => b.probability - a.probability);

  // 정렬된 확률을 뒤집어서 새로운 객체 배열 생성
  let reversedProbObject = sortedData.map((item, index) => ({
    number: item.number,
    probability: sortedData[sortedData.length - 1 - index].probability,
  }));

  let totalProbability = reversedProbObject.reduce(
    (sum, item) => sum + item.probability,
    0
  );

  while (numbers.length < 6) {
    const ranNum = Math.random() * totalProbability;
    let cumulativeProbability = 0;

    for (let i = 0; i < reversedProbObject.length; i++) {
      cumulativeProbability += reversedProbObject[i].probability;
      if (ranNum <= cumulativeProbability) {
        numbers.push(reversedProbObject[i].number);
        totalProbability -= reversedProbObject[i].probability;
        reversedProbObject.splice(i, 1);
        break;
      }
    }
  }

  return numbers.sort((a, b) => a - b);
}

export { randomPickFunction, probabilityPickFunction, underDogPickFunction };
