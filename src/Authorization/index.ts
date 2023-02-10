import { ROUTER_PATH } from './config'
import * as helpers from './helpers'

import router from './authorization.router'

const AuthorizationRouter = {
	router,
	path: ROUTER_PATH
}

export { helpers as AuthorizationHelpers, AuthorizationRouter }
