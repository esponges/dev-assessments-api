import { Injectable } from '@nestjs/common';

@Injectable({})
export class LangchainService {
  constructor() {
    console.log('LangchainService constructor created');
  }
}
