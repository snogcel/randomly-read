export const SELECT_SITE_MODE = 'SELECT_SITE_MODE';
export const SELECT_TIMER_MODE = 'SELECT_TIMER_MODE';

export const selectSiteMode = (mode) => ({ type: SELECT_SITE_MODE, mode });
export const selectTimerMode = (auto) => ({ type: SELECT_TIMER_MODE, auto });
