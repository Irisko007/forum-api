import { createPostRepository } from "./repositories/post.repository.js";
import { createPostService } from "./services/post.service.js";

const postRepository = createPostRepository();
export const postService = createPostService(postRepository);
