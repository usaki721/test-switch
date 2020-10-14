import React from 'react';

/**
 * Detail information of selected movie
 * @param {movie: Object} props 
 */
const MovieDetails = (props) => {
    const { movie } = props;
    const mobileMeta=['Year','Genre','Plot']; // header metas displayed after title in mobile layout
    const ignoreMeta = ['Poster', 'Title', 'Id', 'Type']; // metas not display
    return (
        <section className='container movie-details'>
            {/* PC Poster */}
            <div className='left'>
                <img src={movie.Poster} alt='poster' />
            </div>
            
            <div className='right'>

                {/* Title and header metas */}
                <h2>{movie.Title}</h2>
                <ul className='metas meta-mobile'>
                    {Object.keys(movie)
                        .filter(i => (mobileMeta.includes(i) && movie[i] !== 'N/A'))
                        .map(i => (
                            <li key={i}>
                                <span className='label'>{i}: </span>
                                <span>{movie[i]}</span>
                            </li>
                        ))
                    }
                </ul>

                <div className='detail'>

                    {/* Mobile poster */}
                    <img className='poster' src={movie.Poster} alt='poster' />

                    {/* Metas */}
                    <ul className='metas'>
                        {Object.keys(movie)
                            .filter(i => (!ignoreMeta.includes(i) && movie[i] !== 'N/A'))
                            .map(i => (
                                <li key={i} className={mobileMeta.includes(i)? 'meta-pc':''}>
                                    <span className='label'>{i}: </span>
                                    {i==='Website'?(
                                        <a href={movie[i]} target='_blank' rel="noopener noreferrer">{movie[i]}</a>
                                    ):(
                                        <span>{movie[i]}</span>
                                    )}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
export default MovieDetails;