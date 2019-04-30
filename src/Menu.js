import React, { Component } from 'react';
import styled from 'styled-components';

import { sizes } from './utils';

import UserInfo from './UserInfo';

import logo from './awaymoFullWhite.svg';

const mainColor = '#EE5F63';
const textColor = '#FFF';
const borderColor = '#F18990';

const StyledMenu = styled.div`
  display: ${props => (props.visible) ? `grid` : `none`  };
  grid-template-rows: max-content;
  grid-template-columns: auto;
  grid-template-areas: 
    "header"
    "user"
    "menu"
    "footer";
  
  color: ${textColor};
  background: ${mainColor};
  
  a {
    color: ${textColor}
    text-decoration: none;
  }
  
  @media (min-width: ${sizes.tablet}) {}
`

const Header = styled.div`
  grid-area: header;
  
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px 0;
  margin: 0 15px;

  border-bottom: 1px solid ${borderColor};

  i {
    cursor: pointer;
    font-size: 1.15rem;
  }
  
  @media (min-width: ${sizes.tablet}) {
    border-bottom: 3px solid #FFF;
  }
`

class MenuHeader extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.props.toggleVisibility();
  }

  render() {
    return (
      <Header>
        <div />
        <img src={logo} alt="logo"/>
        <i onClick={this.handleClick} className="fas fa-times"></i>
      </Header>
    )
  }
}

const Footer = styled.div`
  grid-area: footer;
  padding: 20px 0 5px 0;
  margin: 0 15px;
  
  border-top: 1px solid ${borderColor}
  
  text-align: center;
  font-size: 1.35rem;
  
  .menu--footer__contact-data { display: none; }
  
  @media (min-width: ${sizes.tablet}) {
    font-size: 1.15rem;
    padding: 15px 0 50px 0;

    .menu--footer__contact-data { display: block; }
  }
`

const OpenMenuButton = styled.div`
background: black; height: 13px;`

class MenuFooter extends Component {
  render() {
    const contactUsLabel = `We're here to help`; // possible translation change here?
    const phoneNumber = `+44 (0) 20 8050 3459`;
    const email = `support@awaymo.com`;

    return (
      <Footer>
        <div>{contactUsLabel}</div>
        <a className="menu--footer__contact-data" href={`callto:${phoneNumber}`} target="_blank" rel="noopener noreferrer">{phoneNumber}</a>
        <a className="menu--footer__contact-data" href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">{email}</a>
      </Footer>
    )
  }
}

const MenuListItemStyled = styled.div`
  height: 70px;
  
  font-size: 1.25rem;
  
  display: ${props => props.order.tablet === -1 ? 'none' : 'flex'};
  align-items: center;
  order: ${props => props.order.tablet};
  
  border-top: 1px solid ${borderColor}
  
  &:first-child {
    border-top: 0;
  }
  
  i {
    font-size: 1.25rem;
    margin-right: 15px;
  }
`

class MenuListItem extends Component {
  render() {
    const item = this.props.item;
    return (
      <MenuListItemStyled group={item.group} order={item.order}>
        <a href={item.link} alt={item.name}>
          <i className={`fas ${item.icon}`} />
          <span>{item.label}</span>
        </a>
      </MenuListItemStyled>
    )
  }
}

const MenuListStyled = styled.div`
  grid-area: menu;
  margin: 0 15px;
  
  display: flex;
  flex-direction: column;
`

class MenuList extends Component {
  render() {
    const menuListItems = [
      { name: 'home', label: 'Home', link: '#', icon: '', group: 1, order: { tablet: -1, desktop: 0 } },
      { name: 'flights', label: 'Flights', link: '#', icon: '', group: 1, order: { tablet: -1, desktop: 0 } },
      
      { name: 'about', label: 'About Us', link: '#', icon: 'fa-question-circle', group: 2, order: { tablet: 6, desktop: 0 } },
      { name: 'faq', label: 'FAQ', link: '#', icon: 'fa-info-circle', group: 2, order: { tablet: 7, desktop: 0 } },
      { name: 'support', label: 'Support', link: '#', icon: 'fa-life-ring', group: 2, order: { tablet: 3, desktop: 0 } },
      { name: 'contact', label: 'Contact Us', link: '#', icon: 'fa-phone', group: 2, order: { tablet: 4, desktop: 0 } },
      
      { name: 'profile', label: 'Profile', link: '#', icon: 'fa-user-circle', group: 3, order: { tablet: 0, desktop: 0 } },
      { name: 'bookings', label: 'My Bookings', link: '#', icon: 'fa-plane', group: 3, order: { tablet: 1, desktop: 0 } },
      { name: 'payments', label: 'My Payments', link: '#', icon: 'fa-credit-card', group: 3, order: { tablet: 2, desktop: 0 } },
      { name: 'logout', label: 'Log Out', link: '#', icon: 'fa-sign-out-alt', group: 3, order: { tablet: 5, desktop: 0 } },
      { name: 'resume', label: 'Resume Application', link: '#', icon: '', group: 3, order: { tablet: -1, desktop: 0 } }
    ];

    return (
      <MenuListStyled>
        {menuListItems.map((itemData, index) => {
          return <MenuListItem item={itemData} key={index}/>
        })}
      </MenuListStyled>
    );
    
  }
}

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
    
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }
  
  toggleVisibility() {
    this.setState({visible: !this.state.visible})
  }

  render() {
    return (
      <div>
        <OpenMenuButton onClick={this.toggleVisibility}>--</OpenMenuButton>
        <StyledMenu visible={this.state.visible}>
          <MenuHeader toggleVisibility={this.toggleVisibility}/>
          <UserInfo />
          <MenuList />
          <MenuFooter />
        </StyledMenu>
      </div>
    )
  }
}

export default Menu; 