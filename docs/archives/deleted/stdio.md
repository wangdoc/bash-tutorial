# 标准I/O

## echo

`echo`命令用于将指定内容输出到显示屏（标准输出）。

```bash
$ echo this is a test
this is a test
```

它的参数如下。

- `-e` 解释转义字符。
- `-n` 不输出行尾的换行符

```bash
$ echo "a\nb"
a\nb

$ echo -e "a\nb"
a
b
```

上面代码中，如果不加`-e`参数，`\n`就会按字面形式输出；加了以后，就被解释成了换行符。

引号之中可以包括多个换行符，即可以输出多行文本。

```bash
echo "<HTML>
    <HEAD>
          <TITLE>Page Title</TITLE>
    </HEAD>
    <BODY>
          Page body.
    </BODY>
</HTML>"
```

echo '<HTML>
    <HEAD>
          <TITLE>Page Title</TITLE>
    </HEAD>
    <BODY>
          Page body.
    </BODY>
</HTML>'

## read

`read`命令被用来从标准输入读取单行数据。这个命令可以用来读取键盘输入，当使用重定向的时候，读取文件中的一行数据。

```bash
read [-options] [variable...]
```

上面的 variable 用来存储输入数值的一个或多个变量名。如果没有提供变量名，shell 变量`REPLY`会包含数据行。

基本上，read 会把来自标准输入的字段赋值给具体的变量。

```bash
echo -n "Please enter an integer -> "
read int
```

`read`可以给多个变量赋值。

```bash
#!/bin/bash
# read-multiple: read multiple values from keyboard
echo -n "Enter one or more values > "
read var1 var2 var3 var4 var5
echo "var1 = '$var1'"
echo "var2 = '$var2'"
echo "var3 = '$var3'"
echo "var4 = '$var4'"
echo "var5 = '$var5'"
```

上面脚本的用法如下。

```bash
$ read-multiple
Enter one or more values > a b c d e
var1 = 'a'
var2 = 'b'
var3 = 'c'
var4 = 'd'
var5 = 'e'

$ read-multiple
Enter one or more values > a
var1 = 'a'
var2 = ''
var3 = ''
var4 = ''
var5 = ''

$ read-multiple
Enter one or more values > a b c d e f g
var1 = 'a'
var2 = 'b'
var3 = 'c'
var4 = 'd'
var5 = 'e f g'
```

如果 read 命令接受到变量值数目少于期望的数字，那么额外的变量值为空，而多余的输入数据则会 被包含到最后一个变量中。

如果 read 命令之后没有列出变量名，则一个 shell 变量`REPLY`，将会包含所有的输入。

```bash
#!/bin/bash
# read-single: read multiple values into default variable
echo -n "Enter one or more values > "
read
echo "REPLY = '$REPLY'"
```

上面脚本的输出结果如下。

```bash
$ read-single
Enter one or more values > a b c d
REPLY = 'a b c d'
```

read命令的参数如下。

- `-a array`	把输入赋值到数组 array 中，从索引号零开始。
- `-d delimiter`	用字符串 delimiter 中的第一个字符指示输入结束，而不是一个换行符。
- `-e`	使用 Readline 来处理输入。这使得与命令行相同的方式编辑输入。
- `-n num`	读取 num 个输入字符，而不是整行。
- `-p prompt`	为输入显示提示信息，使用字符串 prompt。
- `-r`	Raw mode. 不把反斜杠字符解释为转义字符。
- `-s`	Silent mode. 不会在屏幕上显示输入的字符。当输入密码和其它确认信息的时候，这会很有帮助。
- `-t seconds`	超时. 几秒钟后终止输入。read 会返回一个非零退出状态，若输入超时。
- `-u fd` 	使用文件描述符 fd 中的输入，而不是标准输入。

`-p`的例子。

```bash
read -p "Enter one or more values > "
echo "REPLY = '$REPLY'"
```

`-t`和`-s`的例子。

```bash
if read -t 10 -sp "Enter secret pass phrase > " secret_pass; then
    echo -e "\nSecret pass phrase = '$secret_pass'"
```

上面这个脚本提示用户输入一个密码，并等待输入10秒钟。如果在特定的时间内没有完成输入， 则脚本会退出并返回一个错误。因为包含了一个 -s 选项，所以输入的密码不会出现在屏幕上。

Shell的内部变量`IFS`可以控制输入字段的分离。例如，这个 /etc/passwd 文件包含的数据行 使用冒号作为字段分隔符。通过把 IFS 的值更改为单个冒号，我们可以使用 read 读取 /etc/passwd 中的内容，并成功地把字段分给不同的变量。

```bash
#!/bin/bash
# read-ifs: read fields from a file
FILE=/etc/passwd
read -p "Enter a user name > " user_name
file_info=$(grep "^$user_name:" $FILE)
if [ -n "$file_info" ]; then
    IFS=":" read user pw uid gid name home shell <<< "$file_info"
    echo "User = '$user'"
    echo "UID = '$uid'"
    echo "GID = '$gid'"
    echo "Full Name = '$name'"
    echo "Home Dir. = '$home'"
    echo "Shell = '$shell'"
else
    echo "No such user '$user_name'" >&2
    exit 1
fi
```

Shell 允许在一个命令之前立即发生一个或多个变量赋值。这些赋值为跟随着的命令更改环境变量。 这个赋值的影响是暂时的；只是在命令存在期间改变环境变量。

虽然通常 read 命令接受标准输入，但是你不能这样做：

```bash
$ echo “foo” | read
```

我们期望这个命令能生效，但是它不能。这个命令将显示成功，但是 REPLY 变量 总是为空。为什么会这样？

答案与 shell 处理管道线的方式有关系。在 bash（和其它 shells，例如 sh）中，管道线 会创建子 shell。它们是 shell 的副本，且用来执行命令的环境变量在管道线中。 上面示例中，read 命令将在子 shell 中执行。

在类 Unix 的系统中，子 shell 执行的时候，会为进程创建父环境的副本。当进程结束 之后，环境副本就会被破坏掉。这意味着一个子 shell 永远不能改变父进程的环境。read 赋值变量， 然后会变为环境的一部分。在上面的例子中，read 在它的子 shell 环境中，把 foo 赋值给变量 REPLY， 但是当命令退出后，子 shell 和它的环境将被破坏掉，这样赋值的影响就会消失。

使用 here 字符串是解决此问题的一种方法。

下面是生成菜单的一个例子。

```bash
#!/bin/bash
# read-menu: a menu driven system information program
clear
echo "
Please Select:

    1. Display System Information
    2. Display Disk Space
    3. Display Home Space Utilization
    0. Quit
"
read -p "Enter selection [0-3] > "

if [[ $REPLY =~ ^[0-3]$ ]]; then
    if [[ $REPLY == 0 ]]; then
        echo "Program terminated."
        exit
    fi
    if [[ $REPLY == 1 ]]; then
        echo "Hostname: $HOSTNAME"
        uptime
        exit
    fi
    if [[ $REPLY == 2 ]]; then
        df -h
        exit
    fi
    if [[ $REPLY == 3 ]]; then
        if [[ $(id -u) -eq 0 ]]; then
            echo "Home Space Utilization (All Users)"
            du -sh /home/*
        else
            echo "Home Space Utilization ($USER)"
            du -sh $HOME
        fi
        exit
    fi
else
    echo "Invalid entry." >&2
    exit 1
fi
```
