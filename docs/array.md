# 数组

数组（array）是一个包含多个值的变量。成员的编号从0开始，数量没有上限，也没有要求成员被连续索引。

## 创建数组

数组可以采用逐个赋值的方法创建。

```bash
ARRAY[INDEX]=value
```

上面语法中，`ARRAY`是数组的名字，可以是任意合法的变量名。`INDEX`是一个大于或等于零的整数，也可以是算术表达式。注意数组第一个元素的下标是0， 而不是1。

下面创建一个三个成员的数组。

```bash
$ array[0]=val
$ array[1]=val
$ array[2]=val
```

先用`declare -a`命令声明一个数组，也是可以的。

```bash
$ declare -a ARRAYNAME
```

数组也可以采用一次性赋值的方式创建。

```bash
ARRAY=(value1 value2 ... valueN)
```

采用上面方式创建数组时，可以按照默认顺序赋值，也可以在每个值前面指定位置。

```bash
$ array(a b c)
$ array=([2]=c [0]=a [1]=b)

$ days=(Sun Mon Tue Wed Thu Fri Sat)
$ days=([0]=Sun [1]=Mon [2]=Tue [3]=Wed [4]=Thu [5]=Fri [6]=Sat)
```

只为某些值指定位置，也是可以的。

```bash
names=(hatter [5]=duchess alice)
```

上面例子中，`hatter`是数组的0号位置，`duchess`是5号位置，`alice`是6号位置。

没有赋值的数组元素是不存在的，默认值是空字符串。

在数组末尾附加数据，可以使用`+=`赋值运算符，能够自动地把值附加到数组末尾。否则，还需要知道数组的最大位置，这就比较麻烦。

```bash
$ foo=(a b c)
$ echo ${foo[@]}
a b c

$ foo+=(d e f)
$ echo ${foo[@]}
a b c d e f
```

## 读取数组

读取数组指定位置的成员，要使用下面的语法。

```bash
$ echo ${array[i]}     # i 是索引
```

上面语法里面的大括号是必不可少的，否则 Bash 会把索引部分`[i]`按照原样输出。

```bash
$ array[0]=a

$ echo ${array[0]}
a

$ echo $array[0]
a[0]
```

上面例子中，数组的第一个元素是`a`。如果不加大括号，Bash 会直接读取`$array`的值，然后将`[0]`按照原样输出。

`@`和`*`是数组的特殊索引，表示返回数组的所有成员。

```bash
$ foo=(a b c d e f)
$ echo ${foo[@]}
a b c d e f
```

`for`循环可以遍历数组。

```bash
for i in "${names[@]}"; do
  echo $i
done
```

如果读取数组成员时，没有读取指定哪一个位置的成员，默认使用`0`号位置。

```bash
$ foo=(a b c d e f)
$ foo=A
$ echo ${foo[0]}
A
```

上面例子中，`foo`是一个数组，赋值的时候不指定位置，实际上是给`foo[0]`赋值。

引用一个不带下标的数组变量，则指的是`0`号位置的数组元素。

```bash
$ foo=(a b c d e f)
$ echo ${foo}
a
$ echo $foo
a
```

上面例子中，引用数组元素的时候，没有指定位置，结果返回的是`0`号位置。

要想直到数组一共包含多少成员，可以使用下面两种语法。

```bash
${#array[*]}
${#array[@]}
```

下面是一个例子。

```bash
$ a[100]=foo

$ echo ${#a[*]}
1

$ echo ${#a[@]}
1
```

上面例子中，把字符串赋值给`100`位置的数组元素，这时的数组只有一个元素。

`${!array[@]}`或`${!array[*]}`，可以返回数组的哪些位置是有值的。

```bash
$ arr=([5]=a [9]=b [23]=c)
$ echo ${!arr[@]}
5 9 23
$ echo ${!arr[@*]}
5 9 23
```

上面例子中，数组的5、9、23号位置有值。

利用这个语法，也可以通过`for`循环遍历数组。

```bash
arr=(a b c d)

for i in ${!arr[@]};do
  echo ${arr[i]}
done
```

## 删除数组

删除一个数组成员，使用`unset`命令。

```bash
$ foo=(a b c d e f)
$ echo ${foo[@]}
a b c d e f

$ unset 'foo[2]'
$ echo ${foo[@]}
a b d e f
```

上面例子中，删除了数组中的第三个元素，下标为2。

如果想删除一个成员，也可以将这个成员设为空值。

```bash
$ foo=(a b c d e f)
$ foo=
$ echo ${foo[@]}
b c d e f
```

`unset ArrayName`可以清空整个数组。

```bash
$ unset ARRAY

$ echo ${ARRAY[*]}
<--no output-->
```

## 关联数组

Bash 的新版本支持关联数组。关联数组使用字符串而不是整数作为数组索引。

`declare -A`可以声明关联数组。

```bash
declare -A colors
colors["red"]="#ff0000"
colors["green"]="#00ff00"
colors["blue"]="#0000ff"
```

不同于整数索引的数组，仅仅引用它们就能创建数组，关联数组必须用带有 -A 选项的 declare 命令创建。

访问关联数组元素的方式几乎与整数索引数组相同：

```bash
echo ${colors["blue"]}
```

