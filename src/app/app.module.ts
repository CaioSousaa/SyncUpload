import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { SeederModule } from 'src/modules/seeder/seeder.module';
import { CSVModule } from 'src/modules/csv/csv.module';
import { LocationModule } from 'src/modules/location/location.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    SeederModule,
    CSVModule,
    LocationModule,
  ],
})
export class AppModule {}
