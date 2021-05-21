export const loadImage = (src) => new Promise(resolve => {
    const img = new Image();
    img.addEventListener('load', async () => await resolve(img));
    img.src = src
});

export const loadAudio = (src) => new Promise(resolve => {
    const audio = new Audio();
    audio.addEventListener('canplay', async () => await resolve(audio));
    audio.src = src
});