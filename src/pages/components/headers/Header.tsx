import { StoreType, dispatchApp } from '@/stores'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Dropdown, MenuProps, Modal, Space } from 'antd'
import { useNavigate } from 'react-router'
import './header.scss'
import { DownOutlined, HeartOutlined, ShoppingOutlined, UserAddOutlined } from '@ant-design/icons'
import pictures from '@/pictures'


export default function Header() {

//   useEffect(() => {
//     if(receiptStore == null)
//     dispatchApp.dispatchReceipt()
// },[])

  const handleMenuClick: MenuProps['onClick'] = () => {

  };
  const items: MenuProps['items'] = [
    {
      label: 'Profile',
      key: '1',
      onClick: () => {
        window.location.href = '/profile'
      }

    },
    {
      label: 'Receipt',
      key: '2',
      onClick: () => {
        window.location.href = '/receipt'
      }
    },
    {
      label: 'Log-out',
      key: '3',
      danger: true,
      onClick: () => {
        Modal.confirm({
          content: "Bạn có muốn đăng xuất?",
          onOk: () => {
            localStorage.removeItem("token")
            window.location.href = '/'
          }
        })
      }
    }
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const productStore = useSelector((store: StoreType) => store.productStore)
  const categoryStore = useSelector((store: StoreType) => store.categoryStore)
  const receiptStore = useSelector((store: StoreType) => store.receiptStore)
  const userStore = useSelector((store: StoreType) => store.userStore)
  const navigate = useNavigate()


  useEffect(() => {
    if (!userStore.data && !userStore.loading) {
      localStorage.removeItem('token')
    }
  }, [userStore.data, userStore.loading])
  return (
    <div>
      <header>
        <div className='sup_header'>
          <div className='sup_header_content'>
            Bộ sưu tập đồng hồ mới về!
          </div>
        </div>
        <div className='header_content'>
          <div className='left'>
            <div onClick={() => {
              window.location.href = '/'
            }} className='logo_box'>
              <img src={pictures.logoHeader} />
            </div>
            <nav>
              {[
                {
                  title: 'Thương hiệu',
                  children: [
                    {
                      title: 'Phổ biến nhất',
                      items:
                        categoryStore.data?.map(category => {
                          return {
                            name: category.name
                          }
                        })
                      // items: ['Daniel Wellington (DW)', 'Seiko', 'Casio', 'Citizen', 'Orient', 'Tissot' ]
                    }
                  ],
                },
                {
                  title: 'Nam',
                  children: null
                },
                {
                  title: 'Nữ',
                  children: null
                },
                {
                  title: 'Cặp đôi',
                  children: null
                },
              ].map((item) => (
                <div className={`item ${item.children ? 'sup' : ''}`} key={Date.now() * Math.random()}>
                  {item.title}
                  {item.children && (
                    <div className='sup_menu'>
                      {item.children.map((childItem) => (
                        <div key={Date.now() * Math.random()}>
                          <div className='title'>{childItem.title}</div>
                          <div className='sub_menu'>
                            {childItem.items && childItem.items.map((subItem, index) => (
                              <div
                                onClick={() => {
                                  navigate(`category/${subItem.name.toLowerCase()}`)
                                }}
                                key={index}
                                className='sub_menu_item'
                              >
                                {subItem.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
          <div className='right'>
            <div className='search_box'>
              <i className="item fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder='Tìm đồng hồ theo tên...' />
            </div>
            <div onClick={() => {
              navigate('/cart')
            }} className='cart_box' >
              <ShoppingOutlined />
              <span className='cart_box_number'>
                {
                  receiptStore.cart?.receiptDetail.length as number
                }
              </span>
            </div>
            <div className='heart_box'>
              <HeartOutlined />
            </div>
            {
              userStore.data ? (
                <Dropdown menu={menuProps} className='dropdown'>
                  <Button className='btn-dropdown'>
                    <Space>
                      <span>Hello {userStore.data?.userName}</span>
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              ) : (
                <div onClick={() => {
                  navigate('/authen')
                }} className='user_authentication'>
                  <UserAddOutlined />
                </div>
              )
            }
          </div>
        </div>
      </header>
    </div>
  )
}
