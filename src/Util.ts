import { ProfileItem } from "@oauth-everything/profile";

import { UserResponse } from "./ApiData/UserResponse";

export function buildPhotos(json: UserResponse): ProfileItem[] {

    const photos: ProfileItem[] = [];

    if(json.data.attributes && json.data.attributes.avatar) {

        const avatars = json.data.attributes.avatar;
        const sizes = Object.getOwnPropertyNames(avatars);

        for(const size of sizes) {
            photos.push({
                value: avatars[size],
                type: `avatar_${size}x${size}`
            });
        }

    }

    return photos;

}
