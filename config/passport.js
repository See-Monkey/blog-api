import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import userModel from "../models/userModel.js";

export function configurePassport() {
	const opts = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.JWT_SECRET,
	};

	passport.use(
		new JwtStrategy(opts, async (payload, done) => {
			try {
				const user = await userModel.findById(payload.id);

				if (!user) return done(null, false);

				return done(null, userModel.sanitizeUser(user));
			} catch (err) {
				return done(err, false);
			}
		}),
	);
}
