# Bash 变量

变量是指向某个内存区域的指针，通过变量名，可以读取该内存区域储存的信息。我们也可以把变量简单理解成一个变动的值。

Shell 变量分成全局变量和局部变量两类。全局变量可以在所有 Shell 中访问，局部变量仅在当前 Shell 中可用。

## 全局变量

全局变量，又称环境变量，在用户启动的所有 Shell 里面都可用。`env`命令或`printenv`命令，可以显示所有全局变量。

```bash
$ env
# 或者
$ printenv
```

下面是一些常见的环境变量。

- `BASHPID`：Bash 进程的进程 ID。
- `DISPLAY`：显示器的名字，通常是 ":0"，表示第一个显示器。
- `EDITOR`：文本编辑器的名字。
- `HOME`：用户的主目录。
- `HOST`：当前主机的名称。
- `LANG`：字符集以及语言编码，比如`zh_CN.UTF-8`。
- `PATH`：由冒号分开的目录列表，当输入可执行程序名后，会搜索这个目录列表。
- `PS1`：Shell 提示符。
- `PS2`: 输入多行命令时，次要的 Shell 提示符。
- `PWD`：当前工作目录。
- `SHELL`：Shell 的名字。
- `TERM`：终端类型名，即终端仿真器所用的协议。
- `USER`：当前用户的用户名。

这些环境变量很少发生变化，一般可以视为常量。由于它们的变量名全部都是大写，所以传统上，如果用户要自己定义一个常量，也会使用全部大写的变量名。

查看单个环境变量的值，可以使用`printenv`命令或`echo`命令。

```bash
$ printenv PATH
# 或者
$ ench $PATH
```

注意，`printenv`命令后面的变量名，不用加前缀`$`。

## 局部变量

局部变量是仅在当前 Shell 可用的变量，一旦退出，就不存在了。`set`命令可以显示所有变量（包括全局变量）和函数。

```bash
$ set
```

## 创建变量

用户创建变量的时候，一般约定，全局变量的变量名都使用大写字母，局部变量使用小写字母。

变量名必须遵守下面的规则。

- 由字母、数字和下划线字符组成。
- 第一个字符必须是一个字母或一个下划线。
- 不允许出现空格和标点符号。

变量声明的语法如下。

```bash
variable=value
```

上面命令中，等号左边是变量名，右边是变量值，中间是一个等号（`=`）。注意，等号两边不能有空格。

如果变量的值包含空格，则必须将值放在引号中。

```bash
myvar="hello world"
```

Bash 没有数据类型的概念，所有的变量值都是字符串。

`unset`命令用来删除一个变量。

```bash
unset NAME
```

下面是一些自定义变量的例子。

```bash
a=z                     # 变量 a 赋值为字符串 z
b="a string"            # 变量值如果包含空格，就必须放在引号里面
c="a string and $b"     # 变量值可以引用其他变量的值
d="\t\ta string\n"      # 变量值可以使用转义字符
e=$(ls -l foo.txt)      # 变量值可以是命令的执行结果
f=$((5 * 7))            # 变量值可以是数学运算的结果
```

## 输出变量

像上一节那样创建的变量，都是局部变量，仅可用于当前 Shell，当前 Shell 的子进程读取不到此变量。为了把变量传递到子 Shell，需要使用`export`命令。这样输出的变量，对于子 Shell 来说就是环境变量。

`export`命令用来向子 Shell 输出变量。变量的赋值和输出通常在一个步骤中完成。

```bash
export NAME=value
```

上面命令执行后，当前 Shell 及随后新建的子 Shell，都可以读取变量`$NAME`。

如果子 Shell 修改继承的变量，不会影响父 Shell。

```bash
# 输出变量 $foo
$ export foo=bar

# 新建子 Shell
$ bash

# 读取 $foo
$ echo $foo
bar

# 修改继承的变量
$ foo=baz

# 退出子 Shell
$ exit

# 读取 $foo
$ echo $foo
bar
```

上面例子，子 Shell 修改了继承的变量`$foo`，对父 Shell 没有影响。

## 变量的读取

读取变量的时候，直接在变量名前加上`$`就可以了。

```bash
$ foo=bar
$ echo $foo
bar
```

每当 Shell 看到以`$`开头的单词时，就会尝试读取这个变量名对应的值。

由于`$`在 Bash 中有特殊含义，使用时一定要小心，

```bash
$ echo The total is $100.00
The total is 00.00
```

