# Bash 脚本

Bash 脚本（script）就是一个包含一系列 Bash 命令的文件。Shell 读取这个文件，执行文件中的所有命令，就好像这些命令直接输入到命令行一样。所有能够在命令行中完成的任务，也能够用脚本来实现。

## Shebang 行

脚本的第一行通常以`#!`字符开头，这个字符称为 Shebang，表示该文件是脚本。在 Shebang 后面是指定的脚本解释器，即使用什么程序执行该脚本，Bash 脚本的解释器一般是`/bin/sh`。

```bash
#!/bin/sh
```

如果用户的 Bash 可执行文件不在`/bin/sh`，脚本就无法执行了。为了保险，可以写成下面这样。

```bash
#!/usr/bin/env bash
```

上面命令使用`/usr/bin/env`命令，返回 Bash 的可执行文件。`env`命令的详细介绍，请看后文。

每个脚本都应包含一个 Shebang 行。如果缺少该行，就需要手动调用解释器。举例来说，脚本是`script.sh`，有 Shebang 行的时候，可以直接调用执行。

```bash
$ ./script.sh
```

如果没有 Shebang 行，就只能手动调用解释器执行。

```bash
$ /bin/sh ./script.sh
# 或者
$ bash ./script.sh
```

上面命令中，最后一行的`bash`命令一般是`/bin/sh`的别名。

## 脚本的执行权限

脚本如果要直接执行，除了必须有 Shebang 行以外，还需要有执行权限。可以使用下面的命令，赋予脚本执行权限。

```bash
$ chmod +x ./script.sh
```

脚本调用的时候，一般需要指定脚本的路径。如果将脚本放在环境变量`$PATH`指定的目录中，就不需要指定路径了。建议可以主目录里面新建一个`~/bin`目录，专门存放可执行脚本，然后把`~/bin`加入`$PATH`。

```bash
$ export PATH=$PATH:~/bin
```

上面命令的意思是，改变环境变量`$PATH`，在可执行文件的目录清单中加入`~/bin`，然后所有当前 Shell 的子 Shell 都可以获得这个新的环境变量`$PATH`。Bash 脚本总是在一个新建的子 Shell 里面执行，所以就可以直接输入脚本文件名，来运行脚本。

```bash
$ script.sh
```

上面的命令没有指定脚本路径，因为`script.sh`在`$PATH`指定的目录中。

这种命令行直接改写`$PATH`变量的做法，一旦退出了当前 Shell，就会失效。如果你希望长期有效，可以这行`export`命令写入主目录下面的`.bash_profile`文件或`.profile`文件（取决于发行版）。

## 注释

Bash 脚本中，`#`表示注释。

```bash
# 本行是注释
echo 'Hello World!'

echo 'Hello World!' # 井号后面的部分也是注释
```

## 启动顺序

每一个 Bash 脚本启动的时候，会读取一系列配置文件。这分成登录 Shell 和非登录 Shell 两种情况。

登录 Shell 读取配置文件的顺序如下。

- `/etc/profile`：所有用户的全局配置。
- `~/.bash_profile`：用户的个人配置，可用于扩展或覆盖全局配置。
- `~/.bash_login`：如果找不到`~/.bash_profile`，Bash 则尝试读取此文件。
- `~/.profile`：如果找不到`~/.bash_profile`和`~/.bash_login`，Bash 尝试读取此文件。

非登录 Shell 读取配置文件的顺序如下。

- `/etc/bash.bashrc`：所有用户的全局配置。
- `~/.bashrc`：用户的个人配置，可用于扩展或覆盖全局配置。

除了读取上面的配置文件之外，非登录 Shell 还会从它的父进程继承环境变量。

普通用户对 Shell 的配置修改，一般写在`~/.bashrc`文件里面。非登录 Shell 默认会读取这个文件，而登录 Shell 大多数情况下也会通过变通方法读取该文件。比如，`.bash_profile`文件通常会像下面这样写。

```bash
# .bash_profile
# Get the aliases and functions
if [ -f ~/.bashrc ]; then
	. ~/.bashrc
fi

# User specific environment and startup programs
PATH=$PATH:$HOME/bin
export PATH
```

上面代码中，如果`~/.bashrc`文件存在，就会执行这个文件。这就是“登录 Shell”读取`~/.bashrc`的方法。另外，最后两行的作用是在环境变量`$PATH`里面，追加`$HOME/bin`目录，然后`export`命令的作用是将这个变量输出给当前 Shell 的所有子进程。

## 别名

`alias`命令用来为一个命令指定别名。

```bash
alias NAME=DEFINITION
```

上面命令中，`Name`是新命令的名称，`DEFINITION`是这个新命令对应的要执行的事情。

下面的例子是指定`ls -ltr`命令的别名为`lt`，运行结果是按照修改时间（`-t`）的倒序（`-r`），列出文件的详细信息（`-l`）。

```bash
$ alias lt='ls -ltr'
```

指定别名以后，就可以像使用其他命令一样使用别名。一般来说，都会把常用的别名写在`~/.bashrc`的末尾。

下面是定义一个`today`命令的写法。

```bash
$ alias today='date +"%A, %B %-d, %Y"'
$ today
星期一, 一月 6, 2020
```

直接调用`alias`命令，可以显示所有别名。

```bash
$ alias
```

`unalias`命令可以解除别名。

```bash
$ unalias lt
```

## 程序

别名只适合封装简单的单个命令，如果要封装复杂的多行命令，就需要 Bash 函数。

Bash 函数的语法如下。

```bash
fn() {
  # codes
}
```

上面命令中，`fn`是自定义的函数名，函数代码就写在大括号之中。

下面是显示当前日期时间的函数。

```bash
today() {
  echo -n "Today's date is: "
  date +"%A, %B %-d, %Y"
}
```

这个函数可以写在脚本文件里面，调用的时候直接写函数名即可。

```bash
$ today
```

## env 命令

`env`命令的可执行文件总是在`/usr/bin`目录里面，作用是在指定环境之中运行一个程序。`/usr/bin/env bash`的意思是，找到`bash`的可执行文件，然后在 Bash 环境中运行脚本。

相应的，如果要执行Node脚本，可以写成下面这样。

```bash
#!/usr/bin/env node
```

`#!/usr/bin/env NAME`这种语法的意思是，命令 Shell 查找`$PATH`环境变量里面第一个匹配的`NAME`。如果你不知道某个命令的路径，这样的写法就很有用。它的好处是，只要`bash`的路径是在`$PATH`路径里面，就总是能找到它。

`env`命令的参数如下。

- `-i`, `--ignore-environment`：不带环境变量启动
- `-u`, `--unset=NAME`：从环境变量中删除一个变量
- `--help`：显示帮助
- `--version`：输出版本信息

下面是一个例子，新建一个不带任何环境变量的Shell。

```bash
$ env -i /bin/sh
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

有时，脚本需要用户输入参数，这时可以使用`read`命令。它将用户的输入存入一个参数变量，方便后面的代码使用。

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

`read`命令的参数，就是保存用户输入内容的变量名。如果省略了`read`命令的参数，用户输入的内容会保存在环境变量`REPLY`。

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

`-s`参数使得用户的输入不显示在屏幕上，这常常用于输入密码或保密信息。
