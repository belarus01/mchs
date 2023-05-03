import { InjectQueue } from "@nestjs/bull";
import { Controller, HttpStatus, Post, UseInterceptors, UploadedFile, UploadedFiles, Get, Param, Res } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Queue } from "bull";
import { createWriteStream } from "fs";
import { UploadException } from "src/modules/exception/upload.exception";
import { editFileName, mediaFileFilter } from "src/utils/mediafile-upload";

@Controller('mediafile')
export class MediafileController {
    constructor(
      //@InjectQueue('upload-queue') private fileQueue: Queue
      ){}

    //upload single mediafile
    @Post('/upload/mediafile')
    @UseInterceptors(
      FileInterceptor('mediafile', {
        storage: diskStorage({
          destination: './uploads',//path to save, to change go to app.module.ts first
          filename: editFileName,
        }),
        fileFilter: mediaFileFilter,
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

    //upload multiple mediafiles
    @Post('/upload/mediafiles')
    @UseInterceptors(
        FilesInterceptor('mediafile', 10, {
          storage: diskStorage({
            destination: './uploads',//path to save, to change go to app.module.ts first
            filename: editFileName,
          }),
          fileFilter: mediaFileFilter,
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

      //пока в разработке
      @Post('/upload/mediafile/to/path')
      @UseInterceptors(
        /* FileInterceptor('mediafile', {
          storage: diskStorage({
            destination: './uploads',//path to save, to change go to app.module.ts first
            filename: editFileName,
          }),
          fileFilter: mediaFileFilter,
        }), */
        FileInterceptor('mediafile')
      )
      async uploadedFileToPath(@UploadedFile() file, @Param() path: string) {//передавать путь..а правильно ли передаешь?
        const response = {
          originalname: file.originalname,
          filename: file.filename,
          path: path,
        };

/*         const fileStream = createWriteStream(path);
        fileStream.write(file.buffer);
        fileStream.end(); */
        return {
          status: HttpStatus.OK,
          message: 'Mediafile uploaded successfully!',
          data: response,
        };
      }

}

function diskStorage(_arg0: { destination: string; filename: any; }): any {
    //throw new Error("Function not implemented.");
}



