# 条件判断

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

这个命令分成三个部分：`if`、`elif`和`else`。其中，后两个部分是可选的。

`if`后面是判断的条件，如果不成立，并且存在`elif`部分，就会进行`elif`判断；如果还不成立，并且存在`else`部分，则会执行`else`代码块。

```bash
if test $USER = "foo"; then
  echo "Hello foo."
else
  echo "You are not foo."
fi
```

上面的例子中，`if test`判断环境变量`$USER`是否等于`foo`，如果等于就输出`Hello foo.`，否则输出其他内容。

```bash
if true
then
  echo 'hello world'
fi

if false
then
  echo 'it is false' # 本行不会执行
fi
```

上面的例子中，`true`和`false`是两个特殊命令，前者代表操作成功，后者代表操作失败。

除了多行的写法，`if`结构也可以写成单行。

```bash
$ if true; then echo 'hello world'; fi
hello world

$ if false; then echo "It's true."; fi
```

注意，`if`后面可以是一个值，也可以是一条命令，判断命令运行的结果。

```bash
$ if echo 'hi'; then echo 'hello world'; fi
hi
hello world
```

上面命令中，`if`后面是一条命令。该命令会执行，如果返回值是`0`，则执行`then`的部分。

`if`后面可以跟任意数量的命令。这时，所有命令都会执行，但是判断真伪只看最后一个命令，即使前面所有命令都失败，只要最后一个命令返回`0`，就会执行`then`的部分。

```bash
$ if false; true; then echo 'hello world'; fi
hello world
$ if true; false; then echo 'hello world'; fi
$
```

上面代码中，`then`的部分是否执行，完全取决于`if`部分的最后一个命令。

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

`elif`语句可以有多条。

```bash
#!/bin/bash

echo -n "输入一个1到3之间的数字（包含两端）> "
read character
if [ "$character" = "1" ]; then
    echo 1
elif [ "$character" = "2" ]; then
    echo 2
elif [ "$character" = "3" ]; then
    echo 3
else
    echo 输入不符合要求
fi
```

## test 命令

`if`结构往往与`test`命令一起使用，有三种形式。

```bash
# 写法一
test expression

# 写法二
[ expression ]

# 写法三
[[ expression ]]
```

上面的`expression`是一个表达式，其执行结果是`true`或者是`false`。当表达式为真时，这个`test`命令返回的退出状态为0，当表达式为假时，`test`命令退出状态为1。

注意，第二种和第三种写法，`[`和`]`与内部的表达式之间都必须有空格。

写法三比前两种写法多出一个功能，就是支持正则判断，详见后文。

下面是三种写法的例子，判断一个文件是否存在。

```bash
# 写法一
if test -e /tmp/foo.txt ; then
  echo "Found foo.txt"
fi

# 写法二
if [ -e /tmp/foo.txt ] ; then
  echo "Found foo.txt"
fi

# 写法三
if [ -e /tmp/foo.txt ] ; then
  echo "Found foo.txt"
fi
```

## 判断表达式

`if`结构常用的判断表达式有以下这些。

```bash
statement1 && statement2  # 两个语句都为 true
statement1 || statement2  # 至少一个语句为 true
```

### 文件表达式

以下表达式用来测试文件状态。

- `[ -a file ]`：如果 file 存在，则为`true`。
- `[ -b file ]`：如果 file 存在并且是一个块（设备）文件，则为`true`。
- `[ -c file ]`：如果 file 存在并且是一个字符（设备）文件，则为`true`。
- `[ -d file ]`：如果 file 存在并且是一个目录，则为`true`。
- `[ -e file ]`：如果 file 存在，则为`true`。
- `[ -f file ]`：如果 file 存在并且是一个普通文件，则为`true`。
- `[ -g file ]`：如果 file 存在并且设置了组 ID，则为`true`。
- `[ -G file ]`：如果 file 存在并且属于有效的组 ID，则为`true`。
- `[ -h file ]`：如果 file 存在并且是符号链接，则为`true`。
- `[ -k file ]`：如果 file 存在并且设置了它的“sticky bit”，则为`true`。
- `[ -L file ]`：如果 file 存在并且是一个符号链接，则为`true`。
- `[ -N file ]`：如果 file 存在并且自上次读取后已被修改，则为`true`。
- `[ -O file ]`：如果 file 存在并且属于有效的用户 ID，则为`true`。
- `[ -p file ]`：如果 file 存在并且是一个命名管道，则为`true`。
- `[ -r file ]`：如果 file 存在并且可读（当前用户有可读权限），则为`true`。
- `[ -s file ]`：如果 file 存在且其长度大于零，则为`true`。
- `[ -S file ]`：如果 file 存在且是一个网络 socket，则为`true`。
- `[ -t fd ]`：如果 fd 是一个文件描述符，并且重定向到终端，则为`true`。 这可以用来判断是否重定向了标准输入／输出错误。
- `[ -u file ]`：如果 file 存在并且设置了 setuid 位，则为`true`。
- `[ -w file ]`：如果 file 存在并且可写（当前用户拥有可写权限），则为`true`。
- `[ -x file ]`：如果 file 存在并且可执行（有效用户有执行／搜索权限），则为`true`。
- `[ file1 -nt file2 ]`：如果 FILE1 比 FILE2 的更新时间最近，或者 FILE1 存在而 FILE2 不存在，则为`true`。
- `[ file1 -ot file2 ]`：如果 FILE1 比 FILE2 的更新时间更旧，或者 FILE2 存在而 FILE1 不存在，则为`true`。
- `[ FILE1 -ef FILE2 ]`：如果 FILE1 和 FILE2 引用相同的设备和 inode 编号，则为`true`。

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

