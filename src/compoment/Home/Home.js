import { faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../Home/Home.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "../Reponsive/Reponsive.css";
import { useFormik } from 'formik';

export default function Home() {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    const role = sessionStorage.getItem('role');
    const id_user = sessionStorage.getItem('user_id');
    const [menuOpen, setMenuOpen] = useState(false);
    const [cake, setCake] = useState([]);
    const [itemsPage, setItemsPage] = useState(12);
    const [image, setImage] = useState([]);
    console.log(id_user)
    

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
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
    useEffect(() => {
        getList()
    }, [name, typeIdCake]);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };




    // const formAdd=useFormik({
    //     initialValues: {
    //         quantity:"",
    //         id_user:"",
    //         id_cake:""
    //     },
    // })




    const renderPagination = () => {
        const pageNumbers = [];
        const maxPageNumbersToShow = 3;
        const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
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
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="navbar">
                <div className="menu1 col-12" style={{ display: "flex" }}>
                    <div className="logo col-2">
                        <img src="https://theme.hstatic.net/1000313040/1000406925/14/logo.png?v=2115" />
                    </div>
                    <div className="search col-2">
                        <input type="search" placeholder="Tìm kiếm" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="phone col-2" style={{ display: 'flex' }}>
                        <a href='/test'>
                            <img src='https://png.pngtree.com/png-vector/20230213/ourlarge/pngtree-circle-phone-call-icon-in-black-color-png-image_6596895.png'
                                style={{ width: "100%", borderRadius: "50%" }} />
                        </a>
                        <h6 style={{ width: "50%", textAlign: 'center' }}> 0848123085</h6>
                    </div>
                    <div className="branch col-2" style={{ display: 'flex' }}>
                        <a href='/test' >
                            <img src='https://png.pngtree.com/png-vector/20190215/ourlarge/pngtree-vector-building-icon-png-image_516326.jpg'
                                style={{ width: "100%", borderRadius: "50%" }} />
                        </a>
                        <h6 style={{ width: "50%", textAlign: 'center' }}> Chi nhánh</h6>
                    </div>
                    <div className="user col-2" style={{ display: 'flex' }}>
                        <a href='/' >
                            <img src='https://static.vecteezy.com/system/resources/thumbnails/007/033/146/small_2x/profile-icon-login-head-icon-vector.jpg'
                                style={{ width: "100%", borderRadius: "50%" }} />

                        </a>
                        <h6 style={{ width: "50%", textAlign: 'center' }}> Tài khoản</h6>
                    </div>
                    <div className="cart col-2" style={{ display: 'flex' }}>
                        <a href='/cart'>
                            <img src='https://media.istockphoto.com/id/639201388/vector/shopping-cart-icon.jpg?s=612x612&w=is&k=20&c=OABCYZ7OniUdLrgJZuSgq2zuTNClyGGJPM_o5u9ZJnA='
                                style={{ width: "100%", borderRadius: "50%" }} />
                        </a>
                        <h6 style={{ width: "20%", textAlign: 'center' }}> 0</h6>
                    </div>
                    <div className="menu-icon" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </div>
                <div className={`menu  ${menuOpen ? 'open' : ''}`} style={{ width: "100%" }}>
                    <ul style={{ display: "flex", width: "100%" }}>
                        <li className='' style={{ width: "13%" }}></li>
                        <li className='home '>
                            <a href='/home'> TRANG CHỦ</a>
                            </li>
                        <li className='Banhsn '>
                            <a href="#" onClick={toggleDropdown}>
                                COOKIES & MINICAKE
                            </a>
                            {isOpen && (
                                <ul className="dropdown-menu">
                                    <li><a href="#">Link 1</a></li>
                                    <li><a href="#">Link 2</a></li>
                                    <li><a href="#">Link 3</a></li>
                                </ul>
                            )}
                        </li>
                        <li className="cakecook">
                            <a href="#" onClick={toggleDropdown}>
                                COOKIES & MINICAKE
                            </a>
                            {isOpen && (
                                <ul className="dropdown-menu">
                                    <li><a href="#">Link 1</a></li>
                                    <li><a href="#">Link 2</a></li>
                                    <li><a href="#">Link 3</a></li>
                                </ul>
                            )}
                        </li>
                        <li className='cakemi ' ><a href='#'>BÁNH MÌ & BÁNH MẶN</a></li>
                        <li className='news ' ><a href='#'>TIN TỨC</a></li>
                        <li className='promotion '><a href='#'>KHUYẾN MẠI</a></li>
                    </ul>
                </div>
            </div>

            <div className='sidebar'>
                <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="https://theme.hstatic.net/1000313040/1000406925/14/ms_banner_img1.jpg?v=2107" class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src="https://theme.hstatic.net/1000313040/1000406925/14/ms_banner_img1.jpg?v=2115" class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src="https://theme.hstatic.net/1000313040/1000406925/14/ms_banner_img2.jpg?v=2107" class="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='all col-12' style={{ display: "flex" }} >
                <div className='left col-1'></div>
                <div className='between col-10'>
                    <div className='between1'>
                        <h3 className="birthdayCake-title">BÁNH KEM </h3>
                        <img src='https://theme.hstatic.net/1000313040/1000406925/14/home_line_collection1.png?v=2115' />
                    </div>
                    <div className='between2'>
                        {currentPageData.map(item => (
                            <div className='a col-3' key={item.id}>
                                <a href={`/views/${item.id}`}>
                                    <div className='image' >
                                        <img src={process.env.PUBLIC_URL + '/img/' + (item.image[0]?.name || '')} />
                                    </div>
                                </a>
                                <div className='nameCake'>
                                    <h3>{item.name}</h3>
                                    <h6>{item.code}</h6>
                                </div>
                                <div className='price'>
                                    <div className='price1'>
                                        <p>{formatPrice(item.price)}  VNĐ</p>
                                    </div>
                                    <div className='price2'>
                                        <form>
                                            
                                            <FontAwesomeIcon icon={faCartShopping} />
                                        </form>
                                        
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                    {renderPagination()}
                </div>

                <div className='right col-1'></div>
            </div>
            <div className='footer'>
                <footer>
                    <div class="footer-content">
                        <div class="footer-section">
                            <h4>About Us</h4>
                            <p>We are a company dedicated to providing high-quality products and services to our customers.</p>
                        </div>
                        <div class="footer-section">
                            <h4>Contact Us</h4>
                            <ul>
                                <li>Phone: 123-456-7890</li>
                                <li>Email: info@example.com</li>
                                <li>Address: 123 Main Street, Anytown USA</li>
                            </ul>
                        </div>
                        <div class="footer-section">
                            <h4>Follow Us</h4>
                            <div class="social-icons">
                                <a href="#"><i class="fab fa-facebook-f"></i></a>
                                <a href="#"><i class="fab fa-twitter"></i></a>
                                <a href="#"><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; 2023 Example Company. All rights reserved.</p>
                    </div>
                </footer>
            </div>

            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
            <script src="https://maxcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
        </>
    );
}
