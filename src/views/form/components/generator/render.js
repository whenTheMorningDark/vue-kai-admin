/* eslint-disable require-jsdoc */
export function makeMap(str, expectsLowerCase) {
  const map = Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ?
    val => map[val.toLowerCase()] :
    val => map[val];
}

// 参考https://github.com/vuejs/vue/blob/v2.6.10/src/platforms/web/server/util.js
const isAttr = makeMap(
  "accept,accept-charset,accesskey,action,align,alt,async,autocomplete," +
  "autofocus,autoplay,autosave,bgcolor,border,buffered,challenge,charset," +
  "checked,cite,class,code,codebase,color,cols,colspan,content,http-equiv," +
  "name,contenteditable,contextmenu,controls,coords,data,datetime,default," +
  "defer,dir,dirname,disabled,download,draggable,dropzone,enctype,method,for," +
  "form,formaction,headers,height,hidden,high,href,hreflang,http-equiv," +
  "icon,id,ismap,itemprop,keytype,kind,label,lang,language,list,loop,low," +
  "manifest,max,maxlength,media,method,GET,POST,min,multiple,email,file," +
  "muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster," +
  "preload,radiogroup,readonly,rel,required,reversed,rows,rowspan,sandbox," +
  "scope,scoped,seamless,selected,shape,size,type,text,password,sizes,span," +
  "spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex," +
  "target,title,type,usemap,value,width,wrap"
);

function vModel(self, dataObject, defaultValue) {
  dataObject.props.value = defaultValue;

  dataObject.on.input = val => {
    self.$emit("input", val);
  };
}
export default {
  render(h) {
    const dataObject = {
      attrs: {},
      props: {},
      on: {},
      style: {}
    };
    const children = [];
    const confClone = JSON.parse(JSON.stringify(this.conf));
    Object.keys(confClone).forEach(key => {
      // console.log(isAttr(key));
      const val = confClone[key];
      if (key === "__vModel__") {
        vModel(this, dataObject, confClone.__config__.defaultValue);
      } else if (isAttr(key)) {
        dataObject.attrs[key] = val;
      }
    });
    return h(this.conf.__config__.tag, dataObject, children);
  },
  props: ["conf"]
};