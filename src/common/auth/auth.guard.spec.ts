import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { createMock } from '@golevelup/ts-jest';

describe('AuthGuard', () => {
  const authGuard = new AuthGuard();
  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it("should return true if there's a valid API Key", () => {
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          header: () => 'SECRET',
          headers: { 'x-api-key': 'SECRET' },
        }),
      }),
    });
    const result = authGuard.canActivate(context);
    expect(result).toBe(true);
  });

  it("should return false if there's no header is passed in", () => {
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          header: () => undefined,
          headers: {},
        }),
      }),
    });
    const result = authGuard.canActivate(context);
    expect(result).toBe(false);
  });

  it('should return false if the api key is invalid', () => {
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          header: () => 'INVALID',
          headers: { 'x-api-key': 'INVALID' },
        }),
      }),
    });
    const result = authGuard.canActivate(context);
    expect(result).toBe(false);
  });
});
