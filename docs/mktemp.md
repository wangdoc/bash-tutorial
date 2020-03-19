# mktemp 命令

有时，Bash 脚本需要创建临时文件或临时目录。常见的做法是，自己在`/tmp`目录里面生成一个文件，这样做有很多弊端，使用`mktemp`命令是最安全的做法。

## 临时文件的安全问题

直接创建临时文件，尤其在`/tmp`目录里面，往往会导致安全问题。

首先，`/tmp`目录是所有人可读写的，任何用户都可以往该目录里面写文件。创建的临时文件也是所有人可读的。

```bash
$ touch /tmp/info.txt
$ ls -l /tmp/info.txt
-rw-r--r-- 1 ruanyf ruanyf 0 12月 28 17:12 /tmp/info.txt
```

上面命令在`/tmp`目录直接创建文件，该文件默认是所有人可读的。

其次，如果攻击者知道临时文件的文件名，他可以创建符号链接，链接到临时文件，可能导致系统运行异常。攻击者也可能向脚本提供一些恶意数据。因此，临时文件最好使用不可预测、每次都不一样的文件名。

最后，临时文件使用完毕，应该删除。但是，脚本意外退出时，往往会忽略清理临时文件。

## 临时文件的最佳实践

脚本生成临时文件，应该遵循下面的规则。

> - 创建前检查文件是否已经存在。
> - 确保临时文件已成功创建。
> - 临时文件必须有权限的限制。
> - 临时文件要使用不可预测的文件名。
> - 脚本退出时，要删除临时文件（使用`trap`命令）。

## mktemp 命令的用法

`mktemp`命令就是为安全创建临时文件而设计的。虽然在创建临时文件之前，它不会检查临时文件是否存在，但是它支持唯一文件名和清除机制，因此可以减轻安全攻击的风险。

直接运行`mktemp`命令，就能生成一个临时文件。

```bash
$ mktemp
/tmp/tmp.4GcsWSG4vj

$ ls -l /tmp/tmp.4GcsWSG4vj
-rw------- 1 ruanyf ruanyf 0 12月 28 12:49 /tmp/tmp.4GcsWSG4vj
```

上面命令中，`mktemp`命令生成的临时文件名是随机的，而且权限是只有用户本人可读写。

Bash 脚本使用`mktemp`命令的用法如下。

```bash
#!/bin/bash

TMPFILE=$(mktemp)
echo "Our temp file is $TMPFILE"
```

为了确保临时文件创建成功，`mktemp`命令后面最好使用 OR 运算符（`||`），指定创建失败时退出脚本。

```bash
#!/bin/bash

TMPFILE=$(mktemp) || exit 1
echo "Our temp file is $TMPFILE"
```

为了保证脚本退出时临时文件被删除，可以使用`trap`命令指定退出时的清除操作。

```bash
#!/bin/bash

trap 'rm -f "$TMPFILE"' EXIT

TMPFILE=$(mktemp) || exit 1
echo "Our temp file is $TMPFILE"
```

## mktemp 命令的参数

`-d`参数可以创建一个临时目录。

```bash
$ mktemp -d
/tmp/tmp.Wcau5UjmN6
```

`-p`参数可以指定临时文件所在的目录。默认是使用`$TMPDIR`环境变量指定的目录，如果这个变量没设置，那么使用`/tmp`目录。

```bash
$ mktemp -p /home/ruanyf/
/home/ruanyf/tmp.FOKEtvs2H3
```

`-t`参数可以指定临时文件的文件名模板，模板的末尾必须至少包含三个连续的`X`字符，表示随机字符，建议至少使用六个`X`。默认的文件名模板是`tmp.`后接十个随机字符。

```bash
$ mktemp -t mytemp.XXXXXXX
/tmp/mytemp.yZ1HgZV
```

## 参考链接

- [Working with Temporary Files and Directories in Shell Scripts](https://www.putorius.net/working-with-temporary-files.html), Steven Vona

