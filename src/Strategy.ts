import { Strategy as OAuth2Strategy, StrategyOptions as OAuth2StrategyOptions, InternalOAuthError } from "passport-oauth2";
import { Profile as OAuth2Profile } from "@oauth-everything/profile";
import {
    ExtendableStrategyOptions,
    ExtendableStrategyOptionsWithRequest,
    OAuth2VerifyCallback,
    OAuth2VerifyFunction,
    OAuth2VerifyFunctionWithRequest,
    OAuth2VerifyFunctionWithResults,
    OAuth2VerifyFunctionWithRequestAndResults
} from "@oauth-everything/oauth2-types";

import { UserResponse } from "./ApiData/UserResponse";
import { Scope } from "./Scope";
import { buildPhotos } from "./Util";

export interface TokenResponse {
    access_token: string;
    token_type: string;
    scope: string;
    user: {
        id: string;
        name: string;
        email?: string;
    };
}

export type Profile = OAuth2Profile<UserResponse>;
export type StrategyOptions = ExtendableStrategyOptions<{}>;
export type StrategyOptionsWithRequest = ExtendableStrategyOptionsWithRequest<{}>;
export type VerifyCallback<TUser = object, TInfo = object> = OAuth2VerifyCallback<TUser, TInfo>;
export type VerifyFunction<TUser, TInfo> = OAuth2VerifyFunction<Profile, TUser, TInfo>;
export type VerifyFunctionWithRequest<TUser, TInfo> = OAuth2VerifyFunctionWithRequest<Profile, TUser, TInfo>;
export type VerifyFunctionWithResults<TUser, TInfo> = OAuth2VerifyFunctionWithResults<TokenResponse, Profile, TUser, TInfo>;
export type VerifyFunctionWithRequestAndResults<TUser, TInfo> = OAuth2VerifyFunctionWithRequestAndResults<TokenResponse, Profile, TUser, TInfo>;

export class Strategy<TUser = object, TInfo = object> extends OAuth2Strategy {

    public name = "fimfiction";

    constructor(
        options: StrategyOptions,
        verify: VerifyFunction<TUser, TInfo>
            | VerifyFunctionWithResults<TUser, TInfo>
    )

    constructor(
        options: StrategyOptionsWithRequest,
        verify: VerifyFunctionWithRequest<TUser, TInfo>
            | VerifyFunctionWithRequestAndResults<TUser, TInfo>
    )

    constructor(
        options: StrategyOptions
            | StrategyOptionsWithRequest,
        verify: VerifyFunction<TUser, TInfo>
            | VerifyFunctionWithResults<TUser, TInfo>
            | VerifyFunctionWithRequest<TUser, TInfo>
            | VerifyFunctionWithRequestAndResults<TUser, TInfo>
    ) {

        super(
            {
                authorizationURL: "https://www.fimfiction.net/authorize-app",
                tokenURL: "https://www.fimfiction.net/api/v2/token",
                scope: [Scope.READ_USER],
                ...options
            } as OAuth2StrategyOptions,
            verify as VerifyFunction<TUser, TInfo>
        );

    }

    public userProfile(accessToken: string, done: (err?: Error | null, profile?: Profile | null) => void): void {

        this._oauth2.useAuthorizationHeaderforGET(true);
        this._oauth2.get("https://www.fimfiction.net/api/v2/users/me", accessToken, (error, result) => {

            if (error) return done(new InternalOAuthError("Failed to fetch user profile", error));

            let json: UserResponse;

            try {
                json = JSON.parse(result as string) as UserResponse;
            }
            catch (parseError) {
                return done(new InternalOAuthError("Failed to parse user profile", parseError));
            }

            if(!json.data.id || !json.data.attributes) return done(new InternalOAuthError("Unexpected user profile format", new Error()));

            done(null, {
                provider: this.name,
                id: json.data.id,
                username: json.data.attributes.name,
                displayName: json.data.attributes.name,
                profileUrl: json.data.meta && json.data.meta.url,
                aboutMe: json.data.attributes.bio,
                created: json.data.attributes.date_joined ? new Date(json.data.attributes.date_joined) : undefined,
                emails: json.data.attributes.email ? [{ value: json.data.attributes.email }] : undefined,
                photos: buildPhotos(json),
                _raw: result as string,
                _json: json
            });

        });

    }

}
