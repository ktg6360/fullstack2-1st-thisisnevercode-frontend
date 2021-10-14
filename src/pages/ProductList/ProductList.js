import React, { Component } from 'react';
import ProductCard from './Components/ProductCard';
import GoBackToTopButton from './Components/GoBackToTopButton';
import InfiniteScroll from './Components/infiniteScroll';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer';
import './ProductList.scss';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      totalCountDataFetched: 10,
      offset: 0,
      loading: false,
      noData: false,
    };
  }

  componentDidMount() {
    this.fetchMoreData();
    return window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  fetchMoreData = async () => {
    const { totalCountDataFetched, noData, offset } = this.state;

    const LIST_API = `/list?limit=${totalCountDataFetched}&offset=${offset}`;

    fetch(LIST_API)
      .then(res => {
        return res.json();
      })
      .then(data => {
        const newDatalistData = [...data.LIST_DATA.product];
        const prevData = [...this.state.listData];
        const test = prevData.concat(newDatalistData);

        this.setState({
          listData: test,
        });
        if (this.state.listData.length === 30) {
          this.setState({
            noData: !noData,
          });

          return window.removeEventListener('scroll', this.handleScroll);
        }
      })
      .catch(console.error);
  };

  showLoadingSvg = resolve => {
    const { listData, loading } = this.state;
    return new Promise(resolve => {
      if (listData.length > 30) {
        this.setState({
          loading: false,
        });
      } else {
        this.setState({
          loading: !loading,
        });

        setTimeout(() => {
          resolve();
        }, 1000);
      }
    });
  };

  handleScroll = async () => {
    const { offset } = this.state;
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    let scrollTotalHeight = scrollHeight;
    let scrollHeightFromTop = scrollTop;
    let scrollHeightOfListCard = clientHeight;
    const isOverEndPointScroll =
      scrollHeightFromTop + scrollHeightOfListCard >= scrollTotalHeight;

    if (isOverEndPointScroll) {
      this.setState(
        {
          offset: offset + 10,
        },
        await this.showLoadingSvg()
      );
      this.fetchMoreData();
    }
  };

  render() {
    const { listData, loading, totalCountDataFetched, noData, offset } =
      this.state;
    // const noData = listData.length !== totalCountDataFetched;

    return (
      <main className='ProductList'>
        <Nav />
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
                />
              );
            })}
        </div>
        {loading ? (
          <InfiniteScroll
            listData={listData}
            totalCountDataFetched={totalCountDataFetched}
            offset={offset}
          />
        ) : (
          ''
        )}
        {noData && <GoBackToTopButton />}
        <Footer />
      </main>
    );
  }
}

export default ProductList;
