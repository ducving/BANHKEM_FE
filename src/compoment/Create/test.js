import { faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../Home/Home.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "../Reponsive/Reponsive.css";
import { useFormik } from 'formik';
import Footer from '../Footer/Footer';

export default function Test() {
    const username = sessionStorage.getItem('username');
    const role = sessionStorage.getItem('role');
    const id_user = sessionStorage.getItem('user_id');
    const [menuOpen, setMenuOpen] = useState(false);
    const [cake, setCake] = useState([]);
    const [itemsPage, setItemsPage] = useState(8);
    const [image, setImage] = useState([]);
    const [selectedCakeId, setSelectedCakeId] = useState('');
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [visibleCount, setVisibleCount] = useState(8); 
    const [cartCakeIds, setCartCakeIds] = useState([]); // Track cake IDs in the cart

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [typeIdCake, setTypeIdCake] = useState('');

    const totalPages = Math.ceil(cake.length / itemsPage);

    async function getList() {
        const response = await axios.get(`http://localhost:8080/api/cake?name=${name}&typeIdCake=${typeIdCake}`);
        setCake(response.data);
    }

    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    useEffect(() => {
        getList();
    }, [name, typeIdCake]);

    useEffect(() => {
        async function fetchCart() {
            try {
                const response = await axios.get(`http://localhost:8080/api/cart/${id_user}`);
                const cartItems = response.data;
                const uniqueItemsCount = cartItems.length; // Count the number of unique cake items
                setTotalQuantity(uniqueItemsCount);
                setCartCakeIds(cartItems.map(item => item.id_cake)); // Store the cake IDs in the cart
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        }

        if (id_user) {
            fetchCart();
        }
    }, [id_user]);

    const formAdd = useFormik({
        initialValues: {
            quantity: "",
            id_user: "",
            id_cake: ""
        },
        onSubmit: async () => {
            const formData = new FormData();
            formData.append("quantity", 1);
            formData.append("id_user", id_user);
            formData.append("id_cake", selectedCakeId);

            await axios.post("http://localhost:8080/api/cart", formData)
                .then(() => {
                    if (!cartCakeIds.includes(selectedCakeId)) {
                        setTotalQuantity(prevQuantity => prevQuantity + 1);
                        setCartCakeIds([...cartCakeIds, selectedCakeId]); // Add the new cake ID to the cart
                    }
                    navigate("/test");
                })
                .catch(error => {
                    console.error("There was an error!", error);
                });
        }
    });

    const handleSubmit = (event, id) => {
        event.preventDefault();
        setSelectedCakeId(id);
        formAdd.setFieldValue("id_cake", id);
        formAdd.handleSubmit(event);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const groupedCakes = cake.reduce((groups, item) => {
        const group = groups[item.typeOfCake.name] || [];
        group.push(item);
        groups[item.typeOfCake.name] = group;
        return groups;
    }, {});

    return (
        <>
            <div className="navbar" style={{position:"fixed"}}>
                <div className="menu1 col-12" style={{ display: "flex" }}>
                    <div className="cart col-2" style={{ display: 'flex' }}>
                        <a href='/cart'>
                            <img src='https://media.istockphoto.com/id/639201388/vector/shopping-cart-icon.jpg?s=612x612&w=is&k=20&c=OABCYZ7OniUdLrgJZuSgq2zuTNClyGGJPM_o5u9ZJnA='
                                style={{ width: "100%", borderRadius: "50%" }} />
                        </a>
                        <h6 style={{ width: "20%", textAlign: 'center' }}>{totalQuantity}</h6>
                    </div>
                    <div className="menu-icon" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </div>
            </div>
            <div className='all col-12' style={{ display: "flex" }} >
                <div className='left col-2'></div>
                <div className='between col-8'>
                    {Object.keys(groupedCakes).map(typeOfCake => (
                        <div key={typeOfCake}>
                            <div className='between1'>
                                <h3 className="birthdayCake-title">{typeOfCake} </h3>
                                <img src='https://theme.hstatic.net/1000313040/1000406925/14/home_line_collection1.png?v=2115' />
                            </div>
                            <div className='between2'>
                                {groupedCakes[typeOfCake].slice(0, visibleCount).map(item => (
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
                                                <form onSubmit={(event) => handleSubmit(event, item.id)}>
                                                    <input type='hidden' name='id_cake' value={item.id} onChange={formAdd.handleChange} />
                                                    <button type='submit' className='btas'>
                                                        <FontAwesomeIcon icon={faCartShopping} />
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className='showAll_cakeid' >
                                <a href='#'>xem thêm</a>
                            </button>
                        </div>
                    ))}
                </div>
                <div className='right col-2'></div>
            </div>
            <Footer />
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
        </>
    );
}
