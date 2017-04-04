# 归档和备份

## gzip

gzip 程序用来压缩文件，原文件的压缩版（添加`gz`后缀名）会替代原文件。gunzip 程序用来还原压缩版本。

```bash
$ gzip foo.txt
$ gunzip foo.txt.gz
```

`gzip`的参数如下。

- -c	把输出写入到标准输出，并且保留原始文件。也有可能用--stdout 和--to-stdout 选项来指定。
- -d	解压缩。正如 gunzip 命令一样。也可以用--decompress 或者--uncompress 选项来指定.
- -f	强制压缩，即使原始文件的压缩文件已经存在了，也要执行。也可以用--force 选项来指定。
- -h	显示用法信息。也可用--help 选项来指定。
- -l	列出每个被压缩文件的压缩数据。也可用--list 选项。
- -r	若命令的一个或多个参数是目录，则递归地压缩目录中的文件。也可用--recursive 选项来指定。
- -t	测试压缩文件的完整性。也可用--test 选项来指定。
- -v	显示压缩过程中的信息。也可用--verbose 选项来指定。
- -number	设置压缩指数。number 是一个在1（最快，最小压缩）到9（最慢，最大压缩）之间的整数。 数值1和9也可以各自用--fast 和--best 选项来表示。默认值是整数6。

下面是一些例子。

```bash
# 查看解压缩后的内容
$ gunzip -c foo.txt | less
```

`zcat`程序等同于带有-c 选项的 gunzip 命令。它可以像`cat`命令那样，用来查看`gzip`压缩文件。

```bash
$ zcat foo.txt.gz | less
```

## bzip2

`bzip2`程序与`gzip`程序相似，但是使用了不同的压缩算法，舍弃了压缩速度，实现了更高的压缩级别。在大多数情况下，它的工作模式等同于`gzip`。 由`bzip2`压缩的文件，用扩展名`.bz2`表示。

```bash
$ bzip2 foo.txt
$ bunzip2 foo.txt.bz2
```

gzip程序的所有选项（除了`-r`），bzip2 程序同样也支持。同样有 bunzip2 和 bzcat 程序来解压缩文件。bzip2 文件也带有 bzip2recover 程序，其会 试图恢复受损的 .bz2 文件。

## zip

`zip`程序既是压缩工具，也是一个打包工具，读取和写入.zip文件。

```bash
$ zip options zipfile file...
```

它的用法如下。

```bash
# 将指定目录压缩成zip文件
$ zip -r playground.zip playground
```

`zip`与`tar`命令有一个相反之处。如果压缩文件已存在，其将被更新而不是被替代。这意味着会保留此文件包，但是会添加新文件，同时替换匹配的文件。

解压使用`unzip`命令。

```bash
$ unzip ../playground.zip
```

`unzip`命令的参数如下。

- `-l` 列出文件包中的内容而不解压
- `-v` 显示冗余信息
- `-p` 输出发送到标准输出

```bash
$ unzip -p ls-etc.zip | less
```

## tar

`tar`是tape archive的简称，原来是一款制作磁带备份的工具，现在主要用于打包。一个 tar 包可以由一组独立的文件，一个或者多个目录，或者两者混合体组成。

`tar`程序的语法如下。

```bash
$ tar mode[options] pathname...
```

tar支持以下模式。

- c 表示create，为文件和／或目录列表创建归档文件。
- x 抽取归档文件。
- r 追加具体的路径到归档文件的末尾。
- t 列出归档文件的内容。

支持的参数如下。

- f 表示file，用来指定生成的文件。

模式和参数可以写在一起，而且不需要开头的短横线。注意，必须首先指定模式，然后才是其它的选项。

```bash
# 创建子目录的tar包
$ tar cf playground.tar playground

# 查看tar包内容
$ tar tf playground.tar

# 查看更详细的列表信息
$ tar tvf playground.tar

# 还原归档文件
$ tar xf playground.tar

# 还原单个文件
$ tar xf archive.tar pathname

# 还原文件到指定目录
$ tar xvf archive.tar -C /home/me/

# 追加文件
$ tar rf archive.tar file.txt

# 验证归档文件内容是否正确
$ tar tvfW archive.tar

# 支持通配符
$ tar xf ../playground2.tar --wildcards 'home/me/playground/\*.txt'
```

注意，`tar`命令还原的时候，总是还原为相对路径。如果归档的时候，保存的是绝对路径，那么还原的时候，这个绝对路径会整个变成相对路径。

`find`命令可以与`tar`命令配合使用。

```bash
$ find playground -name 'file.txt' -exec tar rf playground.tar '{}' '+'
```

上面的命令先用`find`程序找到所有名为`file.txt`的文件，然后使用追加模式（`r`）的`tar`命令，把匹配的文件添加到归档文件`playground.tar`里面。

这种`tar`和`find`的配合使用，可以创建逐渐增加的目录树或者整个系统的备份。通过`find`命令匹配新于某个时间戳的文件，我们就能够创建一个归档文件，其只包含新于上一个 tar 包的文件。

tar支持压缩功能。

```bash
# 打成gzip压缩包
$ tar czvf assets.tar.gz dist

# 打成bz2压缩包
$ tar cvfj assets.tar.bz2 dist

# 解压 tar.gz 文件
$ tar xzv archive.tar.gz
$ tar xvf archive.tar.gz

# 解压bz2压缩包
$ tar xvf archive.tar.bz2

# 显示gzip压缩包内容
$ tar tvf archive.tar.gz

# 显示bz2压缩包内容
$ tar tvf archive.tar.bz2

# 从gzip压缩包取出单个文件
$ tar zxvf archive.tar.gz file.txt

# 从bz2压缩包取出单个文件
$ tar jxvf archive.tar.bz2 file.txt

# 按通配符取出文件
$ tar zxvf archive.tar.gz --wildcards '*.php'
$ tar jxvf archive.tar.bz2 --wildcards '*.php'

# 追加文件到压缩包
$ tar rvf archive.tar.gz xyz.txt
$ tar rvf archive.tar.bz2 xyz.txt
```

## rsync

`rsync`命令用于在多个目录之间、或者本地与远程目录之间同步。字母`r`表示`remote`。

```bash
$ rsync options source destination
```

source 和 destination 是下列选项之一：

- 一个本地文件或目录
- 一个远端文件或目录，以`[user@]host:path`的形式存在
- 一个远端 rsync 服务器，由`rsync://[user@]host[:port]/path`指定

注意 source 和 destination 两者之一必须是本地文件。rsync 不支持远端到远端的复制。

`rsync`命令的参数如下。

- `-a` 递归和保护文件属性
- `-v` 冗余输出
- `--delete` 删除可能在备份设备中已经存在但却不再存在于源设备中的文件
- `--rsh=ssh` 使用 ssh 程序作为远程 shell，目的地必须标注主机名。

```bash
# 同步两个本地目录
$ rsync -av playground foo

# 删除源设备不存在的文件
$ sudo rsync -av --delete /etc /home /usr/local /media/BigDisk/backup

# 远程同步
$ sudo rsync -av --delete --rsh=ssh /etc /home /usr/local remote-sys:/backup

# 与远程rsync主机同步
$ rsync -av -delete rsync://rsync.gtlib.gatech.edu/path/to/oss fedora-devel
```
