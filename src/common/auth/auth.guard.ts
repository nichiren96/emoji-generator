import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('Gaurd: checking authentication');
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    console.log(`API Key: ${apiKey}`);
    if (apiKey !== 'SECRET') {
      console.log('Gaurd: failed authentication');
      return false;
    }
    console.log('Gaurd: passed authentication');
    return true;
  }
}
