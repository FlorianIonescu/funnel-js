import { expect, test } from "vitest"
import Missing from "./missing"
import Dummy from "../dummy"

class DummyOne extends Dummy<{ id: number }> {}
class DummyTwo extends Dummy<{ id: number; parent: number }> {}

test("Missing takes all from A that aren't referenced in a path in B", () => {
  const A = [new DummyOne({ id: 1 }), new DummyOne({ id: 2 })]

  const B = [
    new DummyTwo({ id: 3, parent: 1 }),
    new DummyTwo({ id: 4, parent: 3 }),
    new DummyTwo({ id: 5, parent: 4 }),
  ]

  const hits = new Missing("payload.id", "payload.parent", B).run(A)

  expect(hits.length).toBe(1)
  expect(hits[0].payload.id).toBe(2)
})
