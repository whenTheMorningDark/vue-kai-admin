> 鲁迅说过：只有阅读过优秀库源码的人，才能配的上是真正的勇士。

**作用和用法**

> 将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。 如果 array
> 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。

用法：

> \_.chunk(array, [size=1])
> array (Array): 需要处理的数组
> [size=1](number): 每个数组区块的长度

demo:

```javascript
_.chunk(['a', 'b', 'c', 'd'], 2)
// => [['a', 'b'], ['c', 'd']]

_.chunk(['a', 'b', 'c', 'd'], 3)
// => [['a', 'b', 'c'], ['d']]
```

**源码分析**
chunk 所依赖的函数分别有 1.[toNumber.js](https://github.com/lodash/lodash/blob/e0029485ab4d97adea0cb34292afb6700309cf16/toNumber.js#L44) 2.[toFinite](https://github.com/lodash/lodash/blob/e0029485ab4d97adea0cb34292afb6700309cf16/toFinite.js#L28) 3.[toInteger](https://github.com/lodash/lodash/blob/e0029485ab4d97adea0cb34292afb6700309cf16/toInteger.js#L28) 4.[slice](https://github.com/lodash/lodash/blob/e0029485ab4d97adea0cb34292afb6700309cf16/slice.js#L21) 5.[chunk](https://github.com/lodash/lodash/blob/master/chunk.js)

那么我们就逐一来分析每个函数的具体实现过程。

**1.isObject**

顾名思义，这个函数是用来判断传递的参数是否是对象类型，值得一提的是在 js 中，你用 typeof null 出来的结果为 object，这种情况我们需要排除掉。
知识点:

1.  typeof null 的值为 object
2.  typeof function 的值为 function

```javascript
* isObject({})
 * // => true
 *
 * isObject([1, 2, 3])
 * // => true
 *
 * isObject(Function)
 * // => true
 *
 * isObject(null)
 * // => false
```

```javascript
function isObject(value) {
  const type = typeof value
  return value !== null && (type === 'object' || type === 'function')
}
```

**2.toNumber**

这个函数所作的主要功能为把你所传递参数，以 number 类型返回。

```javascript
 * toNumber(3.2)
 * // => 3.2
 *
 * toNumber(Number.MIN_VALUE)
 * // => 5e-324
 *
 * toNumber(Infinity)
 * // => Infinity
 *
 * toNumber('3.2')
 * // => 3.2
```

```javascript
const NAN = 0 / 0
// 用来匹配前后两个空格
const reTrim = /^\s+|\s+$/g
// 用来检测二进制的数字 i 不区分(ignore)大小写；
const reIsBinary = /^0b[01]+$/i
// 用来检测八进制的数字 i 不区分(ignore)大小写；
const reIsOctal = /^0o[0-7]+$/i
// 用来检测错误的16进制的数字 i 不区分(ignore)大小写；
const reIsBadHex = /^[-+]0x[0-9a-f]+$/i

const freeParseInt = parseInt
function toNumber(value){
	if(typeof === "number"){
		return value
	}
	if(isSymbol(value)){
		return NAN
	}
	if(isObject(value)){
		// 把function,arr类型都有valueOf方法 null,undefine是没有
		const other = typeof value.valueOf === 'function' ? value.valueOf() : value
		// 把function类型变成字符串
    	value = isObject(other) ? `${other}` : other
	}
	// 判断null的情况
	if(typeof value !=="string"){
		return value===0?value:+value // 隐式转换 +null ===0
	}
	value = value.replace(reTrim, '') // 替换前后两个空格

	// 如果是十进制的数字 直接+value 返回
	const isBinary = reIsBinary.test(value)
	  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value)
}

function isSymbol(value){ // 判断是否是symbol类型
	const type = typeof value
  return type == 'symbol' || (type === 'object' && value != null && getTag(value) == '[object Symbol]')
}
```

知识点:

1.  valueof--- 除了 null 和 undefine 没有 valueof 方法之外，其它的基本数据类型都有
2.  js 隐式转换

**3.toFinite**

这个函数是把 number 类型的数字转换成为有限的数字

```javascript
const INFINITY = 1 / 0
const MAX_INTEGER = 1.7976931348623157e308
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0
  }
  value = toNumber(value)
  if (value === INFINITY || value === -INFINITY) {
    // 转换成为无穷大或者，无穷小
    const sign = value < 0 ? -1 : 1
    return sign * MAX_INTEGER
  }
  return value === value ? value : 0 // 如果是NaN === NaN 则为false 此时的值为0
}
```

**4.toInteger**

这个函数是把输入的 value 转换成为整数

```javascript
* toInteger(3.2)
 * // => 3
 *
 * toInteger(Number.MIN_VALUE)
 * // => 0
 *
 * toInteger(Infinity)
 * // => 1.7976931348623157e+308
 *
 * toInteger('3.2')
 * // => 3
 */
```

```javascript
function toInteger(value) {
  // 这个地方既然是取整，为什么不用math.floor()?,而且 3.2 % 1出来的结果是0.20000000000000018，精度也会不准
  const result = toFinite(value)
  const remainder = result % 1

  return remainder ? result - remainder : result
}
```

**5.slice**

example

```javascript
var array = [1, 2, 3, 4]
_.slice(array, 2)
// => [3, 4]
```

这个函数是用于切割数组，

1.  第一个参数为切割的数组，
2.  第二个参数则是切割的起始值 begin
3.  第三个参数则是切割的终止地址，切割的个数为 end - begin 个数。

```javascript
let length = array == null ? 0 : array.length
if (!length) {
  return []
}
start = start == null ? 0 : start
end = end === undefined ? length : end

if (start < 0) {
  start = -start > length ? 0 : length + start
}
end = end > length ? length : end
if (end < 0) {
  end += length
}
length = start > end ? 0 : (end - start) >>> 0
start >>>= 0

let index = -1
const result = new Array(length)
while (++index < length) {
  result[index] = array[index + start]
}
return result
```

知识点:
`>>>`
1 所有非数值转换成 0 2.所有大于等于 0 等数取整数部分

**6.chunk**

剩下来的这个函数就比较简单了，

```javascript
function chunk(array, size = 1) {
  size = Math.max(toInteger(size), 0)
  // undefine == null 为 true undefine === null false
  const length = array == null ? 0 : array.length
  if (!length || size < 1) {
    return []
  }
  let index = 0
  let resIndex = 0
  const result = new Array(Math.ceil(length / size)) // 向上取整获取最大的数组数

  while (index < length) {
    result[resIndex++] = slice(array, index, (index += size))
    // 这两个是一样的意思
    // result[resIndex] = slice(array, index, (index += size))
    // resIndex++
  }
  return result
}
```
