import React from 'react';

import './movie-card.scss';

import { Link } from 'react-router-dom';

import Button from '../button/Button';

import { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

const MovieCard = props => {

    const item  = props.item;

    const link = '/' + category[props.category] + '/' + item.id;
    console.log(category[props.category])
    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

    return (
        <Link to={link}>
            <div className="movie-card" style={{backgroundImage: `url(${bg})`}}>
                <Button className="btn">
                    <i className="bx bx-play"></i>
                </Button>
            </div>
            <h3 className="movie-name">{item.title || item.name}</h3>
        </Link>
    );
}

export default MovieCard;
