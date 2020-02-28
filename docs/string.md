# 字符串操作

## 字符串的长度

获取字符串长度的语法如下。

```bash
${#varname}
```

下面是一个例子。

```bash
$ path=/home/cam/book/long.file.name
$ echo ${#path}
29
```

## 返回子字符串

Bash 返回一个字符串的子串，语法如下。

```bash
${varname:offset:length}
```

上面语法的含义是返回`$varname`的子字符串，从位置`offset`开始（以`0`作为基点），长度为`length`。

```bash
$ count=frogfootman
$ echo ${count:4:4}
foot
```

上面例子返回字符串`frogfootman`从4号位置开始的长度为4的子字符串。

如果省略`length`，则从位置`offset`开始，一直返回到字符串的结尾。

```bash
$ count=frogfootman
$ echo ${count:4}
footman
```

上面例子是返回变量`count`从4号位置一直到结尾的子字符串。

如果`offset`为负值，表示从字符串的末尾开始算起。注意，负数前面必须有一个空格， 以防止与`${variable:-word}`的变量设置默认值的形式混淆。这时，如果还指定`length`，则`length`不能小于零。

```bash
$ foo="This string is long."
$ echo ${foo: -5}
long.
$ echo ${foo: -5:2}
lo
```

上面例子中，`offset`为`-5`，表示从倒数第5个字符开始截取，所以返回`long.`。如果指定长度为`2`，则返回`lo`。

## 字符串的处理

Bash 提供字符串处理的多种方法。

**（1）删除开头的匹配。**

以下语法可以删除字符串开头匹配的部分，但不会改变原始变量。匹配模式可以使用`*`、`?`、`[]`等通配符。

```bash
# 如果 pattern 匹配变量 variable 的开头，
# 删除最短匹配（非贪婪匹配）的部分，返回剩余部分
${variable#pattern}

# 如果 pattern 匹配变量 variable 的开头，
# 删除最长匹配（贪婪匹配）的部分，返回剩余部分
${variable##pattern}
```

上面两种语法会删除变量字符串开头的匹配部分，返回剩下的部分。区别是一个是最短匹配（又称非贪婪匹配），另一个是最长匹配（又称贪婪匹配）。

下面是一个例子。

```bash
$ path=/home/cam/book/long.file.name

$ echo ${path#/*/}
cam/book/long.file.name

$ echo ${path##/*/}
long.file.name
```

上面例子中，匹配模式是`/*/`，其中`*`可以匹配任意的多个字符，所以最短匹配是`/home/`，最长匹配是`/home/cam/book/`。

下面写法可以删除文件路径的目录部分，只留下文件名。

```bash
$ path=/home/cam/book/long.file.name

$ echo ${path##*/}
long.file.name
```

上面例子中，模式`*/`匹配目录部分，所以只返回文件名。

**（2）删除结尾的匹配。**

以下语法可以删除字符串结尾匹配的部分，但不会改变原始变量。

```bash
# 如果 pattern 匹配变量 variable 的结尾，
# 删除最短匹配（非贪婪匹配）的部分，返回剩余部分
${variable%pattern}

# 如果 pattern 匹配变量 variable 的结尾，
# 删除最长匹配（贪婪匹配）的部分，返回剩余部分
${variable%%pattern}
```

上面两种语法会删除变量字符串结尾的匹配部分，返回剩下的部分。区别是一个是最短匹配（又称非贪婪匹配），另一个是最长匹配（又称贪婪匹配）。

下面是一个例子。

```bash
$ path=/home/cam/book/long.file.name

$ echo ${path%.*}
/home/cam/book/long.file

$ echo ${path%%.*}
/home/cam/book/long
```

上面例子中，匹配模式是`.*`，其中`*`可以匹配任意的多个字符，所以最短匹配是`.name`，最长匹配是`.file.name`。

下面写法可以删除文件路径的文件名部分，只留下目录部分。

```bash
$ path=/home/cam/book/long.file.name

$ echo ${path%/*}
/home/cam/book
```

上面例子中，模式`/*`匹配文件名部分，所以只返回目录部分。

下面的写法可以替换文件的后缀名。

```bash
$ file=foo.png
$ echo ${file%.png}.jpg
foo.jpg
```

上面的例子将文件的后缀名，从`.png`改成了`.jpg`。

**（3）替换子串。**

以下语法可以将字符串的最长匹配（贪婪匹配），换成其他的字符串返回，但不会改变原始变量。

```bash
# 如果 pattern 匹配变量 variable 的一部分，
# 最长匹配（贪婪匹配）的那部分被 string 替换，但仅替换第一个匹配
${variable/pattern/string}

# 如果 pattern 匹配变量 variable 的一部分，
# 最长匹配（贪婪匹配）的那部分被 string 替换，所有匹配都替换
${variable//pattern/string}
```