- `[ string ]`：如果 string 不为 null，则为`true`。
- `[ -n string ]`：如果 字符串 string 的长度大于零，则为`true`。
- `[ -z string ]`：如果 字符串 string 的长度为零，则为`true`。
- `[ string1 = string2 ]`：如果 string1 和 string2 相同，则为`true`。
- `[ string1 == string2 ]` 如果 string1 和 string2 相同，则为`true`。
- `[ string1 != string2 ]`：如果 	string1 和 string2 不相同，则为`true`。
- `[ string1 > string2 ]`：如果按照字典顺序 string1 排列在 string2 之后，则为`true`。
- `[ string1 < string2 ]`：如果按照字典顺序 string1 排列在 string2 之前，则为`true`。

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

- `[ integer1 -eq integer2 ]`：如果 integer1 等于 integer2，则为`true`。
- `[ integer1 -ne integer2 ]`：如果 integer1 不等于 integer2，则为`true`。
- `[ integer1 -le integer2 ]`：如果 integer1 小于或等于 integer2，则为`true`。
- `[ integer1 -lt integer2 ]`：如果 integer1 小于 integer2，则为`true`。
- `[ integer1 -ge integer2 ]`：如果 integer1 大于或等于 integer2，则为`true`。
- `[ integer1 -gt integer2 ]`：如果 integer1 大于 integer2，则为`true`。

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

因为 test 使用的所有的表达式和操作符都被 shell 看作是命令参数， 对于 bash 有特殊含义的字符，比如说 `<`，`>`，`(`，和 `)`，（圆括号解释为子 Shell 环境）必须引起来或者是转义。

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


## case 结构

`case`结构用于表达式有多个值时的判断。它类似包含多个`elif`的`if`结构，但是语义更好。它的语法如下。

```bash
case expression in
  pattern )
    statements ;;
  pattern )
    statements ;;
  ...
esac
```

上面代码中，`expression`是一个表达式，通常是一个变量，`pattern`是变量的值。`pattern`部分可以有多条，用来匹配多个值，每条以两个分号（`;`）结尾。

```bash
#!/bin/bash

echo -n "输入一个1到3之间的数字（包含两端）> "
read character
case $character in
    1 ) echo 1
        ;;
    2 ) echo 2
        ;;
    3 ) echo 3
        ;;
    * ) echo 输入不符合要求
esac
```

上面例子中，最后一条匹配语句的模式是`*`，这个通配符可以匹配没有字符，放在最后表示匹配所有其他情况，类似`if`的`else`部分。

`case`的匹配模式可以使用各种通配符，下面是一些例子。

- `a)`：值等于“a”，则匹配
- `a|b)`：值等于“a”或“b”，则匹配
- `[[:alpha:]])`：单词是一个字母，则匹配
- `???)`：单词只有3个字符，则匹配
- `*.txt)`：若单词以 “.txt” 字符结尾，则匹配
- `*)`：匹配任意单词。把这个模式做为 case 命令的最后一个模式，可以捕捉到任意一个与先前模式不匹配的数值；也就是说，捕捉到任何可能的无效值。

```bash
#!/bin/bash

echo -n "属于一个字母或数字 > "
read character
case $character in
  [[:lower:]] | [[:upper:]] ) echo "输入了字母 $character"
                              ;;
  [0-9] )                     echo "输入了数字 $character"
                              ;;
  * )                         echo "输入不符合要求"
esac
```

上面例子中，使用通配符`[[:lower:]] | [[:upper:]]`匹配字母，`[0-9]`匹配数字。

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

