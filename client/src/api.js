const BASE_URL = 'http://localhost:3000/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
}

// --- Auth ---
export const signup = ({ email, password, name }) =>
  request('/auth/signup', { method: 'POST', body: JSON.stringify({ email, password, name }) });

export const login = ({ email, password }) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });

export const logout = () =>
  request('/auth/logout', { method: 'POST' });

export const getMe = () =>
  request('/auth/me');

// --- Profiles ---
export const getMyProfile = () =>
  request('/profiles/profile');

export const createProfile = ({ subject_studying, availible_time, bio }) =>
  request('/profiles/profile', {
    method: 'POST',
    body: JSON.stringify({ subject_studying, availible_time, bio }),
  });

// --- Swipes / Matches ---
export const getFeed = () =>
  request('/swipes/feed');

export const swipe = ({ target_id, decision }) =>
  request('/swipes/swipe', { method: 'POST', body: JSON.stringify({ target_id, decision }) });

export const getMatches = () =>
  request('/swipes/matches');

// --- Messages ---
export const getMessages = (matchId) =>
  request(`/messages/${matchId}`);

export const sendMessage = ({ match_id, content }) =>
  request('/messages', { method: 'POST', body: JSON.stringify({ match_id, content }) });
