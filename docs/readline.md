# Bash 行操作

## 简介

Bash 内置了 Readline 库，具有这个库提供的很多“行操作”功能，比如命令的自动补全，可以大大加快操作速度。

这个库默认采用 Emacs 快捷键，也可以改成 Vi 快捷键。

```bash
$ set -o vi
```

下面的命令可以改回 Emacs 快捷键。

```bash
$ set -o emacs
```

如果想永久性更改编辑模式（Emacs / Vi），可以将命令写在`~/.inputrc`文件，这个文件是 Readline 的配置文件。

```bash
set editing-mode vi
```

本章介绍的快捷键都属于 Emacs 模式。Vi 模式的快捷键，读者可以参考 Vi 编辑器的教程。

Bash 默认开启这个库，但是允许关闭。

```bash
$ bash --noediting
```

上面命令中，`--noediting`参数关闭了 Readline 库，启动的 Bash 就不带有行操作功能。

## 光标移动

Readline 提供快速移动光标的快捷键。

- `Ctrl + a`：移到行首。
- `Ctrl + b`：向行首移动一个字符，与左箭头作用相同。
- `Ctrl + e`：移到行尾。
- `Ctrl + f`：向行尾移动一个字符，与右箭头作用相同。
- `Alt + f`：移动到当前单词的词尾。
- `Alt + b`：移动到当前单词的词首。

上面快捷键的 Alt 键，也可以用 ESC 键代替。

## 清除屏幕

`Ctrl + l`快捷键可以清除屏幕，即将当前行移到屏幕的第一行，与`clear`命令作用相同。

## 编辑操作

下面的快捷键可以编辑命令行内容。

- `Ctrl + d`：删除光标位置的字符（delete）。
- `Ctrl + w`：删除光标前面的单词。
- `Ctrl + t`：光标位置的字符与它前面一位的字符交换位置（transpose）。
- `Alt + t`：光标位置的词与它前面一位的词交换位置（transpose）。
- `Alt + l`：将光标位置至词尾转为小写（lowercase）。
- `Alt + u`：将光标位置至词尾转为大写（uppercase）。

使用`Ctrl + d`的时候，如果当前行没有任何字符，会导致退出当前 Shell，所以要小心。

剪切和粘贴快捷键如下。

- `Ctrl + k`：剪切光标位置到行尾的文本。
- `Ctrl + u`：剪切光标位置到行首的文本。
- `Alt + d`：剪切光标位置到词尾的文本。
- `Alt + Backspace`：剪切光标位置到词首的文本。
- `Ctrl + y`：在光标位置粘贴文本。

同样地，Alt 键可以用 Esc 键代替。

## 自动补全

命令输入到一半的时候，可以按一下 Tab 键，Readline 会自动补全命令或路径。比如，输入`cle`，再按下 Tab 键，Bash 会自动将这个命令补全为`clear`。

如果符合条件的命令或路径有多个，就需要连续按两次 Tab 键，Bash 会提示所有符合条件的命令或路径。

除了命令或路径，Tab 还可以补全其他值。如果一个值以`$`开头，则按下 Tab 键会补全变量；如果以`~`开头，则补全用户名；如果以`@`开头，则补全主机名（hostname），主机名以列在`/etc/hosts`文件里面的主机为准。

自动补全相关的快捷键如下。

- Tab：完成自动补全。
- `Alt + ?`：列出可能的补全，与连按两次 Tab 键作用相同。
- `Alt + /`：尝试文件路径补全。
- `Ctrl + x /`：先按`Ctrl + x`，再按`/`，等同于`Alt + ?`，列出可能的文件路径补全。
- `Alt + !`：命令补全。
- `Ctrl + x !`：先按`Ctrl + x`，再按`!`，等同于`Alt + !`，命令补全。
- `Alt + ~`：用户名补全。
- `Ctrl + x ~`：先按`Ctrl + x`，再按`~`，等同于`Alt + ~`，用户名补全。
- `Alt + $`：变量名补全。
- `Ctrl + x $`：先按`Ctrl + x`，再按`$`，等同于`Alt + $`，变量名补全。
- `Alt + @`：主机名补全。
- `Ctrl + x @`：先按`Ctrl + x`，再按`@`，等同于`Alt + @`，主机名补全。
- `Alt + *`：在命令行一次性插入所有可能的补全。
- `Alt + Tab`：尝试用`.bash_history`里面以前执行命令，进行补全。

上面的`Alt`键也可以用 ESC 键代替。

## 操作历史

### 基本用法

Bash 会保留用户的操作历史，即用户输入的每一条命令都会记录。退出当前 Shell 的时候，Bash 会将用户在当前 Shell 的操作历史写入`~/.bash_history`文件，该文件默认储存500个操作。

环境变量`HISTFILE`总是指向这个文件。

