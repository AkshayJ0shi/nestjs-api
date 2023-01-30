import { Injectable } from '@nestjs/common';
import { v4 as uuid} from "uuid";
import { students } from 'src/db';
import { CreateStudentDto, FindStudentResponseDto, StudentResponseDto, UpdateStudentDto } from './dto/student.dto';

// This creates a Dependency Injection to be used in other classes
// This contains all the function definitions we need to use in controller.ts
// Hover on @Injectable for more info
@Injectable()
export class StudentService {

    private students = students

    getStudents() : FindStudentResponseDto[]{
        return this.students
    }

    getStudentById(studentId : string) : FindStudentResponseDto {
        return this.students.find(student => student.id == studentId)
    }

    createStudent(payload : CreateStudentDto){
        let newStudent = {
            id : uuid(),
            ...payload
        }

        this.students.push(newStudent)

        return newStudent
    }

    updateStudent(payload : UpdateStudentDto, studentId : string){
        
        let updatedStudent : StudentResponseDto

        let updatedStudentList = this.students.map(student =>{
            if(student.id === studentId){
                updatedStudent = {
                    id : studentId,
                    ...payload
                }
                return updatedStudent
            } else {
                return student
            }
        })

        this.students = updatedStudentList

        return updatedStudent
    }

    getStudentsByTeacherId(teacherId : string): FindStudentResponseDto[]{
        return this.students.filter(student => (
            student.teacher === teacherId
        ))
    }

    updateStudentTeacher(teacherId : string, studentId : string) : StudentResponseDto {
        let updatedStudent : StudentResponseDto

        let updatedStudentList = this.students.map(student =>{
            if(student.id === studentId){
                updatedStudent = {
                    ...student,
                    teacher : teacherId,  
                }
                return updatedStudent
            } else {
                return student
            }
        })

        this.students = updatedStudentList

        return updatedStudent
    }

}


