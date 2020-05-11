<template>
  <div>
    <el-button
      type="primary"
      @click="handleLogin"
    >
      登录
    </el-button>
  </div>
</template>
<script>

export default {
  /* eslint-disable vue/name-property-casing */
  /* eslint-disable space-before-function-paren */

  name: "login",
  data () {
    return {
      loginForm: {
        username: "admin",
        password: "111111"
      }
    };
  },
  methods: {
    // async handleLogin () {
    //   const data = await this.$store.dispatch('user/login', this.loginForm)
    //   console.log(data)
    //   console.log('asddsa')
    // }
    handleLogin () {
      this.$store.dispatch("user/login", this.loginForm)
        .then(() => {
          this.$router.push({
            path: "/"
          });
        });
    }
  }
};
</script>
