import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { SuggestionsModule } from './suggestions/suggestions.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TasksModule,
    SuggestionsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
