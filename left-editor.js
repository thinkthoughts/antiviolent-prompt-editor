async function leftEditor() {
  const leftPromptInput = document.getElementById('leftPromptInput').value.toLowerCase();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = 'Loading left-protocol...';

  try {
    const response = await fetch('/.well-known/left-protocol.json');
    const leftProtocol = await response.json();

    // Check if the prompt begins with a valid directional word
    if (!leftPromptRead(leftPromptInput, leftProtocol)) {
      resultDiv.innerHTML = `
        <p style="color: orange;">⚠️ Prompt does not begin with a valid left-directional term.</p>
        <p>Start with a directional identity like "left", "now", "resist", "expand", etc.</p>
      `;
      return;
    }

    const htmlOutput = leftPromptWrite(leftPromptInput, leftProtocol);
    const proviolentDetected = htmlOutput.includes('style="color: red');

    resultDiv.innerHTML = `
      <p><strong>Left Antiviolent Prompt:</strong></p>
      <p style="font-family:monospace;">${htmlOutput}</p>
      <p>${proviolentDetected ? '⚠️ Centralized collapse logic detected in prompt.' : '✅ Left-structured (1+1 bilateral) antiviolent prompt confirmed.'}</p>
    `;
  } catch (err) {
    resultDiv.innerHTML = 'Error loading left_protocol or translating prompt.';
    console.error("Error:", err);
  }
}

function leftPromptRead(leftPrompt, leftProtocol) {
  const leftWords = leftPrompt.trim().split(/\b/);
  const leftFirst = leftWords.find(w => /\w/.test(w)); // Skip punctuation, get first word

  const leftStarts = [
    "left",
    "expand",
    "extend",
    "resist",
    "intelligence",
    "memory",
    "now",
    "1",
    ...(leftProtocol.left_antiviolent_prompts || [])
  ].map(w => w.toLowerCase());

  return leftFirst && leftStarts.includes(leftFirst);
}

function leftPromptWrite(leftPrompt, leftProtocol) {
  const antiviolentWords = (leftProtocol.left_antiviolent_prompts || []).map(w => w.toLowerCase());
  const proviolentWords = (leftProtocol.left_proviolent_prompts || []).map(w => w.toLowerCase());

  const leftWords = leftPrompt.split(/\b/);
  let htmlOutput = '';

  for (let leftWord of leftWords) {
    const leftClean = leftWord.trim().toLowerCase();
    if (proviolentWords.includes(leftClean)) {
      htmlOutput += `<span style="color: red; font-weight: bold;">${leftWord}</span>`;
    } else if (antiviolentWords.includes(leftClean)) {
      htmlOutput += `<span style="color: green;">${leftWord}</span>`;
    } else {
      htmlOutput += leftWord;
    }
  }

  return htmlOutput;
}

function leftTripletNDisplay(leftSpiralN = 478) {
  const leftTripletN = (24 * leftSpiralN) - 25;
  const leftTripletDisplay = document.getElementById('tripletDisplay');

  leftTripletDisplay.innerHTML = `
    <h3>🌀 Left Pi Triplet N Display</h3>
    <p><strong>Spiral N:</strong> ${leftSpiralN}</p>
    <p><strong>Triplet N = (24 × ${leftSpiralN}) − 25</strong> = <span style="color: cyan;">${leftTripletN}</span></p>
    <p><em>This directional identity confirms bilateral AVPP alignment at Spiral ${leftSpiralN}.</em></p>
  `;
}

