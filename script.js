Vue.component("letter-button", {
    props: ["letter", "game-over"],
    template: "<button class='keyboard-row-letter' :id='letter' :disabled='disabled' @click='clicked()'>{{ letter }}</button>",
    data: function() {
        return {
            disabled: false
        };
    },
    methods: {
        clicked: function() {
            this.disabled = true;
            this.$emit("check");
        }
    },
    watch: {
        gameOver: function(newValue) {
            this.disabled = newValue;
        }
    }
})

var game = new Vue({
    el: '#game',
    data: {letters: [
            ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
            ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
            ["Z", "X", "C", "V", "B", "N", "M"]
        ],
        // words to choose from
        words: [
            "BUTTERCUP",
            "TANSY",
            "PIGEON",
            "REPTILE",
            "HAWK",
            "CAPYBARA",
            "DELICATE",
            "OFFICIAL",
            "ALIMONY",
            "GRANOLA",
            "IMPERATIVE",
            "DELICIOUS",
            "ANTICIPATION",
            "APPLE",
            "BANANA",
            "BILIOUS",
            "INTESTINE",
            "AMPLIFY"
        ],
        // currentWord will be set to a random word from above list
        currentWord: "",
        // each element in this array is a letter in the word
        wordDivs: [],
        // to count the number of wrong guesses
        guesses: 0,
        gameOver: false,
        lose: false

    }

})
