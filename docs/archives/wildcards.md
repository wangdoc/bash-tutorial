# 命令行通配符教程

一次性操作多个文件时，命令行提供通配符（wildcards），用一种很短的文本模式（通常只有一个字符），简洁地代表一组路径。

通配符又叫做 globbing patterns。因为 Unix 早期有一个`/etc/glob`文件保存通配符模板，后来 Bash 内置了这个功能，但是这个名字被保留了下来。

通配符早于正则表达式出现，可以看作是原始的正则表达式。它的功能没有正则那么强大灵活，但是胜在简单和方便。

这里介绍 Bash 的各种通配符。

## ? 字符

`?`字符代表单个字符。

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

## * 字符

`*`代表任意数量的字符。

```bash
# 存在文件 a.txt、b.txt 和 ab.txt
$ ls *.txt
a.txt b.txt ab.txt

# 输出所有文件
$ ls *
```

上面代码中，`*`匹配任意长度的字符。

`*`可以匹配空字符。

```bash
# 存在文件 a.txt、b.txt 和 ab.txt
$ ls a*.txt
a.txt ab.txt
```

## [...] 模式

`[...]`匹配方括号之中的任意一个字符，比如`[aeiou]`可以匹配五个元音字母。

```bash
# 存在文件 a.txt 和 b.txt
$ ls [ab].txt
a.txt b.txt

$ ls *[ab].txt
ab.txt a.txt b.txt
```

`[start-end]`表示一个连续的范围。

```bash
# 存在文件 a.txt、b.txt 和 c.txt
$ ls [a-c].txt
a.txt b.txt c.txt

# 存在文件 report1.txt、report2.txt 和 report3.txt
$ ls report[0-9].txt
report1.txt report2.txt report3.txt
```

## `[^...]` 和 `[!...]` 

`[^...]`和`[!...]`表示匹配不在方括号里面的字符（不包括空字符）。这两种写法是等价的。

```bash
# 存在文件 a.txt、b.txt 和 c.txt
$ ls [^a].txt
b.txt c.txt
```

这种模式下也可以使用连续范围的写法`[!start-end]`。

```bash
$ echo report[!1–3].txt
report4.txt report5.txt
```

上面代码中，`[!1-3]`表示排除1、2和3。

## {...} 模式

`{...}` 表示匹配大括号里面的所有模式，模式之间使用逗号分隔。

```bash
$ echo d{a,e,i,u,o}g
dag deg dig dug dog
```

它可以用于多字符的模式。

```bash
$ echo {cat,dog}
cat dog
```

`{...}`与`[...]`有一个很重要的区别。如果匹配的文件不存在，`[...]`会失去模式的功能，变成一个单纯的字符串，而`{...}`依然可以展开。

```bash
# 不存在 a.txt 和 b.txt
$ ls [ab].txt
ls: [ab].txt: No such file or directory

$ ls {a,b}.txt
ls: a.txt: No such file or directory
ls: b.txt: No such file or directory
```

上面代码中，如果不存在`a.txt`和`b.txt`，那么`[ab].txt`就会变成一个普通的文件名，而`{a,b}.txt`可以照样展开。

大括号可以嵌套。

```bash
$ echo {j{p,pe}g,png}
jpg jpeg png
```

大括号也可以与其他模式联用。

```bash
$ echo {cat,d*}
cat dawg dg dig dog doug dug
```

上面代码中，会先进行大括号扩展，然后进行`*`扩展。

## {start..end} 模式

`{start..end}`会匹配连续范围的字符。

```bash
$ echo d{a..d}g
dag dbg dcg ddg

$ echo {11..15}
11 12 13 14 15
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

## 注意点

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

另外，前面已经说过，这条规则对`{...}`不适用

**（3）只适用于单层路径。**

上面所有通配符只匹配单层路径，不能跨目录匹配，即无法匹配子目录里面的文件。或者说，`?`或`*`这样的通配符，不能匹配路径分隔符（`/`）。

如果要匹配子目录里面的文件，可以写成下面这样。

```bash
$ ls */*.txt
```

**（4）可用于文件名。**

Bash 允许文件名使用通配符。这时，引用文件名的时候，需要把文件名放在单引号里面。

```bash
$ touch 'fo*'
$ ls
fo*
```

上面代码创建了一个`fo*`文件，这时`*`就是文件名的一部分。

## 参考链接

- [Think You Understand Wildcards? Think Again](https://medium.com/@leedowthwaite/why-most-people-only-think-they-understand-wildcards-63bb9c2024ab)
- [Advanced Wildcard Patterns Most People Don’t Know](https://appcodelabs.com/advanced-wildcard-patterns-most-people-dont-know)

