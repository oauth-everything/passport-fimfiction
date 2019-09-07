export enum Scope {

    /** Create, update and delete blog posts. */
    WRITE_BLOG_POSTS = "write_blog_posts",

    /** Read private bookshelves. */
    READ_BOOKSHELVES = "read_bookshelves",

    /** Create, update and delete bookshelves. */
    WRITE_BOOKSHELVES = "write_bookshelves",

    /** Read the items in private bookshelves. */
    READ_BOOKSHELF_ITEMS = "read_bookshelf_items",

    /** Add / remove items from the user's bookshelves */
    WRITE_BOOKSHELF_ITEMS = "write_bookshelf_items",

    /** Read the user's PMs */
    READ_PMS = "read_pms",

    /** Send / delete the user's PMs */
    WRITE_PMS = "write_pms",

    /** Follow / unfollow users */
    WRITE_FOLLOWERS = "write_followers",

    /** Read the user's unpublished stories. */
    READ_STORIES = "read_stories",

    /** Create, update and delete stories. */
    WRITE_STORIES = "write_stories",

    /** Create, update and delete comments. */
    WRITE_COMMENTS = "write_comments",

    /** Read private account information (just email currently). */
    READ_USER = "read_user",

    /** Modify account information. */
    WRITE_USER = "write_user",

    /** See what chapters the user has read. */
    READ_CHAPTER_READ = "read_chapter_read",

    /** Mark chapters as read / unread. */
    WRITE_CHAPTER_READ = "write_chapter_read",

}
