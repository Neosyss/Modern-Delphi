import "./PriceCard.css";
const PriceCard2 = ({ price, title, description, image, css = 0, elem = 1 }) => {

    return (
        <>
            <div className="price-card  d-flex flex-column justify-content-between">
                <div>
                    <div className={`${elem == 2 ? "top-head-price-card2" : "top-head-price-card"}`}>
                        <h4>{title}</h4>
                    </div>

                    <div className="d-flex justify-content-between m-4">
                        <div className="d-flex justify-content-center flex-column">
                            <div className='bolder-price-card text-dark'>Start from</div>
                                <div className="heading-price-card ">${price}</div>
                                <p className='p session-pc grey'>per session</p>
                        </div>
                        <img src={image} className='price-card-img' />
                    </div>
                    <div className='grey m-3 p-2'>{description}</div>
                </div>

            </div>
        </>
    )
}

export default PriceCard2;