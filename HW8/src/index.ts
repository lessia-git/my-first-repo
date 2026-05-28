import { getPostWithUserAndComments } from './api';
import { FullPostContent, ShortPostContent, PostStatistics } from './abstraction';

async function main(): Promise<void> {
    try {
        console.log('Fetching post data from JSONPlaceholder API \n');

        const postData = await getPostWithUserAndComments(1);
        console.log('Post data fetched successfully!\n');

        const fullContent = new FullPostContent(postData);
        console.log(' Full Post Content ');
        console.log(fullContent.getSummary());
        console.log(fullContent.getDetailedInfo());

        const shortContent = new ShortPostContent(fullContent, postData);
        console.log(' Short Post Content ');
        console.log(shortContent.getSummary());
        console.log(shortContent.getShortInfo());

        const statistics = new PostStatistics(fullContent, postData);
        console.log(' Post Statistics ');
        console.log(statistics.getSummary());
        console.log(statistics.getStatistics());

        console.log(' Method Demonstrations ');
        console.log(`Author: ${fullContent.getAuthorName()}`);
        console.log(`Comments count: ${fullContent.getCommentsCount()}`);
        console.log(`Total comments length: ${fullContent.getTotalCommentsLength()} characters`);
        console.log(`Average comment length: ${statistics.getAverageCommentLength().toFixed(2)} characters`);
        console.log(`Total data length: ${statistics.getTotalDataLength()} characters`);
    } catch (error) {
        console.error('Error:', error instanceof Error ? error.message : String(error));
    }
}

main().catch(error => console.error('Uncaught error:', error));
