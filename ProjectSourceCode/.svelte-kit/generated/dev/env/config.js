import { variables } from "../../../../src/env.ts";
import { validate, handle_issues } from '@sveltejs/kit/internal/env';

const issues = {};

export { variables }

export const dynamic_private_env = {};

export const explicit_public_env = {};

export const rendered_env = {};

handle_issues(issues);

export function set_env(env) {
	const issues = {};
	const POSTGRES_USER = validate(variables, env.POSTGRES_USER, "POSTGRES_USER", issues);
	dynamic_private_env.POSTGRES_USER = POSTGRES_USER;
	const POSTGRES_PASSWORD = validate(variables, env.POSTGRES_PASSWORD, "POSTGRES_PASSWORD", issues);
	dynamic_private_env.POSTGRES_PASSWORD = POSTGRES_PASSWORD;
	const POSTGRES_DB = validate(variables, env.POSTGRES_DB, "POSTGRES_DB", issues);
	dynamic_private_env.POSTGRES_DB = POSTGRES_DB;
	const NODE_ENV = validate(variables, env.NODE_ENV, "NODE_ENV", issues);
	dynamic_private_env.NODE_ENV = NODE_ENV;
	const SESSION_SECRET = validate(variables, env.SESSION_SECRET, "SESSION_SECRET", issues);
	dynamic_private_env.SESSION_SECRET = SESSION_SECRET;
	const BASE64_KEY = validate(variables, env.BASE64_KEY, "BASE64_KEY", issues);
	dynamic_private_env.BASE64_KEY = BASE64_KEY;
	handle_issues(issues);
}

set_env({POSTGRES_USER:"postgres",POSTGRES_PASSWORD:"postgres",POSTGRES_DB:"grocerwees",NODE_ENV:"development",SESSION_SECRET:"t_wTB465078peBjhWhPzmSP6h5tA7A_nZ9T3AtEz",BASE64_KEY:"Z3JvY2Vyd2Vlc3Rlc3QtYmJjamRmZ3o6dF93VEI0NjUwNzhwZUJqaFdoUHptU1A2aDV0QTdBX25aOVQzQXRFeg=="});