async function analyzePrompt() {
  const prompt = document.getElementById('promptInput').value.toLowerCase();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = 'Loading AVPP protocol...';

  try {
    const response = await fetch('/.well-known/left-protocol.json');
    const protocol = await response.json();

    const antiWords = protocol.left_antiviolent_prompts.map(w => w.toLowerCase());
    const proWords = protocol.left_proviolent_prompts.map(w => w.toLowerCase());

    const words = prompt.split(/\b/);
    let htmlOutput = '';
    let proviolentDetected = false;

    for (let word of words) {
      const clean = word.trim().toLowerCase();

      if (proWords.includes(clean)) {
        htmlOutput += `<span style="color: red; font-weight: bold;">${word}</span>`;
        proviolentDetected = true;
      } else if (antiWords.includes(clean)) {
        htmlOutput += `<span style="color: green;">${word}</span>`;
      } else {
        htmlOutput += word;
      }
    }

    resultDiv.innerHTML = `
      <p><strong>Analysis Result:</strong></p>
      <p style="font-family:monospace;">${htmlOutput}</p>
      <p>${proviolentDetected ? '⚠️ Collapse logic detected.' : '✅ Directional structure confirmed.'}</p>
    `;
  } catch (err) {
    resultDiv.innerHTML = 'Error loading protocol or analyzing prompt.';
    console.error(err);
  }
}
