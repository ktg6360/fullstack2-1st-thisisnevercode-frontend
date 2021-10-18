import React, { Component } from 'react';
import ProductCard from './Components/ProductCard';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer';
import GoBackToTopButton from './Components/GoBackToTopButton';
import InfiniteScroll from './Components/infiniteScroll';
import './ProductList.scss';
import { API } from './API';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      sortListData: [],
      currentItem: 10,
      totalPage: 0,
      isLoading: false,
      hasMoreData: false,
      sortOptions: [
        { id: 1, name: 'Recent', isChecked: true },
        { id: 2, name: 'Price (Low)', isChecked: false },
        { id: 3, name: 'Price (High)', isChecked: false },
        { id: 4, name: 'Trending', isChecked: false },
      ],
      viewOptions: [
        { id: 1, name: 'Large', isChecked: true },
        { id: 2, name: 'Small', isChecked: false },
      ],
    };
  }

  componentDidMount() {
    this.fetchMoreData();
    // 1 최초실행
    return window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleSortCheckIcon = id => {
    const { sortOptions, sortListData, currentItem } = this.state;
    const newsortOptions = [...sortOptions];
    newsortOptions.forEach(data => (data.isChecked = data.id === id));
    this.setState({
      sortOptions: newsortOptions,
      listData: [],
      sortListData: [],
      currentItem: 10,
    });
    this.fetchMoreData();
  };

  handleViewCheckIcon = id => {
    const { viewOptions } = this.state;
    const newViewOptions = [...viewOptions];
    newViewOptions.forEach(data => (data.isChecked = data.id === id));
    this.setState({ viewOptions: newViewOptions });
  };

  fetchMoreData = async () => {
    const recent = this.state.sortOptions[0].isChecked;
    const pricehigh = this.state.sortOptions[1].isChecked;
    const pricelow = this.state.sortOptions[2].isChecked;
    const trend = this.state.sortOptions[3].isChecked;
    let queryParameter;
    recent && (queryParameter = 'recent');
    pricehigh && (queryParameter = 'pricehigh');
    pricelow && (queryParameter = 'pricelow');
    trend && (queryParameter = 'trend');

    const { hasMoreData, currentItem } = this.state;

    fetch(`/product?offset=${currentItem - 10}&sort=${queryParameter}`)
      .then(res => res.json())
      .then(data => {
        if (queryParameter !== 'recent') {
          // sort 체크 값이 recent 이 외 일때
          const sortListData = data.LIST_DATA.product;

          console.log(
            'this.state.sortListData(시작하자마자 받는 데이터)',
            this.state.sortListData,
            'sortListData(추가된 데이터)',
            sortListData
          );

          this.setState({
            sortListData: [...this.state.sortListData, ...sortListData],
            listData: [...this.state.sortListData, ...sortListData],
          });
          console.log(
            '총길이',
            this.state.listData.length,
            '총데이터',
            this.state.listData
          );
        } else {
          // sort 상태가 recent일때
          const listData = data.LIST_DATA.product;
          const newItemList = [...this.state.listData, ...listData];

          console.log(
            'this.state.sortListData(시작하자마자 받는 데이터)',
            this.state.listData,
            'sortListData(추가된 데이터)',
            listData
          );
          this.setState({
            listData: newItemList,
          });
          console.log(
            '총길이',
            this.state.listData.length,
            '총데이터',
            this.state.listData
          );
        }

        if (this.state.listData.length === 30) {
          this.setState({
            hasMoreData: !hasMoreData,
          });
          return window.removeEventListener('scroll', this.handleScroll);
        }
        console.log(
          '현재 데이터 총 갯수',
          this.state.listData.length,
          '현재 아이템 갯수',
          currentItem
        );
      })
      .catch(console.error);
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.currentItem !== this.state.currentItem) {
  //     console.log(
  //       '이전 아이템 갯수',
  //       prevState.currentItem,
  //       this.state.currentItem
  //     );
  //   }
  // }

  fetchMoreSortData = async () => {};

  showLoadingImg = resolve => {
    const { listData, currentItem, isLoading } = this.state;
    return new Promise(resolve => {
      if (listData.length !== currentItem) {
        this.setState({
          isLoading: isLoading,
        });
      } else {
        this.setState({
          isLoading: !isLoading,
        });
        setTimeout(() => {
          resolve();
        }, 1000);
      }
    });
  };

  handleScroll = async () => {
    console.log(1);
    const { currentItem } = this.state;
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    let scrollTotalHeight = scrollHeight;
    let scrollHeightFromTop = scrollTop;
    let scrollHeightOfListCard = clientHeight;
    const isOverEndPointScroll =
      scrollHeightFromTop + scrollHeightOfListCard >= scrollTotalHeight;

    if (isOverEndPointScroll) {
      this.setState(
        {
          currentItem: currentItem + 10,
        },
        await this.showLoadingImg()
      );
      this.fetchMoreData();
    }
  };

  render() {
    const {
      listData,
      sortListData,
      isLoading,
      currentItem,
      totalPage,
      hasMoreData,
      viewOptions,
    } = this.state;
    console.log(currentItem, totalPage, '큐렌트, 토탈');
    // console.log(sortListData.length, currentItem);
    return (
      <main className='ProductList'>
        <Nav
          sortOptions={this.state.sortOptions}
          handleSortCheckIcon={this.handleSortCheckIcon}
          viewOptions={this.state.viewOptions}
          handleViewCheckIcon={this.handleViewCheckIcon}
        />
        <div className='ProductComponentWrapper'>
          {listData &&
            listData.map(product => {
              const { id, mainImageUrl, subImage, detailImage, name, price } =
                product;
              return (
                <ProductCard
                  key={id}
                  mainImageUrl={mainImageUrl}
                  subImage={subImage}
                  detailImage={detailImage}
                  name={name}
                  price={price}
                  fetchMoreData={this.fetchMoreData}
                  id={id}
                  viewOptions={viewOptions}
                />
              );
            })}
        </div>

        {isLoading && <InfiniteScroll />}

        {hasMoreData && <GoBackToTopButton />}
        <Footer />
      </main>
    );
  }
}

export default ProductList;
