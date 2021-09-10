import { useState, useEffect } from 'react'
import { Menu } from 'antd'
import Link from 'next/link'
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
} from '@ant-design/icons'

const { Item } = Menu

const TopNav = () => {
  const [current, setCurrent] = useState('')

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname)
  }, [process.browser && window.location.pathname])

  return (
    <Menu mode='horizontal' selectedKeys={[current]}>
      <Item
        key='/'
        onClick={(e) => setCurrent(e.key)}
        icons={<AppstoreOutlined />}
      >
        <Link href='/'>
          <a className='typewriter'>App</a>
        </Link>
      </Item>

      <Item
        key='/login'
        onClick={(e) => setCurrent(e.key)}
        icons={<LoginOutlined />}
      >
        <Link href='/login'>
          <a className='typewriter'>Login</a>
        </Link>
      </Item>

      <Item
        key='/register'
        onClick={(e) => setCurrent(e.key)}
        icons={<UserAddOutlined />}
      >
        <Link href='/register'>
          <a className='typewriter'>Register</a>
        </Link>
      </Item>
    </Menu>
  )
}

export default TopNav
