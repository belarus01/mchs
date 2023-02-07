import { Injectable } from "@nestjs/common";
import { Injector } from "@nestjs/core/injector/injector";
import { Router } from "express";

@Injectable()
export class ErrorService {
    constructor(private injector: Injector, private router: Router){
        
    }
}