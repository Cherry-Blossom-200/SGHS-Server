/**
 * @Author: Gibeom Choi
 * @Date:   2023-06-09 01:37:47
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-06-09 01:41:34
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl, body } = req;
    const userAgent = req.get('user-agent') || '';
    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(
        `${method} ${statusCode} - ${originalUrl} - ${ip} - ${userAgent} - ${JSON.stringify(
          body,
        )}`,
      );
    });
    next();
  }
}
