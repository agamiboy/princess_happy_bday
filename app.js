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
// Always start the cat and floating decorations in motion.
setMotion(false);
motionButton.addEventListener('click', () => setMotion(!document.body.classList.contains('motion-paused')));

const giftDialog = document.getElementById('gift-dialog');
const giftButtons = [...document.querySelectorAll('[data-gift]')];
const gifts = {
  wish: { title: '소원권', description: '공주님의 소원 하나를 들어드립니다.\n몇개 있는지 모르지만 일단은!' },
  necklace: { title: '눈 감아봐', description: '눈 감아봐 공주!!!.\n그리고 가만히 있어야해~?' },
};
let giftOpener = null;
let giftPending = false;

giftButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (giftPending || giftDialog.open) return;
    giftPending = true;
    giftOpener = button;
    const gift = gifts[button.dataset.gift];
    document.getElementById('gift-title').textContent = gift.title;
    document.getElementById('gift-description').textContent = gift.description;
    document.getElementById('wish-art').hidden = button.dataset.gift !== 'wish';
    document.getElementById('necklace-art').hidden = button.dataset.gift !== 'necklace';
    button.classList.add('is-popping');
    const gentle = motionPreference.matches || document.body.classList.contains('motion-paused');
    window.setTimeout(() => {
      button.classList.remove('is-popping');
      giftPending = false;
      giftDialog.showModal();
      document.body.classList.add('gift-open');
    }, gentle ? 0 : 450);
  });
});
function restoreAfterGift() {
  if (giftDialog.open) return;
  document.body.classList.remove('gift-open');
  giftOpener?.focus({ preventScroll: true });
}
function closeGift() {
  giftDialog.close();
  restoreAfterGift();
}
document.getElementById('close-gift').addEventListener('click', closeGift);
document.getElementById('confirm-gift').addEventListener('click', closeGift);
giftDialog.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeGift();
});
giftDialog.addEventListener('click', (event) => {
  const bounds = giftDialog.getBoundingClientRect();
  if (event.target === giftDialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) {
    closeGift();
  }
});
giftDialog.addEventListener('close', restoreAfterGift);
