# 条件结构

## if

`if`语句提供语法的判断结构。

```bash
if commands; then
     commands
[elif commands; then
     commands...]
[else
     commands]
fi
```

`case`语句用于变量值可能有多种情况的判断。

```bash
case expression in
    pattern1 )
        statements ;;
    pattern2 )
        statements ;;
    ...
esac
```

常用的判断表达式有以下这些。

```bash
statement1 && statement2  # both statements are true
statement1 || statement2  # one of the statement is true

str1=str2       # str1 matches str2
str1!=str2      # str1 does not match str2
str1<str2       # str1 is less than str2
str1>str2       # str1 is greater than str2
-n str1         # str1 is not null (has length greater than 0)
-z str1         # str1 is null (has length 0)

-a file         # file exists
-d file         # file exists and is a directory
-e file         # file exists; same -a
-f file         # file exists and is a regular file (i.e., not a directory or other special type of file)
-r file         # you have read permission
-r file         # file exists and is not empty
-w file         # your have write permission
-x file         # you have execute permission on file, or directory search permission if it is a directory
-N file         # file was modified since it was last read
-O file         # you own file
-G file         # file's group ID matches yours (or one of yours, if you are in multiple groups)

file1 -nt file2     # file1 is newer than file2
file1 -ot file2     # file1 is older than file2

-lt     # less than
-le     # less than or equal
-eq     # equal
-ge     # greater than or equal
-gt     # greater than
-ne     # not equal
```

下面是一个例子。

```bash
x=5
if [ $x = 5 ]; then
    echo "x equals 5."
else
    echo "x does not equal 5."
fi
```

Bash提供了`true`和`false`命令，它们可以与`if`结合使用。

```bash
$ if true; then echo "It's true."; fi
It's true.
$ if false; then echo "It's true."; fi
$
```

## 判断条件

`if`语句后面紧跟一个判断条件。它有三种写法。

```bash
# 写法一
test expression

# 写法二
[ expression ]

# 写法三
[[ expression ]]
```

上面的`expression`是一个表达式，其执行结果是`true`或者是`false`。当表达式为真时，这个`test`命令返回的退出状态为0，当表达式为假时，`test`命令退出状态为1。

写法三比前两种写法多出一个功能，就是支持正则判断，详见后文。

### 文件表达式

以下表达式用来测试文件状态。

- `file1 -ef file2`	file1 和 file2 拥有相同的索引号（通过硬链接两个文件名指向相同的文件）。
- `file1 -nt file2`	file1新于 file2。
- `file1 -ot file2`	file1早于 file2。
- `-b file`	file 存在并且是一个块（设备）文件。
- `-c file`	file 存在并且是一个字符（设备）文件。
- `-d file`	file 存在并且是一个目录。
- `-e file`	file 存在。
- `-f file`	file 存在并且是一个普通文件。
- `-g file`	file 存在并且设置了组 ID。
- `-G file`	file 存在并且由有效组 ID 拥有。
- `-k file`	file 存在并且设置了它的“sticky bit”。
- `-L file`	file 存在并且是一个符号链接。
- `-O file`	file 存在并且由有效用户 ID 拥有。
- `-p file`	file 存在并且是一个命名管道。
- `-r file`	file 存在并且可读（有效用户有可读权限）。
- `-s file`	file 存在且其长度大于零。
- `-S file`	file 存在且是一个网络 socket。
- `-t fd`	fd 是一个定向到终端／从终端定向的文件描述符 。 这可以被用来决定是否重定向了标准输入／输出错误。
- `-u file`	file 存在并且设置了 setuid 位。
- `-w file`	file 存在并且可写（有效用户拥有可写权限）。
- `-x file`	file 存在并且可执行（有效用户有执行／搜索权限）。

下面的脚本用来测试文件状态。

