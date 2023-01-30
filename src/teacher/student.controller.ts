import { Controller, Get, Param, ParseUUIDPipe, Put } from "@nestjs/common";
import { students, teachers } from "src/db";
import { CreateStudentDto, FindStudentResponseDto } from "src/student/dto/student.dto";
import { StudentService } from "src/student/student.service";

@Controller("/teachers/:teacherId/students")
export class StudentTeacherController{

    private teachers = teachers
    private students = students

    constructor(private studentService : StudentService){}

    @Put("/:studentId")
    put(
        @Param("studentId", new ParseUUIDPipe()) studentId : string,
        @Param("teacherId", new ParseUUIDPipe()) teacherId : string
    ) : CreateStudentDto{
        return this.studentService.updateStudentTeacher(teacherId, studentId)
    }
    
    @Get() 
    getSpecificStudents(
        @Param("teacherId", new ParseUUIDPipe()) teacherId : string
    ) : FindStudentResponseDto[] {
        return this.studentService.getStudentsByTeacherId(teacherId)
    }

}