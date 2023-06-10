import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SessionController } from './session.controller'
import { Sessions, SessionsSchema } from './session.schema'
import { SessionService } from './session.service'

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Sessions.name,
				schema: SessionsSchema
			}
		])
	],
	controllers: [SessionController],
	providers: [SessionService]
})
export class SessionModule {}
