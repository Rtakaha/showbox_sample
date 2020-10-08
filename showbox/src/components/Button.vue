<template>
  <div id="btn">
    <v-btn
      @click="click"
      color="#0D3B66"
      elevation="4"
      outlined
      link :ripple="{ center: false, class: 'teal--text' }"
      rounded
      text
    >
      {{ text }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      default: "テキスト"
    }
  },
  methods: {
    click(value) {
      console.log("click",value.target.innerText)
      // ユーザー削除ボタンが押されたときの処理
      this.$emit("btn-event");
    }
  }
}
</script>

<style>
#btn {
  margin:10px;
}
</style>
