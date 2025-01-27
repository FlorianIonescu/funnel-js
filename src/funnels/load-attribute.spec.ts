import { expect, test } from "vitest"
import LoadAttribute from "./load-attribute"
import Dummy from "../dummy"

class DummyOne extends Dummy<{ id: number }> {}
class DummyTwo extends Dummy<{ id: number; parent: number }> {}

test("LoadAttribute takes entries from B based on paths in A", () => {
  const A = [
    new DummyTwo({ id: 3, parent: 1 }),
    new DummyTwo({ id: 4, parent: 3 }),
    new DummyTwo({ id: 5, parent: 4 }),
  ]

  const B = [new DummyOne({ id: 1 }), new DummyOne({ id: 2 })]

  const hits = new LoadAttribute("payload.parent", "payload.id", B).run(A)

  expect(hits.length).toBe(1)
  expect(hits[0].payload.id).toBe(1)
})
