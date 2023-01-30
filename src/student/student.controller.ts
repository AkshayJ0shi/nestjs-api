import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { CreateStudentDto, FindStudentResponseDto, StudentResponseDto, UpdateStudentDto } from "./dto/student.dto";
import { StudentService } from "./student.service";

// This is a decorator we have to import from nextJS
@Controller("students")
export class StudentController{

    // This constructor is importing all the functions from student.service.ts
    // Here we are declaring StudentService is coming from student.service.ts as its being njected in this class.
    // Following constructor is called to inject StudentService
    constructor(private readonly studentService : StudentService){}


    //@Get and the remaining http methods are imported from nextJS and are used as decorators
    //This extends URL extention we have declared on @Controller
    @Get()
    getStudents () : FindStudentResponseDto[]{
        // The job of the controller is to return ths function responsible for rendering specific output. Here getStudents()
        return this.studentService.getStudents()
    }

    @Get("/:studentId")
    getStudentById (
        // Here we are destructuring stidentID from URL params
        // This is like saying
        // @Param() params : { studentId : string } 
        @Param("studentId", new ParseUUIDPipe()) studentId : string,
    ) : FindStudentResponseDto {
       return this.studentService.getStudentById(studentId)
    }

    @Post()
    createStudent(
        @Body() body : CreateStudentDto
    )  : StudentResponseDto {
        return this.studentService.createStudent(body)
    }

    @Put("/:studentId")
    updateStudent(
        @Param("studentId", new ParseUUIDPipe()) studentId : string,
        @Body() body : UpdateStudentDto
    ) : StudentResponseDto{
        return this.studentService.updateStudent(body, studentId)
    }

}