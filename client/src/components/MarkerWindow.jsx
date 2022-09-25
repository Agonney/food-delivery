export const MarkerWindow = ({restaurant}) => {
    const infoWindowStyle = {
      position: 'relative',
      bottom: 120,
      left: '-45px',
      width: 220,
      backgroundColor: 'white',
      boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
      padding: 10,
      fontSize: 14,
      zIndex: 100,
    };
  
    return (
      <div style={infoWindowStyle}>
        <div style={{ fontSize: 16 }}>
          {restaurant.name}
        </div>
        <div style={{ fontSize: 14 }}>
          <span style={{ color: 'grey' }}>
            {restaurant.rating}
            {' '}
          </span>
          <span style={{ color: 'orange' }}>
            {String.fromCharCode(9733).repeat(Math.floor(restaurant.rating))}
          </span>
          <span style={{ color: 'lightgrey' }}>
            {String.fromCharCode(9733).repeat(5 - Math.floor(restaurant.rating))}
          </span>
        </div>
        <div style={{ fontSize: 14, color: 'grey' }}>
          {restaurant.address}
        </div>
        <div style={{ fontSize: 14, color: 'green' }}>
          {restaurant.city}
        </div>
      </div>
    );
  };