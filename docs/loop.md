# 循环

Bash 提供三种循环语法`for`、`while`和`until`。

## while

`while`命令用于循环处理。它的语法格式如下。

```bash
while condition; do
  statements
done
```

下面是一个例子。

```bash
#!/bin/bash
# while-count: display a series of numbers
count=1
while [ $count -le 5 ]; do
    echo $count
    count=$((count + 1))
done
echo "Finished."
```

while 计算一系列命令的退出状态。只要退出状态为零，它就执行循环内的命令。

使用while循环，可以读取一个文件。

```bash
#!/bin/bash
# while-read: read lines from a file
while read distro version release; do
    printf "Distro: %s\tVersion: %s\tReleased: %s\n" \
        $distro \
        $version \
        $release
done < distros.txt
```

为了重定向文件到循环中，我们把重定向操作符放置到 done 语句之后。循环将使用 read 从重定向文件中读取 字段。这个 read 命令读取每个文本行之后，将会退出，其退出状态为零，直到到达文件末尾。到时候，它的 退出状态为非零数值，因此终止循环。

## break，continue

bash 提供了两个内部命令，它们可以用来在循环内部控制程序流程。这个 break 命令立即终止一个循环， 且程序继续执行循环之后的语句。这个 continue 命令导致程序跳过循环中剩余的语句，且程序继续执行 下一次循环。

```bash
DELAY=3 # Number of seconds to display results
while true; do
    clear
    cat <<- _EOF_
        Please Select:
        1. Display System Information
        2. Display Disk Space
        3. Display Home Space Utilization
        0. Quit
    _EOF_
    read -p "Enter selection [0-3] > "
    if [[ $REPLY =~ ^[0-3]$ ]]; then
        if [[ $REPLY == 1 ]]; then
        echo "Hostname: $HOSTNAME"
        uptime
        sleep $DELAY
        continue
    fi
    if [[ $REPLY == 2 ]]; then
        df -h
        sleep $DELAY
        continue
    fi
    if [[ $REPLY == 3 ]]; then
        if [[ $(id -u) -eq 0 ]]; then
            echo "Home Space Utilization (All Users)"
            du -sh /home/*
        else
            echo "Home Space Utilization ($USER)"
            du -sh $HOME
        fi
        sleep $DELAY
        continue
    fi
    if [[ $REPLY == 0 ]]; then
        break
    fi
    else
        echo "Invalid entry."
        sleep $DELAY
    fi
done
echo "Program terminated."
```

上面脚本中，当选择”0”选项的时候，break 命令被用来退出循环。

continue 命令被包含在其它选择动作的末尾， 为的是更加高效执行。通过使用 continue 命令，当一个选项确定后，程序会跳过不需要的代码。例如， 如果选择了选项”1”，则没有理由去测试其它选项。

## until

这个 until 命令与 while 非常相似，除了当遇到一个非零退出状态的时候， while 退出循环， 而 until 不退出。一个 until 循环会继续执行直到它接受了一个退出状态零。

`until`的语法格式如下。

```bash
until condition; do
  statements
done
```

下面是一个例子。

```bash
#!/bin/bash
# until-count: display a series of numbers
count=1
until [ $count -gt 5 ]; do
    echo $count
    count=$((count + 1))
done
echo "Finished."
```

## for

`for`命令的格式如下。

```bash
for x := 1 to 10 do
begin
  statements
end

for name [in list]
do
  statements that can use $name
done

for (( initialisation ; ending condition ; update ))
do
  statements...
done
```

这里的 variable 是一个变量的名字，这个变量在循环执行期间会增加，words 是一个可选的条目列表， 其值会按顺序赋值给 variable，commands 是在每次循环迭代中要执行的命令。

下面是一个例子。

```bash
$ for i in A B C D; do echo $i; done
A
B
C
D
```

`for`命令也可以用来遍历文件。

```bash
$ for i in distros*.txt; do echo $i; done
```

下面的例子是利用`for`命令，找出一篇文章之中最长的单词。

```bash
#!/bin/bash
# longest-word : find longest string in a file
while [[ -n $1 ]]; do
    if [[ -r $1 ]]; then
        max_word=
        max_len=0
        for i in $(strings $1); do
            len=$(echo $i | wc -c)
            if (( len > max_len )); then
                max_len=$len
                max_word=$i
            fi
        done
        echo "$1: '$max_word' ($max_len characters)"
    fi
    shift
done
```

上面代码中，当在命令行中给出一个或多个文件名的时候， 该程序会使用 strings 程序（其包含在 GNU binutils 包中），为每一个文件产生一个可读的文本格式的 “words” 列表。 然后这个 for 循环依次处理每个单词，判断当前这个单词是否为目前为止找到的最长的一个。当循环结束的时候，显示出最长的单词。

`foo`命令还支持C语言的使用格式。

```bash
for (( expression1; expression2; expression3 )); do
    commands
done
```

expression1 用来初始化循环条件，expression2 用来决定循环结束的时间，还有在每次循环迭代的末尾会执行 expression3。它等同于下面的while循环格式。

```bash
(( expression1 ))
while (( expression2 )); do
    commands
    (( expression3 ))
done
```

下面是一个例子。

```bash
for (( i=0; i<5; i=i+1 )); do
    echo $i
done
```

上面代码中，expression1 初始化变量 i 的值为0，expression2 允许循环继续执行只要变量 i 的值小于5， 还有每次循环迭代时，expression3 会把变量 i 的值加1。
