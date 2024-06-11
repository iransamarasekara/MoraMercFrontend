import React, { useRef, useEffect } from 'react';
import './Popular.css';
import Item from '../Item/Item';
import { useState} from 'react';

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch('https://projectbisonbackend.onrender.com/popularinmora')
      .then((response) => response.json())
      .then((data) => setPopularProducts(data));
  }, []);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
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

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='popular'>
      <h1>Mora</h1>
      <h2>POPULAR</h2>
      <div className='popular-item' ref={scrollContainerRef}>
        {popularProducts.map((item, i) => (
          <div className='item' key={i}>
            <Item
              id={item.id}
              name={item.name}
              brand={item.brand}
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
};

export default Popular;
