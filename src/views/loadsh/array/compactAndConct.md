> 鲁迅说过：只有阅读过优秀库源码的人，才能配的上是真正的勇士。


## compact

> 创建一个新数组，包含原数组中所有的非假值元素。例如false, null,0, "", undefined, 和 NaN 都是被认为是“假值”。

注意以上的描述并不包括[],{}因为在js中，这个两个会进行隐式转换会把这两个值转换成为true。换句话来说该函数并不会去过滤这两个值。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210120094502809.png)
官方代码:
```javascript
export function compact(array){
	let resIndex = 0;
	const result = []
	if(array == null){ // 会把undefined给排除掉 因为 undefined == null 为true
		return result 
	}
	for(const value of array){
		if(value){
			result[resIndex++] = value
		}
	}
	return result 
}
```
个人理解代码:

```javascript
export function compact(array){
	let resIndex = 0;
	const result = []
	if(array == null){ // 会把undefined给排除掉 因为 undefined == null 为true
		return result 
	}
	result = array.filter(v=>Boolean(v))
	return result 
}
```
直接利用filter进行遍历，利用boolean，来对元素进行真假转换。

## concat

>创建一个新数组，将array与任何数组 或 值连接在一起。

```javascript
var array = [1];
var other = _.concat(array, 2, [3], [[4]]);
 
console.log(other);
// => [1, 2, 3, [4]]
 
console.log(array);
// => [1]
```

相对来说，concat函数所依赖的工具函数就多几个。

 1. [arrayPush](https://github.com/lodash/lodash/blob/ded9bc66583ed0b4e3b7dc906206d40757b4a90a/dist/lodash.js#L652)数组添加方法
 2. [copyArray](https://github.com/lodash/lodash/blob/ded9bc66583ed0b4e3b7dc906206d40757b4a90a/dist/lodash.js#L2933)拷贝数组元素
 3. [baseFlatten](https://github.com/lodash/lodash/blob/ded9bc66583ed0b4e3b7dc906206d40757b4a90a/dist/lodash.js#L2933)扁平层级数组

```javascript
export function concat(){
	
let length = arguments.length; // 获取参数的个数
      if (!length) {
        return [];
      }
      let args = Array(length - 1); // 取除了第一个参数以外的参数的长度
      let array = arguments[0]; // 取出数组的第一项
      let index = length;
      while (index--) {
        args[index - 1] = arguments[index];
      }
      console.log(args); // 把第一个参数也就是目标数组，当作-1项添加为array
      // 判断一个参数是否是数组，不是就把它转换成为数组，如果是数组则拷贝一份数组，再使用arrayPush方法，把每项的参数推进数组里面去。
      return arrayPush(Array.isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
}
```

## copyArray
拷贝数组，此操作不会影响到原有的数组。
|参数| 说明 |
|--|--|
| soure | 原数组参数 |
| array| 结果数组 |

```javascript
export function copyArray(source,array){
	let index = -1;
	let length = source.length;
	array || (array = Array(length));
	while(++index < length){
		array[index] = source[index]
	}
	return array
}
```

## baseFlatten
该方法主要用于扁平数组的操作

```javascript
export function baseFlatten(array, depth, predicate, isStrict, result) {
      let index = -1;
      let length = array.length;
      predicate || (predicate = isFlattenable); // isFlattenable 判断是否是数组
      result || (result = []);
      while (++index < length) {
        let value = array[index];
        console.log(value);
        if (depth > 0 && predicate(value)) { // 如果层级大于0并且该项是数组的话
          if (depth > 1) { // 如果需要递归的层级大于1的情况则继续递归下去解套
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else { // 如果需要递归的层级为1的情况,则把所有的项添加目标数组
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }
isFlattenable(value){
	return Array.isArray(value)
}
```
发散思考，该函数只要是通过depth变量，来控制筛选的层级，那么我希望实现扁平所有的数组，那应该怎么操作呢？

```javascript
function flattern(arr) {
      return arr.reduce((cur, next) => cur.concat(Array.isArray(next) ? flattern(next) : next), []);
    }
```

## arrayPush
添加元素进入原数组，会改变原数组结构，类似push方法

```javascript
	 let index = -1;
      let length = values.length;
      let offset = array.length;
      while (++index < length) {
        array[index + offset] = values[index];
      }
      return array;
```

## 总结

 1. ++index和index++不同之处，++i就是先加后用，i++就是先用后加。前置++下标不会越界，后置++下标越界。
 2. lodash库操作数组一般都不会影响原有数组。
