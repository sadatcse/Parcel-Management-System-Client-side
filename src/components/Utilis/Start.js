export function displayStars(rating)  {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 === 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
  
    if (halfStar) {
      stars.push('★');
    }
  
    for (let i = 0; i < emptyStars; i++) {
      stars.push('☆');
    }
  
    return stars.join(' ');
  }

