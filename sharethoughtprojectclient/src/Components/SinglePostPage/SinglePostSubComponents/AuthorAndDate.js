function AuthorAndDate(props) {
    var date = new Date(props.created)
    var stringifiedDate = date.toLocaleDateString("es-PE");
    return (
        <div class="singlepost-author-and-info">
            <img className="singlepost-card-author-avatar" src={props.authorPic} />
            <p class="singlepost-author-name-and-date ">{props.authorName}</p>
            <div className="vr"></div>
            <p className="singlepost-author-name-and-date">{stringifiedDate}</p>
        </div>
    );
}

export default AuthorAndDate;