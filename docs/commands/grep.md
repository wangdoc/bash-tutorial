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
