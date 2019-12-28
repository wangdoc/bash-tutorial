# Shell 简介

## Shell 是什么

Shell 的原意是“外壳”，跟 kernel （内核）相对应，指的是用户使用的跟内核交互的接口。对于 Linux 系统来说，就是命令行。用户通过命令行，发送命令给内核，接收内核的返回结果。

Shell 主要是一个命令解释器，解释用户输入的命令。同时，它也是一种编程语言，可以编写程序，支持变量、条件语句和循环。

目前，存在多种 Shell，最常见的是 Bash，它是大多数 Linux 发行版的默认 Shell。

## 历史

Shell 伴随着 Unix 系统的诞生而诞生。1969年，Ken Thompson 和 Dennis Ritchie 开发了第一版的 Unix。1971年，Ken Thompson 编写了最初的 Shell，称为 Thompson shell。它的程序名是`sh`。最初的时候，Shell 只是一个命令解释器，将用户的输入按照空格分成几个部分，第一部分是命令，后面的都是该命令的参数。

1973年至1975年间，John R. Mashey 扩展了最初的 Thompson shell，添加了编程功能，使得 Shell 成为一种高级编程语言。这个版本的 Shell 称为 Mashey shell。

1976年开始，Stephen Bourne 结合 Mashey shell 的功能，重写一个新的 Shell，称为 Bourne shell。1979年发布的 UNIX 第7版包含了这个 Shell。

Thompson shell、Mashey shell 和 Bourne shell 都是贝尔实验室的产品，程序名都是`sh`。对于用户来说，它们是同一个东西，只是底层版本不同而已。

同一时期，加州大学伯克利分校的 Bill Joy 开发了 C shell，程序名是`csh`。它是第一个真正替代`sh`的 UNIX shell，被合并到 Berkeley UNIX 的 2BSD 版本中。

20世纪80年代早期，David Korn 开发了Korn shell，程序名是`ksh`。

1985年，Richard Stallman 成立了自由软件基金会（FSF），决定写一个具有自由版本的、属于 GNU 许可证的 Shell，避免 Unix 的版权争议。1988年，自由软件基金会的第一个付薪程序员 Brian Fox 写了一个 Shell，功能基本上是 Bourne shell 的克隆，叫做 Bourne-Again SHell，简称 Bash，程序名也是`bash`。后来，它逐渐成为 Linux 系统的标准 Shell。

## 用法

Shell 的用法基本都是下面的格式。

```bash
$ command [ arg1 ... [ argN ]
```

上面代码中，`command`是可执行文件或命令，`arg1 ... argN`是传递给命令的参数，它们是可选的。

## 内部命令和外部程序

Shell 本身提供了很多内部命令，但也可以在 Shell 之中调用外部程序。那么，怎么知道一个命令是内部命令，还是外部程序呢？

Shell 提供了`type`命令，用来判断命令的来源。

```bash
$ type echo
echo is a shell builtin
$ type ls
ls is hashed (/bin/ls)
```

上面代码中，`echo`是内部命令，`ls`是外部程序（`/bin/ls`）。
