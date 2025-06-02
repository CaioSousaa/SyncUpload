import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { SeederModule } from 'src/modules/seeder/seeder.module';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot(), SeederModule],
})
export class AppModule {}