```bash
$ echo $HISTFILE
/home/me/.bash_history
```

有了操作历史以后，就可以使用方向键的`↑`和`↓`，快速浏览上一条和下一条命令。

下面的方法可以快速执行以前执行过的命令。

```bash
$ echo Hello World
Hello World

$ echo Goodbye
Goodbye

$ !e
echo Goodbye
Goodbye
```

上面例子中，`!e`表示找出操作历史之中，最近的那一条以`e`开头的命令并执行。Bash 会先输出那一条命令`echo Goodbye`，然后直接执行。

同理，`!echo`也会执行最近一条以`echo`开头的命令。

```bash
$ !echo
echo Goodbye
Goodbye

$ !echo H
echo Goodbye H
Goodbye H

$ !echo H G
echo Goodbye H G
Goodbye H G
```

注意，`!string`语法只会匹配命令，不会匹配参数。所以`!echo H`不会执行`echo Hello World`，而是会执行`echo Goobye`，并把参数`H`附加在这条命令之后。同理，`!echo H G`也是等同于`echo Goodbye`命令之后附件`H G`。

最后，按下`Ctrl + r`会显示操作历史，可以用方向键上下移动，选择其中要执行的命令。也可以键入命令的首字母，Shell 就会自动在历史文件中，查询并显示匹配的结果。

### history 命令

`history`命令能显示操作历史，即`.bash_history`文件的内容。

```bash
$ history
...
498 echo Goodbye
499 ls ~
500 cd
```

使用该命令，而不是直接读取`.bash_history`文件的好处是，它会在所有的操作前加上行号，最近的操作在最后面，行号最大。

通过定制环境变量`HISTTIMEFORMAT`，可以显示每个操作的时间。

```bash
$ export HISTTIMEFORMAT='%F %T  '
$ history
1  2013-06-09 10:40:12   cat /etc/issue
2  2013-06-09 10:40:12   clear
```

上面代码中，`%F`相当于`%Y - %m - %d`，`%T`相当于` %H : %M : %S`。

只要设置`HISTTIMEFORMAT`这个环境变量，就会在`.bash_history`文件保存命令的执行时间戳。如果不设置，就不会保存时间戳。

如果不希望保存本次操作的历史，可以设置环境变量`HISTSIZE`等于0。

```bash
export HISTSIZE=0
```

如果`HISTSIZE=0`写入用户主目录的`~/.bashrc`文件，那么就不会保留该用户的操作历史。如果写入`/etc/profile`，整个系统都不会保留操作历史。

如果想搜索某个以前执行的命令，可以配合`grep`命令搜索操作历史。

```bash
$ history | grep /usr/bin
```

上面命令返回`.bash_history`文件里面，那些包含`/usr/bin`的命令。

操作历史的每一条记录都有编号。知道了命令的编号以后，可以用`感叹号 + 编号`执行该命令。如果想要执行`.bash_history`里面的第8条命令，可以像下面这样操作。

```bash
$ !8
```

`history`命令的`-c`参数可以清除操作历史。

```bash
$ history -c
```

### 相关快捷键

下面是一些与操作历史相关的快捷键。

- `Ctrl + p`：显示上一个命令，与向上箭头效果相同（previous）。
- `Ctrl + n`：显示下一个命令，与向下箭头效果相同（next）。
- `Alt + <`：显示第一个命令。
- `Alt + >`：显示最后一个命令，即当前的命令。
- `Ctrl + o`：执行历史文件里面的当前条目，并自动显示下一条命令。这对重复执行某个序列的命令很有帮助。

感叹号`!`的快捷键如下。

- `!!`：执行上一个命令。
- `!n`：执行历史文件里面行号为`n`的命令。
- `!-n`：执行当前命令之前`n`条的命令。
- `!string`：执行最近一个以指定字符串`string`开头的命令。
- `!?string`：执行最近一条包含字符串`string`的命令。
- `^string1^string2`：执行最近一条包含`string1`的命令，将其替换成`string2`。

## 其他快捷键

- `Ctrl + j`：等同于回车键（LINEFEED）。
- `Ctrl + m`：等同于回车键（CARRIAGE RETURN）。
- `Ctrl + o`：等同于回车键，并展示操作历史的下一个命令。 
- `Ctrl + v`：将下一个输入的特殊字符变成字面量，比如回车变成`^M`。
- `Ctrl + [`：等同于 ESC。 
- `Alt + .`：插入上一个命令的最后一个词。
- `Alt + _`：等同于`Alt + .`。

上面的`Alt + .`快捷键，对于很长的文件路径，有时会非常方便。因为 Unix 命令的最后一个参数通常是文件路径。

```bash
$ mkdir foo_bar
$ cd #按下 Alt + .
```

上面例子中，在`cd`命令后按下`Alt + .`，就会自动插入`foo_bar`。

