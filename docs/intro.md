# Bash 简介

Bash 是 Linux 系统的一种 Shell，即一种命令行环境。它是目前大多数 Linux 发行版的默认 Shell。

## Shell 是什么

Shell 是一个程序，用于获取用户从键盘输入的命令，将命令送入操作系统执行。所以，Shell 可以看作是一个命令解释器，解释用户输入的命令。同时，它提供了各种命令，供用户使用操作系统的功能，并且支持变量、条件语句和循环，所以它也是一种编程语言，用户可以编写 Shell 程序。

Shell 的原意是“外壳”，跟 kernel （内核）相对应，指的是用户跟内核交互的对话界面。对于用户来说，Shell 就是命令行环境(commandline，简写为 CLI)，没有图形界面（graphical user interface，简写为 GUI）。用户通过命令行，发送命令给内核，并接收内核的返回结果。

Shell 有很多种，只要能给用户提供命令行的程序，都可以看作是 Shell。Bash 是目前最常用的 Shell。如果不特别指明，下文的 Shell 和 Bash 都当作同义词使用。

如果是不带有图形环境的 Linux 系统，启动后就直接是命令行环境。带有图形环境的 Linux 系统，需要启动终端程序，才能进入命令行环境。不同桌面系统的终端程序是不一样的，KDE 桌面的终端程序是 konsole；Gnome 桌面的终端程序是 gnome-terminal。用户也可以安装第三方的终端程序。所有这些终端程序，尽管名字不同，基本功能都是一样的，就是让用户可以进入命令行环境，使用 Shell。

进入命令行环境以后，你应该会看到一个 Shell 的提示符。不同系统的提示符内容都不一样，但是最后会以一个美元符号`$`结尾，你可以在这个符号后面输入各种命令。注意，根用户（root）的提示符不是`$`，而是井号（`#`），防止发生混淆。

```bash
[user@hostname] $
```

为了简洁，后文的命令行提示符都只使用`$`表示，用户只需输入这个符号后面的命令。你可以输入`pwd`命令，按下回车键，就会显示当前所在的目录。

```bash
$ pwd
/home/user
```

如果不小心输入了`pwe`，Shell 会返回一个提示，表示没有找到这个命令对应的可执行程序。

```bash
$ pwe
bash: pwe：未找到命令
```

Shell 命令的用法基本都是下面的格式。

```bash
$ command [ arg1 ... [ argN ]
```

上面代码中，`command`是可执行文件或命令，`arg1 ... argN`是传递给命令的参数，它们是可选的。

```bash
$ ls -l
```

上面这个命令中，`ls`是命令，`-l`是参数。

## Bash 的由来

Shell 伴随着 Unix 系统的诞生而诞生。1969年，Ken Thompson 和 Dennis Ritchie 开发了第一版的 Unix。1971年，Ken Thompson 编写了最初的 Shell，称为 Thompson shell。它的程序名是`sh`。

1973年至1975年间，John R. Mashey 扩展了最初的 Thompson shell，添加了编程功能，使得 Shell 成为一种高级编程语言。这个版本的 Shell 称为 Mashey shell。

1976年开始，Stephen Bourne 结合 Mashey shell 的功能，重写一个新的 Shell，称为 Bourne shell。1979年发布的 UNIX 第7版包含了这个 Shell。

Thompson shell、Mashey shell 和 Bourne shell 都是贝尔实验室的产品，程序名都是`sh`。对于用户来说，它们是同一个东西，只是底层版本不同而已。

同一时期，加州大学伯克利分校的 Bill Joy 开发了 C shell，程序名是`csh`。它是第一个真正替代`sh`的 UNIX shell，被合并到 Berkeley UNIX 的 2BSD 版本中。

20世纪80年代早期，David Korn 开发了Korn shell，程序名是`ksh`。

1985年，Richard Stallman 成立了自由软件基金会（FSF），决定写一个具有自由版本的、属于 GNU 许可证的 Shell，避免 Unix 的版权争议。1988年，自由软件基金会的第一个付薪程序员 Brian Fox 写了一个 Shell，功能基本上是 Bourne shell 的克隆，叫做 Bourne-Again SHell，简称 Bash，程序名也是`bash`。后来，它逐渐成为 Linux 系统的标准 Shell。

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

## 内部命令和外部程序

Bash 本身提供了很多内部命令，但也可以在 Bash 之中调用外部程序。那么，怎么知道一个命令是内部命令，还是外部程序呢？

Bash 提供了`type`命令，用来判断命令的来源。

```bash
$ type echo
echo is a shell builtin
$ type ls
ls is hashed (/bin/ls)
```

上面代码中，`echo`是内部命令，`ls`是外部程序（`/bin/ls`）。

## 配置文件

Shell 按照调用方式分成两种：登录 Shell 和非登录 Shell。

登录 Shell 指的是登录系统时进入的那个 Shell。非登录 Shell 指的是，命令行调用产生的 Shell，比如命令行运行脚本就是新建非登录 Shell。

登录 Shell 的 Bash 的配置文件如下。

- `/etc/profile`：系统级配置文件。不要修改该文件，否则系统更新时可能会出问题。
- `/etc/profile.local`：如果要扩展系统级配置，就使用这个文件。
- `/etc/profile.d/`：针对特定程序的系统级配置，都放在这个目录之中。
- `~/.profile`：用户的个人配置，放在主目录的这个文件中。

非登录 Shell 的 Bash 配置文件如下。

- `/etc/bash.bashrc`：系统级配置文件。不要修改该文件，否则系统更新时可能会出问题。
- `/etc/bash.bashrc.local`：如果要扩展系统级配置，就使用这个文件。
- `~/.bashrc`：用户的个人配置，放在主目录的这个文件中。

Bash 还会用到一些特殊文件。

- `~/.bash_history`：当前用户使用 Bash 命令的历史。
- `~/.bash_logout`：当前用户退出 Bash 时执行。
- `~/.alias`：用户定义的常用命令别名。

