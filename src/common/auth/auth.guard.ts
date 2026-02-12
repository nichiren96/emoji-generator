import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggerService } from '../../logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly logger: LoggerService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.info('Checking authentication');
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    console.log(`API Key: ${apiKey}`);
    if (apiKey !== 'SECRET') {
      console.log('Gaurd: failed authentication');
      return false;
    }
    this.logger.info('Guard: authentication successful');
    return true;
  }
}
