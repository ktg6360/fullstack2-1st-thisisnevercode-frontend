// import React, { Component } from 'react';
// import ProductOtherColorCard from './ProductOtherColorCard';

// import './ProductCard.scss';

// class ProductCard extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       mainImage: this.props.productImg,
//     };
//   }
//   changeSubImage = e => {
//     let { productImg } = this.props;
//     if (e.target.src !== productImg) {
//       this.setState(
//         {
//           mainImage: e.target.src,
//         },
//         this.hover
//       );
//     } else {
//       this.setState({
//         mainImage: productImg,
//       });
//     }
//   };

//   hover = e => {
//     const { mainImage } = this.state;
//     const { productDetailImg } = this.props;

//     // if(mainImage !== )
//     for (let detailImg = 0; detailImg < productDetailImg.length; detailImg++) {
//       switch (e.target.className) {
//         case 'eventArea1':
//           this.setState({
//             mainImage: productDetailImg[0].img,
//           });
//           break;
//         case 'eventArea2':
//           this.setState({
//             mainImage: productDetailImg[1].img,
//           });
//           break;
//         case 'eventArea3':
//           this.setState({
//             mainImage: productDetailImg[2].img,
//           });
//           break;
//         case 'eventArea4':
//           this.setState({
//             mainImage: productDetailImg[3].img,
//           });
//           break;
//         default:
//       }
//     }
//   };

//   render() {
//     const {
//       productSubImg,
//       productImg,
//       productDetailImg,
//       productName,
//       productPrice,
//       changeDetailProductImage,
//     } = this.props;
//     const { mainImage } = this.state;
//     return (
//       <div className='ProductCard'>
//         <div className='productImageWrapper'>
//           <div className='eventArea1' onMouseEnter={this.hover}></div>
//           <div className='eventArea2' onMouseEnter={this.hover}></div>
//           <div className='eventArea3' onMouseEnter={this.hover}></div>
//           <div className='eventArea4' onMouseEnter={this.hover}></div>
//           {productDetailImg.map(detailImg => {
//             return (
//               <img
//                 className='productDetailImage'
//                 key={detailImg.id}
//                 alt={detailImg.name}
//                 src={detailImg.img}
//                 onMouseOver={changeDetailProductImage}
//               />
//             );
//           })}
//           <img
//             className='productImage'
//             src={mainImage}
//             alt={productName}
//             onMouseOver={changeDetailProductImage}
//           />
//         </div>
//         <div className='subImgWrapper'>
//           {productSubImg.map(product => {
//             return (
//               <ProductOtherColorCard
//                 mainImage={productImg}
//                 key={product.id}
//                 subImage={product.img}
//                 name={product.name}
//                 changeSubImage={this.changeSubImage}
//               />
//             );
//           })}
//         </div>
//         <h2 className='productName'>{productName}</h2>
//         <h2 className='productPrice'>{productPrice}</h2>
//       </div>
//     );
//   }
// }

// export default ProductCard;

// 리스트

// import React, { Component } from 'react';
// import ProductCard from './Components/ProductCard';
// // import Nav from '../../components/Nav';

// import './ProductList.scss';

// class ProductList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       productsData: [],
//       productMainImg: '',
//       productSubImg: '',
//       productDetailImg: [],
//     };
//   }

//   componentDidMount() {
//     fetch('/data/ProductList/PRODUCT_LIST_DATA.json')
//       .then(res => res.json())
//       .then(data => {
//         this.setState({
//           productsData: data.PRODUCT_DATA.product,
//         });
//       });
//     fetch('/data/ProductList/PRODUCT_DETAIL_DATA.json')
//       .then(res => res.json())
//       .then(data => {
//         this.setState({
//           productDetailImg: data.DETAIL_IMAGE_DATA.detailImg,
//         });
//       });
//   }

//   changeDetailProductImage = e => {
//     const { productDetailImg } = this.state;
//     const detailArr = [];
//     const detailData = [...productDetailImg];
//     for (let detailImg of detailData) {
//       detailArr.push(detailImg);
//       this.setState({
//         productDetailImg: detailArr,
//       });
//     }
//   };

//   render() {
//     const { productsData, productDetailImg, productMainImg } = this.state;
//     // console.log('finally', productDetailImg);
//     return (
//       <div className='ProductList'>
//         {productsData.map(product => {
//           return (
//             <ProductCard
//               key={product.id}
//               productSubImg={product.subImg}
//               productImg={product.img}
//               productDetailImg={product.detailImg}
//               productName={product.name}
//               productPrice={product.price}
//               changeDetailProductImage={this.changeDetailProductImage}
//             />
//           );
//         })}
//       </div>
//     );
//   }
// }

// export default ProductList;
