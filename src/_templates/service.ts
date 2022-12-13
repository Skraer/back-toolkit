import { I/* TEMPLATE|T */ } from '../models/@TEMPLATE|T@'

class /* TEMPLATE|T */Service {
  constructor() {}

  async create(data: I/* TEMPLATE|T */) {
    
  }

  async getAll() {
    
  }

  async getOnce(id: string) {

  }
  /* TEMPLATE_SWITCH
  [-mongo]%async templateSwitch(id: string, data: Partial<Omit<I@TEMPLATE|T@, '_id'>>) {%
  [!-mongo]%async templateSwitch(id: string, data: Partial<I@TEMPLATE|T@>) {%
   */

  }

  /* TEMPLATE_BLOCK[-mongo]>>async qwe(id: string, data: Partial<Omit<I@TEMPLATE|T@, '_id'>>) {*/
  /* TEMPLATE_BLOCK[!-mongo]>>async qwe(id: string, data: Partial<I@TEMPLATE|T@>) {*/

  }

  async update(id: string, data: Partial</* TEMPLATE_BLOCK[-mongo]>>Omit<*/I/*TEMPLATE|T*//* TEMPLATE_BLOCK[-mongo]>>, '_id'> */>) {
    
  }

  async delete(id: string) {

  }
}

const /* TEMPLATE|L */Service = new /* TEMPLATE|T */Service()

export default /* TEMPLATE|L */Service