```bash
#!/bin/bash
# test-file: Evaluate the status of a file
FILE=~/.bashrc
if [ -e "$FILE" ]; then
    if [ -f "$FILE" ]; then
        echo "$FILE is a regular file."
    fi
    if [ -d "$FILE" ]; then
        echo "$FILE is a directory."
    fi
    if [ -r "$FILE" ]; then
        echo "$FILE is readable."
    fi
    if [ -w "$FILE" ]; then
        echo "$FILE is writable."
    fi
    if [ -x "$FILE" ]; then
        echo "$FILE is executable/searchable."
    fi
else
    echo "$FILE does not exist"
    exit 1
fi
exit
```

上面代码中，`$FILE`放在双引号之中。这样可以防止`$FILE`为空的错误，因为只要放在双引号之中，返回的就总是一个字符串。另外，叫不最后的`exit`命令，可以保证如果没有出错，退出状态总是为0。

### 字符串表达式

以下表达式用来计算字符串。

- `string`	string 不为 null。
- `-n string`	字符串 string 的长度大于零。
- `-z string`	字符串 string 的长度为零。
- `string1 = string2` string1 和 string2 相同
- `string1 == string2` string1 和 string2 相同
- `string1 != string2`	string1 和 string2 不相同。
- `string1 > string2`	sting1 排列在 string2 之后。
- `string1 < string2`	string1 排列在 string2 之前。

注意，`>`和`<`表达式操作符必须用引号引起来（或者是用反斜杠转义）， 当与`test`一块使用的时候。如果不这样，它们会被 shell 解释为重定向操作符。

下面是一个用法的例子。

```bash
#!/bin/bash
# test-string: evaluate the value of a string
ANSWER=maybe
if [ -z "$ANSWER" ]; then
    echo "There is no answer." >&2
    exit 1
fi
if [ "$ANSWER" = "yes" ]; then
    echo "The answer is YES."
elif [ "$ANSWER" = "no" ]; then
    echo "The answer is NO."
elif [ "$ANSWER" = "maybe" ]; then
    echo "The answer is MAYBE."
else
    echo "The answer is UNKNOWN."
fi
```

上面代码中，我们首先确定`$ANSWER`字符串是否为空。如果为空，我们就终止脚本，并把退出状态设为零。注意这个应用于echo 命令的重定向操作。其把错误信息 “There is no answer.” 重定向到标准错误，这是处理错误信息的“合理”方法。如果字符串不为空，我们就计算 字符串的值，看看它是否等于“yes,” “no,” 或者“maybe”。为此使用了 elif，它是 “else if” 的简写。 通过使用 elif，我们能够构建更复杂的逻辑测试。

### 整型表达式

下面的表达式用于整数。

- `integer1 -eq integer2`	integer1 等于 integer2.
- `integer1 -ne integer2`	integer1 不等于 integer2.
- `integer1 -le integer2`	integer1 小于或等于 integer2.
- `integer1 -lt integer2`	integer1 小于 integer2.
- `integer1 -ge integer2`	integer1 大于或等于 integer2.
- `integer1 -gt integer2`	integer1 大于 integer2.

下面是一个用法的例子。

```bash
#!/bin/bash
# test-integer: evaluate the value of an integer.
INT=-5
if [ -z "$INT" ]; then
    echo "INT is empty." >&2
    exit 1
fi
if [ $INT -eq 0 ]; then
    echo "INT is zero."
else
    if [ $INT -lt 0 ]; then
        echo "INT is negative."
    else
        echo "INT is positive."
    fi
    if [ $((INT % 2)) -eq 0 ]; then
        echo "INT is even."
    else
        echo "INT is odd."
    fi
fi
```

这个脚本中有趣的地方是怎样来确定一个整数是偶数还是奇数。通过用模数2对数字执行求模操作， 就是用数字来除以2，并返回余数，从而知道数字是偶数还是奇数。

### 正则表达式

`[[ expression ]]`这种判断形式，类似于 test 命令（支持所有的表达式），但是还支持正则表达式。

```bash
string1 =~ regex
```

下面是一个例子。

