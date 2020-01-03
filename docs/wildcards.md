# Bash 的通配符

Bash 提供通配符（wildcards），用一种很短的文本模式（通常只有一个字符），简洁地代表一组路径。Bash 在执行命令之前，会自动扩展命令中的通配符。

通配符又叫做 globbing patterns。因为 Unix 早期有一个`/etc/glob`文件保存通配符模板，后来 Bash 内置了这个功能，但是这个名字被保留了下来。

通配符早于正则表达式出现，可以看作是原始的正则表达式。它的功能没有正则那么强大灵活，但是胜在简单和方便。

## `?` 字符

`?`字符代表任意的单个字符，不包括空字符。比如，`Data???`匹配所有`Data`开头后面跟着三个字符的文件名。

```bash
# 存在文件 a.txt 和 b.txt
$ ls ?.txt
a.txt b.txt
```

上面命令中，`?`表示单个字符，所以会同时匹配`a.txt`和`b.txt`。

如果匹配多个字符，就需要多个`?`连用。

```bash
# 存在文件 a.txt、b.txt 和 ab.txt
$ ls ??.txt
ab.txt
```

上面命令中，`??`匹配了两个字符。

注意，`?`不能匹配空字符。也就是说，它占据的位置必须有字符存在。

## `*` 字符

`*`字符代表任意数量的字符，包括零个字符。

```bash
# 存在文件 a.txt、b.txt 和 ab.txt
$ ls *.txt
a.txt b.txt ab.txt

# 输出所有文件
$ ls *
```

下面是`*`匹配空字符的例子。

```bash
# 存在文件 a.txt、b.txt 和 ab.txt
$ ls a*.txt
a.txt ab.txt

$ ls *b*
b.txt ab.txt
```

注意，`*`不会匹配隐藏文件（以`.`开头的文件）。

```bash
# 显示所有隐藏文件
$ echo .*

# 只显示正常的隐藏文件，不显示 . 和 .. 这两个特殊文件
$ echo .[!.]*
```

## 方括号模式

方括号模式是`[...]`，可以匹配方括号之中的任意一个字符，比如`[aeiou]`可以匹配五个元音字母中的任意一个。

```bash
# 存在文件 a.txt 和 b.txt
$ ls [ab].txt
a.txt b.txt
```

上面命令中，`[ab]`表示可以扩展成`a`或`b`。

方括号`[start-end]`表示一个连续的范围。

```bash
# 存在文件 a.txt、b.txt 和 c.txt
$ ls [a-c].txt
a.txt b.txt c.txt

# 存在文件 report1.txt、report2.txt 和 report3.txt
$ ls report[0-9].txt
report1.txt report2.txt report3.txt
```

下面是更多的例子。

- `[abc]*`：所有以`a`、`b`、`c`字符之一开头的文件名。
- `BACKUP.[0-9][0-9][0-9]`：所有以`BACKUP.`开头，后面是三个数字的文件名。

方括号模式还有两种变体：`[^...]`和`[!...]`。它们表示匹配不在方括号里面的字符，这两种写法是等价的。比如，`[^abc]`或`[!abc]`表示匹配除了`a`、`b`、`c`以外的字符。

```bash
$ ls ?[!a]?
aba bbb
```

上面命令中，`[!a]`表示文件名第二个字符不是`a`的文件名。

这两种变体也可以使用连续范围的写法`[!start-end]`。

```bash
$ echo report[!1–3].txt
report4.txt report5.txt
```

上面代码中，`[!1-3]`表示排除1、2和3。

## 大括号模式

大括号模式`{...}`表示分别输出大括号里面的所有值，各个值之间使用逗号分隔。比如，`{a,b,c}`会输出`a`、`b`、`c`三项。

```bash
$ echo {1,2,3}
1 2 3

$ echo d{a,e,i,u,o}g
dag deg dig dug dog

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

大括号可以嵌套。

```bash
$ echo {j{p,pe}g,png}
jpg jpeg png

$ echo a{A{1,2},B{3,4}}b
aA1b aA2b aB3b aB4b
```

大括号也可以与其他模式联用。

```bash
$ echo {cat,d*}
cat dawg dg dig dog doug dug
```

上面代码中，会先进行大括号扩展，然后进行`*`扩展。

大括号可以用于多字符的模式，方括号不行。

```bash
$ echo {cat,dog}
cat dog
```

大括号模式`{...}`与方括号模式`[...]`有一个很重要的区别。如果匹配的文件不存在，`[...]`会失去模式的功能，变成一个单纯的字符串，而`{...}`依然可以展开。

```bash
# 不存在 a.txt 和 b.txt
$ echo [ab].txt
[ab].txt

