<template>
  <div class="container">
    <div class="cover">
      <div class="autoIconLayout">
        <div class="iconComponent" v-for="icon in iconList" v-bind:key="icon.sort" @click="showUrl">
          <div class="icon"></div>
          <div class="iconName">
            <div class="iconText">{{ icon.title }}</div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="footerLeft"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      iconList: [
        {id: 0, icon: "../assets/imgs/icons/add.png", title: "阿里云", url: "", sort: 1, type: 0},
      ]
    }
  },
  methods: {
    showUrl() {
      this.$api
          .post("/icon/list", {})
          .then(function (response) {
            this.iconList = response
            console.log(this.iconList)
          })
          .catch(function (error) {
            console.log(error)
          });
    }
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  background-image: url('../assets/imgs/background/fallout4.jpg');
}

.cover {
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
}

.iconComponent {
  width: 120px;
  height: 156px;
  flex-grow: 0;
  margin: 32px;
}

.autoIconLayout {
  display: flex;
  padding: 0;
  justify-content: start;
  flex-flow: row wrap;
  align-content: start;

  position: absolute;
  width: 1288px;
  height: 660px;
  left: 348px;
  top: 131px;
}

.icon {
  height: 120px;
  width: 120px;

  background-size: contain;
  border-radius: 20px;

  background-image: url("../assets/imgs/icons/add.png");
  cursor: pointer;
}

.iconName {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 3px 14px;
}

.iconText {
  font-family: "Rounded Mplus 1c Bold", Helvetica, Arial, monospace;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  text-align: center;

  color: #FFFFFF;
}
</style>
