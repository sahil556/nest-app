import { Module } from '@nestjs/common';
import { StreamGateway } from './stream.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    providers: [StreamGateway],
    imports: [AuthModule]
})
export class StreamModule {}
