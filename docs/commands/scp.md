# scp

## 基本用法

`scp`是 secure copy 的缩写，用来在两台主机之间加密传送文件。它的底层是 SSH 协议，默认端口是22。

`scp`的语法类似`cp`的语法。

```bash
# 复制本机文件到远程主机
$ scp SourceFile user@host:directory/TargetFile
# 将本机的 documents 目录拷贝到远程主机，
# 会在远程主机创建 documents 目录
$ scp -r documents username@server_ip:/path_to_remote_directory
# 将本机整个目录拷贝到远程目录下
$ scp -r localmachine/path_to_the_directory username@server_ip:/path_to_remote_directory/
# 将本机目录下的所有内容拷贝到远程目录下
$ scp -r localmachine/path_to_the_directory/* username@server_ip:/path_to_remote_directory/

# 从远程主机复制文件到本机
$ scp user@host:directory/SourceFile TargetFile
# 拷贝一个远程目录到本机目录下
$ scp -r username@server_ip:/path_to_remote_directory local-machine/path_to_the_directory/
# 拷贝远程目录下的所有内容，到本机目录下
$ scp -r username@server_ip:/path_to_remote_directory/* local-machine/path_to_the_directory/
$ scp -r user@host:directory/SourceFolder TargetFolder

# 本机发出指令
# 从远程主机A拷贝到远程主机B
$ scp user@host1:directory/SourceFile user@host2:directory/SourceFile
```

## 参数

`-P`用来指定端口。如果远程主机使用非默认端口22，可以在命令中指定。

```bash
$ scp -P 2222 user@host:directory/SourceFile TargetFile
```

`-p`参数用来保留 modification time、access time、mode 等原始文件的信息。

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

`-C`表示是否压缩传输的文件。

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