```bash
#!/bin/bash
# test-integer2: evaluate the value of an integer.
INT=-5
if [[ "$INT" =~ ^-?[0-9]+$ ]]; then
    if [ $INT -eq 0 ]; then
        echo "INT is zero."
    else
        if [ $INT -lt 0 ]; then
            echo "INT is negative."
        else
            echo "INT is positive."
        fi
        if [ $((INT % 2)) -eq 0 ]; then
            echo "INT is even."
        else
            echo "INT is odd."
        fi
    fi
else
    echo "INT is not an integer." >&2
    exit 1
fi
```

上面代码中，先判断一个变量是否为正数或负数，如果是的话，再进行进一步判断。

下面是进行文件类型判断的例子。

```bash
$ FILE=foo.bar
$ if [[ $FILE == foo.* ]]; then
> echo "$FILE matches pattern 'foo.*'"
> fi
foo.bar matches pattern 'foo.*'
```

### 算术表达式

除了`[[ ]]`复合命令之外，bash 也提供了`(( ))`，用来执行算术真测试。如果算术计算的结果是非零值，则一个算术真测试值为真。

```bash
$ if ((1)); then echo "It is true."; fi
It is true.
$ if ((0)); then echo "It is true."; fi
$
```

下面是改造过的数值判断的脚本。

```bash
#!/bin/bash
# test-integer2a: evaluate the value of an integer.
INT=-5
if [[ "$INT" =~ ^-?[0-9]+$ ]]; then
    if ((INT == 0)); then
        echo "INT is zero."
    else
        if ((INT < 0)); then
            echo "INT is negative."
        else
            echo "INT is positive."
        fi
        if (( ((INT % 2)) == 0)); then
            echo "INT is even."
        else
            echo "INT is odd."
        fi
    fi
else
    echo "INT is not an integer." >&2
    exit 1
fi
```

注意，`(( ))`只处理整数。

### 表达式的结合

通过逻辑操作符，可以把表达式结合起来创建更复杂的计算。三个逻辑操作是 AND，OR，和 NOT。`test`和`[[ ]]`使用不同的操作符来表示这些操作。

|操作符|测试|`[[ ]]` and `(( ))`|
|------|----|-------------------|
|AND|`-a`|`&&`|
|OR|`-o`|`||`|
|NOT|`!`|`!`|

下面是一个AND操作的例子。

```bash
#!/bin/bash
# test-integer3: determine if an integer is within a
# specified range of values.
MIN_VAL=1
MAX_VAL=100
INT=50
if [[ "$INT" =~ ^-?[0-9]+$ ]]; then
    if [[ INT -ge MIN_VAL && INT -le MAX_VAL ]]; then
        echo "$INT is within $MIN_VAL to $MAX_VAL."
    else
        echo "$INT is out of range."
    fi
else
    echo "INT is not an integer." >&2
    exit 1
fi
```

使用否定操作符`!`时，最好用圆括号确定转义的范围。

```bash
if [ ! \( $INT -ge $MIN_VAL -a $INT -le $MAX_VAL \) ]; then
    echo "$INT is outside $MIN_VAL to $MAX_VAL."
else
    echo "$INT is in range."
fi
```

因为 test 使用的所有的表达式和操作符都被 shell 看作是命令参数， 对于 bash 有特殊含义的字符，比如说 `<`，`>`，`(`，和 `)`，（圆括号解释为子Shell环境）必须引起来或者是转义。

### 控制操作符

bash 支持两种可以执行分支任务的控制操作符。这个`&&`（AND）和`||`（OR）操作符作用如同 复合命令`[[ ]]`中的逻辑操作符。

```bash
command1 && command2

command1 || command2
```

对于`&&`操作符，先执行 command1，如果并且只有如果 command1 执行成功后， 才会执行 command2。对于`||`操作符，先执行 command1，如果并且只有如果 command1 执行失败后， 才会执行 command2。

```bash
$ mkdir temp && cd temp
```

上面的命令会创建一个名为 temp 的目录，并且若它执行成功后，当前目录会更改为 temp。第二个命令会尝试 执行只有当 mkdir 命令执行成功之后。

```bash
$ [ -d temp ] || mkdir temp
```

上面的命令会测试目录 temp 是否存在，并且只有测试失败之后，才会创建这个目录。这种构造类型非常有助于在脚本中处理错误。

