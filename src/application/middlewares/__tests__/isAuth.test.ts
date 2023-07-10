import isAuthMiddleware from '../isAuth';
import { JwtService } from '../../../domain/auth/contracts';
import { jwtServiceMock, throwError } from '../../../shared/test-utils';

describe('isAuth Middleware', () => {
  const next = jest.fn();
  const res = jest.fn();
  let req = { user: undefined, headers: { authorization: '' } };
  const isAuth = isAuthMiddleware(jwtServiceMock as unknown as JwtService);

  beforeEach(() => {
    next.mockClear();
    next.mockClear();
    jwtServiceMock.verify.mockClear();
    req = { user: undefined, headers: { authorization: '' } };
  });

  it('should throw an error if token is empty string or undefined', async () => {
    expect(() => isAuth(req as any, res as any, next)).toThrow('AuthorizationError: Not access to resource allowed');
    req = { ...req, headers: { authorization: undefined as any } };
    expect(() => isAuth(req as any, res as any, next)).toThrow('AuthorizationError: Not access to resource allowed');
  });

  it('should throw an error if token string does not has format of bearer like "Bearer xxx.xxx.xxx"', async () => {
    // Given
    req = { ...req, headers: { authorization: 'some_token_here_without_bearer' } };

    // When | Then
    expect(() => isAuth(req as any, res as any, next)).toThrow('AuthorizationError: Invalid token format');

    // Given
    req = { ...req, headers: { authorization: 'Bearersome_token_here_with_joined_bearer' } };

    // When | Then
    expect(() => isAuth(req as any, res as any, next)).toThrow('AuthorizationError: Invalid token format');
  });

  it('should throw "AuthorizationError: invalid signature" on not valid token', () => {
    // Given
    jwtServiceMock.verify.mockImplementation(() => throwError('invalid signature'));
    const invalidToken = 'any token, does not matter as verify mock will throw anyway';
    req = { ...req, headers: { authorization: 'Bearer ' + invalidToken } };

    // When | Then
    expect(() => isAuth(req as any, res as any, next)).toThrow('AuthorizationError: invalid signature');
    expect(jwtServiceMock.verify).toHaveBeenCalledWith(invalidToken);
  });

  it('should throw "AuthorizationError: jwt malformed" on not valid token', () => {
    // Given
    jwtServiceMock.verify.mockImplementation(() => throwError('jwt malformed'));
    const invalidToken = 'any token, does not matter as verify mock will throw anyway';
    req = { ...req, headers: { authorization: 'Bearer ' + invalidToken } };

    // When | Then
    expect(() => isAuth(req as any, res as any, next)).toThrow('AuthorizationError: jwt malformed');
    expect(jwtServiceMock.verify).toHaveBeenCalledWith(invalidToken);
  });

  it('should throw an error if token string does not has format of bearer like "Bearer xxx.xxx.xxx"', () => {
    // Given
    jwtServiceMock.verify.mockImplementation(() => ({ id: 1, name: 'John Doe' }));
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIn0.DXN2g4-K9dkKWKYi2vRSU0rjQM4n4SLpxVMGczPBdMY';
    req = { ...req, headers: { authorization: 'Bearer ' + validToken } };

    // When
    isAuth(req as any, res as any, next);

    // Then
    expect(next).toHaveBeenCalledTimes(1);
    expect(jwtServiceMock.verify).toHaveBeenCalledTimes(1);
    expect(jwtServiceMock.verify).toHaveBeenCalledWith(validToken);
    expect(req.user).toEqual({ id: 1, name: 'John Doe' });
  });
});
