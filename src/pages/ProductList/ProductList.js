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
      loading: false,
      noData: false,
      sortOptions: [
        { id: 1, name: 'Recent', isChecked: true },
        { id: 2, name: 'Price (Low)', isChecked: false },
        { id: 3, name: 'Price (High)', isChecked: false },
        { id: 4, name: 'Trending', isChecked: false },
      ],
      // viewOptions: [
      //   { id: 1, name: 'Large', isChecked: true },
      //   { id: 2, name: 'Small', isChecked: false },
      // ],
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
    this.setState({ sortOptions: newsortOptions });
    this.fetchMoreData();
  };

  // handleViewCheckIcon = id => {
  //   const { viewOptions } = this.state;
  //   const newViewOptions = [...viewOptions];
  //   newViewOptions.forEach(data => (data.isChecked = data.id === id));
  //   this.setState({ viewOptions: newViewOptions });
  // };

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

    const { totalCountDataFetched, noData } = this.state;

    fetch(`/product?sort=${queryParameter}`)
      .then(res => res.json())
      .then(data => {
        const duplicatedData = [...data.LIST_DATA.product];
        const newDatalistData = duplicatedData.slice(0, totalCountDataFetched);

        this.setState({
          listData: newDatalistData,
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
    const { listData, loading, totalCountDataFetched, noData, viewOptions } =
      this.state;

    return (
      <main className='ProductList'>
        <Nav
          sortOptions={this.state.sortOptions}
          handleSortCheckIcon={this.handleSortCheckIcon}
          viewOptions={this.state.viewOptions}
          // handleViewCheckIcon={this.handleViewCheckIcon}
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
