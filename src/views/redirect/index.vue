<script>
export default {
  created () {
    console.log(2312);
    const { params, query } = this.$route;
    console.log(params);
    console.log(query);
    const { path } = params;
    this.$router.replace({
      path: "/" + path, query
    });
  },
  render: function (h) {
    return h();
  }
};
</script>