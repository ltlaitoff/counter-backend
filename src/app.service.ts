import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
	getHello(): string {
		return `Hello World! Current port ${process.env.PORT}`
	}
}
