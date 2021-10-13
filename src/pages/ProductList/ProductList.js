import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    const LIST_API = '/data/ProductList/PRODUCT_LIST_DATA.json';
    const LIST_API2 = 'localhost:8000/sort/list';

    const { totalCountDataFetched, noData } = this.state;

    fetch(LIST_API2)
      .then(res => {
        return res.json();
      })
      .then(data => {
        const duplicatedData = [...data.LIST_DATA.product];
        const newDatalistData = duplicatedData.slice(0, totalCountDataFetched);

        this.setState({
          listData: newDatalistData,
        });
        if (this.state.listData.length === 50) {
          this.setState({
            noData: !noData,
          });
          return window.removeEventListener('scroll', this.handleScroll);
        }
      })
      .catch(console.error);
  };

  showLoadingSvg = resolve => {
    const { listData, totalCountDataFetched, loading } = this.state;
    return new Promise(resolve => {
      if (listData.length !== totalCountDataFetched) {
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
    const { totalCountDataFetched } = this.state;
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    let scrollTotalHeight = scrollHeight;
    let scrollHeightFromTop = scrollTop;
    let scrollHeightOfListCard = clientHeight;
    const isOverEndPointScroll =
      scrollHeightFromTop + scrollHeightOfListCard >= scrollTotalHeight;

    if (isOverEndPointScroll) {
      this.setState(
        {
          totalCountDataFetched: totalCountDataFetched + 10,
        },
        await this.showLoadingSvg()
      );
      this.fetchMoreData();
    }
  };

  render() {
    const { listData, loading, totalCountDataFetched, noData } = this.state;
    // const noData = listData.length !== totalCountDataFetched;

    return (
      <main className='ProductList'>
        <Nav />
        <div className='ProductComponentWrapper'>
          {listData &&
            listData.map(product => {
              const { id, image, subImage, detailImage, name, price } = product;
              return (
                <Link to='/product/1'>
                  <ProductCard
                    key={id}
                    image={image}
                    subImage={subImage}
                    detailImage={detailImage}
                    name={name}
                    price={price}
                    fetchMoreData={this.fetchMoreData}
                  />
                </Link>
              );
            })}
        </div>
        {loading ? (
          <InfiniteScroll
            listData={listData}
            totalCountDataFetched={totalCountDataFetched}
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
