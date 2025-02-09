export default class Sons {
    static win = new Audio('../assets/sons/success.mp3');
    static lose = new Audio('../assets/sons/fail.mp3');
    static start = new Audio('../assets/sons/start.mp3');
    static bonus = new Audio('../assets/sons/bonus.mp3');
    static powerup = new Audio('../assets/sons/powerup.mp3');
    static music = new Audio('../assets/sons/music.mp3');
    static jump = new Audio('../assets/sons/jump.mp3');

    static playJump() {
        this.jump.play();
    }

    static playWin() {
        this.win.play();
    }

    static playLose() {
        this.lose.play();
    }

    static playStart() {
        this.start.play();
    }

    static playBonus() {
        this.bonus.play();
    }

    static playPowerup() {
        this.powerup.play();
    }

    static playMusic() {
        this.music.loop = true;
        this.music.play();
    }

}