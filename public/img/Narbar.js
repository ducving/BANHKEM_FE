
import "../CSS/Navbar.css";
import { faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../CSS/Home.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "../CSS/reponsive.css";

export default function Navbar(){
    const [menuOpen, setMenuOpen] = useState(false);
    const [cake, setCake] = useState([]);
    const [itemsPage, setItemsPage] = useState(12);
    const [image, setImage] = useState([]);

    const navigate = useNavigate();
    //thêm banh
    const [isResponsive, setIsResponsive] = useState(false);

    const handleToggle = () => {
        setIsResponsive(!isResponsive);
    };


    const handleImageChanges = (event) => {
        const files = Array.from(event.target.files);
        setImage([...image, ...files]);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...image];
        updatedImages.splice(index, 1);
        setImage(updatedImages);
    };

    const [name, setName] = useState('');
    const [typeIdCake, setTypeIdCake] = useState('');



    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(cake.length / itemsPage);


    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPage;
        const endIndex = startIndex + itemsPage;
        const reversedHouses = [...cake].reverse();
        return reversedHouses.slice(startIndex, endIndex);
    };


    const currentPageData = getCurrentPageData();


    async function getList() {
        const response =
            await axios.get(`http://localhost:8080/api/cake?name=${name}&typeIdCake=${typeIdCake}`);
        setCake(response.data);

    }

    useEffect(() => {
        getList()
    }, [name, typeIdCake]);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPagination = () => {
        const pageNumbers = [];
        const maxPageNumbersToShow = 3;
        const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow  /2));
        const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="pagination">
                {startPage > 1 && (
                    <>
                        <button onClick={() => handlePageChange(1)}>1</button>
                        <span>...</span>
                    </>
                )}
                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={currentPage === page ? 'active' : ''}
                    >
                        {page}
                    </button>
                ))}
                {endPage < totalPages && (
                    <>
                        <span>...</span>
                        <button onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
                    </>
                )}
            </div>
        );
    };

    const handleFilterClick = (e, filter) => {
        setTypeIdCake(filter);
    }
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return(
        <>
         <div className="navbar" style={{ backgroundColor: '#e2e2e575' }}>
                <div className="menu1 col-12" style={{ display: "flex" }}>
                    <div className="logo col-2">
                        <img src="https://idodesign.vn/wp-content/uploads/2023/10/35-mau-thiet-ke-logo-tiem-banh-dep-4.jpg" style={{ width: "70%", float: "right" }} />
                    </div>
                    <div className="search col-2">
                        <input type="search" placeholder="Tìm kiếm" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="phone col-2" style={{ display: 'flex' }}>
                        <a href='/test' style={{ textDecoration: "none", color: "ActiveBorder", width: '15%' }}>
                            <img src='https://png.pngtree.com/png-vector/20230213/ourlarge/pngtree-circle-phone-call-icon-in-black-color-png-image_6596895.png'
                                style={{ width: "100%", borderRadius: "50%" }} />

                        </a>
                        <h6 style={{ width: "50%", textAlign: 'center' }}> 0848123085</h6>
                    </div>
                    <div className="branch col-2" style={{ display: 'flex' }}>
                        <a href='/test' style={{ textDecoration: "none", color: "ActiveBorder", width: '15%' }}>
                            <img src='https://png.pngtree.com/png-vector/20190215/ourlarge/pngtree-vector-building-icon-png-image_516326.jpg'
                                style={{ width: "100%", borderRadius: "50%" }} />
                        </a>
                        <h6 style={{ width: "50%", textAlign: 'center' }}> Chi nhánh</h6>
                    </div>
                    <div className="cart col-2" style={{ display: 'flex' }}>
                        <a href='/test' style={{ textDecoration: "none", color: "ActiveBorder", width: '15%' }}>
                            <img src='https://cdn-icons-png.flaticon.com/512/126/126083.png'
                                style={{ width: "100%", borderRadius: "40%" }} />

                        </a>
                        <h6 style={{ width: "50%", textAlign: 'center' }}> Giỏ hàng</h6>
                    </div>
                    <div className="user col-2" style={{ display: 'flex' }}>
                        <a href='/test' style={{ textDecoration: "none", color: "ActiveBorder", width: '15%' }}>
                            <img src='https://static.vecteezy.com/system/resources/thumbnails/007/033/146/small_2x/profile-icon-login-head-icon-vector.jpg'
                                style={{ width: "100%", borderRadius: "50%" }} />
                        </a>
                        <h6 style={{ width: "50%", textAlign: 'center' }}> Tài khoản</h6>
                    </div>
                    <div className="menu-icon" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </div>
                <div className={`menu  ${menuOpen ? 'open' : ''}`} style={{ width: "100%" }}>
                    <ul style={{ display: "flex", width: "100%" }}>
                        <li className='col-1' style={{ width: "13%" }}></li>
                        <li className='home col-2'><a href='#'> TRANG CHỦ</a></li>
                        <li className='col-2'>
                            <div class="dropdown">
                                <a class="dropbtn">BÁNH KEM</a>
                                <div class="dropdown-content">
                                    <a href="#">Link 1</a>
                                    <a href="#">Link 2</a>
                                    <a href="#">Link 3</a>
                                </div>
                            </div>
                        </li>
                        <li className='cake col-2' ><a href='#'>BÁNH NGỌT</a></li>
                        <li className='cake1 col-2'><a href='#'>BÁNH MẶN</a></li>
                        <li className='promotion col-2'><a href='#'>KHUYẾN MẠI</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}