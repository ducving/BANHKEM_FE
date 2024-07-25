import "../Shopping/Cart.css"
import Footer from "../Footer/Footer";
import { faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


export default function Cart() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [cake, setCake] = useState({ image: [] });
  const params = useParams();
  const [count, setCount] = useState(0);
  const [typeIdCake, setTypeIdCake] = useState('');
  const [name, setName] = useState('');
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
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
              <tr className="row-with-border">
                <td className="table-none"><img src="https://product.hstatic.net/1000313040/product/post_fb_2_cc33b01b06b74113a0dee769b8ce3487_medium.png" /></td>
                <td className="table-none"><p>Tên Bánh</p></td>
                <td className="table-none"><p>40000 VNĐ</p></td>
                <td className="table-none">
                  <div className="table-none-accout">
                    <button type="button" className="cart-buttona" onClick={decrement}>
                      -
                    </button>
                    <h5>{count}</h5>
                    <button type="button" className="cart-buttonb" onClick={increment}>
                      +
                    </button>
                  </div>
                </td>
                <td className="table-none"><p>80000 VNĐ</p></td>
              </tr>
            </table>
          </form>
        </div>
        <div className="cart-right col-1"></div>
      </div>
      <Footer/>
    </>
  )
}