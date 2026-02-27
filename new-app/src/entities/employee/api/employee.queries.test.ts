import { describe, it, expect, vi } from "vitest";
import { employeeQueries } from "./employee.queries";
import { EmployeeParams } from "@/entities/employee/model/search-params";
import { getEmployees } from "./get-employees";
import { getEmployee } from "./get-employee";
import { EmployeeEntity, EmployeesResponse } from "../model/types";

vi.mock("./get-employees", () => ({ getEmployees: vi.fn() }));
vi.mock("./get-employee", () => ({ getEmployee: vi.fn() }));

describe("employeeQueries factory", () => {
  const createParams = (
    overrides: Partial<EmployeeParams> = {},
  ): EmployeeParams => ({
    page: 1,
    limit: 10,
    name: null,
    name_asc: "true",
    ranks: [],
    banned: [],
    ...overrides,
  });
  it("должен генерировать одинаковый queryKey для разного порядка ranks", () => {
    const params1 = createParams({ ranks: ["2", "1"] });
    const params2 = createParams({ ranks: ["1", "2"] });
    const query1 = employeeQueries.list(params1);
    const query2 = employeeQueries.list(params2);
    expect(query1.queryKey).toEqual(query2.queryKey);
  });

  it("должен корректно формировать иерархию ключей для деталей", () => {
    const id = "123";
    const query = employeeQueries.detail(id);
    expect(query.queryKey).toEqual(["employees", "detail", "123"]);
    expect(query.enabled).toBe(true);
  });

  it("должен отключать запрос (enabled: false), если id не передан", () => {
    const query = employeeQueries.detail(null);
    expect(query.enabled).toBe(false);
  });

  it("должен устанавливать правильный staleTime для списков и деталей", () => {
    const listQuery = employeeQueries.list({} as EmployeeParams);
    const detailQuery = employeeQueries.detail("1");
    expect(listQuery.staleTime).toBe(60000);
    expect(detailQuery.staleTime).toBe(300000);
  });

  it("должен гарантировать глубокую идентичность ключей при разном порядке ranks", () => {
    const params1 = createParams({ ranks: ["B", "A"] });
    const params2 = createParams({ ranks: ["A", "B"] });
    const queryA = employeeQueries.list(params1);
    const queryB = employeeQueries.list(params2);
    expect(queryA.queryKey).toEqual(queryB.queryKey);
    const paramsInKey = queryA.queryKey[2] as EmployeeParams;
    expect(paramsInKey.ranks).toEqual(["A", "B"]);
  });

  it("должен возвращать копии массивов, а не ссылки на оригиналы (защита от мутаций)", () => {
    const originalRanks = ["2", "1"];
    const params = createParams({ ranks: originalRanks });
    const query = employeeQueries.list(params);
    const paramsInKey = query.queryKey[2] as EmployeeParams;
    expect(originalRanks).toEqual(["2", "1"]);
    expect(paramsInKey.ranks).not.toBe(originalRanks);
  });

  it("должен корректно обрабатывать null/undefined в опциональных полях", () => {
    const params = { page: 1 } as EmployeeParams;
    const query = employeeQueries.list(params);
    const paramsInKey = query.queryKey[2] as EmployeeParams;
    expect(paramsInKey.name).toBeNull();
    expect(paramsInKey.banned).toBeNull();
    expect(paramsInKey.ranks).toBeNull();
  });

  it("должен возвращать корректную иерархию для инвалидации", () => {
    expect(employeeQueries.all()).toEqual(["employees"]);
    expect(employeeQueries.lists()).toEqual(["employees", "list"]);
    expect(employeeQueries.details()).toEqual(["employees", "detail"]);
  });

  it("должен вызывать getEmployees внутри queryFn списка", async () => {
    const params = { page: 1, limit: 10 } as EmployeeParams;
    const query = employeeQueries.list(params, { isServer: true });
    await (query.queryFn as () => Promise<EmployeesResponse>)();
    expect(getEmployees).toHaveBeenCalledWith(
      expect.objectContaining({ ...params, options: { isServer: true } }),
    );
  });

  it("должен вызывать getEmployee внутри queryFn деталей", async () => {
    const query = employeeQueries.detail("123");
    if (query.queryFn) {
      await (query.queryFn as () => Promise<EmployeeEntity>)();
    }
    expect(getEmployee).toHaveBeenCalledWith({ id: "123", options: undefined });
  });
});