上面两种语法都是最长匹配（贪婪匹配）下的替换，区别是前一个语法仅仅替换第一个匹配，后一个语法替换所有匹配。

下面是一个例子。

```bash
$ path=/home/cam/foo/foo.name

$ echo ${path/foo/bar}
/home/cam/bar/foo.name

$ echo ${path//foo/bar}
/home/cam/bar/bar.name
```

上面例子中，前一个命令只替换了第一个`foo`，后一个命令将两个`foo`都替换了。

下面的例子将分隔符从`:`换成换行符。

```bash
$ echo -e ${PATH//:/'\n'}
```

上面例子中，`echo`命令的`-e`参数，表示将替换后的字符串的`\n`字符，解释为换行符。

如果省略了`string`部分，那么就相当于匹配的部分替换成空字符串，即删除匹配的部分。

```bash
$ path=/home/cam/foo/foo.name

$ echo ${path/.*/}
/home/cam/foo/foo
```

上面例子中，第二个斜杠后面的`string`部分省略了，所以模式`.*`匹配的部分`.name`被删除后返回。

这个语法还有两种扩展形式。

```bash
# 模式必须出现在字符串的开头
${variable/#pattern/string}

# 模式必须出现在字符串的结尾
${variable/%pattern/string}
```

下面是一个例子。

```bash
$ foo=JPG.JPG
$ echo ${foo/JPG/jpg}
jpg.JPG
$ echo ${foo//JPG/jpg}
jpg.jpg
$ echo ${foo/#JPG/jpg}
jpg.JPG
$ echo ${foo/%JPG/jpg}
JPG.jpg
```

## declare

`declare`命令可以用来把字符串规范成大写或小写字符。使用 declare 命令，我们能强制一个 变量总是包含所需的格式，无论如何赋值给它。

```bash
#!/bin/bash
# ul-declare: demonstrate case conversion via declare
declare -u upper
declare -l lower
if [[ $1 ]]; then
    upper="$1"
    lower="$1"
    echo $upper
    echo $lower
fi
```

在上面的脚本中，我们使用 declare 命令来创建两个变量，upper 和 lower。我们把第一个命令行参数的值（位置参数1）赋给 每一个变量，然后把变量值在屏幕上显示出来。

```bash
$ ul-declare aBc
ABC
abc
```

有四个参数展开，可以执行大小写转换操作。

- `${parameter,,}`	把 parameter 的值全部展开成小写字母。
- `${parameter,}`	仅仅把 parameter 的第一个字符展开成小写字母。
- `${parameter^^}`	把 parameter 的值全部转换成大写字母。
- `${parameter^}`	仅仅把 parameter 的第一个字符转换成大写字母（首字母大写）。

```bash
#!/bin/bash
# ul-param - demonstrate case conversion via parameter expansion
if [[ $1 ]]; then
    echo ${1,,}
    echo ${1,}
    echo ${1^^}
    echo ${1^}
fi
```

下面是脚本运行结果。

```bash
$ ul-param aBc
abc
aBc
ABC
ABc
```

## 算数求值

```bash
$((expression))
```

这里的 expression 是一个有效的算术表达式。

`(( ))`命令把结果映射成 shell 正常的退出码

```bash
$ if ((1)); then echo "true"; else echo "false"; fi
true
$ if ((0)); then echo "true"; else echo "false"; fi
false
```

## 数值的进制

- number	默认情况下，没有任何表示法的数字被看做是十进制数（以10为底）。
- 0number	在算术表达式中，以零开头的数字被认为是八进制数。
- 0xnumber	十六进制表示法
- base#number	number 以 base 为底

下面是一些例子。

```bash
$ echo $((0xff))
255
$ echo $((2#11111111))
255
```

## 算术运算符

- +	加
- -	减
- *	乘
- /	整除
- **	乘方
- %	取模（余数）

因为 shell 算术只操作整形，所以除法运算的结果总是整数：

```bash
$ echo $(( 5 / 2 ))
2
```

这使得确定除法运算的余数更为重要。

```bash
$ echo $(( 5 % 2 ))
1
```

算术表达式可能执行赋值运算。

```bash
$ foo=
$ echo $foo
$ if (( foo = 5 ));then echo "It is true."; fi
It is true.
$ echo $foo
5
```

复合命令`(( foo = 5 ))`完成两件事情：1）它把5赋值给变量 foo，2）它计算测试条件为真，因为 foo 的值非零。

