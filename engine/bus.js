/* نقطة التقاء واحدة بين المحرك والواجهة تمنع الاستيراد الدائري:
   المحرك ينادي hooks.render() دون أن يعرف من يرسم الشاشة. */
export const hooks={render(){},toast(){},say(){},nextStep(){return null},goToStep(){}};
export function setHooks(h){Object.assign(hooks,h)}
