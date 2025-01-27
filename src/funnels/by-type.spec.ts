import { expect, test } from "vitest"
import ByType from "./by-type"
import Dummy from "../dummy"

class DummyOne extends Dummy<{ id: number }> {}
class DummyTwo extends Dummy<{ id: number; parent: number }> {}

test("ByType filters correctly", () => {
  const A = [
    new DummyOne({ id: 1 }),
    new DummyOne({ id: 2 }),
    new DummyTwo({ id: 3, parent: 1 }),
    new DummyTwo({ id: 4, parent: 3 }),
    new DummyTwo({ id: 5, parent: 4 }),
  ]

  const hits = new ByType(DummyOne).run(A)

  expect(hits.length).toBe(2)
})