- `parameter = value`	简单赋值。给 parameter 赋值。
- `parameter += value`	加。等价于 parameter = parameter + value。
- `parameter -= value`	减。等价于 parameter = parameter – value。
- `parameter *= value`	乘。等价于 parameter = parameter * value。
- `parameter /= value`	整除。等价于 parameter = parameter / value。
- `parameter %= value`	取模。等价于 parameter = parameter % value。
- `parameter++`	后缀自增变量。等价于 parameter = parameter + 1 (但，要看下面的讨论)。
- `parameter--`	后缀自减变量。等价于 parameter = parameter - 1。
- `++parameter`	前缀自增变量。等价于 parameter = parameter + 1。
- `--parameter`	前缀自减变量。等价于 parameter = parameter - 1。

自增和自减运算符可能会出现在参数的前面或者后面。然而它们都是把参数值加1或减1，这两个位置有个微小的差异。 若运算符放置在参数的前面，参数值会在参数返回之前增加（或减少）。若放置在后面，则运算会在参数返回之后执行。

```bash
$ foo=1
$ echo $((foo++))
1
$ echo $foo
2

$ foo=1
$ echo $((++foo))
2
$ echo $foo
2
```

脚本中数值的精确计算，可以执行bc命令。

```bash
$ bc <<< "2+2"
4
```

## 位运算符

- ~	按位取反。对一个数字所有位取反。
- <<	位左移. 把一个数字的所有位向左移动。
- >>	位右移. 把一个数字的所有位向右移动。
- &	位与。对两个数字的所有位执行一个 AND 操作。
- |	位或。对两个数字的所有位执行一个 OR 操作。
- ^	位异或。对两个数字的所有位执行一个异或操作。

注意除了按位取反运算符之外，其它所有位运算符都有相对应的赋值运算符（例如，<<=）。

下面是左移运算符的例子。

```bash
$ for ((i=0;i<8;++i)); do echo $((1<<i)); done
1
2
4
8
16
32
64
128
```

## 逻辑运算符

- <=	小于或相等
- >=	大于或相等
- <	小于
- >	大于
- ==	相等
- !=	不相等
- &&	逻辑与
- ||	逻辑或
- expr1?expr2:expr3	条件（三元）运算符。若表达式 expr1 的计算结果为非零值（算术真），则 执行表达式 expr2，否则执行表达式 expr3。

三元运算符执行一个单独的逻辑测试。 它用起来类似于 if/then/else 语句。它操作三个算术表达式（字符串不会起作用），并且若第一个表达式为真（或非零）， 则执行第二个表达式。否则，执行第三个表达式。

```bash
$ a=0
$ ((a<1?++a:--a))
$ echo $a
1
$ ((a<1?++a:--a))
$ echo $a
0
```

如果在表达式内部赋值，可以放在圆括号中，否则会报错。

```bash
$ ((a<1?(a+=1):(a-=1)))
```

## 本地变量

本地变量是只有当前脚本可以使用的变量，`set`命令可以显示所有本地变量。

```bash
$ set
```

`unset`命令用于删除变量。

```bash
x=2
echo $x
unset x
echo $x
```

上面代码只会输出一个2。

- `-v` 确保删除变量定义，同名的函数会保留
- `-f` 删除函数定义

没有`-f`和`-v`时，如果存在该变量，则删除该变量；否则就删除同名函数。

Bash默认将未定义变量处理为空值。那么，为什么要删除一个变量，而不是将它设为空值呢？因为Bash发现引用未定义变量，会报错。`set -u`命令会使得未定义变量会报错，`set +u`会关闭未定义警告。

```bash
$ set -u
$ VAR1=var1
$ echo $VAR1
var1
$ unset VAR1
$ echo $VAR1
bash: VAR1: unbound variable
$ VAR1=
$ echo $VAR1

$ unset VAR1
$ echo $VAR1
bash: VAR1: unbound variable
$ unset -v VAR1
$ set +u
$ echo $VAR1

```

## declare 命令

`declare`命令用来为声明变量，提供更多的限制。

```bash
declare OPTION(s) VARIABLE=value
```

- `-a` 变量是一个数组。
- `-f` 仅使用函数名称。
- `-i` 该变量将被视为整数；给变量赋值时执行算术评估。
- `-p`：显示每个变量的属性和值。使用-p时，将忽略其他选项。
- `-r`：使变量为只读。然后，这些变量不能被后续的赋值语句赋值，也不能被取消设置。
- `-t`：给每个变量跟踪属性。
- `-X`：标记每个变量以通过环境导出到后续命令。

```bash
$ declare -i VARIABLE=12
$ VARIABLE=string
$ echo $VARIABLE
0
$ declare -p VARIABLE
declare -i VARIABLE="0"
```

## readonly 命令

`readonly`命令可以创建常量。

```bash
readonly OPTION VARIABLE(s)
```

```bash
$ readonly TUX=penguinpower
$ TUX=Mickeysoft
bash: TUX: readonly variable
```

