import { Button } from 'react-bootstrap';
import '../../SinglePostPage/SinglePost.css'

function SinglePostLikeButton(props) {
    return (
            <div className='single-post-likes-count'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                    class="bi bi-arrow-up-square-fill icon-placement" viewBox="0 0 16 16">
                    <path
                        d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z">
                    </path>
                </svg>
                {props.upvoteCount}
            </div>);
}

export default SinglePostLikeButton;