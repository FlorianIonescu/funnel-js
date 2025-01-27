import { default as _Funnel } from "./funnel.js"
import { default as All } from "./funnels/all.js"
import { default as ByPredicate } from "./funnels/by-predicate.js"
import { default as ByType } from "./funnels/by-type.js"
import { default as LoadAttribute } from "./funnels/load-attribute.js"
import { default as Log } from "./funnels/log.js"
import { default as Missing } from "./funnels/missing.js"
import { default as NotIn } from "./funnels/not-in.js"
import { default as In } from "./funnels/in.js"
import { default as Or } from "./funnels/or.js"
import { default as Nor } from "./funnels/nor.js"

const Funnel = {
  Funnel: _Funnel,
  All,
  ByPredicate,
  ByType,
  LoadAttribute,
  Log,
  Missing,
  NotIn,
}
export default Funnel
export {
  _Funnel as Funnel,
  All,
  ByPredicate,
  ByType,
  LoadAttribute,
  Log,
  Missing,
  NotIn,
  In,
  Or,
  Nor,
}
