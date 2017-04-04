# 错误处理

## 设置条件

```bash
cd $dir_name
rm *
```

上面脚本是有问题的，如果`$dir_name`是一个不存在的目录，会删光当前目录的文件。

```bash
cd $dir_name && rm *
```

上面脚本也有问题，如果`$dir_name`变量为空，会删光用户主目录的文件。

正确写法是下面的写法。

```bash
[[ -d $dir_name ]] && cd $dir_name && rm *
```

如果不放心删除什么文件，可以先打印出来看一下。

```bash
[[ -d $dir_name ]] && cd $dir_name && echo rm *
```

## Bash的`-x`参数

Bash的`-x`参数可以在执行每一行命令之前，打印该命令。

```bash
#!/bin/bash -x
# trouble: script to demonstrate common errors
number=1
if [ $number = 1 ]; then
    echo "Number is equal to 1."
else
    echo "Number is not equal to 1."
fi
```

上面的脚本执行之后，会输出每一行命令。

```bash
$ trouble
+ number=1
+ '[' 1 = 1 ']'
+ echo 'Number is equal to 1.'
Number is equal to 1.
```

输出的命令之前的`+`号，是由系统变量`PS4`决定，可以修改这个变量。

```bash
$ export PS4='$LINENO + '
$ trouble
5 + number=1
7 + '[' 1 = 1 ']'
8 + echo 'Number is equal to 1.'
Number is equal to 1.
```

## set命令

`set`允许改变Shell的参数值，或设置新的参数。

```bash
# 打开bash的一个选项
set -LETTER

# 关闭bash的一个选项
set +LETTER

set -x # 打开debugging，执行的每条命令都会显示在终端
# your commands go here...
set +x # 关闭debugging

# 只要有一个命令或管道返回非零值，脚本就退出。
# 脚本的默认行为是忽略运行中的错误
# e 表示 errexit
set -e

# 只要脚本中有未定义的变量，脚本就会退出
set -u
```

下面的例子会输出`x`。

```javascript
foo() {
    echo 'x'
    return 42
}

out=$(foo)
echo $out
```

上面代码的顶部，加上`set -e`以后，就没有任何输出。

`set`命令的`-x`参数，也可以在执行每一条命令之前，打印出该命令。

```bash
#!/bin/bash
# trouble: script to demonstrate common errors
number=1
set -x # Turn on tracing
if [ $number = 1 ]; then
    echo "Number is equal to 1."
else
    echo "Number is not equal to 1."
fi
set +x # Turn off tracing
```
