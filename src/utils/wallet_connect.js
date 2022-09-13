import WalletConnect from '@walletconnect/client'
class WalletConnectClient {
  constructor() {
    if (!WalletConnectClient.instance) {
      this.client = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org',
        chainId: 1024
      })
      WalletConnectClient.instance = this
    }
    return WalletConnectClient.instance
  }
  static getInstance() {
    if (!WalletConnectClient.instance) {
      this.instance = new WalletConnectClient()
    }
    return WalletConnectClient.instance
  }
  clear({ callReuestList = [] }) {
    const { client } = this
    callReuestList.forEach(i => client.off(i))

    if (client._connect) client.updateSession()
    client.killSession()
    window.localStorage.removeItem('walletconnect')
  }
}
export default WalletConnectClient
