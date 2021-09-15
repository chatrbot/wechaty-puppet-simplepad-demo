import {Contact, Friendship, Message, RoomInvitation, Wechaty, FileBox} from "wechaty"
import {PuppetSimplePad} from "wechaty-puppet-simplepad"
import {FriendshipType, ScanStatus} from "wechaty-puppet"
import {program} from "commander"
import QrcodeTerminal from "qrcode-terminal"

program.option("-t, --token <TOKEN>", "SimplePad的token").parse()

const token = program.opts().token

if (!token) {
    console.log(`
        -----------------------------------------------------------
                                                                    
            运行示例:npx ts-node ./bot.ts -t {YOUR_TOKEN }             
            如果不知道如何获取token,请到项目首页获取相关信息:             
            https://github.com/chatrbot/wechaty-puppet-simplepad        
                                                                     
        -----------------------------------------------------------
    `)
    process.exit(0)
}

const puppet = new PuppetSimplePad({token})
const bot = new Wechaty({puppet})

bot.on("scan", async (qrcode: string, status: ScanStatus) => {
    /**
     * 由于服务端设计的不同,SimplePad和其他Puppet实现在获取二维码的数据上有所不同
     * 其他Puppet实现可能获取到的是"二维码解析"后的数据内容,SimplePad获取到的是一
     * 个二维码图片,所以需要先解析一次二维码,然后再把内容重新生成一个二维码输出到终端
     */
    if (status === ScanStatus.Waiting && qrcode) {
        try{
            const fileBox = FileBox.fromBase64(qrcode,'qrcode')
            const qrCodeValue = await fileBox.toQRCode()
            QrcodeTerminal.generate(qrCodeValue, { small: true })
        }catch (err){
            console.error(`获取二维码失败,请尝试重新启动:${err}`)
        }
    } else {
        console.info("Bot Demo", `onScan: ${ScanStatus[status]}(${status})`)
    }
})

bot.on("login", async (user: Contact) => {
    console.info(`${user.name()} login`)
})

bot.on("room-leave", (room, leaverList, remover) => {
    console.log("机器人被踢出群了!")
})

bot.on("room-join", (room, inviteeList, inviter) => {
    console.log("有人加入群")
})

bot.on("friendship", async (friendship: Friendship) => {
    if (friendship.type() === FriendshipType.Receive) {
        console.log(
            "收到好友申请",
            friendship.contact().name(),
            friendship.hello()
        )
        await friendship.accept()
    }
    if (friendship.type() === FriendshipType.Verify) {
        console.log("还不是好友,正在发送好友申请")
        await bot.Friendship.add(friendship.contact(), "你好")
    }
    if (friendship.type() === FriendshipType.Confirm) {
        console.log("添加好友成功啦")
    }
})

bot.on("room-topic", (payload, newTopic, oldTopic) => {
    console.log("群名称修改", newTopic, oldTopic)
})

bot.on("room-invite", (payload: RoomInvitation) => {
    console.log("收到超过40个人的群邀请", payload)
})

bot.on("message", async (msg: Message) => {
    console.log("接收到消息", msg.text())
})

bot.start()
