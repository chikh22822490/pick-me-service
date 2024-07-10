import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';

export function Authorize() {
  return applyDecorators(
    UseGuards(AuthGuard),
    ApiBearerAuth()
  );
}
