import to from 'await-to-js'
import ElectraJs from 'electra-js'

import { ipcMain } from 'electron'

interface EventToProp {
  event: string
  instance: any
  prop: string
}

interface EventToCall {
  event: string
  call(): any | Promise<any>
}

function bindEventToProp(eventName: string, instance: any, prop: string): void {
  ipcMain.on(eventName, async (event: any) => {
    console.info(`ipcMain: ${eventName}`)
    event.returnValue = JSON.stringify(instance[prop])
  })
}

/*function bindEventToSyncCall(eventName: string, call: () => any): void {
  ipcMain.on(eventName, async (event: any, argsString: string) => {
    event.returnValue = call.apply(null, JSON.parse(argsString))
  })
}*/

function bindEventToAsyncCall(eventName: string, call: () => Promise<any>): void {
  ipcMain.on(eventName, async (event: any, argsString: string) => {
    console.info(`ipcMain: ${eventName}`)
    const [err, res] = await to(call.apply(null, JSON.parse(argsString)))
    if (err !== null) {
      console.info(`ipcMain: ${eventName}:error`, err)
      event.sender.send(`${eventName}:error`, err.message)

      return
    }

    console.info(`ipcMain: ${eventName}:success`, res)
    event.sender.send(`${eventName}:success`, JSON.stringify(res))
  })
}

export default class Communication {
  public electraJs: ElectraJs

  constructor() {
    this.electraJs = new ElectraJs({ isHard: true })

    this.bindEvents()
  }

  private bindEvents(): void {
    // Bind events to props
    [
      { event: 'electraJs:wallet:isNew', instance: this.electraJs.wallet, prop: 'isNew' },
      { event: 'electraJs:wallet:lockState', instance: this.electraJs.wallet, prop: 'lockState' },
      { event: 'electraJs:wallet:mnemonic', instance: this.electraJs.wallet, prop: 'mnemonic' },
    ]
      .forEach(({ event, instance, prop }: EventToProp) => bindEventToProp(event, instance, prop));

      // Bind events to async calls
    [
      { event: 'electraJs:wallet:startDaemon', call: this.electraJs.wallet.startDaemon.bind(this.electraJs.wallet) },
      { event: 'electraJs:wallet:stopDaemon', call: this.electraJs.wallet.stopDaemon.bind(this.electraJs.wallet) },
      { event: 'electraJs:wallet:generate', call: this.electraJs.wallet.generate.bind(this.electraJs.wallet) },
      { event: 'electraJs:wallet:lock', call: this.electraJs.wallet.lock.bind(this.electraJs.wallet) },
      { event: 'electraJs:wallet:unlock', call: this.electraJs.wallet.unlock.bind(this.electraJs.wallet) },
    ]
      .forEach(({ event, call }: EventToCall) => bindEventToAsyncCall(event, call))
  }
}