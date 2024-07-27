import "../Shopping/Cart.css"
import Footer from "../Footer/Footer";
import { faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


export default function Cart() {
  const id_user = sessionStorage.getItem('user_id');

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [cake, setCake] = useState({ image: [] });
  const params = useParams();
  const [count, setCount] = useState({});
  const [typeIdCake, setTypeIdCake] = useState('');
  const [image, setImage] = useState([]);
  const [name, setName] = useState('');
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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


  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const increment = (id) => {
    setCount((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1
    }));
  };
  const decrement = (id) => {
    setCount((prevCounts) => ({
      ...prevCounts,
      [id]: Math.max((prevCounts[id] || 0) - 1, 0)
    }));
  };

  const [cart, setCart] = useState([]);
  async function getList() {
    try {
      const rep = await axios.get(`http://localhost:8080/api/cart/${id_user}`);
      setCart(rep.data);

      // Khởi tạo số lượng của từng sản phẩm khi nhận dữ liệu từ API
      const initialCounts = rep.data.reduce((acc, item) => {
        const key = item.cake.id;
        if (!acc[key]) {
          acc[key] = item.quantity || 1; // Sử dụng số lượng từ dữ liệu giỏ hàng hoặc 1 nếu không có
        } else {
          acc[key] += item.quantity || 1; // Cộng dồn số lượng nếu có nhiều sản phẩm giống nhau
        }
        return acc;
      }, {});
      setCount(initialCounts);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  }
  useEffect(() => {
    if (id_user) {
      getList();
    } else {
      console.error('User ID is missing');
    }
  }, [id_user]);

  // Nhóm sản phẩm giống nhau
  const groupedCart = cart.reduce((acc, item) => {
    const key = item.cake.id;
    if (!acc[key]) {
      acc[key] = {
        ...item,
        quantity: count[key] || 1 // Sử dụng số lượng từ trạng thái counts hoặc 1 nếu chưa có
      };
    }
    return acc;
  }, {});

  const groupedCartArray = Object.values(groupedCart);


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
            <a href='/'>
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
            <li className='home '><a href='/home'> TRANG CHỦ</a></li>
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
      <div className="cart-sidebar">
        <div>
          <h2> BÁNH KEM HÀ NỘI - GIỎ HÀNG CỦA BẠN </h2>
        </div>
      </div>
      <div className="cart-all col-12">
        <div className="cart-left col-1" ></div>
        <div className="cart-bw col-10" >
          <div className="cart-bw-cart">
            <h3>GIỎ HÀNG</h3>
          </div>
          <hr />
          <hr />
          <form>
            <table className="cart-table">
              <tr className="row-with-border">
                <td className="table-none col-3"></td>
                <td className=" table-none col-3"><h3>Thông tin chi tiết</h3></td>
                <td className=" table-none col-2"><p>Đơn giá</p></td>
                <td className="table-none col-2"><p>Số lượng</p></td>
                <td className="table-none col-2"><p>Tổng giá</p></td>
              </tr>
              {groupedCartArray.map(item => (
                <tr className="row-with-border">
                  <td className="table-none1">
                    <img src={process.env.PUBLIC_URL + '/img/' + (item.cake.image[0]?.name || '')} />
                  </td>
                  <td className="table-none"><p>{item.cake.name}</p></td>
                  <td className="table-none"><p>{item.cake.price} VNĐ</p></td>
                  <td className="table-none">
                    <div className="table-none-accout">
                      <button type="button" className="cart-buttona" onClick={() => decrement(item.id)}>
                        -
                      </button>
                      <h5>{count[item.cake.id] || 1}</h5>
                      <button type="button" className="cart-buttonb" onClick={() => increment(item.id)}>
                        +
                      </button>
                    </div>
                  </td>
                  <td className="table-none"><p>{(count[item.id] || 0) * item.cake.price} VNĐ</p></td>
                </tr>
              ))}
            </table>
          </form>
          <div className="cart-bw-da col-12">
            <div className="cart-bw-d col-8">
              <p>Quý khách xin vui lòng nhập thông tin: Họ tên, Ngày tháng năm sinh, Địa chỉ nhận, Thời gian nhận bánh và Số điện thoại liên hệ.</p>
              <input type="text" />
            </div>
            <div className="cart-bw-a ">
              <h5>Tổng tiền : 1.200.000 VNĐ</h5><br></br>
              <p style={{float:"right",width:"100%"}}>Vận chuyển</p>
              <div style={{ display: "flex",width:"100%" }}>
                <button type="button" className="cart_addcart">Cập nhật</button>
                <button type="button" className="cart_buycart">Thanh toán</button>
              </div>

            </div>
            <div>

            </div>

          </div>


        </div>

        <div className="cart-right col-1"></div>
      </div>
      <Footer />
    </>
  )
}