import '../../../Home/Home.css';

function AuthorInfoAndCreateDate(props) {
    if (props.showInfo) {
    return (
        <div class="post-author-and-info">
            <img class="card-author-avatar" src={props.authorPic} />
            <p class="author-name-and-date">{props.authorName}</p>
            <div class="vr"></div>
            <p class="author-name-and-date">props</p>
        </div>
    );}
    else {
        return (<div></div>);
    }
}

export default AuthorInfoAndCreateDate;