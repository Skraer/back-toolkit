import { I/* TEMPLATE|P */ } from '../models/@TEMPLATE|P@'

class /* TEMPLATE|P */Service {
  constructor() {}

  async create(data: I/* TEMPLATE|P */) {
    
  }

  async getAll() {
    
  }

  async getOnce(id: string) {

  }

  /* TEMPLATE_SWITCH
  [-mongo]%async update(id: string, data: Partial<Omit<I@TEMPLATE|P@, '_id'>>) {%
  [!-mongo]%async update(id: string, data: Partial<I@TEMPLATE|P@>) {%
  */

  }

  async delete(id: string) {

  }
}

const /* TEMPLATE|C */Service = new /* TEMPLATE|P */Service()

export default /* TEMPLATE|C */Service