# 用户管理

## id

`id`命令用于查看指定用户的用户名和组名。

```bash
$ id
uid=500(me) gid=500(me) groups=500(me)
```

`id`输出结果分为三个部分，分别是UID（用户编号和用户名）、GID（组编号和组名），groups（用户所在的所有组）。

用户帐户的信息，存放在`/etc/passwd`文件里面；用户组的信息，存放在`/etc/group`文件里面。

```bash
# 返回UID
$ id -u [UserName]

# 返回GID
$ id -g [UserName]

# 返回用户名
$ id -un [UserName]

# 返回组名
$ id -gn [UserName]
```

上面的命令，如果省略用户名，则返回当前用户的信息。

## su

`su`命令允许你以另一个用户的身份，启动一个新的 shell 会话，或者是以这个用户的身份来发布一个命令。

```bash
$ su otherUser
```

执行上面的命令以后，系统会提示输入密码。通过以后，就以另一个用户身份在执行命令了。

如果不加用户名，则表示切换到root用户。

```bash
$ su
```

`-l`参数表示启动一个需要登录的新的Shell，这意味着工作目录会切换到该用户的主目录。它的缩写形式是`-`。

```bash
$ su -
```

上面命令表示，切换到root用户的身份，且工作目录也切换到root用户的主目录。

`-c`参数表示只以其他用户的身份，执行单个命令，而不是启动一个新的Session。

```bash
$ su -c 'command'

# 实例
$ su -c 'ls -l /root/*'
```

## sudo

`sudo`命令很类似`su`命令，但有几点差别。

- 对于管理员来说，`sudo`命令的可配置性更高
- `sudo`命令通常只用于执行单个命令，而不是开启另一个Session。
- `sudo`命令不要求超级用户的密码，而是用户使自己的密码来认证。

`sudo`的设置在文件`/etc/sudoers`之中。

`-l`参数列出用户拥有的所有权限。

```bash
$ sudo -l
```

## chown

`chown`命令用来更改文件或目录的所有者和用户组。使用这个命令需要超级用户权限。

```bash
$ chown [owner][:[group]] file
```

下面是一些例子。

```bash
# 更改文件所有者
$ sudo chown bob foo.txt

# 更改文件所有者和用户组
$ sudo chown bob:users foo.txt

# 更改用户组
$ sudo chown :admins foo.txt

# 更改文件所有者和用户组（用户 bob 登录系统时，所属的用户组）
$ sudo chown bob: foo.txt
```

## chgrp

`chgrp`命令更改用户组，用法与`chown`命令类似。

## useradd

`useradd`命令用来新增用户。

```bash
$ useradd -G admin -d /home/bill -s /bin/bash -m bill
```

上面命令新增用户`bill`，参数`-G`指定用户所在的组，参数`d`指定用户的主目录，参数`s`指定用户的 Shell，参数`m`表示如果该目录不存在，则创建该目录。

## usermod

`usermod`命令用来修改用户的各项属性。

```bash
$ usermod -g sales jerry
```

上面的命令修改用户`jerry`属于的主要用户组为`sales`。

```bash
$ usermod -G sales jerry
```

上面的命令修改用户`jerry`属于的次要用户组为`sales`。

## adduser

`adduser`命令用来将一个用户加入用户组。

```bash
$ sudo adduser username grouptoadd
```

## groupadd

`groupadd`命令用来新建一个用户组。

```bash
$ sudo groupadd group1
$ sudo adduser foobar group1
```

## groupdel

`groupdel`命令用来删除一个用户组。

```bash
$ sudo groupdel group1
```

## passwd

`passwd`命令用于修改密码。

```bash
# 修改自己的密码
$ passwd

# 修改其他用户的密码
$ sudo passwd [user]
```
