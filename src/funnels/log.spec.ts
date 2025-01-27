import { expect, test } from "vitest"
import Log from "./log"
import Dummy from "../dummy"

class DummyOne extends Dummy<{ a: number }> {}
class DummyTwo extends Dummy<{ a: number }> {}

test("Log just returns what it was given", () => {
  // temporarily disable console logs
  const originalLog = console.log
  console.log = function () {}

  const a = new DummyOne({ a: 1 })
  const b = new DummyTwo({ a: 2 })

  const A = [a, b]

  const hits = new Log().run(A)

  // re-enable console logs
  console.log = originalLog

  expect(hits).toContain(a)
  expect(hits).toContain(b)
})
