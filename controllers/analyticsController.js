import analyticsService from "../services/analyticsService.js";

async function getAnalytics(req, res, next) {
	try {
		const data = await analyticsService.getAnalytics();
		res.json(data);
	} catch (err) {
		next(err);
	}
}

export default {
	getAnalytics,
};
