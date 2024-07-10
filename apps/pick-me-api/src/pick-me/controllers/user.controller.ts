import {
  FileStorageService,
  InfrastructureException,
  InvalidCommandException,
  InvalidDocumentException,
  ReadableFile,
  SetUserAvatarUseCase,
  UpdateUserCredentialsUseCase,
  UpdateUserInfoUseCase,
} from '@pick-me-core';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedUser, Authorize } from '../auth';
import { UpdateUserInfoDto } from '../models';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import streamToBase64 from '../common/streamToBase64';

@Authorize()
@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly _updateUserCredentialsUseCase: UpdateUserCredentialsUseCase,
    private readonly _updateUserInfoUseCase: UpdateUserInfoUseCase,
    private readonly _setUserAvatarUseCase: SetUserAvatarUseCase,
    @Inject('FileStorageService')
    private readonly _fileStorageService: FileStorageService
  ) {}

  @Put('/updateInfo')
  async updateUserInfo(
    @AuthenticatedUser() user,
    @Body() updateUserInfoDto: UpdateUserInfoDto
  ) {
    await this._updateUserInfoUseCase.execute({
      userId: user.id,
      ...updateUserInfoDto,
    });
  }

  @Put('/updateCredentials')
  async updateUserCredentials(
    @AuthenticatedUser() user,
    @Body('newPassword') newPassword: string
  ) {
    await this._updateUserCredentialsUseCase.execute({
      userId: user.id,
      newPassword,
    });
  }

  @Patch('/setAvatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '../uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix);
        },
      }),
    })
  )
  async setUserAvatar(
    @AuthenticatedUser() user,
    @UploadedFile('file') file: Express.Multer.File
  ) {
    const docFile: ReadableFile = {
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
    };
    try {
      await this._setUserAvatarUseCase.execute({
        userId: user.id,
        file: docFile,
      });
    } catch (error) {
      let errorMessage = 'cannot add this document, please try again !';
      if (
        error instanceof InvalidCommandException ||
        InvalidDocumentException ||
        InfrastructureException
      ) {
        errorMessage = error.message;
      }
      throw new BadRequestException(errorMessage, {
        cause: error,
      });
    } finally {
      fs.unlink(file.path, (err) => {
        if (err) throw err;
      });
    }
  }

  @Get('/getAvatar')
  async getUserAvatar(@AuthenticatedUser() user): Promise<string> {
    try {
      const avatarFile = await this._fileStorageService.downloadFile(
        '/avatars/' + user.id
      );
      const avatarBase64String =
        'data:image/*;base64,' + (await streamToBase64(avatarFile));
      return avatarBase64String;
    } catch (error) {
      return '';
    }
  }
}
