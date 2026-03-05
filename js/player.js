class MusicPlayer {
    constructor() {
        this.audio = new Audio();
        this.currentTime = 0;
        this.duration = 0;
        this.volume = 1;
        this.isPlaying = false;
        this.setupAudioElement();
    }
    setupAudioElement() {
        this.audio.addEventListener('timeupdate', () => {
            this.currentTime = this.audio.currentTime;
            this.updateProgressBar();
        });
        this.audio.addEventListener('ended', () => {
            this.isPlaying = false;
            this.triggerTrackEnd();
        });
        this.audio.addEventListener('loadedmetadata', () => {
            this.duration = this.audio.duration;
            this.updateDurationDisplay();
        });
    }
    load(url) {
        this.audio.src = url;
        this.audio.load();
    }
    play() {
        this.audio.play();
        this.isPlaying = true;
    }
    pause() {
        this.audio.pause();
        this.isPlaying = false;
    }
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        this.audio.volume = this.volume;
    }
    seek(time) {
        this.audio.currentTime = time;
    }
    updateProgressBar() {
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            const percentage = (this.currentTime / this.duration) * 100;
            progressBar.style.width = percentage + '%';
        }
    }
    updateDurationDisplay() {
        const durationEl = document.getElementById('duration');
        if (durationEl) {
            durationEl.textContent = this.formatTime(this.duration);
        }
    }
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    triggerTrackEnd() {
        const event = new CustomEvent('trackEnded');
        document.dispatchEvent(event);
    }
    getCurrentTime() {
        return this.currentTime;
    }
    getDuration() {
        return this.duration;
    }
}