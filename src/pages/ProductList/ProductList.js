import React, { Component } from 'react';
import ProductCard from './Components/ProductCard';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer';
import GoBackToTopButton from './Components/GoBackToTopButton';
import InfiniteScroll from './Components/infiniteScroll';
import './ProductList.scss';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      currentItem: 10,
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
    return window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleSortCheckIcon = id => {
    const { sortOptions } = this.state;
    const newsortOptions = [...sortOptions];
    newsortOptions.forEach(data => (data.isChecked = data.id === id));
    this.setState(
      {
        sortOptions: newsortOptions,
        // 버튼이 클릭되어서 isChecked 값이 바뀔 때마다 초기화해주기위해서 내가 작성한 코드
        itemList: [],
        currentItem: 10,
        isLoading: false,
        hasMoreData: false,
      },
      this.fetchMoreData
    );
    window.addEventListener('scroll', this.handleScroll);
    // SORT에 있는 버튼 클릭 시 페치 함수 실행
  };

  handleViewCheckIcon = id => {
    const { viewOptions } = this.state;
    const newViewOptions = [...viewOptions];
    newViewOptions.forEach(data => (data.isChecked = data.id === id));
    this.setState({ viewOptions: newViewOptions });
  };

  fetchMoreData = async () => {
    // 데이터를 fetch하는 함수
    // 휘민님이 짜신 코드 2 - sortOptions 스테이트의 isChecked 값, 버튼이 눌러진 것에 따라 queryParameter에 해당하는 쿼리스트링 대입

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

    console.log(
      'Fetch 함수 실행 시 초기화된 currentItem(OFFSET)의 값',
      currentItem
    );
    // 내가 짠 코드 - offset 0~20 LIMIT 10 sort = recent, pricehigh, pricelow, trend에 따라 페치 함수 실행
    fetch(`/product?offset=${currentItem - 10}&sort=${queryParameter}`)
      .then(res => res.json())
      .then(data => {
        const itemList = data.LIST_DATA.product;
        console.log(this.state.itemList, itemList);
        // 벡엔드에서 보내준 데이터 id 1번부터 10/ 11번부터 20씩/ 21번 부터 30번까지를 변수에 저장한다.
        const newItemList = [...this.state.itemList, ...itemList];
        // 스프레드 연산자를 활용해 배열을 누적해서 만든다.
        this.setState({
          itemList: newItemList,
        });
        // 데이터 총 길이, 갯수가 페치된 갯수의 총합과 일치하면 (데이터 총합은 서버로부터 받도록 수정할 예정)
        const DATA_TOTAL_NUMBER = 30;
        // console.log(this.state.hasMoreData, this.state.isLoading);
        if (this.state.itemList.length === DATA_TOTAL_NUMBER) {
          // 더 이상 받을 데이터가 없도록 스테이트값 변경 하여 로딩 이미지 제거하기
          this.setState({
            hasMoreData: !hasMoreData,
          });
          // 스크롤 이벤트도 제거해주기
          return window.removeEventListener('scroll', this.handleScroll);
        }
      })
      .catch(console.error);
  };

  showLoadingImg = resolve => {
    const { itemList, currentItem, isLoading } = this.state;
    return new Promise(resolve => {
      if (itemList.length !== currentItem) {
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
    const { currentItem } = this.state;
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    let scrollTotalHeight = scrollHeight;
    let scrollHeightFromTop = scrollTop;
    let scrollHeightOfListCard = clientHeight;
    const isOverEndPointScroll =
      scrollHeightFromTop + scrollHeightOfListCard >= scrollTotalHeight;

    if (isOverEndPointScroll) {
      // 스크롤 이벤트가 발생하면 currentItem(OFFSET) 값을 10씩 늘려주기
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
    const { itemList, isLoading, currentItem, hasMoreData, viewOptions } =
      this.state;
    console.log(currentItem, '렌더되고 있는 currentItem, 아이템의 총 갯수');
    return (
      <main className='ProductList'>
        <Nav
          sortOptions={this.state.sortOptions}
          handleSortCheckIcon={this.handleSortCheckIcon}
          viewOptions={this.state.viewOptions}
          handleViewCheckIcon={this.handleViewCheckIcon}
        />
        <div className='ProductComponentWrapper'>
          {itemList &&
            itemList.map(product => {
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
