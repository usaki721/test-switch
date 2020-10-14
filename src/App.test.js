import React from 'react';
import App from './App';
import { expect } from 'chai';
import axios from 'axios';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('Rendering without crash', function () {
  it('App main section rendering', function () {
    let app = Enzyme.render(<App />);
    expect(app.find('main').length).to.equal(1);
  });

  it('Carousel rendering', function () {
    let app = Enzyme.render(<App />);
    expect(app.find('.react-multi-carousel-list').length).to.equal(1);
  });

  it('Movie detail rendering', function () {
    let app = Enzyme.render(<App />);
    expect(app.find('h2').length).to.equal(1);
  });
});

describe('Get data from server', function () {
  it('can get data from server', async ()=>{
    let res=await axios.get('http://www.mocky.io/v2/5af935ab320000221d86afe6');
    expect(res.data.length).to.be.above(0);
    expect(res.data[0]).to.haveOwnProperty('Genre');
  });
});

