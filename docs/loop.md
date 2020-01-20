# 循环

Bash 提供三种循环语法`for`、`while`和`until`。

## while 循环

`while`循环有一个判断条件，只要符合条件，就不断循环执行指定的语句。

```bash
while condition; do
  statements
done
```

上面代码中，只要满足条件`condition`，就会执行命令`statements`。然后，再次判断是否满足条件`condition`，只要满足，就会一直执行下去。只有不满足条件，才会退出循环。

```bash
while true; do
  echo 'Hi, while looping ...';
done
```

上面的例子会无限循环，可以按下 Ctrl + c 停止。

`while`循环写成一行，也是可以的。

```bash
$ while true; do echo 'Hi, while looping ...'; done
```

下面是另一个例子

```bash
#!/bin/bash

number=0
while [ "$number" -lt 10 ]; do
  echo "Number = $number"
  number=$((number + 1))
done
```

上面例子中，只要变量`number`小于10，就会不断加1，直到`number`等于10，然后退出循环。


`while`的条件部分也可以是执行一个命令。

```bash
$ while echo 'ECHO'; do echo 'Hi, while looping ...'; done
```

上面例子中，判断条件是`echo 'ECHO'`。由于这个命令总是执行成功，所以上面命令会产生无限循环。

`while`的条件部分可以执行任意数量的命令，但是执行结果的真伪只看最后一个命令的执行结果。

```bash
$ while true; false; do echo 'Hi, looping ...'; done
```

上面代码运行后，不会有任何结果，因为`while`的最后一个命令是`false`。

## break，continue

Bash 提供了两个内部命令，用来在循环内部控制程序流程。`break`命令立即终止一个循环，且程序继续执行循环之后的语句。`continue`命令导致程序跳过循环中剩余的语句，且程序继续执行下一次循环。

## until 循环

`until`循环与`while`循环恰好相反，只要不符合判断条件（判断条件失败），就不断循环执行指定的语句。一旦符合判断条件，就退出循环。

```bash
until condition; do
  statements
done
```

下面是一个例子。

```bash
$ until false; do echo 'Hi, until looping ...'; done
Hi, until looping ...
Hi, until looping ...
Hi, until looping ...
^C
```

上面代码中，`until`的部分一直为`false`，导致命令无限运行，必须按下 Ctrl + c 终止。

```bash
#!/bin/bash

number=0
until [ "$number" -ge 10 ]; do
  echo "Number = $number"
  number=$((number + 1))
done
```

上面例子中，只要变量`number`小于10，就会不断加1，直到`number`大于等于10，就退出循环。

## for...in 循环

`for...in`循环用于遍历列表的每一项。

```bash
for variable in words; do
  commands
done
```

上面命令中，`words`是一个列表，变量`variable`依次等于列表中的每一项，执行执行的命令`commands`。

```bash
#!/bin/bash

for i in word1 word2 word3; do
  echo $i
done
```

上面例子中，`word1 word2 word3`是一个包含三个单词的列表，变量`i`依次等于`word1`、`word2`、`word3`，命令`echo $i`则会相应地执行三次。

下面是通过通配符产生列表的例子。

```bash
for i in *.png; do
  ls -l $i
done
```

上面例子中，`*.png`会替换成当前目录中所有 PNG 图片文件，变量`i`会依次等于每一个文件。

列表也可以通过子命令产生。

```bash
#!/bin/bash

count=0
for i in $(cat ~/.bash_profile); do
  count=$((count + 1))
  echo "Word $count ($i) contains $(echo -n $i | wc -c) characters"
done
```

上面例子中，`cat ~/.bash_profile`命令会输出`~/.bash_profile`文件的内容，然后通过遍历每一个词，计算该文件一共包含多少个词，以及每个词有多少个字符。

## for 循环

`for`循环还支持 C 语言的循环语法。

```bash
for (( expression1; expression2; expression3 )); do
  commands
done
```

上面代码中，`expression1`用来初始化循环条件，`expression2`用来决定循环结束的条件，`expression3`在每次循环迭代的末尾执行，用于更新值。

它等同于下面的`while`循环。

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

上面代码中，初始化变量`i`的值为0，循环执行的条件是`i`小于5。每次循环迭代结束时，`i`的值加1。

