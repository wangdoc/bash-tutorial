# Bash 脚本

脚本（script）就是包含一系列命令的一个文件。Shell 读取这个文件，依次执行文件中的所有命令，就好像这些命令直接输入到命令行一样。所有能够在命令行中完成的任务，也能够用脚本来实现。

脚本的好处是可以重复使用，也可以指定在特定场合自动调用，比如系统启动或关闭时。

## Shebang 行

脚本的第一行通常约定是指定解释器，即这个脚本必须通过什么解释器执行。

指定解释器的这一行以`#!`字符开头，这个字符称为 Shebang，所以这一行就叫做 Shebang 行。在`#!`后面就是脚本解释器的位置，Bash 脚本的解释器一般是`/bin/sh`。

```bash
#!/bin/sh
```

如果用户的 Bash 可执行文件不是`/bin/sh`，脚本就无法执行了。为了保险，可以写成下面这样。

```bash
#!/usr/bin/env bash
```

上面命令使用`/usr/bin/env`命令，返回 Bash 可执行文件的位置。`env`命令的详细介绍，请看后文。

每个脚本都应包含一个 Shebang 行。如果缺少该行，就需要手动调用解释器。举例来说，脚本是`script.sh`，有 Shebang 行的时候，可以直接调用执行。

```bash
$ ./script.sh
```

上面例子中，`script.sh`是脚本文件名。脚本通常使用`.sh`后缀名，不过这不是必需的。

如果没有 Shebang 行，就只能手动调用解释器执行。

```bash
$ /bin/sh ./script.sh
# 或者
$ bash ./script.sh
```

## 执行权限和路径

前面说过，通过 Shebang 行指定解释器的脚本，可以直接执行。这有一个前提条件，就是脚本需要有执行权限。可以使用下面的命令，赋予脚本执行权限。

```bash
# 给所有用户执行权限
$ chmod +x script.sh

# 给所有用户读权限和执行权限
$ chmod +rx script.sh
# 或者
$ chmod 555 script.sh

# 只给脚本拥有者读权限和执行权限
$ chmod u+rx script.sh
```

除了执行权限，脚本调用时，一般需要指定脚本的路径。如果将脚本放在环境变量`$PATH`指定的目录中，就不需要指定路径了。因为 Bash 会自动到这些目录中，寻找是否存在同名的可执行文件。

建议在主目录新建一个`~/bin`子目录，专门存放可执行脚本，然后把`~/bin`加入`$PATH`。

```bash
export PATH=$PATH:~/bin
```

上面命令改变环境变量`$PATH`，将`~/bin`添加到`$PATH`的末尾。可以将这一行加到`~/.bashrc`文件里面，然后重新加载一次`.bashrc`，这个配置就可以生效了。

```bash
$ source ~/.bashrc
```

以后不管在什么目录，直接输入脚本文件名，脚本就会执行。

```bash
$ script.sh
```

上面命令没有指定脚本路径，因为`script.sh`在`$PATH`指定的目录中。

## env 命令

`env`命令总是指向`/usr/bin/env`文件。`#!/usr/bin/env NAME`这种语法的意思是，让 Shell 查找`$PATH`环境变量里面第一个匹配的`NAME`。如果你不知道某个命令的路径，这样的写法就很有用。`/usr/bin/env bash`的意思就是，返回`bash`可执行文件的位置，前提是`bash`的路径是在`$PATH`里面。

其他脚本文件也可以使用这个命令。比如 Node.js 脚本的 Shebang 行，可以写成下面这样。

```bash
#!/usr/bin/env node
```

`env`命令的参数如下。

- `-i`, `--ignore-environment`：不带环境变量启动
- `-u`, `--unset=NAME`：从环境变量中删除一个变量
- `--help`：显示帮助
- `--version`：输出版本信息

下面是一个例子，新建一个不带任何环境变量的Shell。

```bash
$ env -i /bin/sh
```

## 注释

Bash 脚本中，`#`表示注释。

```bash
# 本行是注释
echo 'Hello World!'

echo 'Hello World!' # 井号后面的部分也是注释
```

建议在脚本开头，使用注释说明当前脚本的作用，这样有利于日后的维护。

## 脚本的调试

