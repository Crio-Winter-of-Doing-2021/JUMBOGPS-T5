export const BASE_URL = "http://localhost:8000"

export const SIGN_IN_URL = `${BASE_URL}/auth/auth/signin`
export const SIGN_UP_URL = `${BASE_URL}/auth/auth/signup`
export const PROFILE_URL = `${BASE_URL}/auth/auth/user`

export const ASSET_LIST_URL = `${BASE_URL}/api/asset/list`
export const trackUrl = id => `${BASE_URL}/api/asset/track?_id=${id}`