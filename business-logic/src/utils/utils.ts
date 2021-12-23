import { Profile } from "../models/profile.model";

export function filterPublicProfiles(profile: Profile | null): Profile | null {
    if(profile) {
        if(profile.public) {
            return profile;
        } else {
            return {
                _id: profile._id,
                user: profile.user,
                username: profile.username,
                public: false
            }
        }
    } else {
        return null;
    }
}