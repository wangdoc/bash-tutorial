# Bash 变量

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

注意，Bash 变量名区分大小写，HOME 和 home 是两个不同的变量。

查看单个环境变量的值，可以使用`printenv`命令或`echo`命令。

```bash
$ printenv PATH
# 或者
$ echo $PATH
```

注意，`printenv`命令后面的变量名，不用加前缀`$`。
$ readonly TUX=penguinpower
$ TUX=Mickeysoft
## 局部变量

局部变量是仅在当前 Shell 可用的变量，一旦退出，就不存在了。

`set`命令可以显示所有变量（包括全局变量）和函数。

```bash
$ set
```

## 读取变量

读取变量的时候，直接在变量名前加上`$`就可以了。

```bash
$ foo=bar
$ echo $foo
bar
```

每当 Shell 看到以`$`开头的单词时，就会尝试读取这个变量名对应的值。

由于`$`在 Bash 中有特殊含义，把它当作美元符号使用时，一定要非常小心，

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

事实上，读取变量的语法`$foo`，可以看作是`${foo}`的简写形式。

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

下面是一些自定义变量的例子。

```bash
a=z                     # 变量 a 赋值为字符串 z
b="a string"            # 变量值如果包含空格，就必须放在引号里面
c="a string and $b"     # 变量值可以引用其他变量的值
d="\t\ta string\n"      # 变量值可以使用转义字符
e=$(ls -l foo.txt)      # 变量值可以是命令的执行结果
f=$((5 * 7))            # 变量值可以是数学运算的结果
```

变量可以重复赋值，后面的赋值会覆盖前面的赋值。

```bash
$ foo=1
$ foo=2
$ echo $foo
2
```

上面例子中，变量`foo`的第二次赋值会覆盖第一次赋值。

## 删除变量

`unset`命令用来删除一个变量。

```bash
unset NAME
```

这个命令不是很有用。因为不存在的 Bash 变量一律都等于空字符串，所以即使`unset`命令删除了变量，还是可以读取这个变量，值为空字符串。

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

## 特殊变量

Bash 还提供一些特殊变量。这些变量的值由 Shell 提供，用户不能进行赋值。

（1）`$?`

`$?`为上一个命令的退出码，用来判断上一个命令是否执行成功。

```bash
$ ls doesnotexist
ls: doesnotexist: No such file or directory

$ echo $?
1
```

（2）`$$`

`$$`为当前 Shell 的进程 ID。

```bash
$ echo $$
10662
```

（3）`$_`

`$_`为上一个命令的最后一个参数。

```bash
$ grep dictionary /usr/share/dict/words
dictionary

$ echo $_
/usr/share/dict/words
```

（4）`$!`

`$!`为最近一个后台执行的异步命令的进程 ID。

```bash
$ mozilla &
[1] 11064

$ echo $!
11064
```

（5）`$0`

`$0`为当前 Shell 的名称（命令行直接执行）或者脚本名（脚本中执行）。

```bash
$ echo $0
bash
```

（6）`$-`

`$-`为当前 Shell 的启动参数。

```bash
$ echo $-
himBHs
```

（7）`$@`和`$#`

特殊变量还有`$@`和`$#`，与脚本的参数数量有关，参见脚本一章。

## 确保变量存在

Bash 提供一些特殊语法，保证变量肯定存在，且不为空。

```bash
${varname:-word}
```

上面语法的含义是，如果变量`varname`存在且不为空，则返回它的值，否则返回`word`。它的目的是返回一个默认值，比如`${count:-0}`。

```bash
${varname:=word}
```

上面语法的含义是，如果变量`varname`存在且不为空，则返回它的值，否则将它设为`word`，并且返回`word`。它的目的是设置变量的默认值，比如`${count:=0}`。

```bash
${varname:+word}
```

上面语法的含义是，如果变量名存在且不为空，则返回`word`，否则返回空值。它的目的是测试变量是否存在，比如`${count:+1}`（返回`1`，表示`true`）。

```bash
${varname:?message}
```

上面语法的含义是，如果变量`varname`存在且不为空，则返回它的值，否则打印出`varname: message`，并中断脚本的执行。如果省略了`message`，则输出默认的信息“parameter null or not set.”。它的目的主要是，防止变量未定义，如果是的就中断执行，抛出错误，比如`${count:?"undefined!"}`。

如果是在脚本之中，`1`到`9`是特殊变量，表示脚本的参数。

```bash
filename=${1:?"filename missing."}
```

上面代码出现在脚本中，`1`表示脚本的第一个参数。如果该参数不存在，就退出脚本并报错。

## declare 命令

`declare`命令可以声明一些特殊类型的变量，为变量设置一些限制，比如只读类型的变量和整数类型的变量。

它的语法形式如下。

```bash
declare OPTION VARIABLE=value
```

主要参数（OPTION）如下。

- `-a`：声明数组变量。
- `-i`：声明整数变量。
- `-r`：声明只读变量。
- `-x`：该变量通过环境变量输出。
- `-u`：声明变量为大写字母。
- `-l`：声明变量为小写字母。
- `-f`：输出所有函数定义。
- `-F`：输出所有函数名。

`declare`命令如果用在函数中，声明的变量只在函数内部有效，等同于`local`命令。

**（1）`-i`参数**

`-i`参数声明整数变量以后，可以直接进行数学运算。

```bash
$ declare -i val1=12 val2=5
$ declare -i result
$ result=val1*val2
$ echo $result
60
```

上面例子中，如果不是整数，`val1*val2`会被处理成一个字面量。另外，`val1`和`val2`其实不需要声明为整数，因为只要`resule`声明为整数，它的赋值就会自动解释为整数运算。

**（2）`-x`参数**

`-x`参数等同于`export`命令，可以输出一个变量为子 Shell 的环境变量。

```bash
$ declare -x foo
# 等同于
$ export foo
```

**（3）`-r`参数**

`-r`参数可以声明只读变量，无法改变变量值，也不能`unset`变量。

```bash
$ declare -r bar=1
$ bar=2 # 无效
$ unset bar # 无效
```

**（4）`-u`参数**

`-u`参数声明变量为大写字母，可以自动把变量值转成大写字母。

```bash
$ declare -u foo
$ foo=upper
$ echo $foo
UPPER
```

**（5）`-l`参数**

`-l`参数声明变量为小写字母，可以自动把变量值转成小写字母。

```bash
$ declare -l bar
$ bar=LOWER
$ echo $bar
lower
```

**（6）不带参数使用**

不带任何参数，`declare`直接执行可以输出当前环境的所有变量，包括函数在内。

```bash
$ declare
```

**（7）`-f`参数**

`-f`参数输出当前环境的所有函数，包括它的定义。

```bash
$ declare -f
```

**（8）`-F`参数**

`-F`参数输出当前环境的所有函数名，不包含函数定义。

```bash
$ declare -F
```

## readonly 命令

`readonly`命令等同于`declare -r`，用来声明只读变量，不能改变变量值，也不能`unset`变量。

```bash
$ readonly foo=1
$ foo=2 # 无效
```

它有三个参数。

- `-f`：声明的变量为函数名。
- `-p`：打印出所有的只读变量。
- `-a`：声明的变量为数组。

