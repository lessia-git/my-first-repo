import type { PostWithUserAndComments, Comment } from './types';

abstract class ContentBase {
    protected title: string;

    public constructor(title: string) {
        this.title = title;
    }

    public abstract getSummary(): string;

    public getTitle(): string {
        return this.title;
    }
}


export class FullPostContent extends ContentBase {
    private authorName: string;
    private authorEmail: string;
    private body: string;
    private commentsCount: number;
    private commentsSummaryLength: number;

    public constructor(data: PostWithUserAndComments) {
        super(data.post.title);
        this.authorName = data.user.name;
        this.authorEmail = data.user.email;
        this.body = data.post.body;
        this.commentsCount = data.comments.length;
        this.commentsSummaryLength = data.comments.reduce((sum: number, comment: Comment) => sum + comment.body.length, 0);
    }

    public getSummary(): string {
        return `Post: "${this.title}" by ${this.authorName}`;
    }

    public getDetailedInfo(): string {
        return `
            Title: ${this.title}
            Author: ${this.authorName} (${this.authorEmail})
            Body length: ${this.body.length} characters
            Comments: ${this.commentsCount}
            Total comments text length: ${this.commentsSummaryLength} characters
        `;
    }

    public getAuthorName(): string {
        return this.authorName;
    }

    public getCommentsCount(): number {
        return this.commentsCount;
    }

    public getTotalCommentsLength(): number {
        return this.commentsSummaryLength;
    }
}

export class ShortPostContent extends ContentBase {
    private authorName: string;
    private commentsCount: number;
    private bodyPreview: string;

    public constructor(fullContent: FullPostContent, originalData: PostWithUserAndComments) {
        super(fullContent.getTitle());
        this.authorName = fullContent.getAuthorName();
        this.commentsCount = fullContent.getCommentsCount();

        this.bodyPreview = originalData.post.body.substring(0, 50) + (originalData.post.body.length > 50 ? '...' : '');
    }

    public getSummary(): string {
        return `"${this.title}" - ${this.commentsCount} comments`;
    }

    public getShortInfo(): string {
        return `
            Short Post
            Title: ${this.title}
            Author: ${this.authorName}
            Preview: ${this.bodyPreview}
            Comments: ${this.commentsCount}
        `;
    }

    public getAuthorName(): string {
        return this.authorName;
    }

    public getCommentsCount(): number {
        return this.commentsCount;
    }
}

export class PostStatistics extends ContentBase {
    private totalDataLength: number;
    private averageCommentLength: number;
    private postBodyLength: number;

    public constructor(fullContent: FullPostContent, originalData: PostWithUserAndComments) {
        super(fullContent.getTitle());
        this.postBodyLength = originalData.post.body.length;
        this.totalDataLength = fullContent.getTotalCommentsLength() + this.postBodyLength;

        const commentsCount = fullContent.getCommentsCount();
        this.averageCommentLength = commentsCount > 0 ? fullContent.getTotalCommentsLength() / commentsCount : 0;
    }

    public getSummary(): string {
        return `Stats for "${this.title}": ${this.totalDataLength} total characters`;
    }

    public getStatistics(): string {
        return `
            Post Statistics
            Post body length: ${this.postBodyLength} characters
            Average comment length: ${this.averageCommentLength.toFixed(2)} characters
            Total data length: ${this.totalDataLength} characters
        `;
    }

    public getTotalDataLength(): number {
        return this.totalDataLength;
    }

    public getAverageCommentLength(): number {
        return this.averageCommentLength;
    }
}
