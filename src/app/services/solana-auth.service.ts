import { Injectable } from '@angular/core';
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { ConnectionStore, WalletStore } from '@heavy-duty/wallet-adapter';

@Injectable({
  providedIn: 'root'
})
export class SolanaAuthService {

  constructor(
    private _connectionStore: ConnectionStore,
    private _walletStore: WalletStore
  ) {
    this._connectionStore.setEndpoint('http://api.devnet.solana.com');
    this._walletStore.setAdapters([
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
    ]);
  }

}