脚本执行过程中，有时为了方便调试，需要显示当前执行的命令。这时可以使用`bash`命令的`-x`参数，该参数在执行每一条命令时，都会将该命令先打印出来。

下面是一个脚本`script.sh`。

```bash
# script.sh
echo hello world
```

加上`-x`参数，执行每条命令之前，都会显示该命令。

```bash
$ bash -x script.sh
+ echo hello world
hello world
```

上面例子中，行首为`+`的行，显示该行是所要执行的命令，下一行才是该命令的执行结果。

## 脚本参数

调用脚本的时候，脚本文件名后面可以带有参数。

```bash
$ script.sh word1 word2 word3
```

上面例子中，`script.sh`是一个脚本文件，`word1`、`word2`和`word3`是三个参数。

脚本文件内部，可以使用特殊变量，引用这些参数。

- `$0`：脚本文件名，即`script.sh`
- `$1`~`$9`：对应脚本的第一个参数到第九个参数。
- `$#`：参数的总数
- `$@`：全部的参数，参数之间使用空格分隔。
- `$*`：全部的参数，参数之间使用变量`$IFS`值的第一个字符分隔，默认为空格，但是可以自定义。

如果脚本的参数多于9个，那么第10个参数可以用`${10}`的形式引用，以此类推。

注意，如果命令是`command -o foo bar`，那么`-o`是`$1`，`foo`是`$2`，`bar`是`$3`。

下面是一个脚本内部读取命令行参数的例子。

```bash
#!/bin/bash

echo "全部参数：" $@
echo "命令行参数数量：" $#
echo '$0 = ' $0
echo '$1 = ' $1
echo '$2 = ' $2
echo '$3 = ' $3
```

执行结果如下。

```bash
$ script.sh a b c
全部参数：a b c
命令行参数数量：3
$0 =  script.sh
$1 =  a
$2 =  b
$3 =  c
```

用户可以输入任意数量的参数，利用`for`循环，可以读取每一个参数。

```bash
#!/bin/bash

for i in "$@"; do
  echo $i
done
```

上面例子中，`$@`返回一个全部参数的列表，然后使用`for`循环遍历。

## shift 命令

`shift`命令可以改变脚本参数，每次执行都会移除脚本当前的第一个参数（`$1`），使得后面的参数向前一位，即`$2`变成`$1`、`$3`变成`$2`、`$4`变成`$3`，以此类推。

`while`循环结合`shift`命令，也可以读取每一个参数。

```bash
#!/bin/bash

echo "一共输入了 $# 个参数"

while [ "$1" != "" ]; do
  echo "剩下 $# 个参数"
  echo "参数：$1"
  shift
done
```

上面例子中，`shift`命令每次移除当前第一个参数，从而通过`while`循环遍历所有参数。

`shift`命令可以接受一个整数作为参数，指定所要移除的参数个数，默认为`1`。

```bash
shift 3
```

上面的命令移除前三个参数，原来的`$4`变成`$1`。

## getopts 命令

`getopts`命令用来解析复杂的命令行参数，通常与`while`循环一起使用，取出所有的带有前置连词线（`-`）的参数。

它带有两个参数。第一个参数是字符串，给出所有的连词线参数。如果该参数带有参数值，则后面必须带有一个冒号（`:`）。比如，某个命令可以有三个参数`-l`、`-h`、`-a`，其中只有`-a`可以带有参数值，那么`getopts`的第一个参数写成`lha:`，顺序不重要，注意`a`后面有一个冒号。`getopts`的第二个参数是一个变量名，用来保存参数。

下面是一个例子。

```bash
while getopts 'lha:' OPTION; do
  case "$OPTION" in
    l)
      echo "linuxconfig"
      ;;

    h)
      echo "h stands for h"
      ;;

    a)
      avalue="$OPTARG"
      echo "The value provided is $OPTARG"
      ;;
    ?)
      echo "script usage: $(basename $0) [-l] [-h] [-a somevalue]" >&2
      exit 1
      ;;
  esac
done
shift "$(($OPTIND - 1))"
```

