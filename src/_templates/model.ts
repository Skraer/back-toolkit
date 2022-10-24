// @@|arg=-mongo|>>@@import { model, Model, Schema } from 'mongoose'@@<<@@
/* TEMPLATE_BLOCK[-mongo]>> import { model, Model, Schema } from 'mongoose' */

export interface I/* TEMPLATE|T */ {

}

// export interface I@@TEMPLATE|T@@ {

// }

@@|arg=-mongo|>>@@export const @@TEMPLATE|T@@Schema = new Schema<I@@TEMPLATE|T@@, Model<I@@TEMPLATE|T@@>>({
  
})

@@TEMPLATE|T@@Schema.set('toJSON', {
  virtuals: true,
})

const @@TEMPLATE|T@@ = model('@@TEMPLATE|T@@', @@TEMPLATE|T@@Schema)

export { @@TEMPLATE|T@@ }@@<<@@