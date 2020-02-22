# Bash 简介

Bash 是 Unix 系统和 Linux 系统的一种 Shell（命令行环境），是目前绝大多数 Linux 发行版的默认 Shell。

## Shell 是什么

Shell 有多种含义。

首先，它是一个程序，提供一个与用户对话的环境。这个环境只有一个命令提示符，让用户从键盘输入命令，所以又称为命令行环境(commandline，简写为 CLI)。Shell 接收到用户输入的命令，将命令送入操作系统执行，并将结果返回给用户。

其次，Shell 是一个命令解释器，解释用户输入的命令。它支持变量、条件判断、循环操作等语法，所以用户可以用 Shell 命令写出各种小程序，又称为脚本（script）。这些脚本都通过 Shell 的解释执行，而不通过编译。

最后，Shell 是一个工具箱，提供了各种小工具，供用户方便地使用操作系统的功能。

Shell 这个单词的原意是“外壳”，跟 kernel （内核）相对应，比喻内核外面的一层，即用户跟内核交互的对话界面。本书中，除非特别指明，Shell 指的就是命令行环境。

Shell 有很多种，只要能给用户提供命令行环境的程序，都可以看作是 Shell。历史上，主要的 Shell 有 Bourne Shell（缩写为`sh`）、Bourne Again shell（缩写为`bash`）、C Shell（缩写为`csh`）、TENEX C Shell（缩写为`tcsh`）、Korn shell（缩写为`ksh`）、Z Shell（缩写为`zsh`）、Friendly Interactive Shell（缩写为`fish`）。Bash 是目前最常用的 Shell，除非特别指明，下文的 Shell 和 Bash 当作同义词使用，可以互换。

下面的命令可以查看当前运行的 Shell。

```bash
$ echo $SHELL
/bin/bash
```

下面的命令可以查看当前的 Linux 系统安装的所有 Shell。

```bash
$ cat /etc/shells
```

上面两个命令中，`$`是命令行环境的提示符，用户只需要输入提示符后面的内容。

Linux 允许每个用户使用不同的 Shell，用户的默认 Shell 一般都是 Bash。

## 如何进入命令行环境

如果是不带有图形环境的 Linux 系统，启动后就直接是命令行环境。

现在大部分的 Linux 发行版，尤其是针对普通用户的发行版，都带有图形环境。这时，用户登录系统后，自动进入图形环境，需要自己启动终端模拟器，才能进入命令行环境。

所谓“终端模拟器”（terminal emulator）就是一个模拟命令行窗口的程序，让用户在一个窗口中使用命令行环境，并且提供各种附加功能，比如调整颜色、字体大小、行距等等。不同 Linux 发行版（准确地说，应该是不同的桌面环境）带有的终端程序是不一样的，KDE 桌面环境的终端程序是 konsole，Gnome 桌面环境的终端程序是 gnome-terminal，用户也可以安装第三方的终端程序。所有终端程序，尽管名字不同，基本功能都是一样的，就是让用户可以进入命令行环境，使用 Shell。

进入命令行环境以后，用户会看到 Shell 的提示符。提示符往往是一串前缀，最后以一个美元符号`$`结尾，用户可以在这个符号后面输入各种命令。

```bash
[user@hostname] $
```

上面例子中，完整的提示符是`[user@hostname] $`，其中前缀是用户名（`user`）加上`@`，再加主机名（`hostname`）。比如，用户名是`bill`，主机名是`home-machine`，前缀就是`bill@home-machine`。

注意，根用户（root）的提示符，不以美元符号（`$`）结尾，而以井号（`#`）结尾，用来提醒用户，现在具有根权限，可以执行各种操作，务必小心，不要出现误操作。

为了简洁，后文的命令行提示符都只使用`$`表示。

进入命令行环境以后，一般就已经打开 Bash 了。如果你的 Shell 不是 Bash，可以输入`bash`命令启动 Bash。

```bash
$ bash
```

退出 Bash 环境，可以使用`exit`命令，也可以同时`Ctrl + d`。

```bash
$ exit
```

作为练习，可以试着输入`pwd`命令。按下回车键，就会显示当前所在的目录。

```bash
$ pwd
/home/me
```

Shell 对用户相当友好。如果不小心输入了`pwe`，会返回一个提示，表示输入出错，没有对应的可执行程序。

```bash
$ pwe
bash: pwe：未找到命令
```

## Bash 的历史

Shell 伴随着 Unix 系统的诞生而诞生。

1969年，Ken Thompson 和 Dennis Ritchie 开发了第一版的 Unix。

1971年，Ken Thompson 编写了最初的 Shell，称为 Thompson shell，程序名是`sh`，方便用户使用 Unix。

1973年至1975年间，John R. Mashey 扩展了最初的 Thompson shell，添加了编程功能，使得 Shell 成为一种编程语言。这个版本的 Shell 称为 Mashey shell。

