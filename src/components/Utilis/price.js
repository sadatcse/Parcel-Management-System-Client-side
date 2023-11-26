export const calculateDeliveryPrice = (weight) => {
    
    let price = 0;

    if (weight <= 1) {
      price = 50 * weight;
    } else if (weight <= 2) {
      price = 100;
    } else {
      price = 150;
    }

    return price;
  };