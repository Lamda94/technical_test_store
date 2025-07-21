import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class HmacGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    const signatureFromHeader = request.header('X-Signature');
    const timestampFromHeader = request.header('X-Timestamp');

    console.log("timestamp recibido:", timestampFromHeader);
    console.log("signature recibido:", signatureFromHeader);
    if (!signatureFromHeader || !timestampFromHeader) {
      throw new UnauthorizedException('Faltan las cabeceras de autenticación.');
    }

    const now = Date.now();
    const requestTime = parseInt(timestampFromHeader, 10);
    if (now - requestTime > 60000) {
      throw new UnauthorizedException('La petición ha expirado.');
    }

    const secret = 'kS9pWqL3-zV7mRjN8_gH4fB6dC2xY1aT5uE0oI7sWbZcO8vP9iUjK6lM';
    
    const expectedSignature = crypto
      .createHmac('sha256', secret!)
      .update(timestampFromHeader)
      .digest('hex');
    console.log("timestamp generado:",timestampFromHeader);
    
    console.log("signature generado:", expectedSignature);
    console.log(`${secret}:secret`);
    if (signatureFromHeader !== expectedSignature) {
      throw new UnauthorizedException('Firma no válida.');
    }

    return true;
  }
}