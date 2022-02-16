import React, { useRef, useEffect ,useState,useCallback } from 'react';
import { useHistory} from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import Button from '../button/Button';
import Input from '../input/Input';
import './header.scss';
import  { category } from '../../api/tmdbApi';

const headerNav = [
    {
        display: 'Home',
        path: '/'
    },
    {
        display: 'Movies',
        path: '/movie'
    },
    {
        display: 'TV Series',
        path: '/tv'
    }
];
const categoryList = [
    {
        display: 'Trending Movies',
        path: ''
    },
    {
        display: 'Toprated Movies',
        path: ''
    },
    {
        display: 'Trending TV Series',
        path: ''
    },
    {
        display: 'Toprated TV Series',
        path: ''
    }
];

const Header = () => {

    const { pathname } = useLocation();
    const headerRef = useRef(null);
    const [menuiconmobile,setmenuiconmobile] = useState("none")
    const [width,setwidth] = useState(0)
    const active = headerNav.findIndex(e => e.path === pathname);
    function handleChangeMobile() {
        if(width < 700){
            setmenuiconmobile(menuiconmobile === "none" ? "block" : "none")
        }else{
            setmenuiconmobile("none")
        }
    }
    function setw(){
        setwidth(window.innerWidth)
        if(width>700){
            setmenuiconmobile("none")
        }
    }
   window.addEventListener("resize",setw)
    return (
        <div>
        <div ref={headerRef} className="header">
                <div className="logo">
                    <Link className="link" to="/"><span style={{color:'#509fe3'}}>A</span>
                    <span style={{color:'#4fa745'}}>X</span><span style={{color:'#ea7926'}}>f</span>
                    <span style={{color:'#e62e72'}}>ilm</span></Link>
                    {/* <Input type="text" placeholder=" Tim kiem" className="search"></Input> */}
                    <Movie></Movie>
                    {/* <Button className="btnSearch"><i class='bx bx-search-alt-2'></i></Button> */}
                </div>
                <div>
                    <i class='bx bx-menu menuIcon menumobile' onClick={handleChangeMobile}></i>
                    <ul style={{display:menuiconmobile,position:"absolute"}} className="menu">
                    {
                        headerNav.map((e, i) => (
                            <li key={i} className={`${i === active ? 'active' : ''}`}>
                                <Link to={e.path}>
                                    {e.display}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                </div>
                <ul className="header__nav">
                    {
                        headerNav.map((e, i) => (
                            <li key={i} className={`${i === active ? 'active' : ''}`}>
                                <Link to={e.path}>
                                    {e.display}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                
            </div>
            <div  className="category">
                <i class='bx bx-menu menuIcon'></i>
                <ul className="category__nav">
                        {
                            categoryList.map((e, i) => (
                                <li key={i} className={`${i === active ? 'active' : ''}`}>
                                    <Link to={e.path}>
                                        {e.display}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul> 
                    
            </div>
            </div>
    );
}
const Movie = props => {

    const history = useHistory();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

    const goToSearch = useCallback(
        () => {
            if (keyword.trim().length > 0) {
                history.push(`/movie/search/${keyword}`);
            }
        },
        [keyword, history]
    );

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        }
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, goToSearch]);

    return (
        <div className="movie-search">
            <input
                className="search"
                type="text"
                placeholder="  Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{padding:'0px 5px'}}
            />
            <button  className="btnSearch" onClick={goToSearch}><i class='bx bx-search-alt-2'></i></button>
        </div>
    )
}
export default Header;
