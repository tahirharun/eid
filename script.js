const EID_MESSAGE = "Eid Mubarak! Wishing you joy, peace, and happiness on this blessed day.";
const shareBtn = document.getElementById('shareBtn');
const shareOptions = document.getElementById('shareOptions');
const nasheedBtn = document.getElementById('nasheedBtn');
shareBtn.addEventListener('click', (e) => {
    const rect = shareBtn.getBoundingClientRect();
    createConfetti(rect.left + rect.width/2, rect.top + rect.height/2); // Confetti burst
    shareOptions.style.display = shareOptions.style.display === 'flex' ? 'none' : 'flex';
});
function shareTo(platform) {
    switch(platform) {
        case 'whatsapp':
            window.open(`https://wa.me/?text=${encodeURIComponent(EID_MESSAGE)}`, '_blank');
            break;
        case 'twitter':
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(EID_MESSAGE)}`, '_blank');
            break;
        case 'gmail':
            const subject = encodeURIComponent("Eid Mubarak!");
            const body = encodeURIComponent(EID_MESSAGE);
            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=&su=${subject}&body=${body}`, '_blank');
            break;
    }
    shareOptions.style.display = 'none';
}
shareOptions.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => shareTo(btn.dataset.platform));
});
const nasheedAudio = new Audio('nasheed.mp3');
let isPlaying = false;
nasheedBtn.addEventListener('click', () => {
    if(!isPlaying){
        nasheedAudio.play();
        nasheedBtn.textContent = "⏸ Pause Nasheed";
        nasheedBtn.classList.add('nasheed-playing');
        isPlaying = true;
    } else {
        nasheedAudio.pause();
        nasheedBtn.textContent = "Play Nasheed";
        nasheedBtn.classList.remove('nasheed-playing');
        isPlaying = false;
    }
});
function createStars(count = 50){
    for(let i=0; i<count; i++){
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random()*4 + 2;
        star.style.width = star.style.height = size + 'px';
        star.style.top = Math.random()*window.innerHeight + 'px';
        star.style.left = Math.random()*window.innerWidth + 'px';
        star.style.animationDuration = (Math.random()*2 + 1) + 's';
        document.body.appendChild(star);
    }
}
createStars();
function createFirework(x, y){
    for(let i=0; i<20; i++){
        const firework = document.createElement('div');
        firework.classList.add('firework');
        firework.style.left = x + 'px';
        firework.style.top = y + 'px';
        const angle = Math.random()*2*Math.PI;
        const distance = Math.random()*100 + 50;
        firework.style.setProperty('--x', distance*Math.cos(angle) + 'px');
        firework.style.setProperty('--y', distance*Math.sin(angle) + 'px');
        document.body.appendChild(firework);
        setTimeout(()=>firework.remove(),1000);
    }
}
setInterval(()=>{
    const x = Math.random()*window.innerWidth;
    const y = Math.random()*window.innerHeight/2;
    createFirework(x,y);
},2000);
const lanternCount = 15;
const lanterns = [];
for(let i=0; i<lanternCount; i++){
    const lantern = document.createElement('div');
    lantern.classList.add('lantern');
    document.body.appendChild(lantern);
    lantern.x = Math.random() * (window.innerWidth - 50);
    lantern.y = -Math.random() * window.innerHeight;
    lantern.speed = 50 + Math.random() * 50;
    lantern.swayAmplitude = 20 + Math.random() * 20;
    lantern.swaySpeed = 1 + Math.random();
    lantern.swayPhase = Math.random() * Math.PI * 2;
    lanterns.push(lantern);
}
let lastTime = performance.now();
function animateLanterns(time){
    const delta = (time - lastTime)/1000;
    lastTime = time;
    lanterns.forEach(lantern => {
        lantern.y += lantern.speed * delta;
        if(lantern.y > window.innerHeight){
            lantern.y = -60;
            lantern.x = Math.random() * (window.innerWidth - 50);
            lantern.swayPhase = Math.random() * Math.PI * 2;
        }
        const swayOffset = Math.sin(time/1000 * lantern.swaySpeed + lantern.swayPhase) * lantern.swayAmplitude;
        lantern.style.top = lantern.y + 'px';
        lantern.style.left = (lantern.x + swayOffset) + 'px';
        lantern.style.boxShadow = `0 0 ${10 + Math.sin(time/200)*10}px #ffeb3b`;
    });
    requestAnimationFrame(animateLanterns);
}
requestAnimationFrame(animateLanterns);
function createConfetti(x, y){
    for(let i=0;i<30;i++){
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.backgroundColor = `hsl(${Math.random()*360},100%,50%)`;
        const size = Math.random() * 8 + 4;
        confetti.style.width = confetti.style.height = size + 'px';
        document.body.appendChild(confetti);
        setTimeout(()=>confetti.remove(),1000);
    }
}