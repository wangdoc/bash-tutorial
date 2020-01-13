# Bash 的基本语法

## 分号

分号`;`是命令的结束符，使得一行可以放置多个命令，上一个命令执行结束后，再执行第二个命令。

```bash
$ clear; ls
```

## 命令的分组和合并

Shell 允许将多个命令分组和合并执行。

```bash
Command1 ; Command2
```

上面命令是，执行完`Command1`，不管是否成功，再继续执行`Command2`。

```bash
Command1 && Command2
```

上面命令是，如果`Command1`命令运行成功，则继续运行`Command2`命令。

```bash
Command1 || Command2
```

上面命令是，如果`Command1`命令运行失败，则继续运行`Command2`命令。

下面是一些例子。

```bash
$ cat filelist.txt ; ls -l filelist.txt
$ cat filelist.txt && ls -l filelist.txt
$ mkdir foo || mkdir bar
```

## if 结构

`if`结构用于条件判断，符合条件时，才会执行指定的命令。它的语法如下。

```bash
if commands; then
commands
[elif commands; then
commands...]
[else
commands]
fi
```

这个命令分成三个部分：`if`、`elif`和`else`。其中，后两个部分是可选的。`if`后面是判断的条件，如果不成立，并且存在`elif`部分，就会进行`elif`判断；如果还不成立，并且存在`else`部分，则会执行`else`代码块。

```bash
if test $USER = "foo"; then
  echo "Hello foo."
else
  echo "You are not foo."
fi
```

上面的例子中，`if test`判断环境变量`$USER`是否等于`foo`，如果等于就输出`Hello foo.`，否则输出其他内容。

`if`结构可以写在一行内。

```bash
$ if true; then echo "It's true."; fi
It's true.

$ if false; then echo "It's true."; fi
```

上面的例子中，`true`和`false`是两个特殊命令，前者代表操作成功，后者代表操作失败。

`if`结构写成下面两种形式，也是可以的。

```bash
# 形式一
if [ -f .bash_profile ]
then
  echo ".bash_profile 文件存在"
else
  echo ".bash_profile 文件不存在"
fi

# 形式二
if [ -f .bash_profile ]
then echo ".bash_profile 文件存在"
else echo ".bash_profile 文件不存在"
fi
```

## test 命令

`if`结构往往与`test`命令一起使用，有两种形式。

```bash
# 第一种形式
test 表达式

# 第二种形式
[ 表达式 ]
```

注意，第二种形式之中，`[`和`]`与内部的表达式之间都必须有空格。

`if test -e filename`判断一个文件是否存在。

```bash
if test -e /tmp/foo.txt ; then
  echo "Found foo.txt"
fi
```

上面的命令也可以写成下面的形式。

```bash
if [ -e /tmp/foo.txt ] ; then
  echo "Found foo.txt"
fi
```

`test`命令的参数如下。

- `-d file`：如果`file`为目录，返回`true`。
- `-e file`：如果`file`文件存在，返回`true`。
- `-f file`：如果`file`文件存在，并且为一个常规文件，返回`true`。
- `-L file`：如果`file`是一个符号链接，返回`true`。
- `-r file`：如果`file`是一个文件，且用户有读权限，返回`true`。
- `-w file`：如果`file`是一个文件，且用户有写权限，返回`true`。
- `-x file`：如果`file`是一个文件，且用户有执行权限，返回`true`。
- `file1 -nt file2`：如果`file1`比`file2`更新（根据修改时间），返回`true`。
- `file1 -ot file2`：如果`file1`比`file2`更旧（根据修改时间），返回`true`。
- `-z string`：如果`string`是一个空字符串，返回`true`。
- `-n string`：如果`string`是一个非空字符串，返回`true`。
- `string1 = string2`：如果`string1`与`string2`相等，返回`true`。
- `string1 != string2`：如果`string1`与`string2`不相等，返回`true`。

## for 循环

foo 循环用于命令的重复执行。

```bash
for i in *.png; do
  ls -l $i
done
```

## 函数

Bash 允许自定义函数，便于代码的复用。函数定义的语法如下。

```bash
funcname(){ ... }
```

下面是一个简单函数的例子。

```bash
hello() { echo "Hello $1"; }
```

上面代码中，函数体里面的`$1`表示命令行的第一个参数。

调用方法如下。

```bash
$ hello world
hello world
```

## 数学运算

`$((expression))`可以计算一个数学表达式。

```bash
$ echo $((2 + 2))
4

$ echo $((5/2))
2

$ echo $((5%2))
1

$ echo $(((5**2) * 3))
75

# 等同于

$ echo $(($((5**2)) * 3))
75
```

它支持的运算符如下。

- `+` 加法
- `-` 减法
- `*` 乘法
- `/` 除法（整除，即商为整数）
- `%` 余数
- `**` 指数

## 子命令

一个 Bash 命令之中，可以使用`$()`加入另一个命令的运行结果。

```bash
$ ls -l $(which cp)
```

上面命令之中，先运行`which cp`（返回`cp`命令的文件路径），然后显示这个文件的详细信息。

还有另一种较老的语法，使用反引号运行子命令，等同于`$()`。

```bash
$ ls -l `which cp`
```

