import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

/**
 * Movie carousel with genre filter
 * @props
 * handleSwitch: (movie:Object)=>void switch selected movie
 */
const MovieList = (props) => {
    const {handleSwitch} = props;
    const [movies, setMovies] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [genre, setGenre] = useState(''); // current genre
    useEffect(() => {

        // get movie data from api
        axios.get('https://www.mocky.io/v2/5af935ab320000221d86afe6')
            .then((res) => {
                // get all genres
                let list = new Set();
                for (let i of res.data) {
                    for (let g of i.Genre.split(',')) {
                        list.add(g.trim());
                    }
                }
                setMovies(res.data);
                setGenreList(Array.from(list).sort());
                handleSwitch(res.data[0]); // select the first movie by default
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    // Carousel responsive config
    const responsive = {
        desktop: {
            breakpoint: { max: 4000, min: 992 },
            items: 6
        },
        tablet: {
            breakpoint: { max: 992, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 576, min: 0 },
            items: 2
        }
    };

    // customize carousel button
    const ButtonGroup = ({ next, previous, ...rest }) => {
        const { carouselState: { currentSlide,slidesToShow, totalItems } } = rest;
        return (
            <>
                {totalItems <= slidesToShow ? null :
                    <div className="carousel-button-group">
                        <button 
                            className='react-multiple-carousel__arrow react-multiple-carousel__arrow--left' 
                            onClick={() => previous()} 
                            disabled={currentSlide === 0}
                            aria-label='prev slide'
                        />
                        <button 
                            className='react-multiple-carousel__arrow react-multiple-carousel__arrow--right' 
                            onClick={() => next()} 
                            disabled={currentSlide === totalItems}
                            aria-label='prev slide'
                        />
                    </div>
                }
            </>
        );
    }

    return (
        <section className='container movie-list'>

            {/* Customized select */}
            <div className='select-box'>
                <label htmlFor='genre'>{genre || 'Genre'}</label>
                <select id='genre' onChange={(e) => { setGenre(e.target.value) }}>
                    <option key={'All'} value=''>All Genre</option>
                    {genreList.map(i => (<option key={i}>{i}</option>))}
                </select>
            </div>

            {/* Carousel */}
            <div className='carousel-box'>
                <Carousel
                    responsive={responsive}
                    // infinite={true}
                    arrows={false}
                    renderButtonGroupOutside={true}
                    customButtonGroup={<ButtonGroup />}
                >
                    {movies.filter(i => i.Genre?.includes(genre)).map((i, index) => (
                        <div
                            key={i.Id}
                            className='movie-item-box'
                        >
                            <div
                                className='movie-item'
                                title={i.Title}
                                tabIndex='0'
                                style={{ backgroundImage: `url(${i.Poster})` }}
                                onClick={() => { props.handleSwitch(i) }}
                                onKeyDown={(e) => { e.key === 'Enter' && handleSwitch(i) }}
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>
    )
}

export default MovieList;