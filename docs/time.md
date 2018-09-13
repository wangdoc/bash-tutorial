# 时间管理

## date 命令

`date`命令用于输出当前时间

```bash
$ date
2016年 03月 14日 星期一 17:32:35 CST
```

`date`命令后面用加号（`+`）指定显示的格式。

```bash
$ date +%d_%b_%Y
10_Sep_2018

$ date +%D
09/10/18

$ date +%F-%T
2018-09-10-11:09:51
```

完整的格式参数如下。

- %a 星期名的缩写（Sun）
- %A 星期名的全称（Sunday）
- %b 月份的缩写（Jan）
- %B 月份的全称（January）
- %c 日期和时间（Thu Mar  3 23:05:25 2005）
- %C 世纪，就是年份数省略后两位（20）
- %d 一个月的第几天（01）
- %D 日期，等同于`%m/%d/%y`
- %e 一个月的第几天，用空格补零，等同于`%_d`
- %F 完整的日期，等同于`%Y-%m-%d`
- %g     last two digits of year of ISO week number (see %G)
- %G     year of ISO week number (see %V); normally useful only with %V
- %h   等同于`%b`
- %H   小时（00..23）
- %I   小时（01..12）
- %j     day of year (001..366)
- %k     hour ( 0..23)
- %l     hour ( 1..12)
- %m     month (01..12)
- %M     minute (00..59)
- %N     nanoseconds (000000000..999999999)
- %p     locale’s equivalent of either AM or PM; blank if not known
- %P     like %p, but lower case
- %r     locale’s 12-hour clock time (e.g., 11:11:04 PM)
- %R     24-hour hour and minute; same as %H:%M
- %s     seconds since 1970-01-01 00:00:00 UTC
- %S     second (00..60)
- %T     time; same as %H:%M:%S
- %u     day of week (1..7); 1 is Monday
- %U     week number of year, with Sunday as first day of week (00..53)
- %V     ISO week number, with Monday as first day of week (01..53)
- %w     day of week (0..6); 0 is Sunday
- %W     week number of year, with Monday as first day of week (00..53)
- %x     locale’s date representation (e.g., 12/31/99)
- %X     locale’s time representation (e.g., 23:13:48)
- %y     last two digits of year (00..99)
- %Y     year
- %z     +hhmm numeric timezone (e.g., -0400)
- %:z    +hh:mm numeric timezone (e.g., -04:00)
- %::z   +hh:mm:ss numeric time zone (e.g., -04:00:00)
- %Z     alphabetic time zone abbreviation (e.g., EDT)

## cal 命令

`cal`命令用于显示日历。不带有参数时，显示的是当前月份。

```bash
$ cal
      三月 2016
日 一 二 三 四 五 六
       1  2  3  4  5
 6  7  8  9 10 11 12
13 14 15 16 17 18 19
20 21 22 23 24 25 26
27 28 29 30 31
```
