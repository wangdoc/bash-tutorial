# grep

`grep`命令用于文件内容的搜索，返回所有匹配的行。

```bash
$ grep pattern filename
```

下面是一个例子。

```bash
$ grep admin /etc/passwd
_kadmin_admin:*:218:-2:Kerberos Admin Service:/var/empty:/usr/bin/false
_kadmin_changepw:*:219:-2:Kerberos Change Password Service:/var/empty:/usr/bin/false
_krb_kadmin:*:231:-2:Open Directory Kerberos Admin Service:/var/empty:/usr/bin/false
```

一般情况下，应该使用`grep -R`，递归地找出当前目录下符合`someVar`的文件。

```bash
$ grep -FR 'someVar' .
```

別忘了大小不敏感的参数，因为 `grep` 默认搜索是大小写敏感的。

```bash
$ grep -iR 'somevar' .
```

也可以用`grep -l`光打印出符合条件的文件名而非文件内容选段。

```bash
$ grep -lR 'somevar' .
```

如果你写的脚本或批处理任务需要上面的输出内容，可以使用 `while` 和 `read` 来处理文件名中的空格和其他特殊字符：

```bash
grep -lR someVar | while IFS= read -r file; do
    head "$file"
done
```

如果你在你的项目里使用了版本控制软件，它通常会在 `.svn`， `.git`， `.hg` 目录下包含一些元数据。你也可以很容易地用 `grep -v` 把这些目录移出搜索范围，当然得用 `grep -F` 指定一个恰当且确定的字符串，即要移除的目录名：

```bash
$ grep -R 'someVar' . | grep -vF '.svn'
```

部分版本的 `grep` 包含了 `--exclude` 和 `--exclude-dir` 选项，这看起来更加易读。

## 参数

`-i`参数表示忽略大小写。

`-r`表示搜索某个目录下面的所有文件。

```bash
$ grep -r admin /etc/
```

`-v`过滤包含某个词的行，即`grep`的逆操作。

```bash
# 显示所有包含 vim，但不包含 grep 的行
$ ps | grep vim | grep -v grep
```
