---
title: cUrl使用心得
date: 2013-01-13 14:32:40
tags: cUrl
categories: Linux
thumbnail: https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516119417386&di=f9810c82af31ee64a32e2e4ca05c91bb&imgtype=0&src=http%3A%2F%2Fwww.wmpic.me%2Fwp-content%2Fuploads%2F2014%2F03%2F20140325103402919.jpg
---

curl 真是调试利器啊！！
<!-- more -->

# 一、常用参数

```shell
# -i：include全部HTTP报文
# -v：显示请求过程
# -d：HTTP POST DATA 
# -X：自定义请求方法。如-X POST
# -H：自定义请求头 如 -H "Content-type: application/json"
# -G： --get  Send the -d data with a HTTP GET (H)
# -o：输出
# -s：静音模式，不输出任何东西
# -S, --show-error    Show error. With -s, make curl show errors when they occur
# -f, --fail         连接失败时不显示http错误 (H)

# 调试的话暂时用到这么多，其他的命令想到在更。这种东西可以直接看英文文档。
```



# 二、get 请求

```shell
# 如果这里的URL指向的是一个文件或者一幅图都可以直接下载到本地
curl "http://7xssni.com1.z0.glb.clouddn.com/home.txt"  

# 显示全部信息:包括起始行、响应头、响应体
# -i: --include       Include protocol headers in the output (H/F)
curl -i "http://7xssni.com1.z0.glb.clouddn.com/home.txt"

# 显示get请求全过程解析 *表示解析过程  >表示请求 <表示响应 
# -v: --verbose 冗长的
curl -v "http://7xssni.com1.z0.glb.clouddn.com/home.txt" #--verbose 
```



# 三、post请求

```shell
#  -d: --data DATA     HTTP POST data (H)
curl -d "param1=value1&param2=value2" "http://www.baidu.com"
```



# 四、JSON 格式的 post 请求

```shell
# -H: --header LINE   Pass custom header LINE to server (H)
# -X: --request COMMAND  Specify request command to use
# -d: --data DATA     HTTP POST data (H)
curl -l -H "Content-type: application/json" -X POST -d '{"phone":"13521389587","password":"test"}' http://domain/apis/users.json
```



# 五、实例

```
URL ：http://7xssni.com1.z0.glb.clouddn.com/home.txt
```

```
{
  "headUrl" : {
    "headList" : [
      "http://7xssni.com1.z0.glb.clouddn.com/home1.jpg",
      "http://7xssni.com1.z0.glb.clouddn.com/home2.jpg",
      "http://7xssni.com1.z0.glb.clouddn.com/home3.jpg",
      "http://7xssni.com1.z0.glb.clouddn.com/home4.jpg"
    ]
  },
  "homeUrl" : {
    "dataList" : [
      {
        "imagesURL" : "http://7xssni.com1.z0.glb.clouddn.com/1.jpg",
        "materialList" : "进口",
        "titleStr" : "PVC实体塑木板",
        "use" : "地板/家具/隔墙/衣柜"
      },
      {
        "imagesURL" : "http://7xssni.com1.z0.glb.clouddn.com/2.jpg",
        "materialList" : "进口",
        "titleStr" : "3D印花地毯",
        "use" : "地板/家具/隔墙/衣柜"
      },
      {
        "imagesURL" : "http://7xssni.com1.z0.glb.clouddn.com/3.jpg",
        "materialList" : "进口",
        "titleStr" : "金刚木板",
        "use" : "地板/家具/隔墙/衣柜"
      },
      {
        "imagesURL" : "http://7xssni.com1.z0.glb.clouddn.com/4.jpg",
        "materialList" : "进口",
        "titleStr" : "经典菱形软包",
        "use" : "地板/家具/隔墙/衣柜"
      },
      {
        "imagesURL" : "http://7xssni.com1.z0.glb.clouddn.com/5.jpg",
        "materialList" : "进口",
        "titleStr" : "经典防水木板",
        "use" : "地板/家具/隔墙/衣柜"
      },
      {
        "imagesURL" : "http://7xssni.com1.z0.glb.clouddn.com/6.jpg",
        "materialList" : "进口",
        "titleStr" : "经典花纹墙纸",
        "use" : "地板/家具/隔墙/衣柜"
      },
      {
        "imagesURL" : "http://7xssni.com1.z0.glb.clouddn.com/7.jpg",
        "materialList" : "进口",
        "titleStr" : "经典使用木板",
        "use" : "地板/家具/隔墙/衣柜"
      },
      {
        "imagesURL" : "http://7xssni.com1.z0.glb.clouddn.com/8.jpg",
        "materialList" : "进口",
        "titleStr" : "非洲柚木地板",
        "use" : "地板/家具/隔墙/衣柜"
      }
    ]
  }
}
```





