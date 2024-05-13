import React from 'react'
import './footer.scss'
import pictures from '@/pictures'

export default function Footer() {
	return (
		<>
			<footer>
				<div className='footer_content'>
					<div className='content'>
						<div className='container'>
							<p className='title'>Về WatchStore</p>
							<p>Giới thiệu</p>
							<p>Phản ánh - Khiếu nại</p>
							<p>Top list đồng hồ</p>
							<p>Kiến thức đồng hồ</p>
						</div>
						<div className='container'>
							<p className='title'>Chính sách chung</p>
							<p>Chính sách thanh toán</p>
							<p>Chính sách bảo hành</p>
							<p>Chính sách bảo mật</p>
							<p>Chính sách vận chuyển</p>
							<p>Chính sách đổi trả</p>
						</div>
						<div className='container'>
							<p className='title'>Liên hệ hỗ trợ</p>
							<p>Hotline 1: 093.189.2222</p>
							<p>Hotline 2: 093.189.3333</p>
							<p>Hotline 2: 093.189.4444</p>
							<p>Email: info@watchstore.vn</p>
						</div>
						<div className='container'>
							<p className='title'>Kết nối với chúng tôi</p>
							<i className="fa-brands fa-facebook"></i>
							<i className="fa-brands fa-youtube"></i>
							<i className="fa-brands fa-instagram"></i>
							<i className="fa-brands fa-tiktok"></i>
						</div>
					</div>
					<div className='map'>
						<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1173.7120121382527!2d106.69848905867505!3d10.77463348424112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3891ddce57%3A0xa649c9415f9c11da!2sGeneral%20Science%20Library%20of%20Ho%20Chi%20Minh%20City!5e0!3m2!1sen!2s!4v1703332665386!5m2!1sen!2s" width="300" height="280" style={{ border: "0" }} loading="lazy" ></iframe>
					</div>
				</div>
			</footer>
		</>
	)
}

