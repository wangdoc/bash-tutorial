# 数组

数组（array）是一个包含多个值的变量。成员的编号从0开始，数量没有上限。

## 创建数组

下面是创建数组的几种方法。

```bash
$ array[0] = val
$ array[1] = val
$ array[2] = val
$ array=([2]=val [0]=val [1]=val)
$ array(val val val)
```

读取指定位置的成员，要使用下面的语法。

```bash
$ echo ${array[i]}     # i 是索引
```

如果没有提供索引，默认使用`0`。

要想发现数组一共包含多少成员，使用下面的语法。

```bash
${#array[@]}
```

数组变量就像其它 bash 变量一样命名，当被访问的时候，它们会被自动地创建。

```bash
$ a[1]=foo
$ echo ${a[1]}
foo
```

上面代码中，第二个命令中使用花括号是必需的， 防止 shell 试图对数组元素名执行路径名展开。

也可以用 declare 命令创建一个数组。

```bash
$ declare -a a
```

使用 -a 选项，declare 命令的这个例子创建了数组 a。

## 数组赋值

有两种方式可以给数组赋值。单个值赋值使用以下语法：

```bash
name[subscript]=value
```

这里的 name 是数组的名字，subscript 是一个大于或等于零的整数（或算术表达式）。注意数组第一个元素的下标是0， 而不是1。数组元素的值可以是一个字符串或整数。

多个值赋值使用下面的语法。

```bash
name=(value1 value2 ...)
```

这里的 name 是数组的名字，value… 是要按照顺序赋给数组的值，从元素0开始。例如，如果我们希望 把星期几的英文简写赋值给数组 days，我们可以这样做。

```bash
$ days=(Sun Mon Tue Wed Thu Fri Sat)
```

还可以通过指定下标，把值赋给数组中的特定元素。

```bash
$ days=([0]=Sun [1]=Mon [2]=Tue [3]=Wed [4]=Thu [5]=Fri [6]=Sat)
```

## 数组操作

下标 * 和 @ 可以被用来访问数组中的每一个元素。与位置参数一样，@ 表示法在两者之中更有用处。

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
$ for i in "${animals[*]}"; do echo $i; done
a dog a cat a fish
$ for i in "${animals[@]}"; do echo $i; done
a dog
a cat
a fish
```

使用参数展开，我们能够确定数组元素的个数，与计算字符串长度的方式几乎相同。

```bash
$ a[100]=foo
$ echo ${#a[@]} # number of array elements
1
$ echo ${#a[100]} # length of element 100
3
```

尽管我们把字符串赋值给数组元素100， bash 仅仅报告数组中有一个元素。这不同于一些其它语言的行为，数组中未使用的元素（元素0-99）会初始化为空值， 并把它们计入数组长度。

因为 bash 允许赋值的数组下标包含 “间隔”，有时候确定哪个元素真正存在是很有用的。为做到这一点， 可以使用以下形式的参数展开：

```bash
${!array[*]}

${!array[@]}
```

这里的 array 是一个数组变量的名字。和其它使用符号 * 和 @ 的展开一样，用引号引起来的 @ 格式是最有用的， 因为它能展开成分离的词。

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

删除一个数组，使用 unset 命令。

```bash
$ foo=(a b c d e f)
$ echo ${foo[@]}
a b c d e f
$ unset 'foo[2]'
$ echo ${foo[@]}
a b d e f
```

在这个例子中，我们删除了数组中的第三个元素，下标为2。记住，数组下标开始于0，而不是1！也要注意数组元素必须 用引号引起来为的是防止 shell 执行路径名展开操作。

任何引用一个不带下标的数组变量，则指的是数组元素0：

```bash
$ foo=(a b c d e f)
$ echo ${foo[@]}
a b c d e f
$ foo=A
$ echo ${foo[@]}
A b c d e f
```

给一个数组赋空值不会清空数组内容：

```bash
$ foo=(a b c d e f)
$ foo=
$ echo ${foo[@]}
b c d e f
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
