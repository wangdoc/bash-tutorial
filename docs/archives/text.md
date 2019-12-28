# 文本处理

## cat

`cat`可以文件的内容，显示在标准输出。

```bash
$ cat text1
1 apple
2 pear
3 banana
```

它也可以同时输出多个文件内容。

```bash
$ cat text1 text2
```

它与重定向结合，就可以合并多个文件。

```bash
# 合并文本文件
$ cat text* > text.all

# 合并二进制文件
$ cat movie.mpeg.0* > movie.mpeg
```

如果调用`cat`命令时没有任何参数，它将读取标准输入，然后显示到标准输出。按下`Ctrl + d`，将会结束`cat`读取标准输入。利用这一点，可以将键盘输入写入指定文件，按下`Ctrl + d`结束输入。

```bash
$ cat > lazy_dog.txt
```

它的参数如下。

- `-n` 输出结果显示行号
- `-s` 将多个连续的空白行，输出为一行
- `-A` 输出结果中显示控制符，比如Tab键显示为`^I`，行尾显示`$`

`cat`支持Here document，显示多行文本。

```bash
cat << _EOF_
<HTML>
         <HEAD>
                <TITLE>$TITLE</TITLE>
         </HEAD>
         <BODY>
                <H1>$TITLE</H1>
                <P>$TIME_STAMP</P>
         </BODY>
</HTML>
_EOF_
```

Here document 常在脚本当中作为输入的手段。

```bash
$ sort -k2 <<END
> 1 apple
> 2 pear
> 3 banana
> END
1 apple
3 banana
2 pear
```

如果使用`<<-`代替`<<`，行首的tab键将被剥离。

## nl

`nl`命令为文本文件添加行号，显示在标准输出。

```bash
$ nl example.txt
```

## sort

`sort`命令将文本文件的所有行排序后输出。

```bash
$ sort file1.txt file2.txt file3.txt > final_sorted_list.txt
```

它的参数如下。

- `-b` `--ignore-leading-blanks` 默认情况下，排序用的是每行的第一个字符。这个参数忽略每行开头的空格，从第一个非空白字符开始排序。
- `-f` `--ignore-case` 让排序不区分大小写。
- `-n` `--numeric-sort` 按照数值排序，而不是字符值，用于行首是数值的情况。
- `-r` `--reverse` 按相反顺序排序。结果按照降序排列，而不是升序。
- `-k` `--key=field1[,field2]` 指定按照每行的第几个字段（从1开始）排序，而不是按照行首字符排序。该属性可以多个连用，用于指定多重排序标准，还可以指定每个字段指定排序标准，这些值与全局属性一致，比如b（忽略开头的空格），n（数值排序），r（逆向排序）等等。
- `-m` `--merge` 把每个参数看作是一个预先排好序的文件。把多个文件合并成一个排好序的文件，而没有执行额外的排序。
- `-o` `--output=file` 把排好序的输出结果发送到文件，而不是标准输出。
- `-t` `--field-separator=char` 定义字段分隔字符。默认情况下，字段由空格或制表符分隔。
- `-u` 输出结果中删除重复行

```bash
$ sort --key=1,1 --key=2n distros.txt
```

上面命令中，第一个`--key`指定第一排序标准是只用第一字段（`1,1`），也可以指定使用第一字段第一个字符（`1.1`）；第二排序标准是第二字段，按数值排序。

## uniq

`uniq`命令在排序后的行中，删除所有重复的行，保证所有输出没有重复。

```bash
$ ls /bin /usr/bin | sort | uniq
```

它的参数如下。

- `-c`	输出所有的重复行，并且每行开头显示重复的次数。
- `-d`	只输出重复行，而不是不重复的文本行。
- `-f n`	忽略每行开头的 n 个字段，字段之间由空格分隔，正如 sort 程序中的空格分隔符；然而， 不同于 sort 程序，uniq 没有选项来设置备用的字段分隔符。
- `-i`	在比较文本行的时候忽略大小写。
- `-s n`	跳过（忽略）每行开头的 n 个字符。
- `-u`	只是输出独有的文本行。这是默认的。
- `-V` 按照版本号排序。

