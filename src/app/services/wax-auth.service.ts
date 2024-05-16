import { Injectable, OnInit } from '@angular/core';
import { Session, SessionKit } from "@wharfkit/session"
import { WebRenderer } from "@wharfkit/web-renderer"
import { WalletPluginAnchor } from "@wharfkit/wallet-plugin-anchor"
import { WalletPluginCloudWallet } from '@wharfkit/wallet-plugin-cloudwallet';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WaxAuthService {

  private session?:Session
  private sessionKit?:SessionKit

      //TestNet
      private chain = {
        id: 'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12',
        url: 'https://waxtestnet.greymass.com'
      }
    
        // //MAINNet
        // private chain = {
        //   id: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
        //   url: 'https://wax.greymass.com'
        // }

  constructor(){
    this.inittialzekit().then((
    ) => console.log("Initialize SesseionKit"))
  }


  async inittialzekit(){
    const webRenderer = new WebRenderer()
    this.sessionKit = new SessionKit({
      appName: "Testing Wax on Angular",
      chains: [
        this.chain
      ],
      ui: webRenderer,
      walletPlugins: [
        new WalletPluginCloudWallet(),
        new WalletPluginAnchor()],
    })
    this.session = await this.sessionKit.restore()
  }



  async getCurrentSession(): Promise<Session>  {
     if(this.session){
        return Promise.resolve(this.session)
     }

     if(!this.sessionKit){
      throw new Error("sessionKit is not yet initialize ")
     }

     const loginRespose = await  this.sessionKit.login()
     this.session = loginRespose.session
     return Promise.resolve(this.session)
  }



  async logOut(){
    if(!this.sessionKit){
      throw new Error("sessionKit is not yet initialize ")
     }

     await this.sessionKit.logout()
  }

  

}
