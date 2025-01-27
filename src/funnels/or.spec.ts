import { expect, test } from "vitest"
import ByPredicate from "./by-predicate"
import ByType from "./by-type"
import Dummy from "../dummy"
import Or from "./or"

class DummyOne extends Dummy<{ a: number }> {}
class DummyTwo extends Dummy<{ a: number }> {}

test("Or gets all in A that are returned at least by one of the funnels", () => {
  const A = [
    new DummyOne({ a: 1 }),
    new DummyTwo({ a: 2 }),
    new DummyOne({ a: 3 }),
    new DummyOne({ a: 4 }),
    new DummyOne({ a: 5 }),
  ]

  const hits = new Or(
    new ByType(DummyTwo),
    new ByPredicate((e) => e.payload.a < 2)
  ).run(A)

  expect(hits.length).toBe(2)
  expect(hits[0]).toBeInstanceOf(DummyOne)
  expect(hits[1]).toBeInstanceOf(DummyTwo)
  expect(hits[0].payload.a).toBe(1)
  expect(hits[1].payload.a).toBe(2)
})
