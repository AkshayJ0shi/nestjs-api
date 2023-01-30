import { HttpException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { students } from "src/db";


@Injectable()
export class validStudentMiddleware implements NestMiddleware {
    use(req : Request, res : Response, next : NextFunction){
        const studentId = req.params.studentId

        const studentExists = students.some(student => student.id === studentId)

        if (!studentExists) throw new HttpException("Student Not Found", 400)

        next()
    }
}