$ echo {a,b}.txt
a.txt b.txt
```

上面代码中，如果不存在`a.txt`和`b.txt`，那么`[ab].txt`就会变成一个普通的文件名，而`{a,b}.txt`可以照样展开。

大括号里面两个点的`{start..end}`模式，表示扩展成一个连续序列，然后分别输出。比如`{a..z}`可以扩展成26个小写英文字母，然后输出。

```bash
$ echo {a..c}
a b c

$ echo {c..a}
c b a

$ echo d{a..d}g
dag dbg dcg ddg

$ echo {1..4}
1 2 3 4

$ echo Number_{1..5}
Number_1 Number_2 Number_3 Number_4 Number_5
```

如果遇到无法解释的扩展，模式会原样输出。

```bash
$ echo {a1..3c}
{a1..3c}
```

这种模式与逗号联用，可以写出复杂的模式。

```bash
$ echo .{mp{3..4},m4{a,b,p,v}}
.mp3 .mp4 .m4a .m4b .m4p .m4v
```

整数前面可以使用前导`0`，然后输出的每一项都有前导`0`。

```bash
$ echo {01..5}
01 02 03 04 05

$ echo {001..5}
001 002 003 004 005
```

大括号里面还可以使用第二个双点号（`start..end..step`），用来指定扩展的步长。

```bash
$ echo {0..8..2}
0 2 4 6 8
```

上面代码将`0`扩展到`8`，每次递增的长度为`2`，所以一共输出5个数字。

大括号的双点号还支持逆序。

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

这个写法可以直接用于`for`循环。

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

上面命令会新建36个子目录，每个子目录的名字都是”年份-月份“。

## 波浪线扩展

波浪线`~`会自动扩展成当前用户的主目录。

```bash
$ echo ~
/home/me
```

如果`~`后面是已经存在的用户名，则会返回该用户的主目录。

```bash
$ echo ~foo
/home/foo

$ echo ~root
/root
```

## 字符类

`[[:class:]]`表示一个字符类，匹配某一类特定字符之中的一个。常用的字符类如下。

- `[[:alnum:]]`：匹配任意英文字母与数字
- `[[:alpha:]]`：匹配任意英文字母
- `[[:digit:]]`：匹配任意数字
- `[[:lower:]]`：匹配任意小写字母
- `[[:upper:]]`：匹配任意大写字母

请看下面的例子。

```bash
$ echo [[:upper:]]*
```

上面命令输出所有大写字母开头的文件名。

字符类的第一个方括号后面，可以加上感叹号`!`，表示否定。比如，`[![:digit:]]`匹配所有非数字。

```bash
$ echo [![:digit:]]*
```

上面命令输出所有不以数字开头的文件名。

## 使用注意点

通配符有一些使用注意点，不可不知。

**（1）通配符是先解释，再执行。**

Bash 接收到命令以后，发现里面有通配符，会进行通配符扩展，然后再执行命令。

```bash
$ ls a*.txt
ab.txt
```

上面命令的执行过程是，Bash 先将`a*.txt`扩展成`ab.txt`，然后再执行`ls ab.txt`。

**（2）通配符不匹配，会原样输出。**

Bash 扩展通配符的时候，发现不存在匹配的文件，会将通配符原样输出。

```bash
# 不存在 r 开头的文件名
$ echo r*
r*
```

上面代码中，由于不存在`r`开头的文件名，`r*`会原样输出。

下面是另一个例子。

```bash
$ ls *.csv
ls: *.csv: No such file or directory
```

另外，前面已经说过，这条规则对大括号模式`{...}`不适用。

**（3）只适用于单层路径。**

上面所有通配符只匹配单层路径，不能跨目录匹配，即无法匹配子目录里面的文件。或者说，`?`或`*`这样的通配符，不能匹配路径分隔符（`/`）。

如果要匹配子目录里面的文件，可以写成下面这样。

```bash
$ ls */*.txt
```

**（4）可用于文件名。**

Bash 允许文件名使用通配符，即文件名包括通配符字符。这时，引用文件名的时候，需要把文件名放在单引号里面。

```bash
$ touch 'fo*'
$ ls
fo*
```

上面代码创建了一个`fo*`文件，这时`*`就是文件名的一部分。

## 参考链接

- [Think You Understand Wildcards? Think Again](https://medium.com/@leedowthwaite/why-most-people-only-think-they-understand-wildcards-63bb9c2024ab)
- [Advanced Wildcard Patterns Most People Don’t Know](https://appcodelabs.com/advanced-wildcard-patterns-most-people-dont-know)

