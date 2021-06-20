import { Component, Inject, OnInit } from '@angular/core';
import { BlockchainService } from './blockchain.service';
import { providers } from 'ethers';
import { AnyAaaaRecord } from 'dns';
import * as contractAddresses from './../utils/getContractAddress';
import { getContractAddress } from 'ethers/lib/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  NFT: any;
  constructor(private blockchainService: BlockchainService) {}
  MyAccount = '';
  ChainId: any;
  Balance: any;
  GOATXBAL: any;
  async connectToMetamask() {
    await this.blockchainService.connectToMetamask();
  }

  toEth(i: number) {
    return i/1000000000000000000;
  }

  toWei(i: number) {
    return i*1000000000000000000;
  }
  async getAccount() {
    let account: string[];
    account = await this.blockchainService.getAccount();
    this.MyAccount = account[0];
  }

  async getChainId() {
   let chainid: number;
   chainid = await this.blockchainService.getChainId();
   this.ChainId = chainid;
  }

  async getBnbBalance() {
    let balance: string;
    let account: string[];
    account = await this.blockchainService.getAccount();
    this.MyAccount = account[0];
    balance = await this.blockchainService.getBnbBalance(this.MyAccount);
    this.Balance = this.toEth(parseInt(balance));
  }
  
  async getGoatxBalance() {
    let goatxbal: number;
    let account: string[];
    account = await this.blockchainService.getAccount();
    this.MyAccount = account[0];
    goatxbal = await this.blockchainService.getTokenBalance(contractAddresses.getGoatxTokenAddress(),this.MyAccount);
    this.GOATXBAL = this.toEth(goatxbal);
  }
  
  async mintArtfinNFT() {
    let nft;
    nft = await this.blockchainService.mintArtfin();
    this.NFT = nft;
  }

  async approveGoatx() {
    let approved: boolean;
    approved = await this.blockchainService.approveTokenForContract(contractAddresses.getGoatxTokenAddress(), contractAddresses.getMasterChefAddress());
  }

  async approveGrainStore() {
    let approved: boolean;
    approved = await this.blockchainService.approveTokenForContract(contractAddresses.getGrainStoreAddress(), contractAddresses.getMasterChefAddress());
  }
}