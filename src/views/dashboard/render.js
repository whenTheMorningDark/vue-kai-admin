export default {
  render (h) {
    const dataObject = {
      attrs: {},
      props: {},
      on: {},
      style: {
        color: "red",
        fontSize: 20
      }
    };
    console.log(this);
    return h("div", dataObject, [h("span", this.title)]);
  },
  props: ["title"]
};