```bash
[ -d temp ] || exit 1
```

上面的命令中，如果`temp`目录不存在，脚本会终止，并返回退出状态1。

## case

Bash 的多选复合命令称为 case。

```bash
case word in
    [pattern [| pattern]...) commands ;;]...
esac
```

下面是用`case`命令改写的菜单程序。

```bash
#!/bin/bash
# case-menu: a menu driven system information program
clear
echo "
Please Select:
1. Display System Information
2. Display Disk Space
3. Display Home Space Utilization
0. Quit
"
read -p "Enter selection [0-3] > "
case $REPLY in
    0)  echo "Program terminated."
        exit
        ;;
    1)  echo "Hostname: $HOSTNAME"
        uptime
        ;;
    2)  df -h
        ;;
    3)  if [[ $(id -u) -eq 0 ]]; then
            echo "Home Space Utilization (All Users)"
            du -sh /home/*
        else
            echo "Home Space Utilization ($USER)"
            du -sh $HOME
        fi
        ;;
    *)  echo "Invalid entry" >&2
        exit 1
        ;;
esac
```

`case`命令的模式的一些例子。

- `a)`	若单词为 “a”，则匹配
- `[[:alpha:]])`	若单词是一个字母字符，则匹配
- `???)`	若单词只有3个字符，则匹配
- `*.txt)`	若单词以 “.txt” 字符结尾，则匹配
- `*)`	匹配任意单词。把这个模式做为 case 命令的最后一个模式，可以捕捉到任意一个与先前模式不匹配的数值；也就是说，捕捉到任何可能的无效值。

下面是一个模式的实例。

```bash
#!/bin/bash
read -p "enter word > "
case $REPLY in
    [[:alpha:]])        echo "is a single alphabetic character." ;;
    [ABC][0-9])         echo "is A, B, or C followed by a digit." ;;
    ???)                echo "is three characters long." ;;
    *.txt)              echo "is a word ending in '.txt'" ;;
    *)                  echo "is something else." ;;
esac
```

还可以使用竖线字符作为分隔符，把多个模式结合起来。这就创建了一个 “或” 条件模式。这对于处理诸如大小写字符很有用处。

```bash
case $REPLY in
q|Q) echo "Program terminated."
     exit
     ;;
a|A) echo "Hostname: $HOSTNAME"
     uptime
     ;;
b|B) df -h
     ;;
c|C) if [[ $(id -u) -eq 0 ]]; then
         echo "Home Space Utilization (All Users)"
         du -sh /home/*
     else
         echo "Home Space Utilization ($USER)"
         du -sh $HOME
     fi
     ;;
*)   echo "Invalid entry" >&2
     exit 1
     ;;
esac
```

Bash 4.0之前，一个条件只能匹配一个模式，然后就退出`case`语句块。Bash 4.0之后，允许一个条件可以匹配多个模式，这时可以用`;;&`终止每个条件块。

```bash
#!/bin/bash
# case4-2: test a character
read -n 1 -p "Type a character > "
echo
case $REPLY in
    [[:upper:]])    echo "'$REPLY' is upper case." ;;&
    [[:lower:]])    echo "'$REPLY' is lower case." ;;&
    [[:alpha:]])    echo "'$REPLY' is alphabetic." ;;&
    [[:digit:]])    echo "'$REPLY' is a digit." ;;&
    [[:graph:]])    echo "'$REPLY' is a visible character." ;;&
    [[:punct:]])    echo "'$REPLY' is a punctuation symbol." ;;&
    [[:space:]])    echo "'$REPLY' is a whitespace character." ;;&
    [[:xdigit:]])   echo "'$REPLY' is a hexadecimal digit." ;;&
esac
```

执行上面的脚本，会得到下面的结果。

```bash
$ case4-2
Type a character > a
'a' is lower case.
'a' is alphabetic.
'a' is a visible character.
'a' is a hexadecimal digit.
```

添加的`;;&`，允许 case 语句继续执行下一条测试，而不是简单地终止运行。
