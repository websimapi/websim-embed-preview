const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const widthVal = document.getElementById('widthVal');
const heightVal = document.getElementById('heightVal');
const iframe = document.getElementById('embedFrame');
const embedCode = document.getElementById('embedCode');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');

function updateIframe() {
  const w = parseInt(widthInput.value, 10);
  const h = parseInt(heightInput.value, 10);
  widthVal.textContent = w;
  heightVal.textContent = h;
  iframe.style.width = w + 'px';
  iframe.style.height = h + 'px';
  iframe.width = w;
  iframe.height = h;
  updateEmbedCode();
}

function updateEmbedCode() {
  const code = `<iframe src="https://skillslap.com/skill/0de22497-b08e-425b-9314-d2e0cad18d0b/embed"\n        width="${iframe.width}" height="${iframe.height}"\n        style="border:none;border-radius:12px;"\n        title="SkillSlap Skill: SkillSlap Queue Processor">\n</iframe>`;
  embedCode.value = code;
}

widthInput.addEventListener('input', updateIframe);
heightInput.addEventListener('input', updateIframe);

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(embedCode.value);
    copyBtn.textContent = 'Copied';
    setTimeout(() => (copyBtn.textContent = 'Copy embed'), 1500);
  } catch (e) {
    copyBtn.textContent = 'Copy failed';
    setTimeout(() => (copyBtn.textContent = 'Copy embed'), 1500);
  }
});

downloadBtn.addEventListener('click', () => {
  const blob = new Blob([`<!doctype html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body>
${embedCode.value}
</body>
</html>`], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'embed.html';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

// Initialize
updateIframe();