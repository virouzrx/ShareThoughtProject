import '../../../Home/Home.css';

function HashtagWrapper(props) {
    return (
        <div class="post-author-and-info">
            <img class="card-author-avatar" src={props.authorPic} />
            <p class="author-name-and-date">Jacquline Kerez</p>
            <div class="vr"></div>
            <p class="author-name-and-date">props</p>
        </div>
    );
}

export default HashtagWrapper;