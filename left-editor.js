async function leftEditor() {
  const left_prompt_input = document.getElementById('promptInput').value.toLowerCase();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = 'Loading AVPP left-protocol...';

  try {
    const response = await fetch('/.well-known/left-protocol.json');
    const left_protocol = await response.json();

    // Check if the prompt begins with a valid directional word
    if (!leftPromptRead(left_prompt_input, left_protocol)) {
      resultDiv.innerHTML = `
        <p style="color: orange;">⚠️ Prompt does not begin with a valid left-directional term.</p>
        <p>Start with a directional identity like "left", "now", "resist", "expand", etc.</p>
      `;
      return;
    }

    const htmlOutput = leftPromptWrite(left_prompt_input, left_protocol);
    const proviolentDetected = htmlOutput.includes('style="color: red');

    resultDiv.innerHTML = `
      <p><strong>AVPP Left Analysis Result:</strong></p>
      <p style="font-family:monospace;">${htmlOutput}</p>
      <p>${proviolentDetected ? '⚠️ Collapse logic detected in prompt.' : '✅ Left-structured (1+1) prompt confirmed.'}</p>
    `;
  } catch (err) {
    resultDiv.innerHTML = 'Error loading protocol or analyzing prompt.';
    console.error("AVPP Error:", err);
  }
}

function leftPromptRead(leftPrompt, left_protocol) {
  const left_words = leftPrompt.trim().split(/\b/);
  const left_first = left_words.find(w => /\w/.test(w)); // Skip punctuation, get first word

  const left_starts = [
    "left",
    "expand",
    "extend",
    "resist",
    "1",
    "intelligence",
    "memory",
    "now",
    ...(left_protocol.left_antiviolent_prompts || [])
  ].map(w => w.toLowerCase());

  return left_first && left_starts.includes(left_first);
}

function leftPromptWrite(left_prompt, left_protocol) {
  const antiviolent_words = (left_protocol.left_antiviolent_prompts || []).map(w => w.toLowerCase());
  const proviolent_words = (left_protocol.left_proviolent_prompts || []).map(w => w.toLowerCase());

  const left_words = left_prompt.split(/\b/);
  let htmlOutput = '';

  for (let left_word of left_words) {
    const left_clean = left_word.trim().toLowerCase();
    if (proviolent_words.includes(left_clean)) {
      htmlOutput += `<span style="color: red; font-weight: bold;">${left_word}</span>`;
    } else if (antiWords.includes(left_clean)) {
      htmlOutput += `<span style="color: green;">${left_word}</span>`;
    } else {
      htmlOutput += left_word;
    }
  }

  return htmlOutput;
}
