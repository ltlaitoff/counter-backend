import { Module } from '@nestjs/common'
import { UserModule } from 'src/user/user.module'
import { InitializeController } from './initialize.controller'
import { InitializeService } from './initialize.service'

@Module({
	imports: [UserModule],
	controllers: [InitializeController],
	providers: [InitializeService]
})
export class InitializeModule {}
