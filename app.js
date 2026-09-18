const letter = window.LETTER || {};
const paper = document.getElementById('letter');
const envelope = document.getElementById('envelope-wrap');
const openButton = document.getElementById('open-letter');
document.getElementById('letter-to').textContent = letter.to || '너에게,';
document.getElementById('letter-from').textContent = letter.from || '';
document.getElementById('letter-date').textContent = letter.date || '';
for (const paragraph of (letter.body || '').split(/\n\s*\n/)) {
  const p = document.createElement('p');
  p.textContent = paragraph;
  document.getElementById('letter-body').append(p);
}
openButton.addEventListener('click', () => {
  envelope.hidden = true;
  paper.hidden = false;
  openButton.setAttribute('aria-expanded', 'true');
  paper.focus({ preventScroll: true });
});
document.getElementById('close-letter').addEventListener('click', () => {
  paper.hidden = true;
  envelope.hidden = false;
  openButton.setAttribute('aria-expanded', 'false');
  openButton.focus({ preventScroll: true });
  envelope.scrollIntoView({ behavior: 'instant', block: 'center' });
});
const motionButton = document.getElementById('motion-toggle');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
function setMotion(paused) {
  document.body.classList.toggle('motion-paused', paused);
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.textContent = paused ? '움직임 켜기' : '움직임 멈추기';
}
setMotion(motionPreference.matches);
motionPreference.addEventListener('change', (event) => setMotion(event.matches));
motionButton.addEventListener('click', () => setMotion(!document.body.classList.contains('motion-paused')));
