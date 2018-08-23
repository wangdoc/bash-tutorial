# 函数

## 基本用法

函数是一段可以重复执行的代码。

下面是定义函数的语法。

```bash
function function_name {
  echo "Hello, World"
}
```

使用时，直接写函数名即可。

```bash
$ function_name
```

如果有参数，就跟在函数名后面。

```bash
$ function_name arg1 arg2 arg3
```

下面是脚本里面定义函数并调用的例子。

```bash
 #! /bin/bash
 function print_msg {
   echo "Hello, World"
 }
 print_msg
```

定义函数以后，脚本要加上可执行属性。

```bash
$ chmod +x function.sh
$ ./function.sh
Hello, World
```

## 参数

函数体内部使用`$`作为参数的前缀，比如`$1`就表示第一个参数，`$2`就表示第二个参数，以此类推。

```bash
function print_msg {
  echo "Hello $1"
}
```

上面代码中，`$1`表示第一个参数。

```bash
$ print_msg world
Hello world
```

下面是一个日志函数的例子。

```bash
function log_msg {
  echo "[`date '+ %F %T'` ]: $@"
}
```

使用方法如下。

```bash
$ log_msg "This is sample log message"
[ 2018-08-16 19:56:34 ]: This is sample log message
```

## 返回值

`return`命令用于从函数返回一个值。

```bash
function func_return_value {
  return 10
}
```

函数将返回值返回给调用者。如果命令行直接执行函数，下一个命令可以用`$?`拿到返回值。

```bash
$ func_return_value
$ echo "Value returned by function is: $?"
Value returned by function is: 10
```

## 参考链接

- [How to define and use functions in Linux Shell Script](https://www.linuxtechi.com/define-use-functions-linux-shell-script/), by Pradeep Kumar 
