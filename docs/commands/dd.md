# dd

`dd`命令用于复制磁盘或文件系统。

## 复制磁盘

```bash
$ dd if=/dev/sda of=/dev/sdb
```

上面命令表示将`/dev/sda`磁盘复制到`/dev/sdb`设备。参数`if`表示来源地，`of`表示目的地。

除了复制，`dd`还允许将磁盘做成一个镜像文件。

```bash
$ dd if=/dev/sda of=/home/username/sdadisk.img
```

`dd`还可以复制单个分区。

```bash
$ dd if=/dev/sda2 of=/home/username/partition2.img bs=4096
```

上面命令中，参数`bs`表示单次拷贝的字节数（bytes）。

要将镜像文件复原，也很简单。

```bash
$ dd if=sdadisk.img of=/dev/sdb
```

## 清除数据

`dd`也可以用于清除磁盘数据。

```bash
# 磁盘数据写满 0
$ dd if=/dev/zero of=/dev/sda1

# 磁盘数据写满随机字符
$ dd if=/dev/urandom of=/dev/sda1
```

## 监控进展

磁盘的复制通常需要很久，为了监控进展，可以使用 Pipe Viewer 工具软件。如果没有安装这个软件，可以使用下面的命令安装。

```bash
$ sudo apt install pv
```

然后，来源地和目的地之间插入广告，就可以看到进展了。

```bash
$ dd if=/dev/urandom | pv | dd of=/dev/sda1
4,14MB 0:00:05 [ 98kB/s] [      <=>                  ]
```

## 参考链接

- David Clinton, [How to use dd in Linux without destroying your disk](https://opensource.com/article/18/7/how-use-dd-linux)
