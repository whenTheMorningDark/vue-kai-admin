/* eslint-disable semi */
/* eslint-disable indent */
const getters = {
	sidebar: state => state.app.sidebar,
	language: state => state.app.language,
	size: state => state.app.size,
	device: state => state.app.device,
	permission_routes: state => state.permission.routes,
	token: state => state.user.token,
	roles: state => state.user.roles
};
// eslint-disable-next-line eol-last
export default getters