上面例子中，`while`循环不断执行`getopts 'lha:' OPTION`命令，每次执行就会读取一个连词线参数（以及对应的参数值），然后进入循环体。变量`OPTION`保存的是，当前处理的那一个连词线参数（即`l`、`h`或`a`）。如果用户输入了没有指定的参数（比如`-x`），那么`OPTION`等于`?`。循环体内使用`case`判断，处理这四种不同的情况。

如果某个连词线参数带有参数值，比如`-a foo`，那么处理`a`参数的时候，变量`$OPTARG`保存的就是参数值。

注意，只要遇到不带连词线的参数，`getopts`就会执行失败，从而退出`while`循环。比如，`getopts`可以解析`command -l foo`，但不可以解析`command foo -l`。另外，多个连词线参数写在一起的形式，比如`command -lh`，`getopts`也可以正确处理。

变量`$OPTIND`在`getopts`开始执行前是`1`，然后每次执行就会加`1`。等到退出`while`循环，就意味着连词线参数全部处理完毕。这时，`$OPTIND - 1`就是已经处理的连词线参数个数，使用`shift`命令将这些参数移除，保证后面的代码可以用`$1`、`$2`等处理命令的主参数。

## 别名

`alias`命令用来为一个命令指定别名，这样更便于记忆。下面是`alias`的格式。

```bash
alias NAME=DEFINITION
```

上面命令中，`Name`是别名的名称，`DEFINITION`是别名对应的原始命令。注意，等号两侧不能有空格，否则会报错。

最常见的就是为`grep`命令起一个`search`的别名。

```bash
alias search=grep
```

`alias`也可以用来为长命令指定一个更短的别名。下面是通过别名定义`today`命令的写法。

```bash
$ alias today='date +"%A, %B %-d, %Y"'
$ today
星期一, 一月 6, 2020
```

有时为了防止误删除文件，可以指定`rm`命令的别名。

```bash
$ alias rm='rm -i'
```

上面命令指定`rm`命令是`rm -i`，每次删除文件之前，都会让用户确认。

指定别名以后，就可以像使用其他命令一样使用别名。一般来说，都会把常用的别名写在`~/.bashrc`的末尾。另外，只能为命令定义别名，为其他部分（比如很长的路径）定义别名是无效的。

直接调用`alias`命令，可以显示所有别名。

```bash
$ alias
```

`unalias`命令可以解除别名。

```bash
$ unalias lt
```

## exit 命令

`exit`命令用于终止当前脚本的执行，并向 Shell 返回一个退出值。

```bash
$ exit
```

上面命令中止当前脚本，将最后一条命令的退出状态，作为整个脚本的退出状态。

`exit`命令后面可以跟参数，该参数就是退出状态。

```bash
# 退出值为0（成功）
$ exit 0

# 退出值为1（失败）
$ exit 1
```

退出时，脚本会返回一个退出值。脚本的退出值，`0`表示正常，`1`表示发生错误，`2`表示用法不对，`126`表示不是可执行脚本，`127`表示命令没有发现。如果脚本被信号`N`终止，则退出值为`128 + N`。简单来说，只要退出值非0，就认为执行出错。

下面是一个例子。

```bash
if [ $(id -u) != "0" ]; then
  echo "根用户才能执行当前脚本"
  exit 1
fi
```

上面的例子中，`id -u`命令返回用户的 ID，一旦用户的 ID 不等于`0`（根用户的 ID），脚本就会退出，并且退出码为`1`，表示运行失败。

上一条命令的退出值，可以用系统变量`$?`查询。使用这个命令，可以知道上一条命令是否执行成功。

`exit`与`return`命令的差别是，`return`命令是函数的退出，并返回一个值给调用者，脚本依然执行。`exit`是整个脚本的退出，如果在函数之中调用`exit`，则退出函数，并终止脚本执行。

## read 命令

有时，脚本需要用户输入参数，这时可以使用`read`命令。它将用户的输入存入一个参数变量，方便后面的代码使用。用户按下回车键，就表示输入结束。

`read`命令的格式如下。

```bash
read [-options] [variable...]
```

上面语法中，`options`是参数选项，`variable`是用来保存输入数值的一个或多个变量名。如果没有提供变量名，shell 变量`REPLY`会包含用户输入的一整行数据。

下面是一个例子`demo.sh`。

