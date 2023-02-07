import { HttpException, HttpStatus } from "@nestjs/common"
import { extname } from "path";

export const mediaFileFilter = (req, file, callback) =>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|mov)$/)){
        return callback(
            new HttpException('Only image/video files are allowed!', HttpStatus.BAD_REQUEST,
            ),
             false,);//=> if the type !match => not be saved
        } callback(null, true);// if the type matches => save
    };

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.origonalename);

    callback(null, `${name}${fileExtName}`);
};





    