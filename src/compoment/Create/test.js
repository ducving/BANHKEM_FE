import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "../Create/test.css";

export default function Test() {
  const username = sessionStorage.getItem('username');
  const role = sessionStorage.getItem('role');
  const id_user = sessionStorage.getItem('user_id');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [cake, setCake] = useState([]);
  const [counts, setCounts] = useState({});
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

  const increment = (id) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 1) + 1
    }));
  };

  const decrement = (id) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: Math.max((prevCounts[id] || 1) - 1, 1) // Đảm bảo số lượng không giảm dưới 1
    }));
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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
      setCounts(initialCounts);
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
        quantity: counts[key] || 1 // Sử dụng số lượng từ trạng thái counts hoặc 1 nếu chưa có
      };
    }
    return acc;
  }, {});

  const groupedCartArray = Object.values(groupedCart);

  return (
    <>
      <form>
        <table className="cart-table">
          <thead>
            <tr className="row-with-border">
              <th className="table-none col-3"></th>
              <th className="table-none col-3"><h3>Thông tin chi tiết</h3></th>
              <th className="table-none col-2"><p>Đơn giá</p></th>
              <th className="table-none col-2"><p>Số lượng</p></th>
              <th className="table-none col-2"><p>Tổng giá</p></th>
            </tr>
          </thead>
          <tbody>
            {groupedCartArray.map((item) => (
              <tr className="row-with-border" key={item.cake.id}>
                <td className="table-none1">
                {/* <img src={process.env.PUBLIC_URL + '/img/' + (item.cake.image[0]?.name || '')} /> */}
                </td>
                <td className="table-none"><p>{item.cake.name}</p></td>
                <td className="table-none"><p>{item.cake.price} VNĐ</p></td>
                <td className="table-none">
                  <div className="table-none-accout">
                    <button type="button" className="cart-buttona" onClick={() => decrement(item.cake.id)}>
                      -
                    </button>
                    <h5>{counts[item.cake.id] || 1}</h5>
                    <button type="button" className="cart-buttonb" onClick={() => increment(item.cake.id)}>
                      +
                    </button>
                  </div>
                </td>
                <td className="table-none"><p>{(counts[item.cake.id] || 1) * item.cake.price} VNĐ</p></td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </>
  );
}
