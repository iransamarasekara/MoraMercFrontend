import React, { useRef, useEffect, useState } from 'react';
import './NewCollectionTrue.css';
import Item from '../Item/Item';

const NewCollectionTrue = () => {
    const [new_collection, setNewCollection] = useState([]);

    useEffect(() => {
      fetch('https://projectbisonbackend.onrender.com/newcollections')
        .then((response) => response.json())
        .then((data) => setNewCollection(data));
    }, []);

    const scrollContainerRef = useRef(null);

    useEffect(() => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return; // Check if scrollContainer is null
      const handleScroll = () => {
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
          const container = scrollContainer;
          const items = container.querySelectorAll('.item');
          const containerRect = container.getBoundingClientRect();
          const containerCenterX = containerRect.left + containerRect.width / 2;

          let closestItem;
          let minDistance = Infinity;

          items.forEach((item) => {
            const itemRect = item.getBoundingClientRect();
            const itemCenterX = itemRect.left + itemRect.width / 2;
            const distance = Math.abs(itemCenterX - containerCenterX);

            if (distance < minDistance) {
              closestItem = item;
              minDistance = distance;
            }
          });

          if (closestItem) {
            container.scrollTo({
              left:
                closestItem.offsetLeft -
                container.offsetWidth / 2 +
                closestItem.offsetWidth / 2,
              behavior: 'smooth',
            });
          }
        }, 150); // Adjust this timeout value as needed
      };

      if (scrollContainer) { // Check if scrollContainer is not null before adding event listener
        scrollContainer.addEventListener('scroll', handleScroll);
      }
      
      return () => {
        if (scrollContainer) { // Check if scrollContainer is not null before removing event listener
          scrollContainer.removeEventListener('scroll', handleScroll);
        }
      };
    }, [scrollContainerRef.current]); // Ensure useEffect runs when scrollContainerRef changes

    return (
      <div id='latestCollection' className='newcollections1'>
        <h1>NEW</h1>
        <h2>ARRIVALS</h2>
        <hr/>
        <div className="collections1" ref={scrollContainerRef}>
          {new_collection.map((item, i) => (
            <div className='item' key={i}>
              <Item
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
                rating={item.rating}
                reviewText={item.reviewText}
                no_of_rators={item.no_of_rators}
              />
            </div>
          ))}
        </div>
      </div>
    );
}

export default NewCollectionTrue;

