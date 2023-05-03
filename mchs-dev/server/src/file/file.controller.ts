import { Controller, Get, HttpStatus, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadException } from 'src/modules/exception/upload.exception';
import { editFileName, fileFilter } from 'src/utils/file-upload';

@Controller('file')
export class FileController {
    constructor(
        //@InjectQueue('upload-queue') private fileQueue: Queue
        ){}
  
      //upload single file
      @Post('/upload/file')
      @UseInterceptors(
        FileInterceptor('file', {
          storage: diskStorage({
            destination: './uploads',//path to save, to change go to app.module.ts first
            filename: editFileName,
          }),
          fileFilter: fileFilter,
        }),
      )
      async uploadedFile(@UploadedFile() file) {
        const response = {
          originalname: file.originalname,
          filename: file.filename,
        };
        return {
          status: HttpStatus.OK,
          message: 'Mediafile uploaded successfully!',
          data: response,
        };
      }
  
      //upload multiple files
      @Post('/upload/files')
      @UseInterceptors(
          FilesInterceptor('file', 10, {
            storage: diskStorage({
              destination: './uploads',//path to save, to change go to app.module.ts first
              filename: editFileName,
            }),
            fileFilter: fileFilter,
          }),
        )
        async uploadMultipleMediaFiles(@UploadedFiles() files){
          const response = [];
          files.forEach(file => {
              const fileResponse = {
                  originalname: file.originalname,
                  filename: file.filename,
              };
              response.push(fileResponse);
          });
          return {
              status: HttpStatus.OK,
              message: 'Mediafile uploaded successfully!',
              data: response,
          };
        }
  
        // getting uploaded mediafile to ./uploads
        @Get(':mediafilename')
        getMediaFile(@Param('mediafilename') mediafile, @Res() resp){
          const response = resp.sendFile(mediafile, {root: './uploads'});
          if(!response){
            throw new UploadException(mediafile.root); //not tested yet
          }else {return  {
              status: HttpStatus.OK,
              data: response,
          };};
        }
}

function diskStorage(_arg0: { destination: string; filename: any; }): any {
    //throw new Error("Function not implemented.");
}
