new Vue({
  el: '#game',
  data: {
    
  },
  computed: {
    }
  },
  methods: {
    
  }
})

Vue.component("letter-button", {
  props: ["letter", "game-over"],
  template: "<button class='keyboard-row-letter' :id='letter' :disabled='disabled' @click='clicked()'>{{letter}}</button>",
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