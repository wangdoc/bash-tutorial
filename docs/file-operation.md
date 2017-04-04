# 文件操作

## cp

`cp`命令用于将文件（或目录）拷贝到目的地。

```bash
# 拷贝单个文件
$ cp source dest

# 拷贝多个文件
$ cp source1 source2 source3 dest

# -i 目的地有同名文件时会提示确认
$ cp -i file1 file2

# -r 递归拷贝，将dir1拷贝到dir2，完成后dir2生成一个子目录dir1
# dir2如果不存在，将被创建
# 拷贝目录时，该参数是必需的
$ cp -r dir1 dir2

# -u --update 只拷贝目的地没有的文件，或者比目的地同名文件更新的文件
$ cp -u *.html destination
```

其他参数

- `-a` 拷贝时保留所有属性，包括所有者与权限
- `-v` 显示拷贝的详细信息

## mkdir

`mkdir`命令用于新建目录。

```bash
# 新建多个目录
$ mkdir dir1 dir2 dir3
```

## mv

`mv`命令用于将源文件移动到目的地。

```bash
# 移动单个文件
$ mv item1 item2

# 移动多个文件
$ mv file1 file2 dir1

# 将dir1拷贝进入dir2，完成后dir2将多出一个子目录dir1
# 如果dir2不存在，将会被创建
$ mv dir1 dir2
```

参数

- `-i` 覆盖已经存在的文件时，会提示确认
- `-u` 只移动目的地不存在的文件，或比目的地更新的文件

## rm

`rm`命令用于删除文件。

参数。

- `-i` 文件存在时，会提示确认。
- `-r` 递归删除一个子目录
- `-f` 如果删除不存在的文件，不报错
- `-v` 删除时展示详细信息

## ln

`ln`命令用于建立链接文件。

```bash
# 新建硬链接
$ ln file link

# 新建软链接
$ ln -s item link
```

