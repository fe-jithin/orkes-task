import React, { useEffect, useState } from 'react';
import FeedItem from '../FeedItem/FeedItem';
import { v4 as uuidv4 } from 'uuid';

const FeedsContainer = () => {
  const [feedData, setFeedData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFeed = async (pageNumber) => {
    try {
      let response = await fetch(`http://localhost:3000/api/photo-gallery?page=${pageNumber}`);
      let data = await response.json();
      return data.nodes;
    } catch (e) {
      console.log("Encountered error - ", e);
      return [];
    }
  };

  const loadItems = async () => {
    if (isLoading)  return; 

    setIsLoading(true);
    const newItems = await fetchFeed(page);
    setFeedData((prevFeedData) => [...prevFeedData, ...newItems]);
    setPage((prevPage) => prevPage + 1);
    setIsLoading(false);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      loadItems();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

  useEffect(() => {
    loadItems();
  }, []); 

  return (
    <div className='feed_wrapper'>
      {feedData.map((feed) => (
        <FeedItem
          key={uuidv4()}
          thumbnail={feed.node.field_photo_image_section}
          title={feed.node.title}
          timeStamp={feed.node.last_update}
        />
      ))}
      {isLoading && <div className="loading-indicator">Loading...</div>}
    </div>
  );
};

export default FeedsContainer;
