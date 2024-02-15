export interface IToken {
    id: string
    user_id: string
	access_token: string | null
    access_token_expires_at: number | null
    refresh_token: string | null
    refresh_token_expires_at: number | null
    description: string | null
    create_at: number | null
}

export interface ITokenWithUser extends IToken {
	username?: string
}

export interface IAddToken {
	user_id: string
	access_token: string | null
    access_token_expires_at: number | null
    refresh_token: string | null
    refresh_token_expires_at: number | null
    description: string | null
}

export interface IUpdateToken extends IAddToken{
	id: string | undefined
}
