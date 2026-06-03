"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostStatistics = exports.ShortPostContent = exports.FullPostContent = void 0;
class ContentBase {
    constructor(title) {
        this.title = title;
    }
    getTitle() {
        return this.title;
    }
}
class FullPostContent extends ContentBase {
    constructor(data) {
        super(data.post.title);
        this.authorName = data.user.name;
        this.authorEmail = data.user.email;
        this.body = data.post.body;
        this.commentsCount = data.comments.length;
        this.commentsSummaryLength = data.comments.reduce((sum, comment) => sum + comment.body.length, 0);
    }
    getSummary() {
        return `Post: "${this.title}" by ${this.authorName}`;
    }
    getDetailedInfo() {
        return `
            Title: ${this.title}
            Author: ${this.authorName} (${this.authorEmail})
            Body length: ${this.body.length} characters
            Comments: ${this.commentsCount}
            Total comments text length: ${this.commentsSummaryLength} characters
        `;
    }
    getAuthorName() {
        return this.authorName;
    }
    getCommentsCount() {
        return this.commentsCount;
    }
    getTotalCommentsLength() {
        return this.commentsSummaryLength;
    }
}
exports.FullPostContent = FullPostContent;
class ShortPostContent extends ContentBase {
    constructor(fullContent, originalData) {
        super(fullContent.getTitle());
        this.authorName = fullContent.getAuthorName();
        this.commentsCount = fullContent.getCommentsCount();
        this.bodyPreview = originalData.post.body.substring(0, 50) + (originalData.post.body.length > 50 ? '...' : '');
    }
    getSummary() {
        return `"${this.title}" - ${this.commentsCount} comments`;
    }
    getShortInfo() {
        return `
            Short Post
            Title: ${this.title}
            Author: ${this.authorName}
            Preview: ${this.bodyPreview}
            Comments: ${this.commentsCount}
        `;
    }
    getAuthorName() {
        return this.authorName;
    }
    getCommentsCount() {
        return this.commentsCount;
    }
}
exports.ShortPostContent = ShortPostContent;
class PostStatistics extends ContentBase {
    constructor(fullContent, originalData) {
        super(fullContent.getTitle());
        this.postBodyLength = originalData.post.body.length;
        this.totalDataLength = fullContent.getTotalCommentsLength() + this.postBodyLength;
        const commentsCount = fullContent.getCommentsCount();
        this.averageCommentLength = commentsCount > 0 ? fullContent.getTotalCommentsLength() / commentsCount : 0;
    }
    getSummary() {
        return `Stats for "${this.title}": ${this.totalDataLength} total characters`;
    }
    getStatistics() {
        return `
            Post Statistics
            Post body length: ${this.postBodyLength} characters
            Average comment length: ${this.averageCommentLength.toFixed(2)} characters
            Total data length: ${this.totalDataLength} characters
        `;
    }
    getTotalDataLength() {
        return this.totalDataLength;
    }
    getAverageCommentLength() {
        return this.averageCommentLength;
    }
}
exports.PostStatistics = PostStatistics;
