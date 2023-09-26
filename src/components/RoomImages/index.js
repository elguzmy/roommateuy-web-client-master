import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Carousel from 'nuka-carousel';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const RoomImages = (props) => (
    <div>
        <Carousel
            autoplay={true}
            pauseOnHover={false}
            speed={1000}
            wrapAround={true}
            renderBottomCenterControls={() => false}
            renderCenterLeftControls={({ previousSlide }) => (
                <button onClick={previousSlide}>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        color="#FFFFFF"
                        size="2x"
                    />
                </button>
            )}
            renderCenterRightControls={({ nextSlide }) => (
                <button onClick={nextSlide}>
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        color="#FFFFFF"
                        size="2x"
                    />
                </button>
            )}
        >
            {
                props.room.images &&
                props.room.images.map((image, i) => (
                    <div key={i}>
                        <img className="room-images" src={image} alt='' />
                    </div>
                ))
            }
        </Carousel>

        {props.room.headline &&
            <h4 className="room-headline">{props.room.headline}</h4>
        }
        {props.room.rate &&
            <h4 className="room-price">{`$${props.room.rate}`}</h4>
        }
    </div>
)

export default RoomImages;