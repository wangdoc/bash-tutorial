# 引号和转义

Bash 只有一种数据类型，就是字符串。不管用户输入什么数据，Bash 都认为这是字符串。所以，Bash 如何处理字符串是重点学习的内容。

## echo 命令

`echo`命令的作用是输出一行文本，可以将命令的参数原样输出。

```bash
$ echo hello world
hello world
```

默认情况下，`echo`输出的文本末尾会有一个回车符。

`-n`参数可以取消输出末尾的回车符，导致下一行的提示符出紧跟在输出内容的后面。

```bash
$ echo -n hello world
hello world$
```

上面命令中，`world`后面直接就是下一行的提示符。

再看下面的例子。

```bash
$ echo a;echo b
a
b
$ echo -n a;echo b
ab
```

上面代码中，`-n`参数可以让两个`echo`命令的输出连在一起，出现在同一行。

`-e`参数表示会解释引号里面的特殊字符（比如换行符`\n`），不管是双引号还是单引号。默认情况下，引号会让特殊字符变成普通字符，`echo`不解释它们，原样输出。

```bash
$ echo "Hello\nWorld"
Hello\nWorld

$ echo -e "Hello\nWorld"
Hello
World

$ echo -e 'Hello\nWorld'
Hello
World
```

上面代码中，`-e`参数使得`\n`解释为换行符，导致输出内容里面出现换行。

## 空格

Bash 使用空格区分不同的参数。

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

## 双引号

如果命令的参数放在双引号中，会使得 Bash 的特殊字符失去特殊含义，变成普通字符。

```bash
$ echo "*"
*
```

上面命令中，通配符`*`放在双引号之中，就变成了普通字符，会原样输入。

由于双引号将换行符解释为普通字符，所以可以利用双引号，在命令行输入多行文本。

```bash
$ echo "hello
> world"
hello
world
```

上面命令中，Bash 正常情况下会将换行符解释为命令结束，但是换行符在双引号之中就是普通字符，所以可以输入多行。`echo`命令会将换行符原样输出，显示的时候正常解释为换行。

如果文件名包含空格，就可以把它放在双引号之中。

```bash
$ ls "two words.txt"
```

上面命令中，`two words.txt`是一个包含空格的文件名，否则就会被 Bash 当作两个文件。

双引号会原样保存多余的空格。

```bash
$ echo "this is a     test"
this is a     test
```

如果在双引号之中，还要插入双引号，必须使用反斜杠转义。

```bash
$ echo "he said \"hello\"."
he said "hello".
```

有三个字符在双引号之中，不会失去本身的特殊含义：美元符号“$”、反斜杠“\”和反引号“\`”。

```bash
$ echo "$USER $((2+2)) $(cal)"
```

上面命令中，双引号对变量、算术运算和子命令都没有影响，它们会先执行，然后再通过`echo`命令输出。

双引号之中，如果想让美元符号、斜杠和反引号变成普通字符，可以在它们前面加上反斜杠。

```bash
$ echo "The balance for user $USER is: \$5.00"
The balance for user me is: $5.00
```

双引号还可以一个作用，就是保存原始命令的输出格式。

```bash
# 单行输出
$ echo $(cal)
一月 2020 日 一 二 三 四 五 六 1 2 3 ... 31

# 原始格式输出
$ echo "$(cal)"
      一月 2020
日 一 二 三 四 五 六
          1  2  3  4
 5  6  7  8  9 10 11
12 13 14 15 16 17 18
19 20 21 22 23 24 25
26 27 28 29 30 31
```

上面命令中，如果`$(cal)`不放在双引号之中，`echo`就会将所有结果以单行输出，丢弃了所有原始的格式。

## 单引号

单引号的用法与双引号很类似，除了不会对美元符号、斜杠和反引号转义。也就是说，单引号之中所有字符都会变成普通字符。

```bash
$ echo '*'
*

$ echo '$USER'
$USER

$ echo '$((2+2))'
$((2+2))

$ echo '$(echo foo)'
$(echo foo)
```

上面命令中，单引号使得 Bash 扩展、变量引用、算术运算和子命令，都失效了。

如果单引号之中，还要使用单引号，需要使用反斜杠转移，然后在字符串前面加上一个美元符号（`$`）。

```bash
$ echo $'I\'m a student.'
I\'m a student.
```

## 转义

参数之中的特殊符号，都可以用反斜线转义，使其变成普通字符。

```bash
$ mv bad\&filename good_filename
```

上面命令中，文件名`bad&filename`之中有一个 Bash 的特殊字符`&`，引用的时候需要用反斜杠转义。

如果需要对反斜线本身转义，则需要连续使用两个反斜线（`//`）。

```bash
$ echo \\
\
```

反斜线还可以用来在命令行表示特殊符号。

- `\a`：响铃
- `\b`：退格
- `\n`：换行
- `\r`：回车
- `\t`：制表符

`echo`命令的`-e`参数，可以解释双引号之中的这些特殊符号。

```bash
$ echo "Time's up\n"
Time's up\n

$ echo -e "Time's up\n"
Time's up

```

上面命令中，双引号会让特殊字符`\n`变成普通字符。`echo`命令的`-e`参数则会正确解释这些特殊字符。

## Here 字符串

Here 字符串是一种输入多行字符串的方法，格式如下。

```bash
[command] << token
字
符
串
内
容
token
```

它的格式分成开始标记和结束标记。开始标记是两个小于号 + Here 字符串的名称，名称可以随意取；结束标记是单独一行的 Here 字符串名称。两者之间就是多行字符串的内容。

下面是一个输出 HTML 代码的例子。

```bash
$ cat << _EOF_
<html>
<head>
    <title>
    The title of your page
    </title>
</head>

<body>
    Your page content goes here.
</body>
</html>
_EOF_
```

