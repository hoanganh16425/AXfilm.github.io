import React, { useEffect, useState , useCallback } from 'react';
import { useParams , useHistory } from 'react-router';
import axios from 'axios';

import tmdbApi from '../api/tmdbApi';
import apiConfig from '../api/apiConfig';
import mynhan from '../assets/mydotoa.jpg'
import './detail/detail.scss';
import CastList from '../pages/detail/CastList';
import VideoList from '../pages/detail/VideoList';

import MovieList from '../components/movie-list/MovieList';
import Button from '../components/button/Button';

const IframeMv = () => {

    const { category, id } = useParams();
    const url = category === 'movie' ? `https://www.2embed.ru/embed/tmdb/movie?id=${id}` : `https://www.2embed.ru/embed/tmdb/tv?id=${id}&s=1&e=1`
    const [item, setItem] = useState(null);

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, {params:{}});
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
                     
                        <div className="container">
                            <div className="section  mb-3">
                                <iframe allowFullScreen="fullscreen" className="section__media" src={url} title="play"></iframe>
                                <img style={{height:"350px",marginLeft:"40px"}} src={mynhan}></img>
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

export default IframeMv


