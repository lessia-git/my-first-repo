"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
const abstraction_1 = require("./abstraction");
async function main() {
    try {
        console.log('Fetching post data from JSONPlaceholder API \n');
        const postData = await (0, api_1.getPostWithUserAndComments)(1);
        console.log('Post data fetched successfully!\n');
        const fullContent = new abstraction_1.FullPostContent(postData);
        console.log(' Full Post Content ');
        console.log(fullContent.getSummary());
        console.log(fullContent.getDetailedInfo());
        const shortContent = new abstraction_1.ShortPostContent(fullContent, postData);
        console.log(' Short Post Content ');
        console.log(shortContent.getSummary());
        console.log(shortContent.getShortInfo());
        const statistics = new abstraction_1.PostStatistics(fullContent, postData);
        console.log(' Post Statistics ');
        console.log(statistics.getSummary());
        console.log(statistics.getStatistics());
        console.log(' Method Demonstrations ');
        console.log(`Author: ${fullContent.getAuthorName()}`);
        console.log(`Comments count: ${fullContent.getCommentsCount()}`);
        console.log(`Total comments length: ${fullContent.getTotalCommentsLength()} characters`);
        console.log(`Average comment length: ${statistics.getAverageCommentLength().toFixed(2)} characters`);
        console.log(`Total data length: ${statistics.getTotalDataLength()} characters`);
    }
    catch (error) {
        console.error('Error:', error instanceof Error ? error.message : String(error));
    }
}
main().catch(error => console.error('Uncaught error:', error));