`-V`参数可以按版本号排列（从小到大）。

```bash
$ sort -V input.txt
1.0.15
1.3.0
2.1.2
3.0.0
```

`-rV`参数可以按版本号逆序排列。

```bash
$ sort -rV input.txt
3.0.0
2.1.2
1.3.0
1.0.15
```

## cut

`cut`程序用来从文本行中抽取文本，并把其输出到标准输出。它能够接受多个文件参数或者标准输入。

它的参数如下。

- `-c char_list` 抽取指定范围的文本
- `-f field_list` 抽取指定字段，字段之间可以tab分隔也可以逗号分隔
- `-d delim_char` 指定字段分隔符，默认是tab键
- `--complement`	抽取整个文本行，除了那些由-c 和／或-f 选项指定的文本。

```bash
# 抽取每行的第三个字段
$ cut -f 3 distros.txt

# 抽取每行的第7到第10个字符
$ cut -c 7-10 distros.txt

# 抽取每行的第23个到结尾的字符1
$ cut -c 23- distros.txt

# 指定字段分隔符为冒号
$ cut -d ':' -f 1 /etc/passwd
```

## paste

`paste`程序将多个文本文件按行合并，即每一行都由原来文本文件的每一行组成，显示在标准输出。

```bash
$ paste distros-dates.txt distros-versions.txt
```

## wc

`wc`命令输出一个文本文件的统计信息（word count），一共有三个值，分别为行数、词数和字节数。

```bash
$ wc ls-output.txt
 7902 64566 503634 ls-output.txt
```

如果使用`-l`参数，则只输出行数。

```bash
$ ls /bin /usr/bin | sort | uniq | wc -l
 2728
```

## head

`head`命令返回文本文件的头部，默认显示10行。

`-n`参数指定显示的行数。

```bash
$ head -n 5 ls-output.txt
```

## tail

`tail`命令返回文本文件的尾部，默认显示10行。

`-n`参数指定显示的行数。

```bash
$ tail -n 5 ls-output.txt
```

`-f`会实时追加显示新增的内容，常用于实时监控日志，按`Ctrl + c`停止。

```bash
$ tail -f /var/log/messages
```

## grep

`grep`程序用于在指定文件之中，搜索符合某个模式的行，并把搜索结果输出到标准输出。

```bash
$ grep keyword foo.txt
```

上面命令输出`foo.txt`之中匹配`keyword`的行。

`grep`程序可以同时搜索多个文件。

```bash
$ grep keyword f*.txt
```

上面命令输出多个文件中匹配`keyword`的行。

`-l`参数输出匹配的文件名，而不是文件行。

```bash
$ grep -l bzip dirlist*.txt
```

如果想搜索文件名，而不是文件内容，可以使用重定向。

```bash
$ ls /usr/bin | grep zip
```

上面命令会输出`/usr/bin`目录中，文件名中包含子字符串`zip`的所有文件。

参数的含义。

- `-c`或`--count` 输出匹配的数量，而不是匹配的文本行。如果使用了`-v`，则输出不匹配的数量。
- `-h`或`--no-filename` 应用于多文件搜索，不在每行匹配的文本前，输出文件名
- `-i`或`--ignore-case` 忽略大小写
- `-l`或`--files-with-matches` 输出包含匹配项的文件名，而不是文本行本身
- `-L`或`--files-without-match` 类似于`-l`，但输出不包含匹配项的文件名
- `-n`或`--line-number` 每个匹配行之前输出其对应的行号
- `-v`或`--invert-match` 只返回不符合模式的行

## sed

`sed`是一个强大的文本编辑工具。

```bash
# 输出前5行
$ sed -n '1,5p' distros.txt

# 输出包含指定内容的行
$ sed -n '/SUSE/p' distros.txt

# 输出不包含指定内容的行
$ sed -n '/SUSE/!p' distros.txt

# 替换内容（只替换第一个）
$ sed 's/regexp/replacement/' distros.txt

# 替换内容（全局替换）
$ sed 's/regexp/replacement/g' distros.txt
```
