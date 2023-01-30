import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { validStudentMiddleware } from 'src/common/middlewares/validStudent.middleware';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
    controllers : [StudentController],
    providers : [StudentService]
})
export class StudentModule implements NestModule{
    
    configure(consumer: MiddlewareConsumer) {
        // console.log("this middleware is called")
        consumer.apply(validStudentMiddleware).forRoutes({
            path : "students/:studentId",
            method : RequestMethod.GET
        }),
        consumer.apply(validStudentMiddleware).forRoutes({
            path : "students/:studentId",
            method : RequestMethod.POST
        })
    }
}
