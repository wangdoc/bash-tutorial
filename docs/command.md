# Shell 的命令

## 命令的类别

Bash可以使用的命令分成四类。

- 可执行程序
- Shell 提供的命令
- Shell 函数
- 前三类命令的别名

## type, whatis

`type`命令可以显示命令类型。

```bash
$ type command
```

下面是几个例子。

```bash
$ type type
type is a shell builtin

$ type ls
ls is aliased to `ls --color=tty'

$ type cp
cp is /bin/cp
```

`whatis`命令显示指定命令的描述。

```bash
$ whatis ls
ls (1) - list directory contents
```

## apropos

`apropos`命令返回符合搜索条件的命令列表。

```bash
$ apropos floppy
create_floppy_devices (8) - udev callout to create all possible
fdformat (8) - Low-level formats a floppy disk
floppy (8) - format floppy disks
gfloppy (1) - a simple floppy formatter for the GNOME
mbadblocks (1) - tests a floppy disk, and marks the bad
mformat (1) - add an MSDOS filesystem to a low-level
```

## alias, unalias

`alias`命令用来为命令起别名。

```bash
$ alias foo='cd /usr; ls; cd -'

$ type foo
foo is aliased to `cd /usr; ls ; cd -'
```

上面命令指定`foo`为三个命令的别名。以后，执行`foo`就相当于一起执行这三条命令。

注意，默认情况下，别名只在当前Session有效。当前Session结束时，这些别名就会消失。

`alias`命令不加参数时，显示所有有效的别名。

```bash
$ alias
alias l.='ls -d .* --color=tty'
alias ll='ls -l --color=tty'
alias ls='ls --color=tty'
```

`unalias`命令用来取消别名。

```bash
$ unalias foo
$ type foo
bash: type: foo: not found
```

## which

`which`命令显示可执行程序的路径。

```bash
$ which ls
/bin/ls
```

`which`命令用于Shell内置命令时（比如`cd`），将没有任何输出。

## help，man

`help`命令用于查看Shell内置命令的帮助信息，`man`命令用于查看可执行命令的帮助信息。

```bash
$ help cd
$ man ls
```

`man`里面的文档一共有8类，如果同一个命令，匹配多个文档，`man`命令总是返回第一个匹配。如果想看指定类型的文档，命令可以采用下面的形式。

```bash
$ man 5 passwd
```

## script

`script`命令会将输入的命令和它的输出，都保存进一个文件。

```bash
$ script [file]
```

如果没有指定文件名，则所有结果会保存进当前目录下`typescript`文件。结束录制的时候，可以按下`Ctrl + d`。

## export

`export`命令用于将当前进程的变量，输出到所有子进程。

## 命令的连续执行

多个命令可以写在一起。

Bash 提供三种方式，定义它们如何执行。

```bash
# 第一个命令执行完，执行第二个命令
command1; command2

# 只有第一个命令成功执行完（退出码0），才会执行第二个命令
command1 && command2

# 只有第一个命令执行失败（退出码非0），才会执行第二个命令
command1 || command2
```

上面三种执行方法的退出码，都是最后一条执行的命令的退出码。

bash 允许把命令组合在一起。可以通过两种方式完成；要么用一个 group 命令，要么用一个子 shell。 这里是每种方式的语法示例：

组命令：

```bash
{ command1; command2; [command3; ...] }
```

子 shell

```bash
(command1; command2; [command3;...])
```

这两种形式的不同之处在于，组命令用花括号把它的命令包裹起来，而子 shell 用括号。值得注意的是，鉴于 bash 实现组命令的方式， 花括号与命令之间必须有一个空格，并且最后一个命令必须用一个分号或者一个换行符终止。

那么组命令和子 shell 命令对什么有好处呢？ 它们都是用来管理重定向的。

```bash
{ ls -l; echo "Listing of foo.txt"; cat foo.txt; } > output.txt
```

使用一个子 shell 是相似的。

```bash
(ls -l; echo "Listing of foo.txt"; cat foo.txt) > output.txt
```

组命令和子 shell 真正闪光的地方是与管道线相结合。 当构建一个管道线命令的时候，通常把几个命令的输出结果合并成一个流是很有用的。 组命令和子 shell 使这种操作变得很简单。

```bash
{ ls -l; echo "Listing of foo.txt"; cat foo.txt; } | lpr
```

这里我们已经把我们的三个命令的输出结果合并在一起，并把它们用管道输送给命令 lpr 的输入，以便产生一个打印报告。

虽然组命令和子 shell 看起来相似，并且它们都能用来在重定向中合并流，但是两者之间有一个很重要的不同。 然而，一个组命令在当前 shell 中执行它的所有命令，而一个子 shell（顾名思义）在当前 shell 的一个 子副本中执行它的命令。这意味着运行环境被复制给了一个新的 shell 实例。当这个子 shell 退出时，环境副本会消失， 所以在子 shell 环境（包括变量赋值）中的任何更改也会消失。因此，在大多数情况下，除非脚本要求一个子 shell， 组命令比子 shell 更受欢迎。组命令运行很快并且占用的内存也少。

当我们发现管道线中的一个 read 命令 不按我们所期望的那样工作的时候。为了重现问题，我们构建一个像这样的管道线：

```bash
echo "foo" | read
echo $REPLY
```

该 REPLY 变量的内容总是为空，是因为这个 read 命令在一个子 shell 中执行，所以它的 REPLY 副本会被毁掉， 当该子 shell 终止的时候。因为管道线中的命令总是在子 shell 中执行，任何给变量赋值的命令都会遭遇这样的问题。 幸运地是，shell 提供了一种奇异的展开方式，叫做进程替换，它可以用来解决这种麻烦。进程替换有两种表达方式：

一种适用于产生标准输出的进程：

```bash
<(list)
```

另一种适用于接受标准输入的进程：

```bash
>(list)
```

这里的 list 是一串命令列表：

为了解决我们的 read 命令问题，我们可以雇佣进程替换，像这样。

```bash
read < <(echo "foo")
echo $REPLY
```

进程替换允许我们把一个子 shell 的输出结果当作一个用于重定向的普通文件。事实上，因为它是一种展开形式，我们可以检验它的真实值：

```bash
[me@linuxbox ~]$ echo <(echo "foo")
/dev/fd/63
```

通过使用 echo 命令，查看展开结果，我们看到子 shell 的输出结果，由一个名为 /dev/fd/63 的文件提供。
