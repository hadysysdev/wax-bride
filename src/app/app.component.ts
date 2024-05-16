import { Component, OnInit, computed } from '@angular/core';
import { WaxAuthService } from './services/wax-auth.service';
import { Session } from '@wharfkit/session';
import { injectConnected, injectPublicKey, injectWallet } from '@heavy-duty/wallet-adapter';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'wax-bridge';
  private session?:Session
  userName?: string

  readonly wallet = injectWallet();
  readonly connected = injectConnected();
  readonly publicKey = injectPublicKey();

  readonly walletName = computed(() => this.wallet()?.adapter.name ?? 'None');

  constructor(private readonly authService: WaxAuthService) {

  }

  async login() {
    this.session = await this.authService.getCurrentSession()


    console.log("this.session:",  this.session);
    this.userName = (await this.session.account()).accountName.toString()
  }


}
