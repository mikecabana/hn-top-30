export interface HNUser {
    /**
     * The user's optional self-description. HTML.
     *
     * @type {string}
     * @memberof HNUser
     */
    about: string;
    /**
     * Creation date of the user, in Unix Time.
     *
     * @type {number}
     * @memberof HNUser
     */
    created: number;
    /**
     * The user's unique username. Case-sensitive. Required.
     *
     * @type {string}
     * @memberof HNUser
     */
    id: string;
    /**
     * The user's karma.
     *
     * @type {number}
     * @memberof HNUser
     */
    karma: number;
    /**
     * List of the user's stories, polls and comments.
     *
     * @type {number[]}
     * @memberof HNUser
     */
    submitted: number[];
}
