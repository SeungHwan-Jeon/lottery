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

export { randomPickFunction, probabilityPickFunction };