上面命令的原意是输入`$100`，但是 Bash 将`$1`解释成了变量，该变量为空，因此输入就变成了`00.00`。

所以，如果要使用`$`的原义，需要在`$`前面放上反斜杠，进行转义。

```bash
$ echo The total is \$100.00
The total is $100.00
```

读取变量的时候，变量名可以被花括号`{}`包围，比如`$a`可以用`${a}`表示，这样可以用于一些特殊情况，防止变量名的混淆。

```bash
$ a=foo
$ echo $a_file

$ echo ${a}_file
foo_file
```

上面代码中，变量名`a_file`不会有任何输出，因为 Bash 将其整个解释为变量，而这个变量是不存在的。只有用花括号区分`$a`，将其替换为`foo`，才能正确显示。

## 特殊变量

Bash 还提供一些特殊变量。这些变量的值由 Shell 提供，用户不能进行赋值。

`$?`为上一个命令的退出码，用来判断上一个命令是否执行成功。

```bash
$ ls doesnotexist
ls: doesnotexist: No such file or directory

$ echo $?
1
```

`$$`为当前 Shell 的进程 ID。

```bash
$ echo $$
10662
```

`$_`为上一个命令的最后一个参数。

```bash
$ grep dictionary /usr/share/dict/words
dictionary

$ echo $_
/usr/share/dict/words
```

`$!`为最近一个后台执行的异步命令的进程 ID。

```bash
$ mozilla &
[1] 11064

$ echo $!
11064
```

`$0`为当前 Shell 的名称或者脚本名。

```bash
echo $0
bash
```

`$-`为当前 Shell 的启动参数。

```bash
$ echo $-
himBHs
```

另外，特殊变量还有`$@`和`$#`，与脚本的参数数量有关，参见脚本一章。

## 空变量的默认值

如果变量值为空，有时我们需要为它们设置默认值。这有几种写法。

```bash
# 如果变量存在且不为 null，返回它的值，否则返回 word
${varname:-word}

# 如果变量名存在且不为 null，返回它的值，否则将它设为 word 且返回word
${varname:=word}

# 如果变量名存在且不为 null，返回 word，否则返回 null
${varname:+word}

# 执行字符串操作，返回从 offset 开始的 $varname，直到满足指定长度
${varname:offset:length}
```

下面是一个例子。

```bash
$ foo=
$ echo ${foo:-"substitute value if unset"}
substitute value if unset
$ echo $foo
$
```

上面代码中，如果变量`foo`为空，会打印出替代值。

```bash
${parameter:=word}
```

若 parameter 没有设置或为空，展开结果是 word 的值。另外，word 的值会赋值给 parameter。 若 parameter 不为空，展开结果是 parameter 的值。

```bash
$ foo=
$ echo ${foo:="default value if unset"}
default value if unset
$ echo $foo
default value if unset
```

上面代码中，变量`foo`为空，就被赋值为默认值。

```bash
${parameter:?word}
```

若 parameter 没有设置或为空，这种展开导致脚本带有错误退出，并且 word 的内容会发送到标准错误。若 parameter 不为空， 展开结果是 parameter 的值。

```bash
$ foo=
$ echo ${foo:?"parameter is empty"}
bash: foo: parameter is empty
$ echo $?
1
```

上面代码中，变量`foo`为空就会报错，显示指定的报错信息。

```bash
${parameter:+word}
```

若 parameter 没有设置或为空，展开结果为空。若 parameter 不为空， 展开结果是 word 的值会替换掉 parameter 的值；然而，parameter 的值不会改变。

```bash
$ foo=
$ echo ${foo:+"substitute value if set"}

$ foo=bar
$ echo ${foo:+"substitute value if set"}
substitute value if set
```

上面代码中，变量`foo`不为空时，为打印指定信息，但不会改变`foo`的值。

## 字符串的替换

```bash
# 如果 pattern 匹配字符串开头，删除非贪婪匹配的部分，返回其他
${variable#pattern}

# 如果 pattern 匹配字符串开头，删除贪婪匹配的部分，返回其他
${variable##pattern}

# 如果 pattern 匹配字符串结尾，删除非贪婪匹配部分，返回其他
${variable%pattern}

# 如果 pattern 匹配字符串结尾，删除贪婪匹配部分，返回其他
${variable%%pattern}

# 贪婪匹配 pattern 的部分被 string 替换，仅仅替换第一个匹配
${variable/pattern/string}

# 贪婪匹配 pattern 的部分被 string 替换，所有匹配都替换
${variable//pattern/string}

# 返回字符串的长度
${#varname}
```

