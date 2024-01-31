import { Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.REQUEST,
})
export class LangchainService {
  constructor() {
    console.log('LangchainService constructor created');
  }
}
