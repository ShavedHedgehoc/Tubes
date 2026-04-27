import { describe, it, expect, vi } from "vitest";
import { format } from "date-fns";
import { summaryQueries } from "./summary.queries";
import { SummaryParams } from "@/entities/summary/model/search-params";
import { getMonthBounds } from "@/shared/lib/date";
import { SummaryResponse } from "../model/types";
import { getSummaries } from "./get-summaries";

vi.mock("./get-summaries", () => ({ getSummaries: vi.fn() }));

describe("summaryQueries factory", () => {
  const createParams = (
    overrides: Partial<SummaryParams> = {},
  ): SummaryParams => ({
    page: 1,
    limit: 10,
    conveyors: [],
    states: [],
    crews: [],
    start_date: format(getMonthBounds().firstDay, "yyyy-MM-dd"),
    end_date: format(getMonthBounds().firstDay, "yyyy-MM-dd"),
    code: null,
    ...overrides,
  });
  it("должен генерировать одинаковый queryKey для разного порядка conveyors", () => {
    const params1 = createParams({ conveyors: ["2", "1"] });
    const params2 = createParams({ conveyors: ["1", "2"] });
    const query1 = summaryQueries.list(params1);
    const query2 = summaryQueries.list(params2);
    expect(query1.queryKey).toEqual(query2.queryKey);
  });
  it("должен генерировать одинаковый queryKey для разного порядка states", () => {
    const params1 = createParams({ states: ["2", "1"] });
    const params2 = createParams({ states: ["1", "2"] });
    const query1 = summaryQueries.list(params1);
    const query2 = summaryQueries.list(params2);
    expect(query1.queryKey).toEqual(query2.queryKey);
  });
  it("должен корректно формировать иерархию ключей для деталей", () => {
    const id = "123";
    const query = summaryQueries.detail(id);
    expect(query.queryKey).toEqual(["summaries", "detail", "123"]);
    expect(query.enabled).toBe(true);
  });

  it("должен отключать запрос (enabled: false), если id не передан", () => {
    const query = summaryQueries.detail(null);
    expect(query.enabled).toBe(false);
  });

  it("должен устанавливать правильный staleTime для списков и деталей", () => {
    const listQuery = summaryQueries.list({} as SummaryParams);
    const detailQuery = summaryQueries.detail("1");
    expect(listQuery.staleTime).toBe(60000);
    expect(detailQuery.staleTime).toBe(300000);
  });

  it("должен гарантировать глубокую идентичность ключей при разном порядке conveyors", () => {
    const params1 = createParams({ conveyors: ["B", "A"] });
    const params2 = createParams({ conveyors: ["A", "B"] });
    const queryA = summaryQueries.list(params1);
    const queryB = summaryQueries.list(params2);
    expect(queryA.queryKey).toEqual(queryB.queryKey);
    const paramsInKey = queryA.queryKey[2] as SummaryParams;
    expect(paramsInKey.conveyors).toEqual(["A", "B"]);
  });

  it("должен гарантировать глубокую идентичность ключей при разном порядке states", () => {
    const params1 = createParams({ states: ["B", "A"] });
    const params2 = createParams({ states: ["A", "B"] });
    const queryA = summaryQueries.list(params1);
    const queryB = summaryQueries.list(params2);
    expect(queryA.queryKey).toEqual(queryB.queryKey);
    const paramsInKey = queryA.queryKey[2] as SummaryParams;
    expect(paramsInKey.states).toEqual(["A", "B"]);
  });

  it("должен возвращать копии массивов, а не ссылки на оригиналы (защита от мутаций)", () => {
    const originalConveyors = ["2", "1"];
    const originalStates = ["2", "1"];
    const params = createParams({
      states: originalStates,
      conveyors: originalConveyors,
    });
    const query = summaryQueries.list(params);
    const paramsInKey = query.queryKey[2] as SummaryParams;
    expect(originalStates).toEqual(["2", "1"]);
    expect(originalConveyors).toEqual(["2", "1"]);
    expect(paramsInKey.states).not.toBe(originalStates);
    expect(paramsInKey.conveyors).not.toBe(originalConveyors);
  });

  it("должен корректно обрабатывать null/undefined в опциональных полях", () => {
    const params = { page: 1, limit: 10 } as SummaryParams;
    const query = summaryQueries.list(params);
    const paramsInKey = query.queryKey[2] as SummaryParams;
    expect(paramsInKey.states).toBeNull();
    expect(paramsInKey.conveyors).toBeNull();
  });

  it("должен возвращать корректную иерархию для инвалидации", () => {
    expect(summaryQueries.all()).toEqual(["summaries"]);
    expect(summaryQueries.lists()).toEqual(["summaries", "list"]);
    expect(summaryQueries.details()).toEqual(["summaries", "detail"]);
  });

  it("должен вызывать getSummaries внутри queryFn списка", async () => {
    const params = {
      page: 1,
      limit: 10,
      start_date: format(getMonthBounds().firstDay, "yyyy-MM-dd"),
      end_date: format(getMonthBounds().firstDay, "yyyy-MM-dd"),
    } as SummaryParams;
    const query = summaryQueries.list(params, { isServer: true });
    await (query.queryFn as () => Promise<SummaryResponse>)();
    expect(getSummaries).toHaveBeenCalledWith(
      expect.objectContaining({ ...params, options: { isServer: true } }),
    );
  });

  //   it("должен вызывать getEmployee внутри queryFn деталей", async () => {
  //     const query = employeeQueries.detail("123");
  //     if (query.queryFn) {
  //       await (query.queryFn as () => Promise<EmployeeEntity>)();
  //     }
  //     expect(getEmployee).toHaveBeenCalledWith({ id: "123", options: undefined });
  //   });
});
