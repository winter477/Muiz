class MusizApp {
    constructor() {
        this.player = null;
        this.recommendations = [];
        this.lyricAnimator = null;
        this.audioProcessor = null;
        this.currentTrack = null;
        this.playlist = [];
        this.currentIndex = 0;
        this.isPlaying = false;
    }

    init() {
        this.setupEventListeners();
        this.loadRecommendations();
        this.initializeAudioContext();
    }

    setupEventListeners() {
        const playBtn = document.getElementById('playBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');

        playBtn.addEventListener('click', () => this.play());
        pauseBtn.addEventListener('click', () => this.pause());
        nextBtn.addEventListener('click', () => this.nextTrack());
        prevBtn.addEventListener('click', () => this.previousTrack());
    }

    async loadRecommendations() {
        // Fetch recommendations
        const response = await fetch('/api/recommendations');
        this.recommendations = await response.json();
        this.displayRecommendations();
    }

    play() {
        if (this.currentTrack) {
            this.audioProcessor.play();
            this.isPlaying = true;
            this.updateUI();
        }
    }

    pause() {
        this.audioProcessor.pause();
        this.isPlaying = false;
        this.updateUI();
    }

    nextTrack() {
        this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
        this.loadTrack(this.playlist[this.currentIndex]);
    }

    previousTrack() {
        this.currentIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
        this.loadTrack(this.playlist[this.currentIndex]);
    }

    loadTrack(track) {
        this.currentTrack = track;
        this.audioProcessor.load(track.audioUrl);
        this.updateUI();
    }

    updateUI() {
        // Update the UI based on the current track status
        const trackInfo = document.getElementById('trackInfo');
        trackInfo.textContent = this.currentTrack ? this.currentTrack.title : 'No Track Playing';
    }

    displayRecommendations() {
        const recommendationsList = document.getElementById('recommendationsList');
        recommendationsList.innerHTML = this.recommendations.map(rec => `<li>${rec.title}</li>`).join('');
    }

    loadAndPlay(track) {
        this.loadTrack(track);
        this.play();
    }

    initializeAudioContext() {
        this.audioProcessor = new AudioContext();
    }
}