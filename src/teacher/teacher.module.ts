import { Module } from '@nestjs/common';
import { StudentService } from 'src/student/student.service';
import { StudentTeacherController } from './student.controller';

import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

@Module({
    controllers : [TeacherController, StudentTeacherController],
    providers : [TeacherService, StudentService]
})
export class TeacherModule {}
