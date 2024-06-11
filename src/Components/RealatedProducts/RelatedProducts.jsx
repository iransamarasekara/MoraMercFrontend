import React, { useRef, useEffect, useState } from 'react';
import './RelatedProducts.css'
// import data_product from '../Assets/data'
import Item from '../Item/Item'

const RelatedProducts = (props) => {

  const {product} = props;

  const [relared,setRelated] = useState([]);

    useEffect(() => {
        // if(localStorage.getItem('auth-token')){
            fetch('https://projectbisonbackend.onrender.com/getrelatedproducts',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"category":product.category}),
            }).then((response)=>response.json()).then((data)=>setRelated(data));
        // }
    },[product.category])

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
    <div className='relatedproducts'>
      <h1>Related</h1>
      <h2>Products</h2>
      <hr/>
      <div className="relatedproducts-item" ref={scrollContainerRef}>
        {relared.map((item, i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} rating={item.rating} reviewText={item.reviewText} no_of_rators={item.no_of_rators}/>
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
