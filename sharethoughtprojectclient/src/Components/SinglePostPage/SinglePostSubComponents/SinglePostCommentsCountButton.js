import { Button } from "react-bootstrap";
import '../SinglePost.css'

function SinglePostCommentsCountButton(props) {
    return (
        <div className="single-post-comments-count">
  
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                    class="bi bi-chat-left-fill icon-placement" viewBox="0 0 16 16">
                    <path
                        d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                </svg>
                {props.commentCount}
        </div>);
}
export default SinglePostCommentsCountButton;