```bash
# removes the shortest possible match from the left:
${VAR#pattern}

$ file=/home/tux/book/book.tar.bz2
$ echo ${file#*/}
home/tux/book/book.tar.bz2
```

${VAR##pattern}
removes the longest possible match from the left:

```bash
$ file=/home/tux/book/book.tar.bz2
$ echo ${file##*/}
book.tar.bz2
```

${VAR%pattern}
removes the shortest possible match from the right:

```bash
$ file=/home/tux/book/book.tar.bz2
$ echo ${file%.*}
/home/tux/book/book.tar
```

${VAR%%pattern}
removes the longest possible match from the right:

```bash
$ file=/home/tux/book/book.tar.bz2
$ echo ${file%%.*}
/home/tux/book/book
```

${VAR/pattern_1/pattern_2}
substitutes the content of VAR from the PATTERN_1 with PATTERN_2:

```bash
$ file=/home/tux/book/book.tar.bz2
$ echo ${file/tux/wilber}
/home/wilber/book/book.tar.bz2
```

## 返回变量名的展开

`${!prefix*}`和`${!prefix@}`，会返回以 prefix 开头的已有变量名，它们的执行结果相同。

```bash
$ echo ${!BASH*}
BASH BASH_ARGC BASH_ARGV BASH_COMMAND BASH_COMPLETION
BASH_COMPLETION_DIR BASH_LINENO BASH_SOURCE BASH_SUBSHELL
BASH_VERSINFO BASH_VERSION
```

## 字符串的展开

字符串长度

```bash
${#parameter}
```

`${#parameter}`展开成由 parameter 所包含的字符串的长度。通常，parameter 是一个字符串；然而，如果 parameter 是`@`或者是`*` 的话， 则展开结果是位置参数的个数。

```bash
$ foo="This string is long."
$ echo "'$foo' is ${#foo} characters long."
'This string is long.' is 20 characters long.
```

截取子字符串。

```bash
${parameter:offset}

${parameter:offset:length}
```

这些展开用来从 parameter 所包含的字符串中提取一部分字符。提取的字符始于 第 offset 个字符（从字符串开头算起）直到字符串的末尾，除非指定提取的长度。

```bash
$ foo="This string is long."
$ echo ${foo:5}
string is long.
$ echo ${foo:5:6}
string
```

若 offset 的值为负数，则认为 offset 值是从字符串的末尾开始算起，而不是从开头。注意负数前面必须有一个空格， 为防止与 ${parameter:-word} 展开形式混淆。length，若出现，则必须不能小于零。

```bash
$ foo="This string is long."
$ echo ${foo: -5}
long.
$ echo ${foo: -5:2}
lo
```

如果 parameter 是 @，展开结果是 length 个位置参数，从第 offset 个位置参数开始。

清除匹配的模式

```bash
${parameter#pattern}

${parameter##pattern}
```

这些展开会从 paramter 所包含的字符串中清除开头一部分文本，这些字符要匹配定义的 patten。pattern 是 通配符模式，就如那些用在路径名展开中的模式。这两种形式的差异之处是该 # 形式清除最短的匹配结果， 而该 ## 模式清除最长的匹配结果。

```bash
$ foo=file.txt.zip
$ echo ${foo#*.}
txt.zip
$ echo ${foo##*.}
zip
```

清除匹配的模式（从尾部开始）

```bash
${parameter%pattern}

${parameter%%pattern}
```

这些展开和上面的 # 和 ## 展开一样，除了它们清除的文本从 parameter 所包含字符串的末尾开始，而不是开头。

```bash
$ foo=file.txt.zip
$ echo ${foo%.*}
file.txt
$ echo ${foo%%.*}
file
```

查找和替换

```bash
${parameter/pattern/string}

${parameter//pattern/string}

${parameter/#pattern/string}

${parameter/%pattern/string}
```

这种形式的展开对 parameter 的内容执行查找和替换操作。如果找到了匹配通配符 pattern 的文本， 则用 string 的内容替换它。在正常形式下，只有第一个匹配项会被替换掉。在该 // 形式下，所有的匹配项都会被替换掉。 该 /# 要求匹配项出现在字符串的开头，而 /% 要求匹配项出现在字符串的末尾。/string 可能会省略掉，这样会 导致删除匹配的文本。

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

