import React, { useEffect, useState , useCallback } from 'react';
import { useParams , useHistory } from 'react-router';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';

import MovieList from '../../components/movie-list/MovieList';
import Button from '../../components/button/Button';
import { Link } from 'react-router-dom';

const Detail = () => {

    const { category, id } = useParams();

    const [item, setItem] = useState(null);
    
    const history = useHistory()

    const goToSearch = useCallback(
        () => {
                history.push(`/${category}/${id}/play`);
        },
        [category,id, history]
    );


    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, {params:{}});
            console.log(response.number_of_seasons)
            console.log(response.number_of_episodes)
            setItem(response);
            window.scrollTo(0,0);
        }
        getDetail();
    }, [category, id]);
    return (
        <>
            {
                item && (
                    <>
                        <div className="banner" style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
                        <div className="mb-3 movie-content container">
                            <div className="movie-content__poster">
                                {/* <div className="movie-content__poster__img" style={{backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`}}></div> */}
                                <img className="movie-content__poster__img" src={apiConfig.originalImage(item.poster_path ? item.poster_path : item.backdrop_path)} alt=""></img>
                                    <Button className="watchmv" onClick={goToSearch}>Watch now</Button>  
                                <Button className="watchmv">Download</Button>
                            </div>
                            <div className="movie-content__info">
                                <h1 className="title">
                                    {item.title || item.name}
                                </h1>
                                <div className="genres">
                                    {
                                        item.genres && item.genres.slice(0, 5).map((genre, i) => (
                                            <span key={i} className="genres__item">{genre.name}</span>
                                        ))
                                    }
                                </div>
                                <p className="overview des">{item.overview}</p>
                                <div className="cast">
                                    <div className="section__header">
                                        <h2>Casts</h2>
                                    </div>
                                    <CastList id={item.id}/>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="section mb-3">
                                <VideoList id={item.id}/>
                            </div>
                            <div className="section mb-3">
                                <div className="section__header mb-2">
                                    <h2>Similar</h2>
                                </div>
                                <MovieList category={category} type="similar" id={item.id}/>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
}

export default Detail;
