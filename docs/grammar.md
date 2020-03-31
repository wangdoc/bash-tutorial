# Bash 的基本语法

本章介绍 Bash 的最基本语法。

## echo 命令

由于后面的例子会大量用到`echo`命令，这里先介绍这个命令。

`echo`命令的作用是在屏幕输出一行文本，可以将该命令的参数原样输出。

```bash
$ echo hello world
hello world
```

上面例子中，`echo`的参数是`hello world`，可以原样输出。

如果想要输出的是多行文本，即包括换行符。这时需要把多行文本放在引号里面。

```bash
$ echo "<HTML>
    <HEAD>
          <TITLE>Page Title</TITLE>
    </HEAD>
    <BODY>
          Page body.
    </BODY>
</HTML>"
```

上面例子中，`echo`可以原样输出多行文本。

### `-n`参数

默认情况下，`echo`输出的文本末尾会有一个回车符。`-n`参数可以取消末尾的回车符，使得下一个提示符紧跟在输出内容的后面。

```bash
$ echo -n hello world
hello world$
```

上面例子中，`world`后面直接就是下一行的提示符`$`。

```bash
$ echo a;echo b
a
b

$ echo -n a;echo b
ab
```

上面例子中，`-n`参数可以让两个`echo`命令的输出连在一起，出现在同一行。

### `-e`参数

`-e`参数会解释引号（双引号和单引号）里面的特殊字符（比如换行符`\n`）。如果不使用`-e`参数，即默认情况下，引号会让特殊字符变成普通字符，`echo`不解释它们，原样输出。

```bash
$ echo "Hello\nWorld"
Hello\nWorld

# 双引号的情况
$ echo -e "Hello\nWorld"
Hello
World

# 单引号的情况
$ echo -e 'Hello\nWorld'
Hello
World
```

上面代码中，`-e`参数使得`\n`解释为换行符，导致输出内容里面出现换行。

## 空格

Bash 使用空格（或 Tab 键）区分不同的参数。

```bash
$ command foo bar
```

上面命令中，`foo`和`bar`之间有一个空格，所以 Bash 认为它们是两个参数。

如果参数之间有多个空格，Bash 会自动忽略多余的空格。

```bash
$ echo this is a     test
this is a test
```

上面命令中，`a`和`test`之间有多个空格，Bash 会忽略多余的空格。

## 分号

分号（`;`）是命令的结束符，使得一行可以放置多个命令，上一个命令执行结束后，再执行第二个命令。

```bash
$ clear; ls
```

上面例子中，Bash 先执行`clear`命令，执行完成后，再执行`ls`命令。

注意，使用分号时，第二个命令总是接着第一个命令执行，不管第一个命令执行成功或失败。

## 命令的组合符`&&`和`||`

除了分号，Bash 还提供两个命令组合符`&&`和`||`，允许更好地控制多个命令之间的继发关系。

```bash
Command1 && Command2
```

上面命令的意思是，如果`Command1`命令运行成功，则继续运行`Command2`命令。

```bash
Command1 || Command2
```

上面命令的意思是，如果`Command1`命令运行失败，则继续运行`Command2`命令。

下面是一些例子。

```bash
$ cat filelist.txt ; ls -l filelist.txt
```

上面例子中，只要`cat`命令执行结束，不管成功或失败，都会继续执行`ls`命令。

```bash
$ cat filelist.txt && ls -l filelist.txt
```

上面例子中，只有`cat`命令执行成功，才会继续执行`ls`命令。如果`cat`执行失败（比如不存在文件`flielist.txt`），那么`ls`命令就不会执行。

```bash
$ mkdir foo || mkdir bar
```

上面例子中，只有`mkdir foo`命令执行失败（比如`foo`目录已经存在），才会继续执行`mkdir bar`命令。如果`mkdir foo`命令执行成功，就不会创建`bar`目录了。

