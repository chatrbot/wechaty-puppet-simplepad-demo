# wechaty-puppet-simplepad-demo
## 如何运行
1. 把该项目下载到您指定的某个目录下  
```shell
$ git clone https://github.com/chatrbot/wechaty-puppet-simplepad-demo.git
```
2. 安装相应的依赖  
```shell
$ cd wechaty-puppet-simplepad-demo
$ npm install
```
3. 执行运行命令,把{YOUR_TOKEN}替换为您自己的token
```shell
$ npx ts-node ./bot.ts -t {YOUR_TOKEN}
```
## 如何调试  
如果您没有成功启动(第一次登录终端会显示一个二维码),请提高日志输出等级查看相关信息.  
```shell
$ export SIMPLEPAD_LOG='verbose'        # 把日志模式变为"verbose",默认为"error"
$ npx ts-node ./bot.ts -t {YOUR_TOKEN}  # 尝试重新运行
```
或者在issues中告诉我们您遇到的情况,让我们来协助您.  

## 如何获取token
请阅读项目[Wiki](https://github.com/chatrbot/wechaty-puppet-simplepad/wiki/%E8%8E%B7%E5%BE%97%E4%B8%80%E4%B8%AA%E5%B1%9E%E4%BA%8E%E8%87%AA%E5%B7%B1%E7%9A%84Token)来获取相关信息
