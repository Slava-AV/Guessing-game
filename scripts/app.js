if ('serviceWorker' in navigator) {
    window.addEventListener('load', () =>
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => console.log('Service Worker registered'))
            .catch(err => 'SW registration failed'));
}
var correct = zounds.load("sounds/correct.ogg");
    wrong = zounds.load("sounds/wrong.ogg");
    loose_song = zounds.load("sounds/loose.ogg");
    win_song = zounds.load("sounds/win.ogg");
    click = zounds.load("sounds/click.ogg");

// random integer helper function
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Vue.component("letter-button", {
    props: ["letter", "game-over", "lose"],
    template: "<button class='keyboard-row-letter' :id='letter' :disabled='disabled' @click='clicked()'>{{ letter }}</button>",
    data: function () {
        return {
            disabled: false
        };
    },
    methods: {
        clicked: function () {
            this.disabled = true;
            // setTimeout(() => { this.disabled = true }, 10000);
            this.$emit("check");
        }
    },
    watch: {
        gameOver: function (newValue) {
            this.disabled = newValue;
        },
    }
})

var game = new Vue({
    el: '#game',
    data: {lettersEn: [
            ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
            ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
            ["Z", "X", "C", "V", "B", "N", "M"]
        ],
        lettersRu:[
            ["И", "Е", "Н", "А", "О", "Т", "Р", "С", "Л", "В","К"],
            ["П", "М", "У", "Д", "Я", "Ы", "Ь", "З", "Б", "Г"],
            ["Й", "Ю", "Х", "Ж", "Ц", "Ч", "Ш", "Щ", "Ф", "Э"]

        ],
        wordsEn: [
            "BUTTER",
            "LOLLIPOP",
            "PIGEON",
            "REPTILE",
            "HAWK",
            "SCOOTER",
            "SANTA",
            "PIZZA",
            "ANIMAL",
            "CHAIR",
            "HORSE",
            "CLOUD",
            "CARROT",
            "APPLE",
            "BANANA",
            "MONKEY",
            "COMPUTER",
            "GAME"
        ],
        wordsRu: [
            "СОБАКА",
            "СЛОН",
            "КОШКА",
            "МОЛОКО",
            "АВТОБУС",
            "ШТАНЫ",
            "КРОТ",
            "МАГАЗИН",
            "СОЛНЦЕ",
            "ТРАКТОР",
            "КАРАНДАШ",
            "ОТКРЫТКА",
            "КОНФЕТА",
            "МЯЧ",
            "НОС",
            "ЛИСТ",
            "РУКА",
            "НЕБО",
            "СИЛА",
            "КАМЕНЬ",
            "ЛОЖКА",
                    ],
        // currentWord will be set to a random word from above list
        currentWord: "",
        // each element in this array is a letter in the word
        wordDivs: [],
        // to count the number of wrong guesses
        guesses: 15,
        gameOver: false,
        lose: false,
        message: "",
        image: "",
        letters: "",
        words: "",
        lang: "Eng"
    },
    methods: {
        makeBlanks: function () {
            for (var i = 0; i < this.currentWord.length; i++) {
                this.wordDivs.push("");
            }
        },
        check: function (letter) {
            if (!this.gameOver) {
                this.guesses--;
                var guessCorrect = false;
                for (var i = 0; i < this.currentWord.length; i++) {
                    if (letter == this.currentWord[i]) {
                        Vue.set(this.wordDivs, i, letter);
                        guessCorrect = true;
                    }
                }
                if (guessCorrect) {correct.play();}
                else {wrong.play();}

                if (!this.wordDivs.some(function (value) {
                    return value == ""
                })) {
                    this.gameOver = true;
                    this.message = "You win!!!";
                    this.image = "./images/sheeps.gif";
                    win_song.play();
                    //Win
                }
                else if (this.guesses==0) {
                    this.lose = true;
                    // loose message
                    this.gameOver = true;
                    this.message = "You lose :(";
                    setTimeout( () =>loose_song.play(),500);
                    setTimeout( () => this.loseGame(),3000);
                }
            }
        },
        loseGame: function() {
            for (var i = 0; i < this.wordDivs.length; i++) {
                if (this.wordDivs[i] == "") {
                    Vue.set(this.wordDivs, i, this.currentWord[i]);
                }
                }

        },
        playAgain: function() {
            click.play();
            this.gameOver = true;
            setTimeout( () => this.restart(),1000);
        },
        restart: function () {
            this.lose = false;
            this.guesses = 15;
            this.wordDivs.splice(0);
            this.currentWord = this.words[randomInteger(0, this.words.length - 1)];
            this.makeBlanks();
            this.gameOver = false;
            this.image = "./images/ladybug.gif";
            this.message = "Guess my word:"

        },
        changeLang: function (newLang) {
            click.play();
            if (newLang == "Eng") {
                this.letters = this.lettersEn;
                this.words = this.wordsEn;
                this.lang = "Rus"
            }
            else {
                this.letters = this.lettersRu;
                this.words = this.wordsRu;
                this.lang = "Eng"
            }
            this.restart();
        }
    },

    mounted: function () {
        lang = "Eng";
        this.letters = this.lettersRu;
        this.words = this.wordsRu;
        this.restart()
        }

});