## 五、常用命令：

```
 -a, --append        Append to target file when uploading (F/SFTP)
 -E, --cert CERT[:PASSWD]  Client certificate file and password (SSL)
 -K, --config FILE   Read config from FILE
 -C, --continue-at OFFSET  Resumed transfer OFFSET
 -b, --cookie STRING/FILE  Read cookies from STRING/FILE (H)
 -c, --cookie-jar FILE  Write cookies to FILE after operation (H)
 -d, --data DATA     HTTP POST data (H)
 -D, --dump-header FILE  Write the received headers to FILE
 -f, --fail          Fail silently (no output at all) on HTTP errors (H)
 -F, --form CONTENT  Specify HTTP multipart POST data (H)
 -P, --ftp-port ADR  Use PORT with given address instead of PASV (F)
 -G, --get           Send the -d data with a HTTP GET (H)
 -g, --globoff       Disable URL sequences and ranges using {} and []
 -H, --header LINE   Pass custom header LINE to server (H)
 -I, --head          Show document info only
 -h, --help          This help text
 -i, --include       Include protocol headers in the output (H/F)
 -k, --insecure      Allow connections to SSL sites without certs (H)
 -j, --junk-session-cookies  Ignore session cookies read from file (H)
 -l, --list-only     List only mode (F/POP3)
 -L, --location      Follow redirects (H)
 -M, --manual        Display the full manual
 -m, --max-time SECONDS  Maximum time allowed for the transfer
 -n, --netrc         Must read .netrc for user name and password
 -N, --no-buffer     Disable buffering of the output stream
 -o, --output FILE   Write to FILE instead of stdout
 -U, --proxy-user USER[:PASSWORD]  Proxy user and password
     --proxy1.0 HOST[:PORT]  Use HTTP/1.0 proxy on given port
 -p, --proxytunnel   Operate through a HTTP proxy tunnel (using CONNECT)
     --pubkey KEY    Public key file name (SSH)
 -Q, --quote CMD     Send command(s) to server before transfer (F/SFTP)
     --random-file FILE  File for reading random data from (SSL)
 -r, --range RANGE   Retrieve only the bytes within RANGE
     --raw           Do HTTP "raw"; no transfer decoding (H)
 -e, --referer       Referer URL (H)
 -J, --remote-header-name  Use the header-provided filename (H)
 -O, --remote-name   Write output to a file named as the remote file
     --remote-name-all  Use the remote file name for all URLs
 -R, --remote-time   Set the remote file's time on the local output
 -X, --request COMMAND  Specify request command to use
 -S, --show-error    Show error. With -s, make curl show errors when they occur
 -s, --silent        Silent mode (don't output anything)
 -Y, --speed-limit RATE  Stop transfers below RATE for 'speed-time' secs
 -y, --speed-time SECONDS  Trigger 'speed-limit' abort after SECONDS (default: 30)
 -t, --telnet-option OPT=VAL  Set telnet option
     --tftp-blksize VALUE  Set TFTP BLKSIZE option (must be >512)
     --tftp-no-options  Do not send TFTP options requests
 -z, --time-cond TIME   Transfer based on a time condition
 -T, --upload-file FILE  Transfer FILE to destination
     --url URL       URL to work with
 -B, --use-ascii     Use ASCII/text transfer
 -u, --user USER[:PASSWORD]  Server user and password
 -A, --user-agent STRING  Send User-Agent STRING to server (H)
 -v, --verbose       Make the operation more talkative
 -V, --version       Show version number and quit
 -w, --write-out FORMAT  Use output FORMAT after completion
 -q, --disable       Disable .curlrc (must be first parameter)
```