```bash
#!/bin/bash

echo -n "输入一些文本 > "
read text
echo "你的输入：$text"
```

上面例子中，先显示一行提示文本，然后会等待用户输入文本。用户输入的文本，存入变量`text`，在下一行显示出来。

```bash
$ bash demo.sh
输入一些文本 > 你好，世界
你的输入：你好，世界
```

`read`可以接受用户输入的多个值。

```bash
#!/bin/bash
echo Please, enter your firstname and lastname
read FN LN
echo "Hi! $LN, $FN !"
```

上面例子中，`read`根据用户的输入，同时为两个变量赋值。

如果用户的输入项少于`read`命令定义的变量数目，那么额外的变量值为空。如果用户的输入项多于定义的变量，那么多余的输入项会包含到最后一个变量中。

如果`read`命令之后没有定义变量名，那么环境变量`REPLY`会包含所有的输入。

```bash
#!/bin/bash
# read-single: read multiple values into default variable
echo -n "Enter one or more values > "
read
echo "REPLY = '$REPLY'"
```

上面脚本的运行结果如下。

```bash
$ read-single
Enter one or more values > a b c d
REPLY = 'a b c d'
```

`read`命令的参数如下。

**（1）-t 参数**

`read`命令的`-t`参数，设置了超时的秒数。如果超过了指定时间，用户仍然没有输入，脚本将放弃等待，继续向下执行。

```bash
#!/bin/bash

echo -n "输入一些文本 > "
if read -t 3 response; then
  echo "用户已经输入了"
else
  echo "用户没有输入"
fi
```

上面例子中，输入命令会等待3秒，如果用户超过这个时间没有输入，这个命令就会执行失败。`if`根据这个返回码，转入`else`代码块，继续往下执行。

**（2）-p 参数**

`-p`参数指定用户输入的提示信息。

```bash
read -p "Enter one or more values > "
echo "REPLY = '$REPLY'"
```

上面例子中，先显示`Enter one or more values >`，再接受用户的输入。

**（3）-a 参数**

`-a`参数把用户的输入赋值给一个数组，从零号位置开始。

```bash
$ read -a people
alice duchess dodo
$ echo ${people[2]}
dodo
```

上面例子中，用户输入被赋值给一个数组`people`，这个数组的2号成员就是`dodo`。

**（4）-n 参数**

`-n`参数指定只读取若干个字符，作为变量值，而不是整行读取。

```bash
$ read -n 3 letter
abcdefghij
$ echo $letter
abc
```

上面例子中，变量`letter`只包含3个字母。

**（5）其他参数**

- `-d delimiter`：定义字符串`delimiter`的第一个字符作为用户输入的结束，而不是一个换行符。
- `-r`：raw 模式，表示不把用户输入的反斜杠字符解释为转义字符。
- `-s`：使得用户的输入不显示在屏幕上，这常常用于输入密码或保密信息。
- `-u fd`：使用文件描述符`fd`作为输入。

## 命令执行结果

命令执行结束后，会有一个返回值。`0`表示执行成功，非`0`（通常是`1`）表示执行失败。环境变量`$?`可以读取前一个命令的返回值。

利用这一点，可以在脚本中对命令执行结果进行判断。

```bash
cd $some_directory
if [ "$?" = "0" ]; then
  rm *
else
  echo "无法切换目录！" 1>&2
  exit 1
fi
```

上面例子中，`cd $some_directory`这个命令如果执行成功（返回值等于`0`），就删除该目录里面的文件，否则退出脚本，整个脚本的返回值变为`1`，表示执行失败。

由于`if`可以判断命令的执行结果，执行相应的操作，上面的脚本可以用`if`命令改写成下面的样子。

```bash
if cd $some_directory; then
  rm *
else
  echo "Could not change directory! Aborting." 1>&2
  exit 1
fi
```

更简洁的写法是利用两个逻辑运算符`&&`（且）和`||`（或）。

```bash
# 第一步执行成功，才会执行第二步
cd $some_directory && rm *

# 第一步执行失败，才会执行第二步
cd $some_directory || exit 1
```

## 参考链接

- [How to use getopts to parse a script options](https://linuxconfig.org/how-to-use-getopts-to-parse-a-script-options), Egidio Docile