1976年，Stephen Bourne 结合 Mashey shell 的功能，重写一个新的 Shell，称为 Bourne shell。

1978年，加州大学伯克利分校的 Bill Joy 开发了 C shell，为 Shell 提供 C 语言的语法，程序名是`csh`。它是第一个真正替代`sh`的 UNIX shell，被合并到 Berkeley UNIX 的 2BSD 版本中。

1979年，UNIX 第七版发布，内置了 Bourne Shell，导致它成为 Unix 的默认 Shell。注意，Thompson shell、Mashey shell 和 Bourne shell 都是贝尔实验室的产品，程序名都是`sh`。对于用户来说，它们是同一个东西，只是底层代码不同而已。

1983年，David Korn 开发了Korn shell，程序名是`ksh`。

1985年，Richard Stallman 成立了自由软件基金会（FSF），由于 Shell 的版权属于贝尔公司，所以他决定写一个自由版权的、使用 GNU 许可证的 Shell 程序，避免 Unix 的版权争议。

1988年，自由软件基金会的第一个付薪程序员 Brian Fox 写了一个 Shell，功能基本上是 Bourne shell 的克隆，叫做 Bourne-Again SHell，简称 Bash，程序名为`bash`，任何人都可以免费使用。后来，它逐渐成为 Linux 系统的标准 Shell。

1989年，Bash 发布1.0版。

1996年，Bash 发布2.0版。

2004年，Bash 发布3.0版。

2009年，Bash 发布4.0版。

2019年，Bash 发布5.0版。

用户可以通过环境变量`$BASH_VERSION`查看本机的 Bash 版本。

```bash
$ echo $BASH_VERSION
5.0.3(1)-release
```

## Shell 命令的格式

命令行环境中，主要通过使用 Shell 命令，进行各种操作。Shell 命令的用法基本都是下面的格式。

```bash
$ command [ arg1 ... [ argN ]
```

上面代码中，`command`是可执行文件或命令，`arg1 ... argN`是传递给命令的参数，它们是可选的。

```bash
$ ls -l
```

上面这个命令中，`ls`是命令，`-l`是参数。

有些参数是命令的配置项，这些配置项一般都以一个连词线开头，比如上面的`-l`。同一个配置项往往有长和短两种形式，比如`-l`是短形式，`--list`是长形式，它们的作用完全相同。短形式便于手动输入，长形式一般用在脚本之中，便于解释自身的含义。

```bash
# 短形式
$ ls -r

# 长形式
$ ls --reverse
```

上面命令中，`-r`和`--reverse`作用完全一样，前者便于输入，后者便于理解。

Bash 单个命令一般都是一行，用户按下回车键，就开始执行。有些命令比较长，写成多行会有利于阅读和编辑，这时可以在每一行的结尾加上反斜杠，Bash 就会将下一行跟当前行放在一起解释。

```bash
$ echo foo bar

# 等同于
$ echo foo \
bar
```

## 内置命令和外部程序

除了在 Bash 之中调用外部程序，Bash 本身内置了很多命令。怎么知道一个命令是内置命令，还是外部程序呢？

Bash 提供了`type`命令，用来判断命令的来源。

```bash
$ type echo
echo is a shell builtin
$ type ls
ls is hashed (/bin/ls)
```

上面代码中，`echo`是内部命令，`ls`是外部程序（`/bin/ls`）。

`type`命令本身也是内置命令。

```bash
$ type type
type is a shell builtin
```

如果要查看一个命令的所有定义，可以使用`type -a`。

```bash
$ type -a echo
echo is shell builtin
echo is /usr/bin/echo
echo is /bin/echo
```

`type`命令的`-t`参数，可以返回一个命令的类型：别名（alias），关键词（keyword），函数（function），内置命令（builtin）和文件（file）。

```bash
$ type -t bash
file
$ type -t if
keyword
```

上面例子中，`bash`是文件，`if`是关键词。

## Bash 的快捷键

Bash 有以下快捷键，可以大大方便操作。

- `Ctrl + L`：清除屏幕并将当前行移到页面顶部。
- `Ctrl + C`：中止当前正在执行的命令。
- `Shift + PageUp`：向上滚动。
- `Shift + PageDown`：向下滚动。
- `Ctrl + U`：从光标位置删除到行首。
- `Ctrl + K`：从光标位置删除到行尾。
- `Ctrl + D`：关闭shell会话。
- `↑`，`↓`：浏览已执行命令的历史记录。

除了上面的快捷键，Bash 还具有自动补全功能。命令输入到一半的时候，可以按下 Tab 键，Bash 会自动完成剩下的部分。比如，输入`pw`，然后按一下 Tab 键，Bash 会自动补上`d`。

这个功能最有用的时候，是路径的自动补全。有时，需要输入很长的路径，这时只需要输入前面的部分，然后按下 Tab 键就会自动补全后面的部分。如果有多个子路径，Bash 会显示下一层的全部文件和子目录，让你选择。

