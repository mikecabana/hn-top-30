export interface HNItem {
    /**
     * The username of the item's author.
     *
     * @type {string}
     * @memberof HNStory
     */
    by: string;
    /**
     * `true` if the item is dead.
     *
     * @type {boolean}
     * @memberof HNItem
     */
    dead?: boolean;
    /**
     * `true` if the item is deleted.
     *
     * @type {boolean}
     * @memberof HNItem
     */
    deleted?: boolean;
    /**
     * The total comment count.
     *
     * @type {number}
     * @memberof HNStory
     */
    descendants?: number;
    /**
     * The item's unique id.
     *
     * @type {number}
     * @memberof HNStory
     */
    id: number;
    /**
     * The ids of the item's comments, in ranked display order.
     *
     * @type {number[]}
     * @memberof HNStory
     */
    kids?: number[];
    /**
     * The comment's parent: either another comment or the relevant story.
     *
     * @type {number}
     * @memberof HNItem
     */
    parent?: number;
    /**
     * A list of related pollopts, in display order.
     *
     * @type {number[]}
     * @memberof HNItem
     */
    parts?: number[];
    /**
     * The pollopt's associated poll.
     *
     * @type {number}
     * @memberof HNItem
     */
    poll?: number;
    /**
     * The story's score, or the votes for a pollopt.
     *
     * @type {number}
     * @memberof HNStory
     */
    score?: number;
    /**
     * The comment, story or poll text. HTML.
     *
     * @type {string}
     * @memberof HNItem
     */
    text?: string;
    /**
     * Creation date of the item, in Unix Time.
     *
     * @type {number}
     * @memberof HNStory
     */
    time: number;
    /**
     * The title of the story. HTML.
     *
     * @type {string}
     * @memberof HNStory
     */
    title?: string;
    /**
     * The type of item. One of "job", "story", "comment", "poll", or "pollopt".
     *
     * @type {string}
     * @memberof HNStory
     */
    type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt';
    /**
     *
     *
     * @type {string}
     * @memberof HNStory
     */
    url?: string;
}
