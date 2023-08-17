import React from 'react'
import useFormattedDate from "./../../hooks/useFormattedDate"

const FeedItem = ({thumbnail,title,timeStamp}) => {

const date = new Date(timeStamp * 1000); 
const formattedDate = useFormattedDate(date);

  return (
    <div className='feed-item'>
        <img src={thumbnail} className='feed-item__left' alt={title} />
        <div className="feed-item__right">
            <h3>{title}</h3>
            <span>{formattedDate}</span>
        </div>
    </div>
  )
}

export default FeedItem