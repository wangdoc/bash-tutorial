# Bash 的基本语法

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

`if`结构用于条件判断。

```bash
if test $USER = "foo"; then
  echo "Hello foo."
else
  echo "You are not foo."
fi
```

`if test -e filename`判断文件是否存在。

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

