# awk

[`awk`](https://en.wikipedia.org/wiki/AWK)是处理文本文件的一个应用程序，几乎所有 Linux 系统都自带这个程序。

它依次处理文件的每一行，并读取里面的每一个字段。对于日志、CSV 那样的每行格式相同的文本文件，`awk`可能是最方便的工具。

![](https://www.wangbase.com/blogimg/asset/201811/bg2018110702.jpg)

`awk`其实不仅仅是工具软件，还是一种编程语言。不过，这里只介绍它的命令行用法，对于大多数场合，应该足够用了。

## 基本用法

`awk`的基本用法就是下面的形式。

```bash
# 格式
$ awk 动作 文件名

# 示例
$ awk '{print $0}' demo.txt
```

上面示例中，`demo.txt`是`awk`所要处理的文本文件。前面单引号内部有一个大括号，里面就是每一行的处理动作`print $0`。其中，`print`是打印命令，`$0`代表当前行，因此上面命令的执行结果，就是把每一行原样打印出来。

下面，我们先用标准输入（stdin）演示上面这个例子。

```bash
$ echo 'this is a test' | awk '{print $0}'
this is a test
```

上面代码中，`print $0`就是把标准输入`this is a test`，重新打印了一遍。

`awk`会根据空格和制表符，将每一行分成若干字段，依次用`$1`、`$2`、`$3`代表第一个字段、第二个字段、第三个字段等等。

```bash
$ echo 'this is a test' | awk '{print $3}'
a
```

上面代码中，`$3`代表`this is a test`的第三个字段`a`。

下面，为了便于举例，我们把`/etc/passwd`文件保存成`demo.txt`。

```bash
root:x:0:0:root:/root:/usr/bin/zsh
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
```

这个文件的字段分隔符是冒号（`:`），所以要用`-F`参数指定分隔符为冒号。然后，才能提取到它的第一个字段。

```bash
$ awk -F ':' '{ print $1 }' demo.txt
root
daemon
bin
sys
sync
```

## 变量

除了`$ + 数字`表示某个字段，`awk`还提供其他一些变量。

变量`NF`表示当前行有多少个字段，因此`$NF`就代表最后一个字段。

```bash
$ echo 'this is a test' | awk '{print $NF}'
test
```

`$(NF-1)`代表倒数第二个字段。

```
$ awk -F ':' '{print $1, $(NF-1)}' demo.txt
root /root
daemon /usr/sbin
bin /bin
sys /dev
sync /bin
```

上面代码中，`print`命令里面的逗号，表示输出的时候，两个部分之间使用空格分隔。

变量`NR`表示当前处理的是第几行。

```bash
$ awk -F ':' '{print NR ") " $1}' demo.txt
1) root
2) daemon
3) bin
4) sys
5) sync
```

上面代码中，`print`命令里面，如果原样输出字符，要放在双引号里面。

`awk`的其他内置变量如下。

> - `FILENAME`：当前文件名
> - `FS`：字段分隔符，默认是空格和制表符。
> - `RS`：行分隔符，用于分割每一行，默认是换行符。
> - `OFS`：输出字段的分隔符，用于打印时分隔字段，默认为空格。
> - `ORS`：输出记录的分隔符，用于打印时分隔记录，默认为换行符。
> - `OFMT`：数字输出的格式，默认为`％.6g`。

## 函数

 `awk`还提供了一些内置函数，方便对原始数据的处理。

函数`toupper()`用于将字符转为大写。

```bash
$ awk -F ':' '{ print toupper($1) }' demo.txt
ROOT
DAEMON
BIN
SYS
SYNC
```

上面代码中，第一个字段输出时都变成了大写。

其他常用函数如下。

> - `tolower()`：字符转为小写。
> - `length()`：返回字符串长度。
> - `substr()`：返回子字符串。
> - `sin()`：正弦。
> - `cos()`：余弦。
> - `sqrt()`：平方根。
> - `rand()`：随机数。

`awk`内置函数的完整列表，可以查看[手册](https://www.gnu.org/software/gawk/manual/html_node/Built_002din.html#Built_002din)。

## 条件

`awk`允许指定输出条件，只输出符合条件的行。

输出条件要写在动作的前面。

```bash
$ awk '条件 动作' 文件名
```

请看下面的例子。

```bash
$ awk -F ':' '/usr/ {print $1}' demo.txt
root
daemon
bin
sys
```

上面代码中，`print`命令前面是一个正则表达式，只输出包含`usr`的行。

下面的例子只输出奇数行，以及输出第三行以后的行。

```bash
# 输出奇数行
$ awk -F ':' 'NR % 2 == 1 {print $1}' demo.txt
root
bin
sync

# 输出第三行以后的行
$ awk -F ':' 'NR >3 {print $1}' demo.txt
sys
sync
```

下面的例子输出第一个字段等于指定值的行。

```bash
$ awk -F ':' '$1 == "root" {print $1}' demo.txt
root

$ awk -F ':' '$1 == "root" || $1 == "bin" {print $1}' demo.txt
root
bin
```

## if 语句

`awk`提供了`if`结构，用于编写复杂的条件。

```bash
$ awk -F ':' '{if ($1 > "m") print $1}' demo.txt
root
sys
sync
```

上面代码输出第一个字段的第一个字符大于`m`的行。

`if`结构还可以指定`else`部分。

```bash
$ awk -F ':' '{if ($1 > "m") print $1; else print "---"}' demo.txt
root
---
---
sys
sync
```

## 参考链接

- [An Awk tutorial by Example](https://gregable.com/2010/09/why-you-should-know-just-little-awk.html), Greg Grothaus
- [30 Examples for Awk Command in Text Processing](https://likegeeks.com/awk-command/), Mokhtar Ebrahim




