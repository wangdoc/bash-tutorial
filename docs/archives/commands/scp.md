# scp

## 基本用法

`scp`是 secure copy 的缩写，用来在两台主机之间加密传送文件。它的底层是 SSH 协议，默认端口是22。

它主要用于以下三种复制操作。

- 从本地系统到远程系统。
- 从远程系统到本地系统。
- 在本地系统的两个远程系统之间。

使用`scp`传输数据时，文件和密码都是加密的，不会泄漏敏感信息。

`scp`的语法类似`cp`的语法。

注意，如果传输的文件在本机和远程系统，有相同的名称和位置，`scp`会在没有警告的情况下覆盖文件。

**（1）本地文件复制到远程系统**

复制本机文件到远程系统的基本语法如下。

```bash
# 语法
$ scp SourceFile user@host:directory/TargetFile

# 示例
$ scp file.txt remote_username@10.10.0.2:/remote/directory
```

下面是复制整个目录。

```bash
# 将本机的 documents 目录拷贝到远程主机，
# 会在远程主机创建 documents 目录
$ scp -r documents username@server_ip:/path_to_remote_directory

# 将本机整个目录拷贝到远程目录下
$ scp -r localmachine/path_to_the_directory username@server_ip:/path_to_remote_directory/

# 将本机目录下的所有内容拷贝到远程目录下
$ scp -r localmachine/path_to_the_directory/* username@server_ip:/path_to_remote_directory/
```

**（2）远程文件复制到本地**

从远程主机复制文件到本地的语法如下。

```bash
# 语法
$ scp user@host:directory/SourceFile TargetFile

# 示例
$ scp remote_username@10.10.0.2:/remote/file.txt /local/directory
```

下面是复制整个目录的例子。

```bash
# 拷贝一个远程目录到本机目录下
$ scp -r username@server_ip:/path_to_remote_directory local-machine/path_to_the_directory/

# 拷贝远程目录下的所有内容，到本机目录下
$ scp -r username@server_ip:/path_to_remote_directory/* local-machine/path_to_the_directory/
$ scp -r user@host:directory/SourceFolder TargetFolder
```

**（3）两个远程系统之间的复制**

本机发出指令，从远程主机 A 拷贝到远程主机 B 的语法如下。

```bash
# 语法
$ scp user@host1:directory/SourceFile user@host2:directory/SourceFile

# 示例
$ scp user1@host1.com:/files/file.txt user2@host2.com:/files
```

系统将提示您输入两个远程帐户的密码。数据将直接从一个远程主机传输到另一个远程主机。

## 参数

`-P`用来指定远程主机的 SSH 端口。如果远程主机使用非默认端口22，可以在命令中指定。

```bash
$ scp -P 2222 user@host:directory/SourceFile TargetFile
```

`-p`参数用来保留修改时间（modification time）、访问时间（access time）、文件状态（mode）等原始文件的信息。

```bash
$ scp -C -p ~/test.txt root@192.168.1.3:/some/path/test.txt
```

`-l`参数用来限制传输数据的带宽速率，单位是 Kbit/sec。对于多人分享的带宽，这个参数可以留出一部分带宽供其他人使用。

```bash
$ scp -l 80 yourusername@yourserver:/home/yourusername/* .
```

上面代码中，`scp`命令占用的带宽限制为每秒80K比特位，即每秒10K字节。

`-c`参数用来指定加密算法。

```bash
$ scp -c blowfish some_file your_username@remotehost.edu:~
```

上面代码指定加密算法为`blowfish`。

`-C`表示是否在传输时压缩文件。

```bash
$ scp -c blowfish -C local_file your_username@remotehost.edu:~
```

`-q`参数用来关闭显示拷贝的进度条。

```bash
$ scp -q Label.pdf mrarianto@202.x.x.x:.
```

`-F`参数用来指定 ssh_config 文件。

```bash
$ scp -F /home/pungki/proxy_ssh_config Label.pdf
```

`-v`参数用来显示详细的输出。

```bash
$ scp -v ~/test.txt root@192.168.1.3:/root/help2356.txt
```

`-i`参数用来指定密钥。

```bash
$ scp -vCq -i private_key.pem ~/test.txt root@192.168.1.3:/some/path/test.txt
```

`-r`参数表示是否以递归方式复制目录。
