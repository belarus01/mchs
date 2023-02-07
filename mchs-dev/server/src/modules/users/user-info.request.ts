import { Request } from "express"
import { User } from "./user.entity"

export interface GetUserInfoRequest extends Request{
    user: User;
}