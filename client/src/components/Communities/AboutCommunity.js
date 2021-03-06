import "./AboutCommunity.css";

function AboutCommunity({
  communityDetails,
  createPostHandler,
  joinHandler,
  loading,
}) {
  const joinBtn = (
    <div>
      <button
        type="button"
        className="community-cta join-cta"
        onClick={joinHandler}
        disabled={loading}
      >
        Join
      </button>
    </div>
  );
  const creatorBtns = (
    <>
      <div>
        <button type="button" className="community-cta edit-cta">
          Edit
        </button>
      </div>
      <div>
        <button type="button" className="community-cta delete-cta">
          Delete
        </button>
      </div>
    </>
  );
  const createPostBtn = (
    <div>
      <button
        type="button"
        className="community-cta create-post-cta"
        onClick={createPostHandler}
      >
        Publish
      </button>
    </div>
  );

  return (
    <aside className="community-info">
      <section className="info-header-wrapper">
        <p className="info-header-text">About {communityDetails.name}</p>
      </section>
      <section className="info-content-wrapper">
        <p className="info-content-text">{communityDetails.description}</p>
      </section>
      <section className="additional-info-section">
        <div>{communityDetails.members} member/s</div>
        <div>Created {communityDetails.createdOn}</div>
      </section>
      <section className="community-cta-section">
        {communityDetails.userIsMember ? createPostBtn : joinBtn}
        {communityDetails.userIsCreator && creatorBtns}
      </section>
    </aside>
  );
}

export default AboutCommunity;
