<template>
  <div class="container">
    <div class="cover">
      <mac></mac>
      <div class="leftBar"></div>
      <div class="autoIconLayout">
        <div class="iconComponent" v-for="icon in iconList" v-bind:key="icon.sort">
          <div class="icon" :style="{backgroundImage:'url('+icon.icon+')'}"></div>
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
import Login from "@/components/Login";
import Mac from "@/components/test/Mac";

export default {
  name: 'HelloWorld',
  components: {Login, Mac},
  props: {
    msg: String
  },
  data() {
    return {
      iconList: [
        {id: 0, icon: "", title: "阿里云", url: "", sort: 1, type: 0},
      ],
    }
  },
  mounted() {
    this.$api
        .post("/icon/listDefault", {})
        .then((response) => {
          this.iconList = response.data.data
        })
        .catch(function (error) {
          console.log(error)
        });
  },
  methods: {}
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

.leftBar {
  width: 50px;
  height: 100%;
  opacity: 0;
  transition-delay: 0s;
  transition-duration: 0.5s;
  transition-property: all;
  transition-timing-function: ease;
}

.leftBar:hover {
  opacity: 10%;
  background: #F3904F; /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #3B4371, #000000); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #3B4371, #000000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

</style>
