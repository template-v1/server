import { ContactMessageModule } from './../modules/contact-message/contact-message.module';
import { BlogsModule } from './../modules/blogs/blogs.module';
import { AuthModule } from './../modules/auth/auth.module';
import { UsersModule } from './../modules/users/users.module';
import { CommentModule } from 'src/modules/comment/comment.module';

export const SharedModule = [
   UsersModule,
   AuthModule,
   BlogsModule,
   ContactMessageModule,
   CommentModule,
]