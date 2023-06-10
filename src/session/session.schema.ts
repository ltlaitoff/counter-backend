import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Sessions {
	@Prop({ type: String, required: true })
	_id: string

	@Prop()
	expires: Date

	@Prop()
	session: string
}

export const SessionsSchema = SchemaFactory.createForClass(Sessions)
