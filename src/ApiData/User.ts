import { AttributesObject } from 'jsonapi-typescript';

export interface User extends AttributesObject {

    /** Name of the user */
    name: string;

    /** The email for the user */
    email: string;

    /** The user's biography */
    bio: string;

    /** HTML version of bio */
    bio_html: string;

    /** Number of followers the user has */
    num_followers: number;

    /** Number of stories the user has published */
    num_stories: number;

    /** Number of blog entries the user has posted */
    num_blog_posts: number;

    /** The user's avatar */
    avatar: Record<string, string>;

    /** Date the user was last online */
    date_last_online: string;

    /** The user's profile color */
    color: {
        hex: string;
        rgb: [number, number, number];
    };

    /** Date the user registered on the site */
    date_joined: string;

}
