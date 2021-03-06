import { useEffect, useState } from "react";
import * as communityService from "../../services/communityService";
import CommunityListingItem from "./CommunityListingItem";
import CommunityListItemSkeleton from "../skeletons/CommunityListItemSkeleton";
import "./Communities.css";

function TopCommunities() {
  const [topCommunitiesList, setTopCommunitiesList] = useState([]);

  useEffect(() => {
    communityService
      .getTop()
      .then((data) => {
        if (data) {
          setTopCommunitiesList(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <aside className="site-highlight">
      <section className="highlight-header-wrapper">
        <p className="highlight-header">Most subscribed communities</p>
      </section>
      <section className="highlight-content-wrapper">
        <ol className="highlight-listing">
          {topCommunitiesList.length > 0 ? (
            topCommunitiesList.map((x) => (
              <CommunityListingItem key={x.id} name={x.name} />
            ))
          ) : (
            <>
              <CommunityListItemSkeleton />
              <CommunityListItemSkeleton />
              <CommunityListItemSkeleton />
              <CommunityListItemSkeleton />
              <CommunityListItemSkeleton />
            </>
          )}
        </ol>
      </section>
    </aside>
  );
}

export default TopCommunities;
