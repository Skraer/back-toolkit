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
  [-mongo]%async update(id: string, data: Partial<Omit<I@TEMPLATE|T@, '_id'>>) {%
  [!-mongo]%async update(id: string, data: Partial<I@TEMPLATE|T@>) {%
  */

  }

  async delete(id: string) {

  }
}

const /* TEMPLATE|L */Service = new /* TEMPLATE|T */Service()

export default /* TEMPLATE|L */Service