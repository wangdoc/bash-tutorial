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

如果读取数组成员时，没有读取指定哪一个位置的成员，默认使用`0`号位置。

```bash
$ foo=(a b c d e f)
$ echo ${foo[@]}
a b c d e f
$ foo=A
$ echo ${foo[@]}
A b c d e f
```

上面例子中，`foo`是一个数组，直接赋值的话，实际上是给`foo[0]`赋值。

```bash
$ ARRAY=(one two three)

$ echo ${ARRAY[2]}
three

$ echo ${ARRAY[*]}
one two three

$ echo $ARRAY[*]
one[*]

$ ARRAY[3]=four

$ echo ${ARRAY[*]}
one two three four
```

上面例子中，`${ARRAY[*]}`可以扩展成数组的所有成员。然后，为数组添加成员也是使用`ARRAYNAME[indexnumber]=value`的语法。

任何引用一个不带下标的数组变量，则指的是数组元素0：

要想发现数组一共包含多少成员，使用下面的语法，两种写法都可以。

```bash
${#array[*]}
${#array[@]}
```

下面是一个例子。

```bash
$ a[100]=foo

$ echo ${#a[@]}
1

```

上面例子中，尽管我们把字符串赋值给数组元素100， Bash 仅仅报告数组中有一个元素。

## 数组操作

位置参数可以用`*`和`@`表示，它们会扩展成数组的每一个元素。

```bash
$ animals=("a dog" "a cat" "a fish")

$ for i in ${animals[*]}; do echo $i; done
a
dog
a
cat
a
fish

$ for i in ${animals[@]}; do echo $i; done
a
dog
a
cat
a
fish
```

上面例子中，`${animals[*]`和`${animals[@]}`会扩展成数组的所有成员`a dog a cat a fish`。

```bash
$ for i in "${animals[*]}"; do echo $i; done
a dog a cat a fish

$ for i in "${animals[@]}"; do echo $i; done
a dog
a cat
a fish
```

因为 bash 允许赋值的数组下标包含 “间隔”，有时候确定哪个元素真正存在是很有用的。为做到这一点， 可以使用以下形式的参数展开。

```bash
${!array[*]}

${!array[@]}
```

上面语法中，`array`是一个数组变量的名字。和其它使用符号 * 和 @ 的展开一样，用引号引起来的 @ 格式是最有用的， 因为它能展开成分离的词。

```bash
$ foo=([2]=a [4]=b [6]=c)

$ for i in "${foo[@]}"; do echo $i; done
a
b
c
$ for i in "${!foo[@]}"; do echo $i; done
2
4
6
```

如果我们需要在数组末尾附加数据，那么知道数组中元素的个数是没用的，因为通过 * 和 @ 表示法返回的数值不能 告诉我们使用的最大数组索引。幸运地是，shell 为我们提供了一种解决方案。通过使用 += 赋值运算符， 我们能够自动地把值附加到数组末尾。这里，我们把三个值赋给数组 foo，然后附加另外三个。

```bash
$ foo=(a b c)
$ echo ${foo[@]}
a b c
$ foo+=(d e f)
$ echo ${foo[@]}
a b c d e f
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

现在最新的 bash 版本支持关联数组了。关联数组使用字符串而不是整数作为数组索引。 这种功能给出了一种有趣的新方法来管理数据。

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
