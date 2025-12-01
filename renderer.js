const information = document.getElementById('info')
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`

let pingResult = ''
// 使用暴露的 ping 方法与主进程通信
const func = async () => {
  const response = await window.versions.ping()
  pingResult += response + '\n'
  const mainMessage = document.getElementById('mainMessage')
  mainMessage.innerText = pingResult
}

func()

// 监听主进程的回复
window.versions.receivedPing((args) => {
  const mainMessage = document.getElementById('mainMessage')
  pingResult += args + '\n'
  mainMessage.innerText = pingResult
  pingResult = ''
})