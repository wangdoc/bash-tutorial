# Shell 文件名扩展

## 占位符

Shell会自动对一些特殊字符，扩展成匹配的文件名。

- `*` 匹配任意多个字符（可以为空字符）
- `?` 匹配单个字符（不可以为空字符）
- `[characters]` 匹配方括号之中的任意一个字符
- `[!characters]` 匹配不在方括号之中的任意一个字符
- `[[:class:]]` 匹配某类字符之中的一个

字符类。

- `[[:alnum:]]` 匹配任意英文字母与数字
- `[[:alpha:]]` 匹配任意英文字母
- `[[:digit:]]` 匹配任意数字
- `[[:lower:]]` 匹配任意小写字母
- `[[:upper:]]` 匹配任意大写字母

示例。

- `*` 所有文件
- `g*` 所有以g开头的文件
- `b*.txt`
- `Data???` 所有Data开头后面跟着三个字符的文件名
- `[abc]*` 所有以a、b、c之一开头的文件
- `BACKUP.[0-9][0-9][0-9]` 以`BACKUP.`开头，后面是三个数字的文件名
- `[[:upper:]]*` 以大写字母开头的文件
- `[![:digit:]]*` 不以数字开头的文件
- `*[[:lower:]123]` 以小写字母或1或2或3结尾的文件

```bash
$ echo *s
Documents Pictures Templates Videos

$ echo /usr/*/share
/usr/kerberos/share /usr/local/share

$ echo [[:upper:]]*
Desktop Documents Music Pictures Public Templates Videos
```

`*`不会显示隐藏文件（以`.`开头的文件）。

```bash
# 显示 . 和 ..
$ echo .*

# 只显示正常的隐藏文件
$ echo .[!.]*
```

## 主目录

`~`代表当前用户主目录。

```bash
$ echo ~
/home/me
```

`~`后面跟上用户名，会返回该用户的主目录。

```bash
$ echo ~foo
/home/foo
```

## 大括号

大括号用于扩展后输出多个值。

```bash
$ echo {1,2,3}
1 2 3

$ echo Front-{A,B,C}-Back
Front-A-Back Front-B-Back Front-C-Back
```

注意，逗号后面不能有空格。

如果逗号前面没有值，就表示这是一个空字符串。

```bash
$ cp a.log{,.bak}
# 等同于
# cp a.log a.log.bak
```

大括号里面两个点号表示扩展。

```bash
$ echo {a..c}
a b c

$ echo {1..4}
1 2 3 4

$ echo Number_{1..5}
Number_1 Number_2 Number_3 Number_4 Number_5
```

整数前面可以使用前导0。

```bash
$ echo {01..5}
01 02 03 04 05

$ echo {001..5}
001 002 003 004 005
```

第二个双点号，可以表示扩展的步长。

```bash
$ echo {00..8..2} # 00 02 04 06 08
```

上面代码将0扩展到8，每次递增的长度为2，所以一共输出5个数字。

大括号支持逆序。

```bash
$ echo {5..1}
5 4 3 2 1

$ echo {E..A}
E D C B A
```

多个大括号连用，会有循环处理的效果。

```bash
$ echo {a..c}{1..3}
a1 a2 a3 b1 b2 b3 c1 c2 c3

$ echo a{A{1,2},B{3,4}}b
aA1b aA2b aB3b aB4b
```

这个写法可以直接用于for循环。

```bash
for i in {1..4}
do
  echo $i
done
```

大括号扩展的常见用途为新建一系列目录。

```bash
$ mkdir {2007..2009}-{01..12}
```
